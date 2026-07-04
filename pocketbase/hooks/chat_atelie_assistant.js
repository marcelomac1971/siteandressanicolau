routerAdd('POST', '/backend/v1/chat/atelie', (e) => {
  let convId = ''
  try {
    const body = e.requestInfo().body || {}
    let userId = e.auth?.id

    if (!userId) {
      try {
        const anon = $app.findAuthRecordByEmail(
          '_pb_users_auth_',
          'anonymous@atelieandressanicolau.local',
        )
        userId = anon.id
      } catch (_) {
        const sid = body.session_id
        if (typeof sid === 'string' && sid.trim().length > 0) {
          userId = sid.trim()
        }
      }
    }

    if (!userId) {
      return e.badRequestError(
        'Não foi possível identificar o usuário. Tente recarregar a página.',
      )
    }

    const message = typeof body.message === 'string' ? body.message.trim() : ''
    if (!message) {
      return e.badRequestError('message is required')
    }

    if (message.length > 5000) {
      return e.badRequestError('message is too long (max 5000 characters)')
    }

    const conv = $ai.agent('atelie-assistant').getOrCreateConversation({
      user_id: userId,
      id: body.conversation_id || null,
    })
    convId = conv.id

    const iter = $ai.agent('atelie-assistant').chat({
      user_id: userId,
      conversation_id: conv.id,
      message: message,
      stream: true,
    })

    e.response.header().set('Content-Type', 'text/event-stream')
    e.response.header().set('Cache-Control', 'no-cache')
    e.response.header().set('X-Conversation-Id', conv.id)
    $response.stream(e, iter)
  } catch (err) {
    $app
      .logger()
      .error(
        'chat agent error',
        'error',
        err.message || String(err),
        'conversationId',
        convId,
      )

    if (err instanceof SkipAiConfigError) {
      return e.json(503, {
        error:
          'O assistente de IA está temporariamente indisponível. Tente novamente em instantes.',
      })
    }
    if (err instanceof SkipAiAgentsError) {
      const status = err.status || 500
      return e.json(status, {
        error:
          status >= 500
            ? 'Não foi possível processar sua mensagem agora. Tente novamente.'
            : err.message,
      })
    }
    if (err instanceof SkipAiError) {
      const status = err.status || 502
      return e.json(status, {
        error:
          status >= 500
            ? 'O serviço de IA está temporariamente indisponível.'
            : err.message,
      })
    }

    return e.json(500, {
      error: 'Erro interno do servidor. Tente novamente mais tarde.',
    })
  }
})

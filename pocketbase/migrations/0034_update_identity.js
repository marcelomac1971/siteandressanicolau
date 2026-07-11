migrate(
  (app) => {
    try {
      const adminEmail = 'contato@atelieandressanicolau.com.br'
      const user = app.findAuthRecordByEmail('_pb_users_auth_', adminEmail)
      user.setPassword('ADM@2025')
      user.set('requires_password_change', false)
      app.save(user)
    } catch (_) {
      const col = app.findCollectionByNameOrId('_pb_users_auth_')
      const user = new Record(col)
      user.setEmail('contato@atelieandressanicolau.com.br')
      user.setPassword('ADM@2025')
      user.setVerified(true)
      user.set('name', 'Administrador')
      user.set('requires_password_change', false)
      app.save(user)
    }

    const settingsCol = app.findCollectionByNameOrId('site_settings')
    const aboutText =
      'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'
    const keys = [
      { key: 'hero_image', content_text: '' },
      { key: 'about_image', content_text: '' },
      { key: 'about_text', content_text: aboutText },
      { key: 'contact_email', content_text: 'chefandressanicolau@gmail.com' },
    ]

    for (let i = 0; i < keys.length; i++) {
      const item = keys[i]
      try {
        const rec = app.findFirstRecordByData('site_settings', 'key', item.key)
        if (
          item.content_text &&
          rec.get('content_text') !== item.content_text
        ) {
          rec.set('content_text', item.content_text)
          app.save(rec)
        }
      } catch (_) {
        const rec = new Record(settingsCol)
        rec.set('key', item.key)
        rec.set('content_text', item.content_text)
        app.save(rec)
      }
    }
  },
  (app) => {
    try {
      const adminEmail = 'contato@atelieandressanicolau.com.br'
      const user = app.findAuthRecordByEmail('_pb_users_auth_', adminEmail)
      user.setPassword('ADM@1234')
      app.save(user)
    } catch (_) {}
  },
)

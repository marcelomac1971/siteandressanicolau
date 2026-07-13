migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')

    let user
    try {
      user = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'chefandressanicolau@gmail.com',
      )
    } catch (_) {
      try {
        user = app.findAuthRecordByEmail(
          '_pb_users_auth_',
          'contato@atelieandressanicolau.com.br',
        )
      } catch (_) {
        user = new Record(col)
      }
    }

    user.setEmail('chefandressanicolau@gmail.com')
    user.setPassword('ADM@2025')
    user.setVerified(true)
    user.set('name', 'Administrador')
    user.set('requires_password_change', true)

    try {
      app.save(user)
    } catch (e) {
      if (typeof app.saveNoValidate === 'function') {
        app.saveNoValidate(user)
      } else {
        throw e
      }
    }

    try {
      const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
      usersCol.listRule = 'id = @request.auth.id'
      usersCol.viewRule = 'id = @request.auth.id'
      app.save(usersCol)
    } catch (_) {}
  },
  (app) => {
    try {
      const user = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'chefandressanicolau@gmail.com',
      )
      user.setEmail('contato@atelieandressanicolau.com.br')
      user.setPassword('ADM@2025')
      user.set('requires_password_change', false)
      app.save(user)
    } catch (_) {}
  },
)

migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      const pwField = usersCol.fields.getByName('password')
      if (pwField) {
        try {
          pwField.options.min = 7
        } catch (_) {}
        try {
          pwField.min = 7
        } catch (_) {}
      }
      app.save(usersCol)
    } catch (_) {}

    try {
      const oldUser = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'marcelomacbook@me.com',
      )
      app.delete(oldUser)
    } catch (_) {}

    let record
    try {
      record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'contato@atelieandressanicolau.com.br',
      )
    } catch (_) {
      record = new Record(usersCol)
      record.setEmail('contato@atelieandressanicolau.com.br')
      record.setVerified(true)
    }
    record.setPassword('ADM@1234')
    record.set('name', 'Administrador')
    record.set('requires_password_change', false)

    try {
      app.save(record)
    } catch (e) {
      if (typeof app.saveNoValidate === 'function') {
        app.saveNoValidate(record)
      } else {
        throw e
      }
    }
  },
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      const newUser = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'contato@atelieandressanicolau.com.br',
      )
      app.delete(newUser)
    } catch (_) {}

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'marcelomacbook@me.com')
    } catch (_) {
      const record = new Record(usersCol)
      record.setEmail('marcelomacbook@me.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Administrador')
      app.save(record)
    }
  },
)

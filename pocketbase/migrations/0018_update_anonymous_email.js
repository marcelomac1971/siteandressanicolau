migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'anonymous@atelieandressanicolau.local',
      )
      return
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('anonymous@atelieandressanicolau.local')
    record.setPassword('AnonymousPass1!')
    record.setVerified(true)
    record.set('name', 'Anonymous')
    app.save(record)

    try {
      const oldAnon = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'anonymous@atelie.local',
      )
      app.delete(oldAnon)
    } catch (_) {}
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'anonymous@atelieandressanicolau.local',
      )
      app.delete(record)
    } catch (_) {}
  },
)

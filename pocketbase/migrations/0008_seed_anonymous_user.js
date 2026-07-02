migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'anonymous@atelie.local')
      return
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('anonymous@atelie.local')
    record.setPassword('AnonymousPass1!')
    record.setVerified(true)
    record.set('name', 'Anonymous')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'anonymous@atelie.local',
      )
      app.delete(record)
    } catch (_) {}
  },
)

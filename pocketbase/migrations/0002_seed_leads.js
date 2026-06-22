migrate(
  (app) => {
    try {
      app.findFirstRecordByData('leads', 'email', 'maria@example.com')
      return
    } catch (_) {}

    const col = app.findCollectionByNameOrId('leads')
    const record = new Record(col)
    record.set('name', 'Maria Silva')
    record.set('email', 'maria@example.com')
    record.set('phone', '(11) 99999-8888')
    record.set('event_type', 'casamento')
    record.set('message', 'Gostaria de um orçamento para bolo de 3 andares.')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData(
        'leads',
        'email',
        'maria@example.com',
      )
      app.delete(record)
    } catch (_) {}
  },
)

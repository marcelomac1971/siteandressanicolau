migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('leads')
    col.createRule = ''
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('leads')
    col.createRule = ''
    app.save(col)
  },
)

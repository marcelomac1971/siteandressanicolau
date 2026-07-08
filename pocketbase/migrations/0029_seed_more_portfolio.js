migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('portfolio')

    const items = [
      { title: 'Bolo de Casamento Rústico', category: 'Bolos personalizados' },
      { title: 'Doces Finos Tradicionais', category: 'Doces' },
      { title: 'Bolo de Limão Siciliano', category: 'Bolos' },
      {
        title: 'Trufas de Pistache Decoradas',
        category: 'Doces personalizados',
      },
    ]

    for (const item of items) {
      try {
        app.findFirstRecordByData('portfolio', 'title', item.title)
        continue
      } catch (_) {}

      const record = new Record(col)
      record.set('title', item.title)
      record.set('category', item.category)
      app.save(record)
    }
  },
  (app) => {
    const titles = [
      'Bolo de Casamento Rústico',
      'Doces Finos Tradicionais',
      'Bolo de Limão Siciliano',
      'Trufas de Pistache Decoradas',
    ]

    for (const title of titles) {
      try {
        const record = app.findFirstRecordByData('portfolio', 'title', title)
        app.delete(record)
      } catch (_) {}
    }
  },
)

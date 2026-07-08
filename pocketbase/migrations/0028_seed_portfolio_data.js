migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('portfolio')

    const items = [
      { title: 'Bolo de Chocolate Belga', category: 'Bolos' },
      { title: 'Bolo Red Velvet Clássico', category: 'Bolos' },
      { title: 'Bolo Temático Florido', category: 'Bolos personalizados' },
      {
        title: 'Bolo Personalizado Infantil',
        category: 'Bolos personalizados',
      },
      { title: 'Brigadeiro Gourmet', category: 'Doces' },
      { title: 'Beijinho de Coco', category: 'Doces' },
      {
        title: 'Doces Decorados Personalizados',
        category: 'Doces personalizados',
      },
      { title: 'Bem-Casados Personalizados', category: 'Doces personalizados' },
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
      'Bolo de Chocolate Belga',
      'Bolo Red Velvet Clássico',
      'Bolo Temático Florido',
      'Bolo Personalizado Infantil',
      'Brigadeiro Gourmet',
      'Beijinho de Coco',
      'Doces Decorados Personalizados',
      'Bem-Casados Personalizados',
    ]

    for (const title of titles) {
      try {
        const record = app.findFirstRecordByData('portfolio', 'title', title)
        app.delete(record)
      } catch (_) {}
    }
  },
)

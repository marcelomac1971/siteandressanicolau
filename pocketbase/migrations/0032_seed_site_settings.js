migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('site_settings')

    var aboutText =
      'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'

    var items = [
      { key: 'hero_section', content_text: '' },
      { key: 'about_section', content_text: aboutText },
    ]

    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      try {
        app.findFirstRecordByData('site_settings', 'key', item.key)
        continue
      } catch (_) {}

      var record = new Record(col)
      record.set('key', item.key)
      record.set('content_text', item.content_text)
      app.save(record)
    }
  },
  (app) => {
    var keys = ['hero_section', 'about_section']
    for (var i = 0; i < keys.length; i++) {
      try {
        var record = app.findFirstRecordByData('site_settings', 'key', keys[i])
        app.delete(record)
      } catch (_) {}
    }
  },
)

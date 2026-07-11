migrate(
  (app) => {
    try {
      var record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'contato@atelieandressanicolau.com.br',
      )
      record.setPassword('ADM@2025')
      record.set('requires_password_change', false)
      app.save(record)
    } catch (_) {}

    var col = app.findCollectionByNameOrId('site_settings')

    var aboutText =
      'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'

    var items = [
      { key: 'hero_image', content_text: '' },
      { key: 'about_image', content_text: '' },
      { key: 'about_text', content_text: aboutText },
      { key: 'contact_email', content_text: 'chefandressanicolau@gmail.com' },
      { key: 'logo', content_text: '' },
    ]

    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      try {
        app.findFirstRecordByData('site_settings', 'key', item.key)
        continue
      } catch (_) {}
      var newRecord = new Record(col)
      newRecord.set('key', item.key)
      newRecord.set('content_text', item.content_text)
      app.save(newRecord)
    }
  },
  (app) => {
    try {
      var record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'contato@atelieandressanicolau.com.br',
      )
      record.setPassword('ADM@1234')
      app.save(record)
    } catch (_) {}

    var keys = [
      'hero_image',
      'about_image',
      'about_text',
      'contact_email',
      'logo',
    ]
    for (var i = 0; i < keys.length; i++) {
      try {
        var rec = app.findFirstRecordByData('site_settings', 'key', keys[i])
        app.delete(rec)
      } catch (_) {}
    }
  },
)

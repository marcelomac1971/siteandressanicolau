migrate(
  (app) => {
    var fixSpelling = function (text) {
      if (!text) return text
      text = text.replace(/Atêlie/g, 'Ateliê')
      text = text.replace(/atêlie/g, 'ateliê')
      text = text.replace(/ATÊLIE/g, 'ATELIÊ')
      text = text.replace(/Atelie/g, 'Ateliê')
      text = text.replace(/atelie/g, 'ateliê')
      text = text.replace(/ATELIE/g, 'ATELIÊ')
      return text
    }

    var collections = [
      { name: 'site_settings', field: 'content_text' },
      { name: 'portfolio', field: 'title' },
      { name: 'leads', field: 'message' },
    ]

    for (var c = 0; c < collections.length; c++) {
      var col = collections[c]
      var records
      try {
        records = app.findRecordsByFilter(
          col.name,
          col.field + " != ''",
          'created',
          0,
          0,
        )
      } catch (_) {
        continue
      }
      for (var i = 0; i < records.length; i++) {
        var record = records[i]
        var original = record.getString(col.field)
        if (!original) continue
        var fixed = fixSpelling(original)
        if (fixed !== original) {
          record.set(col.field, fixed)
          app.save(record)
        }
      }
    }

    var aboutText =
      'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'

    var settingsCol = app.findCollectionByNameOrId('site_settings')

    var settingsToEnsure = [
      { key: 'about_text', content_text: aboutText },
      { key: 'contact_email', content_text: 'chefandressanicolau@gmail.com' },
    ]

    for (var s = 0; s < settingsToEnsure.length; s++) {
      var item = settingsToEnsure[s]
      try {
        var rec = app.findFirstRecordByData('site_settings', 'key', item.key)
        if (rec.get('content_text') !== item.content_text) {
          rec.set('content_text', item.content_text)
          app.save(rec)
        }
      } catch (_) {
        var newRec = new Record(settingsCol)
        newRec.set('key', item.key)
        newRec.set('content_text', item.content_text)
        app.save(newRec)
      }
    }
  },
  (app) => {},
)

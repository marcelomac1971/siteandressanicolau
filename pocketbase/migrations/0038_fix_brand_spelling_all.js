migrate(
  (app) => {
    var collections = ['site_settings', 'leads', 'portfolio']
    var fields = {
      site_settings: 'content_text',
      leads: 'message',
      portfolio: 'title',
    }

    for (var c = 0; c < collections.length; c++) {
      var colName = collections[c]
      var fieldName = fields[colName]
      var records
      try {
        records = app.findRecordsByFilter(
          colName,
          fieldName + " != ''",
          'created',
          0,
          0,
        )
      } catch (_) {
        continue
      }
      for (var i = 0; i < records.length; i++) {
        var record = records[i]
        var text = record.getString(fieldName)
        if (!text) continue
        var original = text
        text = text.replace(/Atêlie/g, 'Ateliê')
        text = text.replace(/atêlie/g, 'ateliê')
        text = text.replace(/ATÊLIE/g, 'ATELIÊ')
        text = text.replace(/Atelie/g, 'Ateliê')
        text = text.replace(/atelie/g, 'ateliê')
        text = text.replace(/ATELIE/g, 'ATELIÊ')
        if (text !== original) {
          record.set(fieldName, text)
          app.save(record)
        }
      }
    }
  },
  (app) => {},
)

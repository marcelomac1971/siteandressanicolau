migrate(
  (app) => {
    const records = app.findRecordsByFilter(
      'site_settings',
      "content_text != ''",
      'created',
      0,
      0,
    )
    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      let text = record.getString('content_text')
      if (!text) continue
      const original = text
      text = text.replace(/Ateliê/g, 'Atêlie')
      text = text.replace(/ateliê/g, 'atêlie')
      text = text.replace(/ATELIÊ/g, 'ATÊLIE')
      text = text.replace(/Atelie/g, 'Atêlie')
      text = text.replace(/atelie/g, 'atêlie')
      text = text.replace(/ATELIE/g, 'ATÊLIE')
      if (text !== original) {
        record.set('content_text', text)
        app.save(record)
      }
    }
  },
  (app) => {
    // Cannot revert spelling correction without knowing original text
  },
)

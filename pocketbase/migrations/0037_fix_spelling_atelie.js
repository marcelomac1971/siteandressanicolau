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
      text = text.replace(/Atêlie/g, 'Ateliê')
      text = text.replace(/atêlie/g, 'ateliê')
      text = text.replace(/ATÊLIE/g, 'ATELIÊ')
      if (text !== original) {
        record.set('content_text', text)
        app.save(record)
      }
    }
  },
  (app) => {
    // Revert could be complicated as we don't know the exact previous state,
    // but the spelling fix is an absolute correction.
  },
)

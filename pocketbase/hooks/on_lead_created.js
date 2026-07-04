onRecordAfterCreateSuccess((e) => {
  const record = e.record
  const payload = {
    event: 'lead_created',
    lead: {
      id: record.getId(),
      name: record.getString('name'),
      email: record.getString('email'),
      phone: record.getString('phone'),
      event_type: record.getString('event_type'),
      message: record.getString('message'),
      created: record.getCreated()?.toString() || new Date().toISOString(),
    },
  }

  $app.logger().info('New lead created', 'payload', JSON.stringify(payload))

  const webhookUrl = $secrets.get('LEAD_WEBHOOK_URL')
  if (webhookUrl) {
    try {
      $http.send({
        url: webhookUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        timeout: 15,
      })
    } catch (err) {
      $app
        .logger()
        .error(
          'lead webhook failed',
          'leadId',
          record.getId(),
          'error',
          err.message || String(err),
        )
    }
  }

  return e.next()
}, 'leads')

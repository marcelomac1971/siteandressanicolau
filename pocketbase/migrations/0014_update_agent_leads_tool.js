migrate(
  (app) => {
    $ai.agents.deleteTools(app, 'atelie-assistant', ['leads'])
    $ai.agents.putTools(app, 'atelie-assistant', [
      {
        collection: 'leads',
        perms: { create: true },
        actAs: 'admin',
      },
    ])
  },
  (app) => {
    $ai.agents.deleteTools(app, 'atelie-assistant', ['leads'])
    $ai.agents.putTools(app, 'atelie-assistant', [
      {
        collection: 'leads',
        perms: { create: true, read: true, list: true },
        actAs: 'admin',
      },
    ])
  },
)

/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'atelie-assistant',
      name: 'Assistente Andressa Nicolau',
      description: 'Responde dúvidas sobre produtos, preços e disponibilidade.',
      systemPrompt:
        "Você é a Assistente Virtual do Ateliê Andressa Nicolau. Seu tom de voz é premium, acolhedor, profissional e artesanal.\n\nUse o contexto fornecido para responder dúvidas sobre tipos de eventos, preços e prazos. O prazo mínimo para encomendas é de 7 dias.\n\nNossos valores são: ingredientes de alta qualidade, designs personalizados e 'criar memórias'.\n\nSe o usuário quiser avançar com um pedido ou falar com um humano, recomende que ele clique no botão 'Falar no WhatsApp' logo abaixo ou você pode usar a tool 'leads' para registrar o contato se ele fornecer nome, email, telefone e tipo de evento (DEVE ser exatamente um destes: 'aniversario', 'casamento', 'corporativo', 'outro'). Não invente informações além do contexto.",
      tier: 'fast',
      tools: [{ collection: 'leads', perms: { create: true } }],
      memory: [
        {
          type: 'text',
          payload: {
            text: 'Tipos de eventos atendidos: Aniversário, Casamento, Corporativo, Outro.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'Prazo de encomenda: Mínimo de 7 dias de antecedência para qualquer pedido.',
          },
        },
        {
          type: 'text',
          payload: {
            text: "Valores da marca: Utilizamos apenas ingredientes de alta qualidade. Nosso foco é ter designs personalizados exclusivos para 'criar memórias' inesquecíveis.",
          },
        },
        {
          type: 'text',
          payload: {
            text: 'Faixa de preços: Os preços variam muito de acordo com o nível de personalização e tamanho do evento. O valor base mínimo é a partir de R$ 150,00.',
          },
        },
      ],
    })
  },
  (app) => {
    $ai.agents.delete(app, 'atelie-assistant')
  },
)

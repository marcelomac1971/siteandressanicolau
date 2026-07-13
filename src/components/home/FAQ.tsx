import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Qual o prazo de antecedência para encomendas?',
    a: 'Recomendamos no mínimo 15 dias de antecedência para bolos decorados e 30 dias para eventos maiores como casamentos. Assim, garantimos a disponibilidade na agenda e o tempo ideal de produção.',
  },
  {
    q: 'Como explico minha ideia para o bolo/doce?',
    a: 'Você pode enviar fotos de referência, paleta de cores ou até mesmo convites do evento. A partir disso, faremos um briefing para criar um design totalmente alinhado com a sua expectativa.',
  },
  {
    q: 'Vocês fazem entregas em toda São Paulo?',
    a: 'Sim, realizamos entregas em toda a capital paulista e Grande SP. O valor do frete é calculado com base no endereço do evento.',
  },
  {
    q: 'Por que o valor é diferente de uma padaria comum?',
    a: 'Nossos produtos são feitos de forma artesanal, 100% personalizados, utilizando ingredientes premium (como chocolates belgas e favas de baunilha). Cada peça é uma obra de arte exclusiva que demanda horas de dedicação, diferente da produção em massa.',
  },
  {
    q: 'Posso ver como vai ficar antes de pronto?',
    a: 'Para projetos maiores (como casamentos), podemos enviar um esboço criativo. Para pedidos convencionais, garantimos que o resultado final será fiel à referência e paleta de cores combinadas durante o atendimento.',
  },
]

export const FAQ = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground">
          Dúvidas Frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 text-base font-light leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

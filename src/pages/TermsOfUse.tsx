import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Aceitação dos Termos',
    content:
      'Ao acessar e utilizar o site do Ateliê Andressa Nicolau, você concorda com estes Termos de Uso. Caso não concorde com qualquer um dos termos aqui descritos, recomendamos que não utilize o site e seus serviços.',
  },
  {
    title: '2. Descrição dos Serviços',
    content:
      'O Ateliê Andressa Nicolau oferece serviços de confeitaria personalizada, incluindo bolos e doces sob encomenda para eventos diversos. Os pedidos são realizados através do formulário de orçamento disponível no site ou por contato direto.',
  },
  {
    title: '3. Pedidos e Orçamentos',
    content:
      'Os orçamentos são fornecidos com base nas informações fornecidas pelo cliente e estão sujeitos a disponibilidade de ingredientes e agenda. Os preços podem variar conforme a complexidade e personalização do pedido. A confirmação de qualquer encomenda requer pagamento antecipado conforme acordado.',
  },
  {
    title: '4. Cancelamentos e Reembolsos',
    content:
      'Cancelamentos devem ser comunicados com no mínimo 72 horas de antecedência. Reembolsos parciais podem ser concedidos dependendo do estágio de preparação do pedido. Pedidos cancelados com menos de 72 horas de antecedência não são reembolsáveis, exceto em casos excepcionais a critério do Ateliê.',
  },
  {
    title: '5. Propriedade Intelectual',
    content:
      'Todo o conteúdo deste site, incluindo textos, imagens, logotipos e designs, é propriedade do Ateliê Andressa Nicolau e protegido por leis de propriedade intelectual. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.',
  },
  {
    title: '6. Limitação de Responsabilidade',
    content:
      'O Ateliê Andressa Nicolau não se responsabiliza por danos indiretos decorrentes do uso do site. As informações sobre produtos alérgenos são fornecidas com base nos ingredientes utilizados, sendo responsabilidade do cliente informar sobre restrições alimentares no momento do pedido.',
  },
  {
    title: '7. Alterações nos Termos',
    content:
      'Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site. Recomendamos revisões periódicas desta página.',
  },
]

export default function TermsOfUse() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-light mb-3 text-muted-foreground">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 font-normal">
            Termos de Uso
          </h1>
          <p className="text-sm text-muted-foreground font-light max-w-md leading-relaxed">
            Última atualização: junho de 2024
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-serif text-foreground mb-3 font-normal">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-light mb-4">
            Dúvidas sobre estes termos?
          </p>
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}

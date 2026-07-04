import { FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. IDENTIFICAÇÃO DO DOCUMENTO',
    content:
      'Este documento são os TERMOS DE USO do site do Ateliê Andressa Nicolau. Ele define as regras e condições para uso do site. NÃO é uma Política de Privacidade.',
  },
  {
    title: '2. INFORMAÇÕES DA EMPRESA',
    list: [
      { label: 'Nome:', value: 'Ateliê Andressa Nicolau' },
      { label: 'Segmento:', value: 'Bolos e doces personalizados' },
      { label: 'Localização:', value: 'São Paulo - SP' },
      { label: 'WhatsApp:', value: '(11) 98175-6815' },
      { label: 'Instagram:', value: '@atelieandressanicolau' },
      { label: 'Última atualização:', value: '22 de junho de 2026' },
    ],
  },
  {
    title: '3. ACEITAÇÃO',
    content:
      'Ao acessar o site, o usuário declara ter lido e aceita estes Termos de Uso. Caso não concorde, deve interromper o uso imediatamente.',
  },
  {
    title: '4. OBJETO DO SITE',
    content:
      'O site apresenta o portfólio do Ateliê, exibe depoimentos e disponibiliza canais de contato para orçamentos. O site NÃO realiza vendas diretas online. Todo o processo de orçamento e fechamento é realizado via WhatsApp ou Instagram.',
  },
  {
    title: '5. PROCESSO DE ORÇAMENTO E PEDIDO',
    list: [
      { value: 'O cliente solicita orçamento pelo formulário ou WhatsApp' },
      {
        value:
          'O Ateliê retorna com proposta personalizada em até 48 horas úteis',
      },
      { value: 'O orçamento tem validade de 7 dias corridos' },
      {
        value:
          'A confirmação do pedido ocorre após acerto das condições de pagamento e prazo',
      },
    ],
  },
  {
    title: '6. PROPRIEDADE INTELECTUAL',
    content:
      'Todas as fotos, textos, logotipos e conteúdos do site são de propriedade do Ateliê Andressa Nicolau. É proibida a reprodução sem autorização prévia por escrito.',
  },
  {
    title: '7. POLÍTICA DE CANCELAMENTO',
    content:
      'O cancelamento de pedidos confirmados segue a seguinte diretriz: o valor pago fica como crédito para uma próxima oportunidade, podendo ser utilizado em até 1 ano.',
  },
  {
    title: '8. RESPONSABILIDADES DO CLIENTE',
    list: [
      { value: 'Fornecer informações precisas sobre o projeto' },
      { value: 'Informar sobre alergias ou restrições alimentares' },
    ],
  },
  {
    title: '9. LIMITAÇÃO DE RESPONSABILIDADE',
    content:
      'O Ateliê garante a qualidade e fidelidade ao projeto combinado. Não nos responsabilizamos por percepções subjetivas de sabor.',
  },
  {
    title: '10. COMUNICAÇÕES',
    content:
      'Canal oficial: WhatsApp (11) 98175-6815. O cliente concorda em receber comunicações relacionadas ao pedido.',
  },
  {
    title: '11. LEGISLAÇÃO APLICÁVEL E FORO',
    content:
      'Aplica-se a legislação brasileira. Fica eleito o foro da Comarca de São Paulo - SP para dirimir quaisquer controvérsias decorrentes destes Termos de Uso.',
  },
  {
    title: '12. DISPOSIÇÕES GERAIS',
    content:
      'Estes Termos de Uso podem ser alterados a qualquer tempo, sendo a versão vigente aquela disponível no site. O não exercício de qualquer direito não constitui renúncia.',
  },
]

export default function TermsOfUse() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-light mb-3 text-muted-foreground">
            Legal
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 font-normal leading-tight">
            TERMOS DE USO — Ateliê Andressa Nicolau
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Regras e condições para acesso ao site e solicitação de orçamentos
          </p>
        </div>

        <div className="h-[1px] w-full bg-border mb-12" />

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg md:text-xl font-serif text-foreground mb-3 font-normal">
                {section.title}
              </h2>
              {section.content && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                  {section.content}
                </p>
              )}
              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm md:text-base text-muted-foreground leading-relaxed font-light flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                      {item.label && (
                        <span className="font-medium text-foreground">
                          {item.label}{' '}
                        </span>
                      )}
                      {item.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="h-[1px] w-full bg-border mt-12 mb-8" />

        <p className="text-xs md:text-sm text-muted-foreground font-medium text-center leading-relaxed uppercase tracking-wide">
          Este documento são os Termos de Uso do Ateliê Andressa Nicolau — não
          confundir com Política de Privacidade.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground font-light text-center mt-3">
          São Paulo - SP, 22 de junho de 2026.
        </p>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-light mb-4">
            Dúvidas sobre estes termos?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}

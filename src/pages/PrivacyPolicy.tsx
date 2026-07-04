import { Shield, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Section {
  title: string
  content?: string
  list?: { label?: string; value: string }[]
}

const sections: Section[] = [
  {
    title: '1. IDENTIFICAÇÃO DO DOCUMENTO',
    content:
      'Este documento é a POLÍTICA DE PRIVACIDADE do Ateliê Andressa Nicolau. Ele trata exclusivamente da proteção de dados pessoais nos termos da LGPD (Lei nº 13.709/2018). NÃO é um Termo de Uso.',
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
    title: '3. QUAIS DADOS COLETAMOS',
    content:
      'Coletamos dados fornecidos voluntariamente no formulário de contato (nome completo, e-mail, telefone, tipo de evento, mensagem), dados compartilhados via WhatsApp durante o atendimento, e dados de navegação (cookies, endereço IP, tipo de navegador).',
  },
  {
    title: '4. FINALIDADE DA COLETA',
    content:
      'Os dados são utilizados para elaborar e enviar orçamentos personalizados, realizar follow-up de leads, gerenciar pedidos, melhorar a experiência do cliente, e enviar comunicados de marketing (mediante consentimento).',
  },
  {
    title: '5. BASE LEGAL',
    content:
      'O tratamento de dados é fundamentado em consentimento do titular, execução de contrato (orçamentos e pedidos), e legítimo interesse.',
  },
  {
    title: '6. COMPARTILHAMENTO',
    content:
      'Os dados não são vendidos para terceiros. Podem ser compartilhados com plataforma de hospedagem do site, WhatsApp (Meta) para viabilizar atendimento, e autoridades judiciais quando exigido por lei.',
  },
  {
    title: '7. ARMAZENAMENTO E SEGURANÇA',
    content:
      'Adotamos medidas técnicas e administrativas para proteger os dados. Os dados são mantidos enquanto durar a relação comercial ou até solicitação de exclusão.',
  },
  {
    title: '8. DIREITOS DO TITULAR (LGPD)',
    content: 'O cliente pode, a qualquer momento:',
    list: [
      { value: 'Confirmar a existência de tratamento de dados' },
      { value: 'Acessar seus dados pessoais' },
      { value: 'Corrigir dados incompletos ou desatualizados' },
      { value: 'Solicitar a exclusão dos dados' },
      { value: 'Revogar o consentimento' },
      { value: 'Solicitar portabilidade' },
    ],
  },
  {
    title: '9. COOKIES',
    content:
      'Cookies podem ser utilizados para melhorar a experiência de navegação. O usuário pode gerenciar as preferências de cookies no navegador.',
  },
  {
    title: '10. CANAL DE CONTATO LGPD',
    list: [
      { label: 'WhatsApp:', value: '(11) 98175-6815' },
      { label: 'Instagram:', value: '@atelieandressanicolau' },
    ],
  },
  {
    title: '11. ALTERAÇÕES',
    content:
      'Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas no site.',
  },
  {
    title: '12. FORO',
    content:
      'Fica eleito o foro da Comarca de São Paulo - SP para dirimir questões relativas a este documento.',
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-light mb-3 text-muted-foreground">
            Legal
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 font-normal leading-tight">
            POLÍTICA DE PRIVACIDADE — Ateliê Andressa Nicolau
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Diretrizes de Proteção de Dados e Privacidade nos termos da LGPD
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
          Este documento é a Política de Privacidade do Ateliê Andressa Nicolau
          — não confundir com os Termos de Uso.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground font-light text-center mt-3">
          São Paulo - SP, 22 de junho de 2026.
        </p>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-light mb-4">
            Dúvidas sobre esta política?
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

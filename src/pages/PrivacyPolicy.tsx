import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Informações Coletadas',
    content:
      'O Ateliê Andressa Nicolau coleta informações fornecidas voluntariamente pelos usuários através do formulário de orçamento (leads), incluindo: nome, e-mail, telefone, tipo de evento e mensagem. Essas informações são utilizadas exclusivamente para responder a solicitações e fornecer serviços personalizados.',
  },
  {
    title: '2. Uso das Informações',
    content:
      'As informações coletadas são utilizadas para: (i) responder a pedidos de orçamento; (ii) entrar em contato sobre produtos e serviços solicitados; (iii) enviar comunicações relevantes, quando autorizado pelo usuário. Não compartilhamos seus dados com terceiros para fins de marketing.',
  },
  {
    title: '3. Armazenamento e Segurança',
    content:
      'Seus dados são armazenados em servidores seguros com medidas técnicas e administrativas adequadas para proteger suas informações contra acesso não autorizado, alteração ou divulgação. Mantemos os dados apenas pelo tempo necessário para cumprir as finalidades descritas.',
  },
  {
    title: '4. Seus Direitos',
    content:
      'Conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato através do e-mail contato@atelieandressanicolau.com.br.',
  },
  {
    title: '5. Cookies',
    content:
      'Este site pode utilizar cookies para melhorar a experiência de navegação. Você pode configurar seu navegador para recusar cookies, no entanto, alguns recursos do site podem não funcionar corretamente.',
  },
  {
    title: '6. Alterações nesta Política',
    content:
      'Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Recomendamos que você revise esta página periodicamente para se manter informado sobre quaisquer alterações.',
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-light mb-3 text-muted-foreground">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 font-normal">
            Política de Privacidade
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
            Dúvidas sobre esta política?
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

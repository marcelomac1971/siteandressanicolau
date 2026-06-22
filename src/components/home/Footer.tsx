import { Instagram, MapPin, Phone, Clock } from 'lucide-react'

export const Footer = () => {
  return (
    <footer
      id="info-contato"
      className="w-full bg-foreground text-background rounded-[2.5rem] p-10 md:p-16 mt-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ateliê Andressa Nicolau
          </h2>
          <p className="text-background/70 font-light max-w-sm mb-8">
            Transformando momentos especiais em memórias inesquecíveis através
            da alta confeitaria em São Paulo.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/atelieandressanicolau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Contato</h4>
          <ul className="space-y-4 text-background/80 font-light">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a
                href="https://wa.me/5511981756815"
                className="hover:text-primary transition-colors"
              >
                (11) 98175-6815
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>São Paulo — SP</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Atendimento</h4>
          <ul className="space-y-4 text-background/80 font-light">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p>Seg a Sex: 9h às 18h</p>
                <p>Sáb: 8h às 12h</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-background/50 text-sm font-light">
        <p>© 2026 Ateliê Andressa Nicolau. Todos os direitos reservados.</p>
        <p>Feito com amor em SP.</p>
      </div>
    </footer>
  )
}

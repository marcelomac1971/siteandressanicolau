import {
  Instagram,
  Facebook,
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { WHATSAPP_BASE_LINK, WHATSAPP_PHONE_DISPLAY } from '@/lib/whatsapp'
import { useSiteSettings } from '@/hooks/use-site-settings'
import logoImg from '@/assets/image-d9dd5.png'

export const Footer = () => {
  const { logoUrl, contactEmail } = useSiteSettings()
  return (
    <footer id="contato" className="w-full bg-[#635B56] text-white pt-20 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-4 flex flex-col items-start md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-6">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Atêlie Andressa Nicolau"
                  className="h-40 md:h-48 w-auto mb-4 object-contain"
                />
              ) : (
                <img
                  src={logoImg}
                  alt="Atêlie Andressa Nicolau"
                  className="h-40 md:h-48 w-auto mb-4 object-contain"
                />
              )}
            </div>
            <p className="text-white/60 font-light text-xs max-w-[250px] mb-8 leading-relaxed">
              Sabores transformados em doces memoráveis.
            </p>{' '}
            <div className="flex gap-4 opacity-80">
              <a
                href="https://www.instagram.com/atelieandressanicolau/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/atelieandressanicolau"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://br.pinterest.com/atelieandressanicolau"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.198 0 7.451 2.989 7.451 6.971 0 4.153-2.64 7.506-6.305 7.506-1.221 0-2.37-.635-2.763-1.385l-.753 2.873c-.272 1.042-1.01 2.345-1.503 3.141 1.16.353 2.406.544 3.693.544 6.621 0 11.987-5.367 11.987-11.987C24.004 5.367 18.638 0 12.017 0z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white text-[10px] tracking-widest uppercase mb-8">
              Atendimento
            </h4>
            <ul className="space-y-6 text-white/70 font-light text-xs">
              <li className="flex items-start gap-4">
                <Clock className="w-4 h-4 opacity-50 shrink-0" />
                <span>
                  Segunda a Sexta das 9hs às 18hs, Sábados das 8hs às 12hs
                </span>
              </li>
              <li className="flex items-center gap-4">
                <a
                  href={WHATSAPP_BASE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 opacity-50 shrink-0" />
                  <span>{WHATSAPP_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 opacity-50 shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-4 h-4 opacity-50 shrink-0" />
                <span>São Paulo - SP</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white text-[10px] tracking-widest uppercase mb-8">
              Receba Novidades
            </h4>
            <p className="text-white/70 font-light text-xs mb-6">
              Cadastre-se e receba em primeira mão novidades, sabores e
              promoções exclusivas.
            </p>
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs px-4 py-3 flex-1 outline-none focus:border-white/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-[#c79695] text-white px-4 py-3 hover:bg-[#b58382] transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-[10px] uppercase tracking-wider font-light">
          <p>© 2024 Atêlie Andressa Nicolau. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link
              to="/politica-de-privacidade"
              className="hover:text-white/80 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/termos-de-uso"
              className="hover:text-white/80 transition-colors"
            >
              Termos de Uso
            </Link>
            <Link to="/login" className="hover:text-white/80 transition-colors">
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

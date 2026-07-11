import { useState, useEffect, useCallback } from 'react'
import {
  getAllSettings,
  updateSetting,
  createSetting,
  getSettingImageUrl,
  type SiteSetting,
} from '@/services/site-settings'
import { useRealtime } from '@/hooks/use-realtime'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  ImageSettingCard,
  TextSettingCard,
} from '@/components/admin/SettingCard'

const DEFAULT_ABOUT_TEXT =
  'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null)
  const [aboutText, setAboutText] = useState(DEFAULT_ABOUT_TEXT)
  const [contactEmail, setContactEmail] = useState(
    'chefandressanicolau@gmail.com',
  )
  const [savingLogo, setSavingLogo] = useState(false)
  const [savingHero, setSavingHero] = useState(false)
  const [savingAboutImage, setSavingAboutImage] = useState(false)
  const [savingAboutText, setSavingAboutText] = useState(false)
  const [savingEmail, setSavingEmail] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await getAllSettings()
      setSettings(data)
      const aboutTextSetting = data.find((s) => s.key === 'about_text')
      if (aboutTextSetting?.content_text)
        setAboutText(aboutTextSetting.content_text)
      const emailSetting = data.find((s) => s.key === 'contact_email')
      if (emailSetting?.content_text) setContactEmail(emailSetting.content_text)
    } catch {
      toast.error('Erro ao carregar configurações.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useRealtime('site_settings', () => {
    load()
  })

  const findByKey = (key: string) => settings.find((s) => s.key === key)
  const logoSetting = findByKey('logo')
  const heroSetting = findByKey('hero_image')
  const aboutImageSetting = findByKey('about_image')
  const aboutTextSetting = findByKey('about_text')
  const emailSetting = findByKey('contact_email')

  const logoUrl = logoSetting ? getSettingImageUrl(logoSetting) : null
  const heroImageUrl = heroSetting ? getSettingImageUrl(heroSetting) : null
  const aboutImageUrl = aboutImageSetting
    ? getSettingImageUrl(aboutImageSetting)
    : null

  const handleSaveImage = async (
    setting: SiteSetting | undefined,
    key: string,
    file: File | null,
    setSaving: (v: boolean) => void,
    setFile: (v: File | null) => void,
    label: string,
  ) => {
    if (!file) return
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('content_image', file)
      if (setting) {
        await updateSetting(setting.id, formData)
      } else {
        formData.append('key', key)
        await createSetting(formData)
      }
      toast.success(`${label} atualizada com sucesso!`)
      setFile(null)
    } catch {
      toast.error(`Erro ao atualizar ${label.toLowerCase()}.`)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveText = async (
    setting: SiteSetting | undefined,
    key: string,
    text: string,
    setSaving: (v: boolean) => void,
    label: string,
  ) => {
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('content_text', text)
      if (setting) {
        await updateSetting(setting.id, formData)
      } else {
        formData.append('key', key)
        await createSetting(formData)
      }
      toast.success(`${label} atualizado com sucesso!`)
    } catch {
      toast.error(`Erro ao atualizar ${label.toLowerCase()}.`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif">Configurações do Site</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie o conteúdo visual e textual das seções principais
        </p>
      </div>

      <ImageSettingCard
        title="Logo"
        description="Logo exibido no cabeçalho e rodapé do site"
        imageUrl={logoUrl}
        file={logoFile}
        onFileChange={setLogoFile}
        onSave={() =>
          handleSaveImage(
            logoSetting,
            'logo',
            logoFile,
            setSavingLogo,
            setLogoFile,
            'Logo',
          )
        }
        saving={savingLogo}
      />

      <ImageSettingCard
        title="Imagem do Hero"
        description="Imagem principal exibida no topo da página inicial"
        imageUrl={heroImageUrl}
        file={heroFile}
        onFileChange={setHeroFile}
        onSave={() =>
          handleSaveImage(
            heroSetting,
            'hero_image',
            heroFile,
            setSavingHero,
            setHeroFile,
            'Imagem do hero',
          )
        }
        saving={savingHero}
      />

      <ImageSettingCard
        title="Imagem da Seção Sobre"
        description="Imagem exibida na seção Sobre"
        imageUrl={aboutImageUrl}
        file={aboutImageFile}
        onFileChange={setAboutImageFile}
        onSave={() =>
          handleSaveImage(
            aboutImageSetting,
            'about_image',
            aboutImageFile,
            setSavingAboutImage,
            setAboutImageFile,
            'Imagem da seção sobre',
          )
        }
        saving={savingAboutImage}
      />

      <TextSettingCard
        title="Texto da Seção Sobre"
        description="Biografia exibida na seção Sobre"
        value={aboutText}
        onChange={setAboutText}
        onSave={() =>
          handleSaveText(
            aboutTextSetting,
            'about_text',
            aboutText,
            setSavingAboutText,
            'Texto da seção sobre',
          )
        }
        saving={savingAboutText}
        multiline
      />

      <TextSettingCard
        title="E-mail de Contato"
        description="E-mail exibido no rodapé do site"
        value={contactEmail}
        onChange={setContactEmail}
        onSave={() =>
          handleSaveText(
            emailSetting,
            'contact_email',
            contactEmail,
            setSavingEmail,
            'E-mail de contato',
          )
        }
        saving={savingEmail}
        type="email"
        placeholder="contato@email.com"
      />
    </div>
  )
}

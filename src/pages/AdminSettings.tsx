import { useState, useEffect, useCallback } from 'react'
import {
  getAllSettings,
  updateSetting,
  getSettingImageUrl,
  type SiteSetting,
} from '@/services/site-settings'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Upload, Save, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

const DEFAULT_HERO_IMAGE =
  'https://img.usecurling.com/p/800/1000?q=elegant%20wedding%20cake&color=pink'
const DEFAULT_ABOUT_IMAGE =
  'https://img.usecurling.com/p/800/1000?q=pastry%20chef%20decorating%20cake&color=pink'

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [aboutFile, setAboutFile] = useState<File | null>(null)
  const [aboutText, setAboutText] = useState('')
  const [savingHero, setSavingHero] = useState(false)
  const [savingAbout, setSavingAbout] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await getAllSettings()
      setSettings(data)
      const about = data.find((s) => s.key === 'about_section')
      if (about) setAboutText(about.content_text || '')
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

  const heroSetting = settings.find((s) => s.key === 'hero_section')
  const aboutSetting = settings.find((s) => s.key === 'about_section')

  const heroImageUrl = heroSetting
    ? getSettingImageUrl(heroSetting) || DEFAULT_HERO_IMAGE
    : DEFAULT_HERO_IMAGE

  const aboutImageUrl = aboutSetting
    ? getSettingImageUrl(aboutSetting) || DEFAULT_ABOUT_IMAGE
    : DEFAULT_ABOUT_IMAGE

  const handleSaveHero = async () => {
    if (!heroSetting || !heroFile) return
    setSavingHero(true)
    try {
      const formData = new FormData()
      formData.append('content_image', heroFile)
      await updateSetting(heroSetting.id, formData)
      toast.success('Imagem do hero atualizada com sucesso!')
      setHeroFile(null)
    } catch {
      toast.error('Erro ao atualizar imagem.')
    } finally {
      setSavingHero(false)
    }
  }

  const handleSaveAbout = async () => {
    if (!aboutSetting) return
    setSavingAbout(true)
    try {
      const formData = new FormData()
      formData.append('content_text', aboutText)
      if (aboutFile) formData.append('content_image', aboutFile)
      await updateSetting(aboutSetting.id, formData)
      toast.success('Conteúdo da seção Sobre atualizado com sucesso!')
      setAboutFile(null)
    } catch {
      toast.error('Erro ao atualizar conteúdo.')
    } finally {
      setSavingAbout(false)
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

      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-serif">Seção Hero</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Imagem principal exibida no topo da página inicial
        </p>
        <div className="w-full max-w-sm rounded-xl overflow-hidden border">
          <img
            src={heroImageUrl}
            alt="Hero"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-image">Nova imagem</Label>
          <Input
            id="hero-image"
            type="file"
            accept="image/*"
            onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
          />
          {heroFile && (
            <p className="text-xs text-muted-foreground">
              Novo arquivo: {heroFile.name}
            </p>
          )}
        </div>
        <Button onClick={handleSaveHero} disabled={!heroFile || savingHero}>
          {savingHero ? (
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
          ) : (
            <Upload className="w-4 h-4 mr-1" />
          )}
          {savingHero ? 'Salvando...' : 'Atualizar imagem'}
        </Button>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-serif">Seção Sobre</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Imagem e texto da biografia exibidos na seção "Sobre"
        </p>
        <div className="w-full max-w-sm rounded-xl overflow-hidden border">
          <img
            src={aboutImageUrl}
            alt="Sobre"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-image">Nova imagem</Label>
          <Input
            id="about-image"
            type="file"
            accept="image/*"
            onChange={(e) => setAboutFile(e.target.files?.[0] || null)}
          />
          {aboutFile && (
            <p className="text-xs text-muted-foreground">
              Novo arquivo: {aboutFile.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-text">Texto da biografia</Label>
          <Textarea
            id="about-text"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={8}
            className="resize-y"
          />
        </div>
        <Button onClick={handleSaveAbout} disabled={savingAbout}>
          {savingAbout ? (
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
          ) : (
            <Save className="w-4 h-4 mr-1" />
          )}
          {savingAbout ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </div>
    </div>
  )
}

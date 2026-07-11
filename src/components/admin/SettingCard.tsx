import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Upload, Save, ImageIcon } from 'lucide-react'

interface ImageSettingCardProps {
  title: string
  description: string
  imageUrl: string | null
  file: File | null
  onFileChange: (file: File | null) => void
  onSave: () => void
  saving: boolean
}

export function ImageSettingCard({
  title,
  description,
  imageUrl,
  file,
  onFileChange,
  onSave,
  saving,
}: ImageSettingCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-serif">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {imageUrl && (
        <div className="w-full max-w-sm rounded-xl overflow-hidden border">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label>Nova imagem</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
        {file && (
          <p className="text-xs text-muted-foreground">
            Novo arquivo: {file.name}
          </p>
        )}
      </div>
      <Button onClick={onSave} disabled={!file || saving}>
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Upload className="w-4 h-4 mr-1" />
        )}
        {saving ? 'Salvando...' : 'Atualizar imagem'}
      </Button>
    </div>
  )
}

interface TextSettingCardProps {
  title: string
  description: string
  value: string
  onChange: (value: string) => void
  onSave: () => void
  saving: boolean
  multiline?: boolean
  type?: string
  placeholder?: string
}

export function TextSettingCard({
  title,
  description,
  value,
  onChange,
  onSave,
  saving,
  multiline,
  type = 'text',
  placeholder,
}: TextSettingCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-serif">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="space-y-2">
        <Label>Conteúdo</Label>
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={8}
            className="resize-y"
          />
        ) : (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
      <Button onClick={onSave} disabled={saving}>
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Save className="w-4 h-4 mr-1" />
        )}
        {saving ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </div>
  )
}

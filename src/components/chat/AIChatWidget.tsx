import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import pb from '@/lib/pocketbase/client'
import { streamAgentChat, type DisplayMessage } from '@/lib/skipAi'

const renderInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={idx}>{part}</span>
  })
}

const renderMessageContent = (content: string) => {
  const lines = content.split('\n')
  const result: React.ReactNode[] = []
  let currentList: {
    type: 'ul' | 'ol'
    items: { val?: number; text: string }[]
  } | null = null
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      result.push(
        <p key={`p-${result.length}`} className="mb-2 last:mb-0">
          {currentParagraph.map((line, i) => (
            <span key={i}>
              {renderInline(line)}
              {i < currentParagraph.length - 1 && <br />}
            </span>
          ))}
        </p>,
      )
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        result.push(
          <ul
            key={`ul-${result.length}`}
            className="list-disc ml-5 mb-2 space-y-1"
          >
            {currentList.items.map((item, i) => (
              <li key={i}>{renderInline(item.text)}</li>
            ))}
          </ul>,
        )
      } else {
        result.push(
          <ol
            key={`ol-${result.length}`}
            className="list-decimal ml-5 mb-2 space-y-1"
          >
            {currentList.items.map((item, i) => (
              <li key={i} value={item.val}>
                {renderInline(item.text)}
              </li>
            ))}
          </ol>,
        )
      }
      currentList = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim() === '') {
      flushParagraph()
      flushList()
      continue
    }

    const ulMatch = line.match(/^(\s*)\*\s+(.*)/)
    if (ulMatch) {
      flushParagraph()
      if (!currentList || currentList.type !== 'ul') {
        flushList()
        currentList = { type: 'ul', items: [] }
      }
      currentList.items.push({ text: ulMatch[2] })
      continue
    }

    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/)
    if (olMatch) {
      flushParagraph()
      if (!currentList || currentList.type !== 'ol') {
        flushList()
        currentList = { type: 'ol', items: [] }
      }
      currentList.items.push({
        val: parseInt(olMatch[2], 10),
        text: olMatch[3],
      })
      continue
    }

    flushList()
    currentParagraph.push(line)
  }

  flushParagraph()
  flushList()

  return <div className="space-y-1">{result}</div>
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener('open-ai-chat', handleOpenChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenChat)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: DisplayMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      created: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    abortControllerRef.current = new AbortController()

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (pb.authStore.token) {
        headers['Authorization'] = pb.authStore.token
      }

      const res = await fetch(
        `${import.meta.env.VITE_POCKETBASE_URL}/backend/v1/chat/atelie`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: userMsg.content,
            conversation_id: conversationId,
          }),
          signal: abortControllerRef.current.signal,
        },
      )

      const assistantMsgId = (Date.now() + 1).toString()
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: '',
          created: new Date().toISOString(),
        },
      ])

      const result = await streamAgentChat(res, {
        onChunk: (_, full) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: full } : m,
            ),
          )
        },
        signal: abortControllerRef.current.signal,
      })

      if (!conversationId) setConversationId(result.conversation_id)

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: result.content,
                id: result.message_id,
                citations: result.citations,
              }
            : m,
        ),
      )
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.',
            created: new Date().toISOString(),
          },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppHandoff = () => {
    let summary =
      'Olá Andressa! Estava conversando com a sua assistente virtual e gostaria de dar continuidade ao meu orçamento.\n\n*Resumo da conversa:*\n'

    const recentMsgs = messages.slice(-4)
    recentMsgs.forEach((m) => {
      const role = m.role === 'user' ? 'Eu' : 'Assistente'
      summary += `_${role}:_ ${m.content}\n`
    })

    const text = encodeURIComponent(summary)
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank')
  }

  return (
    <div className="fixed bottom-28 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-[#d8b4a0]/30 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
          <div className="bg-[#d8b4a0] p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-serif font-medium leading-none">
                  Assistente Andressa
                </h3>
                <p className="text-xs text-white/80 mt-1">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#c9a38f] rounded-full h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4 bg-[#faf8f5]">
            <div className="space-y-4" ref={scrollRef}>
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#d8b4a0] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#d8b4a0]/20 p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm text-gray-700 leading-relaxed">
                  {renderMessageContent(
                    'Olá! Sou a assistente virtual do Ateliê Andressa Nicolau. Como posso te ajudar a criar memórias deliciosas hoje?',
                  )}
                </div>
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex items-start space-x-2',
                    m.role === 'user' ? 'flex-row-reverse space-x-reverse' : '',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm',
                      m.role === 'user' ? 'bg-gray-800' : 'bg-[#d8b4a0]',
                    )}
                  >
                    {m.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'p-3 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed',
                      m.role === 'user'
                        ? 'bg-gray-800 text-white rounded-tr-sm'
                        : 'bg-white border border-[#d8b4a0]/20 text-gray-700 rounded-tl-sm',
                    )}
                  >
                    {m.role === 'user'
                      ? m.content
                      : renderMessageContent(m.content)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-[#d8b4a0] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-[#d8b4a0]/20 p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm text-gray-500">
                    Digitando...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 bg-white border-t border-[#d8b4a0]/20">
            <Button
              onClick={handleWhatsAppHandoff}
              variant="outline"
              className="w-full mb-3 text-[#25D366] border-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl h-10 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Button>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-full border-[#d8b4a0]/30 focus-visible:ring-[#d8b4a0] shadow-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-[#d8b4a0] hover:bg-[#c9a38f] text-white shrink-0 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#d8b4a0] hover:bg-[#c9a38f] text-white shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-4 border-white"
        aria-label="Abrir chat com a Assistente"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </Button>
    </div>
  )
}

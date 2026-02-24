'use client'

import { useState } from 'react'

const socialNetworks = [
  { id: 'telegram', name: 'Telegram', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.192-.054-.3-.297-.108l-5.965 3.759-2.568-.802c-.56-.176-.572-.56.116-.828l10.024-3.869c.466-.174.875.106.723.827z"/>
    </svg>
  )},
  { id: 'whatsapp', name: 'WhatsApp', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.59 0-6.507-2.918-6.507-6.507 0-1.743.683-3.332 1.798-4.514l-.965-2.81 2.91.935A6.46 6.46 0 0112 5.51c3.59 0 6.508 2.917 6.508 6.507s-2.918 6.508-6.508 6.508h-.001zm3.63-4.81c-.198-.112-1.167-.576-1.347-.64-.18-.066-.31-.098-.44.098-.13.197-.506.64-.62.771-.115.13-.23.147-.428.05-.198-.1-.835-.308-1.59-.982-.588-.523-.985-1.17-1.1-1.368-.115-.197-.012-.304.086-.402.089-.09.197-.23.296-.347.1-.115.13-.197.197-.328.065-.13.033-.246-.016-.345-.05-.1-.44-1.062-.604-1.453-.158-.378-.32-.327-.44-.333-.114-.006-.246-.008-.377-.008-.13 0-.345.05-.526.246-.18.197-.69.675-.69 1.645 0 .97.707 1.906.805 2.037.1.13 1.39 2.123 3.37 2.976.47.203.838.324 1.124.414.472.15.9.13 1.24.08.378-.057 1.167-.477 1.33-.938.165-.46.165-.853.116-.938-.05-.08-.18-.13-.378-.23z"/>
    </svg>
  )},
  { id: 'instagram', name: 'Instagram', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )},
  { id: 'linkedin', name: 'LinkedIn', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )},
  { id: 'twitter', name: 'Twitter', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
]

export function ContactButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Спасибо за сообщение! Я свяжусь с вами.')
    setIsExpanded(false)
    setShowForm(false)
    setFormData({ name: '', contact: '', message: '' })
  }

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Panel */}
      {isExpanded && (
        <div 
          className="absolute bottom-0 right-0 bg-bg-secondary border border-border-subtle overflow-hidden"
          style={{
            width: '320px',
            animation: 'expandFromButton 0.3s ease-out'
          }}
        >
          {!showForm ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-border-subtle">
                <span className="font-pixel text-xs text-text-primary uppercase">Связаться</span>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-text-tertiary hover:text-text-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-xs text-text-secondary mb-3 font-vt323">Быстрые соцсети:</p>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {socialNetworks.map((social) => (
                  <button
                    key={social.id}
                    onClick={() => handleSocialClick(`https://${social.id}.com`)}
                    className="p-2 border border-border-subtle hover:border-text-primary hover:bg-bg-tertiary transition-colors flex flex-col items-center gap-1"
                    title={social.name}
                  >
                    <span className="text-text-secondary hover:text-text-primary">{social.icon}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-border-subtle pt-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2 border border-border-subtle text-text-secondary hover:border-text-primary hover:text-text-primary transition-colors font-vt323 text-sm"
                >
                  Или написать сообщение
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-border-subtle">
                <span className="font-pixel text-xs text-text-primary uppercase">Сообщение</span>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-text-tertiary hover:text-text-primary"
                >
                  ←
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-text-tertiary mb-1 font-vt323">Имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm font-vt323 focus:border-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-tertiary mb-1 font-vt323">Телефон / Email / @ник</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm font-vt323 focus:border-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-tertiary mb-1 font-vt323">Сообщение</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm font-vt323 focus:border-text-primary outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2 border border-border-subtle text-text-tertiary hover:text-text-primary font-vt323 text-sm"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-text-primary text-bg-primary font-vt323 text-sm hover:bg-text-secondary"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Main Button - Square, Pixel Art Style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-14 h-14 bg-text-primary text-bg-primary 
          flex items-center justify-center
          border-4 border-bg-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]
          hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]
          hover:translate-x-[2px] hover:translate-y-[2px]
          transition-all duration-100
          ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          style={{ imageRendering: 'pixelated' }}
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          <circle cx="12" cy="9" r="1.5"/>
          <circle cx="7" cy="9" r="1.5"/>
          <circle cx="17" cy="9" r="1.5"/>
        </svg>
      </button>

      <style jsx>{`
        @keyframes expandFromButton {
          from {
            opacity: 0;
            transform: scale(0.8);
            transform-origin: bottom right;
          }
          to {
            opacity: 1;
            transform: scale(1);
            transform-origin: bottom right;
          }
        }
      `}</style>
    </div>
  )
}

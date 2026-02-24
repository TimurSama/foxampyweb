'use client'

import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const socialNetworks = [
  { id: 'telegram', name: 'Telegram', icon: '✈️' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'instagram', name: 'Instagram', icon: '📷' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'twitter', name: 'Twitter', icon: '🐦' },
]

export function ContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    socialUsername: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the actual submission logic
    console.log('Form submitted:', formData)
    alert('Спасибо! Я свяжусь с вами в ближайшее время.')
    setIsOpen(false)
    setShowForm(false)
    setFormData({ name: '', phone: '', email: '', message: '', socialUsername: '' })
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-text-primary text-bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setIsOpen(false)
            setShowForm(false)
            setSelectedSocial(null)
          }}
        >
          <div 
            className="bg-bg-secondary border border-border-subtle w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-border-subtle flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary">
                {showForm ? 'Написать сообщение' : 'Связаться со мной'}
              </h3>
              <button 
                onClick={() => {
                  setIsOpen(false)
                  setShowForm(false)
                  setSelectedSocial(null)
                }}
                className="text-text-tertiary hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            {!showForm ? (
              <div className="p-6">
                {/* Quick Social Links */}
                <p className="text-sm text-text-secondary mb-4">Быстрые соцсети:</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {socialNetworks.map(social => (
                    <a
                      key={social.id}
                      href="#"
                      className="flex flex-col items-center p-3 border border-border-subtle hover:border-border-hover hover:bg-bg-tertiary transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedSocial(social.id)
                        setShowForm(true)
                      }}
                    >
                      <span className="text-2xl mb-1">{social.icon}</span>
                      <span className="text-xs text-text-secondary">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border-subtle" />
                  <span className="text-xs text-text-tertiary">или</span>
                  <div className="flex-1 h-px bg-border-subtle" />
                </div>

                {/* Form Button */}
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 bg-text-primary text-bg-primary font-medium hover:bg-text-secondary transition-colors"
                >
                  Заполнить форму
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {selectedSocial && (
                  <div className="p-3 bg-bg-tertiary border border-border-subtle mb-4">
                    <p className="text-xs text-text-secondary mb-2">Выбрана соцсеть:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {socialNetworks.find(s => s.id === selectedSocial)?.icon}
                      </span>
                      <span className="text-sm text-text-primary">
                        {socialNetworks.find(s => s.id === selectedSocial)?.name}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Ваш никнейм или ссылка на профиль"
                      value={formData.socialUsername}
                      onChange={e => setFormData({...formData, socialUsername: e.target.value})}
                      className="w-full mt-2 px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm focus:border-border-hover outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-text-secondary mb-1">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm focus:border-border-hover outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-1">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm focus:border-border-hover outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm focus:border-border-hover outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-1">Сообщение / Вопрос</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary text-sm focus:border-border-hover outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setSelectedSocial(null)
                    }}
                    className="flex-1 py-2 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-text-primary text-bg-primary font-medium hover:bg-text-secondary transition-colors"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { useEffect } from 'react'

const imStatus = '1' // 1 for WhatsApp, 2 for Telegram
const whatsappNumber = '13042394829'
const telegramUser = 'scripted'
const activeLiveChat = 'smartsupp'

function appendExternalScript(src: string) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.head.appendChild(script)
  return script
}

function appendInlineScript(code: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.textContent = code
  document.head.appendChild(script)
  return script
}

function createChatButton(href: string, label: string, background: string) {
  const button = document.createElement('a')
  button.href = href
  button.target = '_blank'
  button.rel = 'noopener noreferrer'
  button.textContent = label
  button.style.position = 'fixed'
  button.style.left = '10px'
  button.style.bottom = '10px'
  button.style.backgroundColor = background
  button.style.color = '#ffffff'
  button.style.padding = '12px 16px'
  button.style.borderRadius = '999px'
  button.style.textDecoration = 'none'
  button.style.fontWeight = '600'
  button.style.zIndex = '9999'
  button.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.18)'
  document.body.appendChild(button)
  return button
}

export default function CustomerChat() {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = []
    let chatButton: HTMLAnchorElement | null = null

    if (imStatus === '1') {
      chatButton = createChatButton(
        `https://wa.me/${whatsappNumber}`,
        'Chat with us on WhatsApp',
        '#25d366'
      )
    } else if (imStatus === '2') {
      chatButton = createChatButton(
        `https://t.me/${telegramUser}`,
        'Chat with us on Telegram',
        '#0088cc'
      )
    }

    switch (activeLiveChat) {
      case 'crisp':
        scripts.push(
          appendInlineScript(
            'window.$crisp=[];window.CRISP_WEBSITE_ID="keyxx";(function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();'
          )
        )
        break
      case 'smartsupp':
        scripts.push(
          appendInlineScript(
            'window._smartsupp = window._smartsupp || {}; window._smartsupp.key = "8ac5a820b21473729ac0aadfa1685fa4e73e7441";'
          )
        )
        scripts.push(appendExternalScript('https://www.smartsuppchat.com/loader.js'))
        break
      case 'tidio':
        scripts.push(appendExternalScript('//code.tidio.co/keyxx.js'))
        break
      case 'chatify':
        scripts.push(
          appendInlineScript(
            '!function(){var e=document.createElement("script"),t=document.head||document.getElementsByTagName("head")[0];e.src="https://pubble.io/js/app.js";e.async=!0;e.onload=function(){Pubble.init({app_id:keyxx});};t.appendChild(e);}();'
          )
        )
        break
      case 'jivochat':
        scripts.push(appendExternalScript('//code.jivosite.com/script/widget/keyxx'))
        break
      default:
        break
    }

    return () => {
      if (chatButton?.parentNode) {
        chatButton.parentNode.removeChild(chatButton)
      }
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  return null
}

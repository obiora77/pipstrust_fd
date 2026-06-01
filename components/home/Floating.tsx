"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function Floating() {
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [country, setCountry] = useState('')
  const [amount, setAmount] = useState<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const names = ["Tony","Alex","Emily","Chris","Sophia","Michael","Olivia","William","Ava","James","Grace","Daniel","Emma","Joseph","Mia","David","Ella","Andrew","Amelia","Benjamin","Sophie","Samuel","Lily","Matthew","Chloe","Christopher","Zoe","John","Aiden","Natalie","Jackson","Abigail","Nicholas","Charlotte","Ethan","Madison","Liam","Ryan","Nathan","Avery","Gabriel","Hannah","Dylan","Evelyn","Caleb","Scarlett"]
    const countries = ["USA","Canada","UK","Australia","Germany","France","Italy","Spain","Japan","Brazil","Mexico","Argentina","Russia","South Korea","Turkey","South Africa","Nigeria","Egypt","Kenya","Saudi Arabia","Thailand","Vietnam","Indonesia","Malaysia","Singapore","New Zealand","Sweden","Norway","Denmark","Finland","Netherlands","Belgium","Switzerland","Austria","Greece","Portugal","Ireland","Poland","Hungary","Romania","Bulgaria","Croatia","Serbia","Slovakia","Slovenia"]

    function generateRandomName() {
      return names[Math.floor(Math.random() * names.length)]
    }

    function generateRandomCountry() {
      return countries[Math.floor(Math.random() * countries.length)]
    }

    function generateRandomAmount() {
      return Math.floor(Math.random() * 144000) + 40000
    }

    let mounted = true

    function displayPopup() {
      if (!mounted) return
      setUsername(generateRandomName())
      setCountry(generateRandomCountry())
      setAmount(generateRandomAmount())
      setVisible(true)

      // hide after 5s then schedule next after 2s
      timeoutRef.current = window.setTimeout(() => {
        setVisible(false)
        timeoutRef.current = window.setTimeout(() => {
          displayPopup()
        }, 2000)
      }, 5000)
    }

    displayPopup()

    return () => {
      mounted = false
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    // expose callback and settings for external translate widget
    ;(window as any).gtranslateSettings = { default_language: 'en', wrapper_selector: '.gtranslate_wrapper', flag_style: '3d' }

    ;(window as any).googleTranslateElementInit = function () {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element')
      } catch (e) {
        // ignore if google script not loaded yet or blocked
      }
    }

    // generic function to change language by value (used by external controls)
    ;(window as any).changeLanguageByValue = function (language: string) {
      const selectField = document.querySelector<HTMLSelectElement>('#google_translate_element select')
      if (!selectField) return
      for (let i = 0; i < selectField.children.length; i++) {
        const option = selectField.children[i] as HTMLOptionElement
        if (option.value === language) {
          selectField.selectedIndex = i
          selectField.dispatchEvent(new Event('change'))
          break
        }
      }
    }

    const s1 = document.createElement('script')
    s1.src = 'https://translate.google.com/translate_a/elementa0d8a0d8.html?cb=googleTranslateElementInit'
    s1.async = true
    document.body.appendChild(s1)

    const s2 = document.createElement('script')
    s2.src = 'https://cdn.gtranslate.net/widgets/latest/float.js'
    s2.defer = true
    document.body.appendChild(s2)

    return () => {
      if (s1.parentNode) s1.parentNode.removeChild(s1)
      if (s2.parentNode) s2.parentNode.removeChild(s2)
    }
  }, [])

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <div className="gtranslate_wrapper" />

      <div
        id="custom-popupContainer"
        aria-hidden={!visible}
        style={{
          display: visible ? 'flex' : 'none',
          position: 'fixed',
          top: '50%',
          left: 24,
          transform: 'translateY(-50%)',
          zIndex: 9999,
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.95)',
          color: '#0f172a',
          borderRadius: 12,
          boxShadow: '0 6px 24px rgba(2,6,23,0.16)',
        }}
      >
        <div style={{ fontWeight: 700, minWidth: 72 }} id="popup-username">
          {username}
        </div>
        <div style={{ opacity: 0.8 }} id="popup-country">
          {country}
        </div>
        <div style={{ fontWeight: 700 }} id="popup-amount">
          {amount ? `$${amount.toLocaleString()}` : ''}
        </div>
      </div>
    </>
  )
}

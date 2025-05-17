'use client'

import { Header } from '@vibe-samurai/visual-ui-kit'

import s from './MainHeader.module.scss'

export const MainHeader = () => {
  const handleLocaleChange = (lang: 'ru' | 'en') => {
    console.log(lang)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.headerContent}>
        <Header locale={'en'} onLocaleChange={handleLocaleChange} isAuth />
      </div>
    </div>
  )
}

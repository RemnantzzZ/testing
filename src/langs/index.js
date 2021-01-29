import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import zh_CN from './zh-CN'
import zh_TW from './zh-TW'
import en_US from './en-US'

const locales = {
  'zh-CN': zh_CN,
  'zh-TW': zh_TW,
  'en-US': en_US
}

const i18n = new VueI18n({
  locale: store.state.app.lang,
  fallbackLocale: 'zh-CN',
  messages: locales
})

export default i18n

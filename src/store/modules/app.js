const state = {
  lang: 'zh-CN',
  userInfo: null, //当前用户信息，包括用户名、token等
  userName: 'caxa', //当前用户名
  isRememberUsername: false, //是否记住用户名
  domains: []
}

const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_USER_NAME: (state, name) => {
    state.userName = name
  },
  SET_IS_REMEMBER_USERNAME: (state, isRememberUsername) => {
    state.isRememberUsername = isRememberUsername
  },
  SET_DOMAINS: (state, domains) => {
    state.domains = domains
  }
}

const actions = {
  setLang({ commit }, lang) {
    commit('SET_LANG', lang)
  },
  setUserInfo({ commit }, info) {
    commit('SET_USER_INFO', info)
  },
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setDomains({ commit }, domains) {
    commit('SET_DOMAINS', domains)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
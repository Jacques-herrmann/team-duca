import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      isTransitionVisible: false,
      isMobile: false,
      scroll: null
    }
  },
  actions: {
    setScroll(scroll) {
      this.scroll = scroll
    },
    setIsMobile(isMobile) {
      this.isMobile = isMobile
    },
    setTransition(transition) {
      this.isTransitionVisible = transition
    }
  },
})
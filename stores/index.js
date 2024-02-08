import {defineStore} from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      isLocalTransition: false,
      isTransitionVisible: false,
      isFullscreenVisible: false,
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
    },
    setLocalTransition(transition) {
      this.isLocalTransition = transition
    },
    setFullscreen(fullscreen) {
      this.isFullscreenVisible = fullscreen
    },
  },
})
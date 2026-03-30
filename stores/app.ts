import { defineStore } from 'pinia'

interface AppState {
  isMobile: boolean
  scroll: any | null
  isTransitionVisible: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isMobile: false,
    scroll: null,
    isTransitionVisible: false,
  }),
  actions: {
    setIsMobile(value: boolean) {
      this.isMobile = value
    },
    setScroll(scroll: any) {
      this.scroll = scroll
    },
    setTransition(value: boolean) {
      this.isTransitionVisible = value
    },
  },
})

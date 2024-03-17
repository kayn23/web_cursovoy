import { defineStore } from 'pinia'
export const useAuthStore = defineStore(
  'auth store',
  () => {
    const token = ref<string | null>(null)
    const isLogin = computed(() => token.value !== null)
    function signOut() {
      return new Promise((resolve) => {
        token.value = null
        resolve(true)
      })
    }

    return {
      token,
      isLogin,
      signOut,
    }
  },
  {
    persist: true,
  },
)

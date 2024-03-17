import { useAuthStore } from '~/store/authStore'

export default defineNuxtRouteMiddleware((from, to) => {
  const authStore = useAuthStore()
  if (!authStore.isLogin) {
    return navigateTo('/auth')
  }
})

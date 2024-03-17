export function useInitStore() {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  return {
    userStore,
    authStore,
  }
}

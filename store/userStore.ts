import { defineStore } from 'pinia'
import type { IUser } from '~/types/user.type'
import { useAuthStore } from './authStore'

export var useUserStore = defineStore('user store', () => {
  const authStore = useAuthStore()
  const currentUser = ref<IUser | null>(null)
  async function getUserInfo() {
    if (!authStore.token) throw new Error('Not found token')
    const headers = new Headers()
    headers.append('authorization', authStore.token)
    const res = await $fetch<{ user: IUser }>('/api/users/getInfo', {
      headers,
    })
    currentUser.value = res.user
    return res.user
  }
  const isAdmin = computed(() => {
    if (!currentUser.value) return false
    return currentUser.value.role === 'admin'
  })
  return {
    isAdmin,
    currentUser,
    getUserInfo,
  }
})

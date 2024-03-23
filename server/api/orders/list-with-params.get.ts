import { useUserServerFind } from '~/composables/userServerFind'

export default eventHandler(async (event) => {
  const user = await useUserServerFind(event)
  if (user.role !== 'admin') return createError({ status: 403 })
  const query = getQuery(event)
  if (Object.keys(query).length === 0) return createError({ status: 403 })
})

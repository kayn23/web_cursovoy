<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
})
const { fetch } = useCustomFetch()
const route = useRoute()
const userId = computed(() => route.params.id)
const { data: user, status, error } = await fetch(`/api/users/${userId.value}`, { server: false })
watch(status, (val) => {
  if (status.value === 'error' && error.value?.statusCode === 403) {
    console.error(error.value)
    ElMessageBox({
      type: 'error',
      message: 'У вас недостаточно прав',
    }).finally(() => {
      navigateTo('/account')
    })
  }
})
const { data: orders } = await fetch(`/api/orders?user_id=${userId.value}`, { server: false })
</script>
<template>
  <div>
    <div v-if="user">
      <invoices-person-card :user="user.user" />
    </div>
    <pre>
      <hr />
      {{orders}}
    </pre>
  </div>
</template>
<style lang="sass"></style>

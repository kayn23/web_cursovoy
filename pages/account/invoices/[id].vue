<script lang="ts" setup>
import type { IOrderDetailed } from '~/types/orders.type'
import type { IWaypointsListItem } from '~/types/waypoint.type'

definePageMeta({
  layout: 'account',
  middleware: ['is-login'],
  name: 'order show',
})
const { params } = useRoute()
const id = params.id
const { fetch } = useCustomFetch()
const { data, status, error } = await fetch<{ order: IOrderDetailed }>('/api/orders/' + id, {
  server: false,
})
watch(status, (val) => {
  if (val === 'error' && error.value?.statusCode === 403) {
    ElMessageBox({
      type: 'error',
      message: 'У вас надостаточно прав',
    }).finally(() => {
      navigateTo('/account')
    })
  }
})

const { data: waypointsData } = await fetch<{ waypoints: IWaypointsListItem[] }>(`/api/orders/${id}/waypoints`, {
  server: false,
})
</script>
<template>
  <div class="p-4">
    <div v-if="data">
      <h1 class="ext-4xl border-b-2 dark:border-b-nord-6 mb-4">Заказ: №{{ data.order.id }}</h1>
      <div class="flex justify-between">
        <div class="flex mb-4 mr-2 justify-between w-1/2 flex-col">
          <invoices-person-card
            type="recipient"
            class="mb-4"
            :user="data.order.recipient"
          />
          <invoices-end-point-cord
            :end-point="data.order.end_point"
            class="mb-4"
          />
        </div>
        <invoices-person-card
          type="sender"
          class="mr-4 w-1/2 h-full"
          :user="data.order.sender"
        />
      </div>
      <div
        v-if="waypointsData"
        class="pr-4"
      >
        <h3 class="text-3xl font-bold mb-4">Путевые точки</h3>
        <invoices-waypoint-card
          v-for="item in waypointsData.waypoints"
          :key="'w_' + item.id"
          :waypoint="item"
          class="mb-4"
        />
      </div>
    </div>
  </div>
</template>
<style lang="sass"></style>

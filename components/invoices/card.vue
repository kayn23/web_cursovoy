<script lang="ts" setup>
import type { IOrderPreview } from '~/type/orders.type'
interface IProps {
  order: IOrderPreview
}
const props = defineProps<IProps>()
const { order } = toRefs(props)
</script>
<template>
  <div class="flex justify-between items-center p-4 rounded-lg dark:border-nord-3 border">
    <p class="flex flex-col items-center">
      Id: <span>{{ order.id }}</span>
    </p>
    <p class="flex flex-col items-center">
      Получатель: <span>{{ order.recipient_name }}</span>
    </p>
    <p class="flex flex-col items-center">
      Отправитель: <span>{{ order.sender_name }}</span>
    </p>
    <p class="flex flex-col items-center">
      Конечный пункт: <span>{{ order.end_point_name }}</span>
    </p>
    <p class="flex flex-col items-center">
      Id груза: <span>{{ order.cargo_id }}</span>
    </p>
    <p class="flex flex-col items-center">
      Цена: <span>{{ order.price }}</span>
    </p>
    <NuxtLink
      :to="{ name: 'order show', params: { id: order.id } }"
      class="el-button el-button--primary"
    >
      Подробнее ->
    </NuxtLink>
  </div>
</template>
<style lang="sass"></style>

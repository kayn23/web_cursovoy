<script lang="ts" setup>
import type { IEndPoint } from '~/type/deliveryPoint'
interface IProps {
  endPoint: IEndPoint
}
const props = defineProps<IProps>()
const { endPoint } = toRefs(props)
</script>
<template>
  <div class="border rounded-lg p-4 w-full">
    <h2 class="text-3xl font-bold">Точка доставки</h2>
    <p class="text-xl"><span class="font-bold">Название:</span> {{ endPoint.name }}</p>
    <p class="text-xl"><span class="font-bold">Город:</span> {{ endPoint.city }}</p>
  </div>
</template>
<style lang="sass"></style>

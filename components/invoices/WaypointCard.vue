<script lang="ts" setup>
import type { IWaypointsListItem } from '~/types/waypoint.type'
interface IProps {
  waypoint: IWaypointsListItem
}
const props = defineProps<IProps>()
const { waypoint } = toRefs(props)
</script>
<template>
  <div
    class="border rounded-lg p-2 relative checkbox"
    :class="{ 'checkbox-done': waypoint.finished }"
  >
    <p class="text-lg"><span class="font-bold">Завершенный участок:</span> {{ waypoint.finished ? 'Да' : 'Нет' }}</p>
    <p class="text-lg"><span class="font-bold">Начальная точка:</span> {{ waypoint.start_point_name }}</p>
    <p class="text-lg"><span class="font-bold">Конечная точка:</span> {{ waypoint.end_point_name }}</p>
  </div>
</template>
<style lang="sass">
.checkbox-done::before
  content: '✓' !important
  background: colors.$nord-14 !important
.checkbox::before
  content: '×'
  position: absolute
  top: -15px
  right: -15px
  border-radius: 15px
  background: colors.$nord-11
  color: colors.$nord-1
  width: 30px
  height: 30px
  display: flex
  align-items: center
  justify-content: center
</style>

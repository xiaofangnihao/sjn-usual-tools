import { onMounted, onUnmounted, ref } from "vue"

export const useMove = () => {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.addEventListener('mousemove', update))

  return { x, y }
}
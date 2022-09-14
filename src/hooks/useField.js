import { computed, ref } from 'vue'

export const useField = (config, defaultConfig) => {
  const fieldConfig = computed(() => {
    return Object.assign(defaultConfig, config)
  })

  return {
    fieldConfig
  }
} 
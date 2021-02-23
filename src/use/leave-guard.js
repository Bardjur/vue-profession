import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue'

export function useLeaveGuard (hasChange) {
  const router = useRouter()
  const leave = ref(false)
  const canLeave = ref(false)
  const leaveTo = ref('')

  const navigate = () => {
    leave.value = false
    canLeave.value = true
    router.push(leaveTo.value)
  }

  onBeforeRouteLeave((to) => {
    leaveTo.value = to
    if (canLeave.value) {
      return true
    }
    if (hasChange.value) {
      leave.value = true
      return false
    }
    return true
  })

  return {
    navigate,
    leave
  }
}

export const useInfiniteScrolling = (
  element: Ref,
  args: () => void,
  options: IntersectionObserverInit,
) => {
  const observer = ref<IntersectionObserver>()
  const isIntersecting = ref<boolean>(false)

  watch(element, (val) => {
    if (val) {
      observer.value = new IntersectionObserver(([entry]) => {
        if (entry) isIntersecting.value = entry.isIntersecting
      }, options)
      observer.value.observe(val)
    }
  })

  watch(isIntersecting, (val) => {
    if (val) args()
  })

  onBeforeUnmount(() => observer.value?.disconnect())
}

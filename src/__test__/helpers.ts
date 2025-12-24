import { createApp } from 'vue'

export const withSetup = <T>(composable: () => T): T => {
  let result: T

  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })

  app.mount(document.createElement('div'))
  app.unmount()

  return result!
}

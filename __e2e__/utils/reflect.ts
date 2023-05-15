export const handlers = {
  forwardAllGetPropsToNothing: {
    get: function (target: any, prop: string) {
      if (prop in target) {
        return Reflect.get(target, prop)
      }

      if (prop === 'then') {
        return undefined // Not a thenable
      }

      return function (...args: any[]) {
        return Promise.resolve()
      }
    },
  },
}

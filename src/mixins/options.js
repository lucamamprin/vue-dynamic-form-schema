export default {
  props: {
    options: {
      type: Array,
      required: true,
      validator (opts) {
        return (
          opts.find(opt => {
            return !("label" in opt) || !("value" in opt)
          }) === undefined
        )
      },
    },
  },
}

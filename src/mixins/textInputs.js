export default {
  props: {
    floatedLabel: {
      type: Boolean,
      default: false,
    },
    showCharacterCount: {
      type: Boolean,
      default: true,
    },
    placeholderText: {
      type: String,
      default: " ",
    },
    minLength: {
      type: Number,
      default: null,
    },
    maxLength: {
      type: Number,
      default: null,
    },
  },
}
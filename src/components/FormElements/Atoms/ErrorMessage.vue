<template>
    <span
      v-html="errorMessage"
      :id="id"
      class="help m-0"
      :class="`${inlineClasses} ${positionClass} d-${display}`"
    >
    </span>
</template>

<script>
export default {
  computed: {
    positionClass () {
      return this.position.length ? `position-${this.position}` : ""
    },
    inlineClasses () {
      return this.inlineError ? "ml-1" : ""
    },
  },
  props: {
    errorMessage: String,
    id: {
      type: String,
      required: true,
    },
    // should the error be displayed with a left margin rather than a top margin?
    inlineError: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "",
    },
    display: {
      type: String,
      default: "inline-block",
    },
  },
}
</script>

<template>
  <div class="text-right text-light">
    <span
      :id="srCharacterCount"
      class="sr-only"
    >
      {{ `${typedText ? 0 : typedText.length} characters on ${maxLength} available for ${label}` }}
    </span>

    <p class="m-0">
      {{ typedText.length }} / {{ maxLength }}
    </p>
  </div>
</template>

<script>
export default {
  name: "MaxLength",
  props: {
    srCharacterCount: {
      type: String,
      required: true,
    },
    typedText: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

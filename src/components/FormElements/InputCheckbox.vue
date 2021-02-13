<template>
  <div class="position-relative">
    <div
      :class="{ 'mt-0': resetMarginTop, inverted: darkMode }"
      class="input checkbox is-focused"
    >
      <input
        :id="id"
        :ref="id"
        type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        :aria-describedby="describedBy"
        :class="{ missingBackground: hasError && error }"
        :aria-labelledby="`label-${id}`"
        :aria-required="required"
        :aria-invalid="invalid.toString()"
        v-on="{
          ...$listeners,
          change: (event) => $emit('input', event.target.checked),
        }"
      >

      <label
        :id="`label-${id}`"
        :for="id"
        :data-cy="name"
        :class="{ 'text-white': darkMode }"
      >
        <span class="d-block">
          {{ label }}
        </span>
      </label>

      <error-message
        v-if="hasError && error"
        :id="describedBy"
        :error-message="error"
      />
    </div>
  </div>
</template>

<script>
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputCheckbox",
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    describedBy: {
      type: String,
      required: true,
    },
    value: {
      type: null, // accept everything
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    resetMarginTop: Boolean,
    name: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

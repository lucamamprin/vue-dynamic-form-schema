<template>
  <div class="position-relative">
    <div :class="{'mt-0': resetMarginTop, 'inverted': darkMode}"
         class="input checkbox is-focused">
      <input
          type="checkbox"
          :id="id"
          :name="name"
          :value="value"
          :disabled="disabled"
          :aria-describedby="describedBy"
          v-on="{
               ...$listeners,
               change: event => $emit('input', event.target.checked)
             }"
          :class="{'missingBackground': hasError && error}"
          :aria-labelledby="`label-${id}`"
          :aria-required="required"
          :aria-invalid="invalid.toString()"
      >

      <label
          :for="id"
          :id="`label-${id}`"
          :data-cy="name"
          :class="{'text-white': darkMode}"
      >
        <span class="d-block"
              v-html="label">
        </span>
      </label>

      <error-message
          v-if="hasError && error"
          :id="describedBy"
          :error-message="error"
      >
      </error-message>
    </div>
  </div>
</template>

<script>
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputCheckbox",
  inheritAttrs: false,
  components: {
    ErrorMessage,
  },
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
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    min: {
      type: null,
      default: 0,
    },
    max: {
      type: null,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
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

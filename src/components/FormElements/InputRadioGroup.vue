<template>
  <div
    v-if="options && name"
    class="input radio"
  >
    <fieldset
      :id="id"
      :name="fieldSetName"
      :aria-required="required.toString()"
      :aria-describedby="describedBy"
      role="radiogroup"
      class="p-0 m-0"
    >
      <legend class="d-flex align-items-center mb-5">
        <span
          v-if="label"
          :class="{'text-primary': !darkMode}"
          class="h6 d-inline-block"
          v-html="label"
        />

        <span v-if="hasError && errorMessage">
          <error-message
            :id="describedBy"
            position="static"
            :inline-error="true"
            class="text-nowrap"
            :error-message="error"
          />
        </span>
      </legend>

      <div
        v-for="(radio, idx) in options"
        :key="idx"
        class="radio-container-input"
      >
        <input
          :id="getId(idx)"
          type="radio"
          :name="name"
          :value="radio.value"
          :disabled="disabled"
          :aria-invalid="invalid.toString()"
          :aria-labelledby="getId(idx, true)"
          :class="{'missingBackground': hasError && error}"
          @change="$emit('input', radio)"
        >

        <label
          :id="getId(idx, true)"
          :for="getId(idx)"
          :class="{'radio-transparent radio-white text-white': darkMode}"
          v-html="radio.label"
        />
      </div>
    </fieldset>
  </div>
</template>

<script>
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputRadioGroup",
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    fieldSetName: {
      type: String,
      required: true,
    },
    errorCondition: Boolean,
    value: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    describedBy: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    // from base select
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
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
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
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
  methods: {
    getId (idx, isLabel = false) {
      const id = `${this.id}-${idx}`

      return isLabel ? `label-${id}` : id
    },
  },
}
</script>

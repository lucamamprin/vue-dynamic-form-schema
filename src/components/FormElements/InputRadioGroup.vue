<template>
  <div class="input radio"
       v-if="options && name">
    <fieldset :name="fieldSetName"
              :aria-required="required.toString()"
              :aria-describedby="describedBy"
              role="radiogroup"
              :id="id"
              class="p-0 m-0">
        <legend class="d-flex align-items-center mb-5">
        <span v-if="label"
              v-html="label"
              :class="{'text-primary': !darkMode}"
              class="h6 d-inline-block"></span>

          <span v-if="hasError && error">
          <error-message :id="describedBy"
                         position="static"
                         :inline-error="true"
                         class="text-nowrap"
                         :error-message="error">
          </error-message>
        </span>
        </legend>

      <div v-for="(radio, idx) in options"
           :key="idx"
           class="radio-container-input">
        <input
            type="radio"
            :name="name"
            :id="getId(idx)"
            :value="radio.value"
            :disabled="disabled"
            :aria-invalid="invalid.toString()"
            :aria-labelledby="getId(idx, true)"
            :class="{'missingBackground': hasError && error}"
            @change="$emit('input', radio)"
        >

        <label
            :for="getId(idx)"
            :id="getId(idx, true)"
            v-html="radio.label"
            :class="{'radio-transparent radio-white text-white': darkMode}"
        >
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputRadioGroup",
  inheritAttrs: false,
  components: {
    ErrorMessage,
  },
  methods: {
    getId (idx, isLabel = false) {
      const id = `${this.id}-${idx}`

      return isLabel ? `label-${id}` : id
    },
  },
  props: {
    fieldSetName: String,
    errorCondition: Boolean,
    errorText: String,
    value: {
      type: Object,
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
    hasError: {type: Boolean, default: false},
    error: {type: String, required: false},
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

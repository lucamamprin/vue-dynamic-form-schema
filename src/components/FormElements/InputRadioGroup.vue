<template>
  <div
    v-if="options && name"
    class="input radio"
  >
    <fieldset
      :id="id"
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
            :error-message="errorMessage"
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
import props from "../../mixins/props"
import options from "../../mixins/options"
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputRadioGroup",
  components: {
    ErrorMessage,
  },
  mixins: [
    props,
    options,
  ],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => {},
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

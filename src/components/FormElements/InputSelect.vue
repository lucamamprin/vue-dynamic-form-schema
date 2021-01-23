<template>
  <div
    class="input select floating-label floating-label-floated"
    :class="{'input-transparent': darkMode, 'mt-0': resetMarginTop}"
  >
    <select
      :id="id"
      :class="{
        'border-danger': hasError,
        'is-selected': value,
      }"
      :aria-describedby="describedBy"
      :name="name"
      :disabled="disabled"
      :aria-invalid="invalid.toString()"
      :aria-required="required.toString()"
      :aria-labelledby="`label-${name}`"
      @change="$emit('input', {
        label: $event.target.options[$event.target.options.selectedIndex].innerText,
        value: $event.target.value
      })"
    >
      <option
        value
        :selected="!value"
      >
        {{ firstValue }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :selected="opt.value === value"
      >
        {{ opt.label }}
      </option>
    </select>

    <label
      v-if="label"
      :id="`label-${name}`"
      :for="id"
      v-html="label"
    />

    <div v-if="hasError && errorMessage">
      <error-message
        :id="describedBy"
        :error-message="errorMessage"
      />
    </div>
  </div>
</template>

<script>
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  components: {
    ErrorMessage,
  },
  props: {
    firstValue: {
      type: String,
      default: "",
    },
    value: {
      type: [
        String, Number, Object,
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    hasError: { type: Boolean, default: false },
    errorMessage: { 
      type: String,
      default: "",
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
    resetMarginTop: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    describedBy: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      val: null,
    }
  },
}
</script>

<template>
  <div
    class="input select floating-label floating-label-floated"
    :class="{'input-transparent': darkMode,}"
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
import props from "../../mixins/props"
import options from "../../mixins/options"
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  components: {
    ErrorMessage,
  },
  mixins: [
    props,
    options,
  ],
  props: {
    firstValue: {
      type: String,
      default: "",
    },
    value: {
      type: [
        String, Number, Object,
      ],
      default: null,
    },
  },
  data () {
    return {
      val: null,
    }
  },
}
</script>

<template>
  <div class="position-relative">
    <div
      :class="{ inverted: darkMode }"
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
        :class="{ missingBackground: hasError && errorMessage }"
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
        v-if="hasError && errorMessage"
        :id="describedBy"
        :error-message="errorMessage"
      />
    </div>
  </div>
</template>

<script>
import props from "../../mixins/props"
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputCheckbox",
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  mixins: [
    props,
  ],
  props: {
    value: {
      type: null, // accept everything
      default: null,
    },
  },
}
</script>

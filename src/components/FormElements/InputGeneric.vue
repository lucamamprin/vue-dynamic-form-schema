<template>
  <div
    class="input floating-label"
    :class="[
      {
        'input-transparent': darkMode,
        'floating-label-floated': value || floatedLabel,
      },
      $attrs.type,
    ]"
  >
    <div class="position-relative">
      <input
        v-bind="$attrs"
        :type="type"
        :class="{
          'border-danger': hasError,
        }"
        :aria-describedby="`${describedBy} ${maxLengthDescribedBy}`"
        :value="value"
        :name="name"
        :id="id"
        :disabled="disabled"
        :min="min"
        :max="max"
        :minlength="minLength"
        :maxlength="maxLength"
        :placeholder="placeholderText"
        :aria-labelledby="`label-${name}`"
        :aria-invalid="invalid.toString()"
        :aria-required="required.toString()"
        v-on="{
          ...$listeners,
        }"
      >
      <label
        :id="`label-${name}`"
        :for="id"
        v-html="label"
      />
    </div>

    <div
      v-if="hasCharacterCount || hasLeftColSlot"
    >
      <div
        v-if="hasLeftColSlot"
        class="input-left-slot"
      >
        <slot name="leftCol" />
      </div>

      <div
        v-if="hasCharacterCount"
        class="input-character-counter"
      >
        <max-length
          :typed-text="value"
          :sr-character-count="maxLengthDescribedBy"
          :label="removeStar(label)"
          :max-length="maxLength"
        />
      </div>
    </div>

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
import textInputs from "../../mixins/textInputs"
import { removeStar } from "../../utilities/removeStar"
const MaxLength = () => import("./Atoms/MaxLength")
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputGeneric",
  inheritAttrs: false,
  components: {
    MaxLength,
    ErrorMessage,
  },
  mixins: [
    props,
    textInputs,
  ],
  computed: {
    hasLeftColSlot () {
      return this.$slots.leftCol
    },
    hasCharacterCount () {
      return this.maxLength && this.showCharacterCount
    },
    maxLengthDescribedBy () {
      return this.hasCharacterCount ? `${this.id}-counter` : ""
    },
  },
  methods: {
    removeStar,
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    min: {
      type: null,
      default: null,
    },
    max: {
      type: null,
      default: null,
    },
  },
}
</script>

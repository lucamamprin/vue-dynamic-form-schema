<template>
  <div
    class="input floating-label"
    :class="[
      {
        'input-transparent': darkMode,
        'mt-0': resetMarginTop,
        'floating-label-floated': value || floatedLabel,
      },
      $attrs.type,
    ]"
  >
    <div class="position-relative">
      <input
        v-bind="$attrs"
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
          input: (event) =>
            $emit(
              'input',
              uppercase ? event.target.value.toUpperCase() : event.target.value
            ),
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
      class="pal-row pal-no-gutters mt-2"
    >
      <div
        v-if="hasLeftColSlot"
        class="pal-col px-0"
      >
        <slot name="leftCol" />
      </div>

      <div
        v-if="hasCharacterCount"
        class="pal-col px-0"
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
import removeStar from "../../utilities/removeStar"
const MaxLength = () => import("./Atoms/MaxLength")
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputGeneric",
  inheritAttrs: false,
  mixins: [
    removeStar,
  ],
  components: {
    MaxLength,
    ErrorMessage,
  },
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
  props: {
    floatedLabel: {
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
    value: {
      type: [
        String, Number,
      ],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    min: {
      type: null,
      default: null,
    },
    max: {
      type: null,
      default: null,
    },
    minLength: {
      type: Number,
      default: null,
    },
    maxLength: {
      type: Number,
      default: null,
    },
    showCharacterCount: {
      type: Boolean,
      default: true,
    },
    resetMarginTop: {
      type: Boolean,
      default: false,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    placeholderText: {
      type: String,
      default: " ",
    },
    invalid: {
      type: Boolean,
    },
    required: {
      type: Boolean,
      default: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

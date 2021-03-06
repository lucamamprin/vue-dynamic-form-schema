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
import props from "../../mixins/props"
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
    value: {
      type: [
        String, Number,
      ],
      default: null,
    },
    floatedLabel: {
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
    placeholderText: {
      type: String,
      default: " ",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

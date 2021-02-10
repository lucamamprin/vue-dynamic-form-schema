<template>
  <div
    class="input textarea floating-label"
    :class="{'input-transparent': darkMode, 'mt-0': resetMarginTop, 'floating-label-floated': typedText.length || floatedLabel}"
  >
    <div :class="areaClass">
      <textarea
        :id="id"
        :name="name"
        :disabled="disabled"
        :rows="rows"
        :cols="cols"
        :minlength="minLength"
        :maxlength="maxLength"
        :aria-describedby="`${describedBy} ${maxLengthDescribedBy}`"
        :aria-invalid="invalid.toString()"
        :aria-required="required.toString()"
        :aria-labelledby="`label-${name}`"
        :class="{'border-danger': hasError,}"
        :style="inputStyle"
        :placeholder="placeholderText"
        @input="onType($event)"
        @keyup.enter="resize"
        @keyup.delete="resize"
        v-model="typedText"
      />
      <label
        :for="id"
        v-html="label"
      />

      <textarea
        v-if="resizeTextArea"
        :id="`shadow-${name}`"
        ref="shadow"
        v-model="typedText"
        class="shadow"
        :style="shadowStyles"
        tabindex="-1"
        :disabled="disabled"
      />
      <label
        v-if="resizeTextArea"
        :for="`shadow-${name}`"
        class="sr-only"
      >{{ label }}</label>
    </div>

    <max-length
      v-if="hasCharacterCount"
      :typed-text="typedText"
      :max-length="maxLength"
      :sr-character-count="maxLengthDescribedBy"
      :label="removeStar(label)"
      classes="pr-lg-14"
    />

    <div
      v-if="hasError && error"
      class="mb-13"
    >
      <error-message
        :id="describedBy"
        :error-message="error"
      />
    </div>
  </div>
</template>

<script>
import { removeStar } from "../../utilities/removeStar"

const MaxLength = () => import("./Atoms/MaxLength")
const ErrorMessage = () => import("./Atoms/ErrorMessage")

export default {
  name: "InputTextarea",
  data () {
    return {
      valueProxy: "",
      inputHeight: "0",
      shadowStyles: {
        maxHeight: 0,
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        padding: 0,
      },
    }
  },
  components: {
    MaxLength,
    ErrorMessage,
  },
  props: {
    // textarea specific props
    resizeTextArea: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Number,
      default: 2,
    },
    cols: {
      type: Number,
      default: 20,
    },
    areaClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    // common with BaseInput
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
        String,
        Number,
      ],
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    showCharacterCount: {
      type: Boolean,
      default: true,
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
    resetMarginTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typedText: {
      get () {
        return this.value
      },
      set (newValue) {
        this.valueProxy = newValue
      },
    },
    inputStyle () {
      if (!this.resizeTextArea) {
        return
      }

      return {
        "min-height": this.inputHeight,
        overflow: "hidden",
      }
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
    onType ($event) {
      const value = $event.target.value

      this.$emit("input", value)
      this.valueProxy = value
      this.resize()
    },
    resize () {
      // Credits to https://www.scottstadt.com/2019/06/03/vue-autosize-textarea.html
      if (!this.resizeTextArea) {
        return
      }

      this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
    },
  },
  mounted () {
    this.resize()
  },
}
</script>

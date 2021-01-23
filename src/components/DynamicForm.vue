<template>
  <div>
    <component
      :is="getComponent(field.type)"
      v-for="(field, key) in schema"
      v-bind="{...field}"
      :id="generateUniqueIdFromNameSpace(field, key)"
      :key="key"
      :name="key"
      :described-by="generateUniqueIdFromNameSpace(field, key, true)"
      :value="getValue(field.type, value, key)"
      :min="validationParam(field.validations.minValue, 0)"
      :max="validationParam(field.validations.maxValue, null)"
      :min-length="validationParam(field.validations.minLength, 0)"
      :max-length="validationParam(field.validations.maxLength, null)"
      :uppercase="field.uppercase"
      :autocomplete="field.autocomplete"
      :required="getIsRequired(field)"
      :label="getLabel(field)"
      :invalid="$v.form[key].$anyError"
      :has-error="$v.form[key].$error && showErrors"
      :error="errorMessages[key]"
      :show-character-count="field.showCharacterCount"
      :dark-mode="darkMode"
      :reset-margin-top="firstFormElement === key"
      @input="update(key, $event)"
    />
  </div>
</template>

<script>
import {validationRules} from "../parsers/ValidationParser"

const InputGeneric = () => import("./FormElements/InputGeneric")
const InputTextarea = () => import("./FormElements/InputTextarea")
const InputSelect = () => import("./FormElements/InputSelect")
const InputRadioGroup = () => import("./FormElements/InputRadioGroup")
const InputCheckbox = () => import("./FormElements/InputCheckbox")

export default {
  name: "DynamicForm",
  components: {
    InputTextarea,
    InputGeneric,
    InputSelect,
    InputRadioGroup,
    InputCheckbox,
  },
  props: {
    // the JSON schema representing the form structure.
    schema: {type: Object, required: true},
    value: {type: Object, required: true},
    // A unique string that works as ID for the form.
    // This is useful in case you need two identical forms that have different data (eg: shipping and billing address).
    nameSpace: {
      type: String,
      required: true,
    },
    // by default show errors while the user is typing
    // if it's needed to show on submit, its value must be handled by the parent component
    showErrors: {
      type: Boolean,
      default: true,
    },
    // If set to `true`, add classes to handle a form in a dark background.
    darkMode: {
      type: Boolean,
      default: false,
    },
    // Set the initial value for each field. For checkboxes it is recommended setting this to `false`
    initialValue: {
      type: [
        String, Boolean,
      ],
      default: null,
    },
  },
  data () {
    return {
      form: {},
    }
  },
  computed: {
    firstFormElement () {
      return Object.keys(this.schema)[0]
    },
    errorMessages () {
      const validations = this.$v.form

      return Object.keys(this.schema).reduce((messages, key) => {
        const rules = this.schema[key].validations
        const rulesKeys = Object.keys(this.schema[key].validations)
        const validator = validations[key]

        if (!validator) return messages

        for (const rule of rulesKeys) {
          if (validator[rule] !== false) continue

          const message = rules[rule].message
          const params = rules[rule].params

          messages[key] = message.replace("{" + rule + "}", params)

          if (rule === "isBetween") {
            messages[key] = message
              .replace("{min}", params[0])
              .replace("{max}", params[1])
          }

          return messages
        }

        return messages
      }, {})
    },
  },
  created () {
    for (const name in this.schema) {
      this.$set(this.form, name, this.initialValue)
    }
  },
  mounted () {
    this.$emit("mounted", this.form)
  },
  methods: {
    /**
     * Used to get the proper component name.
     */
    getComponent (type) {
      let component
      switch (type) {
      case "textarea":
        component = "InputTextarea"
        break
      case "select":
        component = "InputSelect"
        break
      case "radio_group":
        component = "InputRadioGroup"
        break
      case "checkbox":
        component = "InputCheckbox"
        break
      default:
        component = "InputGeneric"
      }

      return component
    },
    getIsRequired (field) {
      return Object.prototype.hasOwnProperty.call(field.validations, "required")
          || Object.prototype.hasOwnProperty.call(field.validations, "isChecked")
    },
    generateUniqueIdFromNameSpace (field, name, isError = false) {
      return isError ? `${this.nameSpace}-${name}-error` : `${this.nameSpace}-${name}`
    },
    getLabel (field) {
      // add an asterisk in case of required field
      // wrap the asterisk with a span of aria-hidden=true
      // this prevents screen readers from reading "star" or "asterisk"
      // all screen readers will announce if a field is required thanks to the other attrs

      return this.getIsRequired(field) ?
        `${field.label}<span aria-hidden="true">*</span>`
        : field.label
    },
    getValue (type, value, key) {
      // checkboxes handle values differently from the other inputs
      return type === "checkbox" ? this.schema[key].value : value[key]
    },
    getShowCharacterCount (field) {
      return typeof field.showCharacterCount === "undefined" ? true : field.showCharacterCount
    },
    validationParam (prop, defaultValue) {
      return typeof prop !== "undefined" ? prop.params : defaultValue
    },
    update (key, value) {
      this.form[key] = value
      this.$v.form[key].$touch()

      this.$emit("input", {
        ...this.value,
        [key]: value,
      })
    },
    // used externally
    validate () {
      this.$v.$touch()
      this.announceStatus()
    },
    // used externally
    getAllErrors () {
      return this.errorMessages
    },
    announceStatus () {
      this.$emit("status", {
        invalid: this.$v.$invalid,
      })
    },
  },
  validations () {
    return {form: validationRules(this.schema)}
  },
}
</script>

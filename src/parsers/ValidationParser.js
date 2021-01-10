import * as Validators from "vuelidate/lib/validators"
const helpers = Validators.helpers
const italianPhoneNumber = helpers.regex("italianPhoneNumber", /^(0|3|\+)+\d{5,}$/)
const personName = helpers.regex("alpha", /^[A-Za-zèùàòéüäößâêîôûæœçÄÖÜẞÂÊÎÔÛÆŒÇ][a-zA-Z'èùàòéüäößâêîôûæœç ]*$/)
const isChecked = (value) => value === true
const isEqual = (prop) => helpers.withParams({ type: "isEqual", prop }, (value) => value === prop)
const isEqualToField = (prop) => helpers.withParams({ type: "isEqualToField", prop }, (value, parentVm) => {
  return value === helpers.ref(prop, this, parentVm)
})
const isBetween = (prop) => helpers.withParams({type: "isBetween", prop}, (value) => {
  return value >= prop[0] && value <= prop[1]
})
const vinRE = helpers.regex("alphaNum", /^WV[\w]{15}$/i)

const allValidations = {
  ...Validators,
  italianPhoneNumber,
  personName,
  isChecked,
  isEqual,
  isEqualToField,
  isBetween,
  vinRE,
}

export const validationRules = schema => {
  return Object.keys(schema).reduce((rules, elementName) => {
    const item = schema[elementName]
    if (!("validations" in item)) return rules

    const validations = {}
    for (const rule in item.validations) {
      const params = item.validations[rule].params

      if (params) {
        validations[rule] = allValidations[rule](params)
      } else {
        validations[rule] = allValidations[rule]
      }
    }

    rules[elementName] = validations
    return rules
  }, {})
}

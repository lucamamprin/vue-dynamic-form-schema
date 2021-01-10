import DynamicForm from './components/DynamicForm'
import InputCheckbox from './components/FormElements/InputCheckbox'
import InputGeneric from './components/FormElements/InputGeneric'
import InputRadioGroup from './components/FormElements/InputRadioGroup'
import InputSelect from './components/FormElements/InputSelect'
import InputTextarea from './components/FormElements/InputTextarea'

export default {
  install (Vue, options) {
    Vue.component('DynamicForm', DynamicForm)
    Vue.component('InputCheckbox', InputCheckbox)
    Vue.component('InputGeneric', InputGeneric)
    Vue.component('InputRadioGroup', InputRadioGroup)
    Vue.component('InputSelect', InputSelect)
    Vue.component('InputTextarea', InputTextarea)


    Vue.mixin({
      methods: {
        errorMessageManual(reference, key, errorMessages) {
          const input = reference[key];
          const params = Object.keys(input.$params);
          const messageKeys = params.map(x => {
            return {
              [x]: input[x]
            };
          });
          const activeMessage = messageKeys.filter(m => {
            const key = Object.keys(m)[0];

            return !m[key];
          });

          // no errors apply
          if (!activeMessage.length) return "";

          const activeKey = Object.keys(activeMessage[0])[0];

          return errorMessages[key][activeKey];
        },
        goToFirstError (errorMessages = {}, nameSpace) {
          const errors = Object.keys(errorMessages)
          const firstError = errors[0]

          if (firstError) {
            const element = document.getElementById(`${nameSpace}-${firstError}`)
            const role = element.getAttribute('role')

            // if it is a radio group
            if (role === 'radiogroup') {
              const focusOn = element.getElementsByTagName('input')[0] // get first radio input
              focusOn.focus()

              return
            }

            document.getElementById(`${nameSpace}-${firstError}`).focus()
          }
        },
        // gets status and error messages, reverses the array and finds the first input within the form to focus on.
        focusOnFirstForm (statusObj, errorMessages) {
          // reverse the object to prevent scrolling to the last DynamicForm instance
          const reverseObj = obj => Object.assign([], obj).reverse()

          for (const status in reverseObj(statusObj)) {
            if (statusObj[status].invalid) {
              this.goToFirstError(errorMessages[status], status)
              return
            }
          }
        },
        getInvalidForm(statuses) {
          return !!Object.values(statuses).find(status => status.invalid)
        }
      }
    })
  }
}

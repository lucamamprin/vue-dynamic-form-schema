import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import InputRadioGroup from "../../src/components/FormElements/InputRadioGroup.vue"

const props = {
  name: "hobby",
  id: "user-hobby",
  label: "What is your hobby?",
  describedBy: "hobby-describe",
  options: [
    {
      "label": "Cinema",
      "value": "cinema",
    },
    {
      "label": "Bird watching",
      "value": "bird_watching",
    },
    {
      "label": "Coding",
      "value": "coding",
    },
  ],
}

let wrapper

describe("InputRadioGroup", () => {
  beforeEach(() => {
    wrapper = shallowMount(InputRadioGroup, {
      propsData: props,
    })
  })
  
  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
  
  test("validates options", () => {
    const validator = InputRadioGroup.props.options.validator
    expect(validator(props.options)).toBe(true)
  })
  
  test("validates wrong options", () => {
    const wrongOptions =  [
      {
        "wrong-label": "Cinema",
        "wrong-value": "cinema",
      },
    ]

    const validator = InputRadioGroup.props.options.validator
    expect(validator(wrongOptions)).toBe(false)
  })
  
  test("can be disabled", async () => {
    await wrapper.setProps({
      disabled: true,
    })

    await Vue.nextTick()
    
    expect(wrapper.html()).toMatchSnapshot()
  })
  
  test("shows error message", async () => {
    await wrapper.setProps({
      hasError: true,
      errorMessage: "You didn't select any hobby",
    })

    await Vue.nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
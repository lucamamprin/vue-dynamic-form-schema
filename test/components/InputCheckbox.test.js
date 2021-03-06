import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import InputCheckbox from "../../src/components/FormElements/InputCheckbox.vue"

const props = {
  label: "Check me out",
  name: "checkme",
  id: "check",
  describedBy: "checkme-describe",
}

let wrapper

describe("InputCheckbox", () => {
  beforeEach(() => {
    wrapper = shallowMount(InputCheckbox, {
      propsData: props,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("can be checked", async () => {
    await wrapper.setProps({
      propsData: {
        ...props,
        value: "checked",
      },
    })
    const checkboxInput = wrapper.find("input[type='checkbox']")
    await checkboxInput.setChecked()

    const event = wrapper.emitted("input")
    const value = event[0][0]

    expect(wrapper.emitted("input")).toBeTruthy()
    expect(value).toBeTruthy()
    expect(checkboxInput.element.checked).toBeTruthy()
  })

  test("value can be set", async () => {
    await wrapper.setProps({
      ...props,
      value: "my_custom_value",
    })

    expect(wrapper).toMatchSnapshot()
  })

  test("can be disabled", async () => {
    await wrapper.setProps({
      disabled: true,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  test("shows error message", async () => {
    await wrapper.setProps({
      errorMessage: "You didn't check me",
      hasError: true,
    })

    await Vue.nextTick()
    
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("can be set to required", async () => {
    await wrapper.setProps({
      required: true,
    })

    await Vue.nextTick()

    expect(true).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  test("can be set to invalid", async () => {
    await wrapper.setProps({
      invalid: true,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})

import Vue from "vue"
import { mount } from "@vue/test-utils"
import InputGeneric from "../../src/components/FormElements/InputGeneric.vue"

const props = {
  id: "firstname",
  describedBy: "firstname-describe",
  name: "firstname",
  label: "First name",
  required: true,
}

let wrapper 

describe("InputGeneric", () => {
  beforeEach(() => {
    wrapper = mount(InputGeneric, {
      propsData: props,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("displays proper value if already set", async () => {
    await wrapper.setProps({
      value: "John",
    })

    expect(wrapper.find("input").element.value).toBe("John")
  })

  test("prints the floating label classes if user types a value", async () => {
    await wrapper.setProps({
      value: "John",
    })

    expect(wrapper).toMatchSnapshot()
  })

  test("prints error message", async () => {
    await wrapper.setProps({
      hasError: true,
      errorMessage: "Generic error message",
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})

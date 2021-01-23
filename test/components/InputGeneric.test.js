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

const types = [
  "search",
  "tel",
  "email",
  "password",
]

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

  test("show minlength and maxlength attributes and component", async () => {
    await wrapper.setProps({
      minLength: 20,
      maxLength: 50,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })
  
})

describe("Input Generic - input number", () => {
  const numberProps = {
    id: "age-input",
    describedBy: "age-describe",
    name: "age",
    label: "Age",
  }
  const min = 20
  const max = 50

  beforeEach(() => {
    wrapper = mount(InputGeneric, {
      propsData: numberProps,
    })
  })

  test("number mounts correctly", async () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("has max and min values", async () => {
    await wrapper.setProps({
      min,
      max,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})

describe("multiple input types", () => {
  for (const type of types) {
    test(`${type}`, () => {
      const typeProps = {
        id: `${type}-input`,
        describedBy: `${type}-describe`,
        name: `${type}-name`,
        label: `${type}-label`,
      }

      wrapper = mount(InputGeneric, {
        propsData: typeProps,
      })

      expect(wrapper).toMatchSnapshot()
    })
  }
})

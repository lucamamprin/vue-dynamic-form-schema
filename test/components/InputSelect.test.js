import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import InputSelect from "../../src/components/FormElements/InputSelect.vue"

const props = {
  id: "favoriteAnimal",
  describedBy: "favoriteAnimal-describe",
  name: "animal",
  label: "Favorite animal",
  required: true,
  options: [

  ],
}

const options = [
  {
    "label": "Dog",
    "value": "dog",
  },
  {
    "label": "Cat",
    "value": "cat",
  },
]

const propsValues = {
  ...props,
  options,
}

let wrapper

describe("InputSelect", () => {
  beforeEach(() => {
    wrapper = shallowMount(InputSelect, {
      propsData: props,
    })
  })
  
  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("gets array of options", async () => {
    await wrapper.setProps({
      ...propsValues,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test("should be disabled", async () => {
    await wrapper.setProps({
      disabled: true,
    })

    expect(wrapper.find("select").element.disabled).toBeTruthy()
  })

  test("sets new value", async () => {
    await wrapper.setProps({
      ...propsValues,
    })

    const options = wrapper.find("select").findAll("option")

    await options.at(1).setSelected()

    expect(wrapper.find("option:checked").element.value).toBe("dog")
    expect(wrapper.find("select").element.value).toBe("dog")
  })

  test("shows error message", async () => {
    await wrapper.setProps({
      invalid: true,
      hasError: true,
      errorMessage: "You need to select an animal.",
    })

    await Vue.nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test("change event emitted", async () => {
    wrapper.vm.$emit("input", {
      label: "Seal",
      value: "seal",
    })

    await Vue.nextTick()

    const event = wrapper.emitted("input")
    const value = event[0][0]

    expect(wrapper.emitted("input")).toBeTruthy()

    expect(typeof value).toBe("object")
  })
})

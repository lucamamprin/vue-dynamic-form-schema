import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import ErrorMessage from "../../src/components/FormElements/Atoms/ErrorMessage.vue"

const propsDefault = {
  errorMessage: "Generic error message",
  id: "error",
}

const positions = [
  "static",
  "absolute",
  "relative",
]

// BootStrap display classes, to be deprecated on next major refactor
const bsDisplay = [
  "inline",
  "block",
]

let wrapper

describe("error message", () => {

  beforeEach(() => {
    wrapper = shallowMount(ErrorMessage, {
      propsData: propsDefault,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("prints inline error class", async () => {
    await wrapper.setProps({
      inlineError: true,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  positions.forEach(position => {
    test(`prints ${position} position class`, async () => {
      await wrapper.setProps({
        position,
      })

      await Vue.nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })

  bsDisplay.forEach(display => {
    test(`prints ${display} position class`, async () => {
      await wrapper.setProps({
        display,
      })

      await Vue.nextTick()

      expect(wrapper).toMatchSnapshot()
    })
  })
})

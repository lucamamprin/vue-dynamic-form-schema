import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import InputGeneric from "../../src/components/FormElements/InputGeneric.vue"

const props = {
  label: "Check me out",
  name: "checkme",
  id: "check",
  describedBy: "checkme-describe",
}

let wrapper

describe("InputCheckbox", () => {
  beforeEach(() => {
    wrapper = shallowMount(InputGeneric, {
      propsData: props,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

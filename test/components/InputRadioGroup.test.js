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
})
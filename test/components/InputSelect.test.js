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
})

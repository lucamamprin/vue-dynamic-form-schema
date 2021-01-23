import { mount } from "@vue/test-utils"
import MaxLength from "../../src/components/FormElements/Atoms/MaxLength.vue"

const propsDefault = {
  typedText: "",
  maxLength: 50,
  label: "First name",
  srCharacterCount: "first-name-counter",
}

let wrapper

describe("max length indicator", () => {

  beforeEach(() => {
    wrapper = mount(MaxLength, {
      propsData: propsDefault,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})

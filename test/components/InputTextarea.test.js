import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import InputTextarea from "../../src/components/FormElements/InputTextarea.vue"

const props = {
  id: "message",
  describedBy: "message-describe",
  name: "message",
  label: "Your Message",
}

let wrapper

describe("InputTextarea", () => {
  beforeEach(() => {
    wrapper = shallowMount(InputTextarea, {
      propsData: props,
    })
  })

  test("mounts correctly", () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("show minlength and maxlength attributes and component", async () => {
    await wrapper.setProps({
      minLength: 0,
      maxLength: 500,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  test("display value if already set", async () => {
    const value = "Lorem ipsum dolor sit amet"
    await wrapper.setProps({
      value,
    })

    await Vue.nextTick()

    expect(wrapper.find("textarea").element.value).toBe(value)
  })

  test("accepts different cols and rows", async () => {
    await wrapper.setProps({
      cols: 40,
      rows: 40,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  test("accepts custom class", async () => {
    await wrapper.setProps({
      areaClass: "my-custom-class",
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  test("can be disabled", async () => {
    await wrapper.setProps({
      disabled: true,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  test("shadow textarea won't show if resizing is disabled", async () => {
    await wrapper.setProps({
      resizeTextArea: false,
    })

    await Vue.nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})

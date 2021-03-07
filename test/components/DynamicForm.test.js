import Vue from "vue"
import { shallowMount } from "@vue/test-utils"
import DynamicForm from "../../src/components/DynamicForm"
import firstName from "./fixtures/fields/firstName.json"
import lastName from "./fixtures/fields/lastName.json"
import email from "./fixtures/fields/email.json"
import passwordRepeat from "./fixtures/fields/passwordRepeat.json"

const newUserSchema = {
  ...firstName,
  ...lastName,
  ...email,
  ...passwordRepeat,
}

let wrapper

describe("form", () => {
  beforeEach(() => {
    wrapper = shallowMount(DynamicForm, {
      propsData: {
        schema: newUserSchema,
        nameSpace: "new-user",
      },
    })
  })

  test("mounts correctly", async () => {
    await Vue.nextTick()
    expect(wrapper).toMatchSnapshot()
  })
})

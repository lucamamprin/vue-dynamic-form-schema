import { removeStar } from "../../src/utilities/removeStar"

describe("removeStar", () => {
  test("removes the star from given text", () => {
    const textFromProps = "Full Name *"
    const regexNotContainsStar = /^((?!\*).)*$/

    expect(removeStar(textFromProps)).toMatch(regexNotContainsStar)
  })
})

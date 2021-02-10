// function used to remove the * symbol for a11y purposes
// prevents bug in firefox where VoiceOver says 'Star' despite it being inside aria-hidden=true

export function removeStar (string) {
  return string.includes("*") ? string.replace("*", "") : string
}

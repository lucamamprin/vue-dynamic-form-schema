<template functional>
  <div class="text-right text-light">
    <span
      :id="props.srCharacterCount"
      class="sr-only"
    >
      {{ `${props.typedtext ? 0 : props.typedText.length} characters on ${props.maxLength} possible for ${props.label}` }}
    </span>

    <p class="m-0">
      {{ props.typedText.length }} / {{ props.maxLength }}
    </p>
  </div>
</template>

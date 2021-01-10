<template functional>
    <div class="text-right text-light">
        <span class="sr-only"
              :id="props.srCharacterCount"
              v-html="`${props.typedtext ? 0 : props.typedText.length} caratteri inseriti su ${props.maxLength} consentiti per ${props.label}`"
        ></span>
        <p class="m-0">
            {{ props.typedText.length }} / {{ props.maxLength }}
        </p>
    </div>
</template>

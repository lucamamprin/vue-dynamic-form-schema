// function used to remove the * symbol for a11y purposes
// prevents bug in firefox where VoiceOver says 'Star' despite it being inside aria-hidden=true

export default {
    methods: {
        removeStar(string) {
            const containsStar = string.includes('*')

            console.log('containsStar', containsStar)

            if (containsStar) {
                // convert to HTML object to get its text and remove the star
                let htmlObj = document.createElement('div');
                htmlObj.innerHTML = string

                return htmlObj.innerText.slice(0, -1)
            }

            return string
        },
    },
}

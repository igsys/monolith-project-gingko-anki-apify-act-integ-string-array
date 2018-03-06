const Apify = require('apify')
const typeCheck = require('type-check').typeCheck

// Definition of the input
const INPUT_TYPE = `{
    success: Boolean,
    type: String,
    data: [{
        value: String,
        __IMTLENGTH__: Maybe Number
    }],
}`

Apify.main(async () => {
    // Fetch the input and check it has a valid format
    // You don't need to check the input, but it's a good practice.
    const input = await Apify.getValue('INPUT')
    if (!typeCheck(INPUT_TYPE, input)) {
        console.log('Expected input:')
        console.log(INPUT_TYPE)
        console.log('Received input:')
        console.dir(input)
        throw new Error('Received invalid input')
    }

    let result = ''
    input.data.forEach(item => {
        if (input.type === 'img') {
            result += `<img class='image' src='${item.value}' /> `
        }
        else if (input.type === 'mp3') {
            result += `[sound:${item.value}] `
        }
        else if (input.type === 'tag') {
            result += `${item.value}, `
        }
    })

    // Here's the place for your magic...
    console.log(`Input type: ${input.type}`)

    // Store the output
    const output = {
        input,
        data: result
    }
    // console.log('output', output)
    await Apify.setValue('OUTPUT', output)
})

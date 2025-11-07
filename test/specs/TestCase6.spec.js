const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {
        // Navigate to the website
        browser.url('https://automationexercise.com/')
        await $('[class="fc-button-label"]').click()
        await expect(await $('section[id="slider"]')).toBeDisplayed()
        await browser.pause(2000)

       // Click contact us button
       await $('[href="/contact_us"]').click()
       await expect (await $('h2=Get In Touch')).toBeDisplayed()
       await browser.pause(2000)

        // Fill in contact us form
       await $('[data-qa="name"]').setValue('Jesse')
       await $('[data-qa="email"]').setValue('Jesse.hui+061@ii.co.uk')
       await $('[data-qa="subject"]').setValue('Test subject')
       await $('[data-qa="message"]').setValue('This is a test message.')
       await browser.pause(2000)

        // Upload file
        const filePath = require('path').join(__dirname, '..', 'data', 'test.txt')
        const remoteFilePath = await browser.uploadFile(filePath)
        await $('[name="upload_file"]').setValue(remoteFilePath)
        await browser.pause(2000)

            console.log('Submitting form...')
            await $('[data-qa="submit-button"]').click()

            // First try handling the alert if it appears
            try {
                await browser.waitUntil(async () => {
                    try {
                        const isAlertOpen = await browser.isAlertOpen()
                        console.log('Alert present:', isAlertOpen)
                        if (isAlertOpen) {
                            const alertText = await browser.getAlertText()
                            console.log('Alert text:', alertText)
                            await browser.acceptAlert()
                            return true
                        }
                        return false
                    } catch (err) {
                        console.log('Error checking alert:', err.message)
                        return false
                    }
                }, {
                    timeout: 15000,
                    interval: 500,
                    timeoutMsg: 'Alert did not appear or could not be accepted'
                })
            } catch (error) {
                console.log('Error handling alert:', error.message)
                // Continue execution even if alert is not found
            }

            // Then wait for either success message or error message
            try {
                const successMessage = await $('.alert-success')
                console.log('Waiting for success message...')
                await successMessage.waitForDisplayed({ timeout: 10000 })
                console.log('Success message found:', await successMessage.getText())
            } catch (error) {
                console.log('Error finding success message:', error.message)
                // Take screenshot on failure
                await browser.saveScreenshot('./error-screenshot.png')
                throw new Error('Success message not found after form submission')
            }

            await browser.pause(2000)

        //CLick Home button
        await $('[class="fa fa-angle-double-left"]').click()
        await expect(await $('section[id="slider"]')).toBeDisplayed()
        await browser.pause(3000)
    })
})

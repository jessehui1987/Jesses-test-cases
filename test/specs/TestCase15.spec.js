const signup = require('../pageobjects/signup.page')
const contactUs = require('../pageobjects/contact.page')
const paymentPage = require('../pageobjects/payment.page')
const { expect, browser, $, $$ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {


        // *** Navigate to the website ***
        await signup.open()
        await signup.acceptCookies()
        await expect(await signup.slider).toBeDisplayed()


        // *** click on Signup/Login button ***
        await signup.signup('Jesse', 'jesse.hui+097@ii.co.uk')
        await expect(await signup.accountInfoHeading).toBeDisplayed()


        // *** Fill in the signup form ***
        await signup.fillAccountInformation('1234567890aB', '1', '1', '1990')
        await signup.selectNewsletters()
        await browser.pause(2000)
        await signup.fillAddressInformation('Jesse', 'Hui', '1 Jesse Street', 'United States', 'Test State', 'Test City', '12345', '1234567890')
        await browser.pause(2000)
       
        // *** Check created text and logged in as text ***
        await signup.createAccount()
                await expect(signup.accountCreatedText).toBeDisplayed()
        await signup.continueAfterCreation()
                await expect(signup.loggedInText).toBeDisplayed()


        // *** Click Add to cart ***
        // Get all add-to-cart buttons and click the one for product 2
        const addToCartButtons = await $$('[class="btn btn-default add-to-cart"]')
        // Find the button that's associated with product id 2
        for (let i = 0; i < addToCartButtons.length; i++) {
            const button = addToCartButtons[i]
            // Get parent element and look for data-product-id going up the tree
            let element = button
            let found = false
            for (let j = 0; j < 10; j++) {  // Check up to 10 parents
                const productId = await element.getAttribute('data-product-id')
                if (productId === '2') {
                    // Use JavaScript click to bypass advertisement overlay
                    await browser.execute((el) => el.click(), button)
                    found = true
                    break
                }
                // Move to parent
                try {
                    element = await element.parentElement()
                } catch (e) {
                    break
                }
            }
            if (found) break
        }


        // *** Verify success message appears ***
        await browser.waitUntil(async () => {
            try {
                const element = await $('//*[contains(text(), "Your product has been added to cart.")]')
                return await element.isDisplayed()
            } catch (e) {
                return false
            }
        }, { timeout: 5000 })
        await browser.pause(2000)

        // *** Click "View Cart" button in the modal using JavaScript ***
        const viewCartButton = await $('[id="cartModal"] [href="/view_cart"]')
        await browser.execute((el) => el.click(), viewCartButton)
        await expect(await $('[id="cart_info_table"]')).toBeDisplayed()


        // *** proceed to checkout ***
        await $('[class="btn btn-default check_out"]').click()


        // *** Check address details and review your order headings ***
        await expect(await $('h2=Address Details')).toBeDisplayed()
        await expect(await $('h2=Review Your Order')).toBeDisplayed()


        // *** Enter description in comment text area and place order ***
        await $('[name="message"]').setValue('Hello, Testing 123 abc XYZ 890.')
        await browser.pause(2000)

        // *** Click Place Order button ***
        await $('[class="btn btn-default check_out"]').click()

        // *** Enter payment details: Name on Card, Card Number, CVC, Expiration date ***
        await paymentPage.fillAndSubmitPayment('ABC tester', '1234 5678 9012 3456', '123', '12', '2030')
        await browser.pause(5000)

        // *** submit payment ***
        await paymentPage.submitPayment()
        await browser.pause(5000)

        // *** Verify success message ***
        await expect(paymentPage.orderPlacedText).toBeDisplayed()




        

        
        
    })
})

const Page = require('./page')

class PaymentPage extends Page {
    // Elements
    get nameOnCardInput() { return $('[data-qa="name-on-card"]') }
    get cardNumberInput() { return $('[data-qa="card-number"]') }
    get cardExpiryMonthInput() { return $('[data-qa="expiry-month"]') }
    get cardExpiryYearInput() { return $('[data-qa="expiry-year"]') }
    get cvvInput() { return $('[placeholder="ex. 311"]') }
    get payNowButton() { return $('[class="form-control btn btn-primary submit-button"]') }
    get successMessage() { return $('[class="alert alert-success"]') }
    get orderPlacedText() { return $('[data-qa="order-placed"]') }

    async fillPaymentInfo(nameOnCard, cardNumber, expiryMonth, expiryYear, cvv) {
        await this.waitForDisplayed(this.nameOnCardInput)
        await this.nameOnCardInput.setValue(nameOnCard)
        await this.cardNumberInput.setValue(cardNumber)
        await this.cardExpiryMonthInput.setValue(expiryMonth)
        await this.cardExpiryYearInput.setValue(expiryYear)
        await this.cvvInput.setValue(cvv)
    }

    async submitPayment() {
        const btn = await this.payNowButton
        try {
            await btn.waitForClickable({ timeout: 10000 })
            await btn.click()
        } catch (err) {
            await browser.execute((el) => el.scrollIntoView({block: 'center'}), btn)
            await browser.execute((el) => el.click(), btn)
        }
    }

    async verifyOrderPlaced() {
        await this.waitForDisplayed(this.successMessage)
        return await this.orderPlacedText.isDisplayed()
    }
}

module.exports = new PaymentPage()

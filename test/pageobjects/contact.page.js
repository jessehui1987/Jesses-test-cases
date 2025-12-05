const Page = require('./page')

class ContactPage extends Page {
    // Elements
    get contactLink() { return $('[href="/contact_us"]') }
    get nameInput() { return $('input[name="name"]') }
    get emailInput() { return $('input[name="email"]') }
    get subjectInput() { return $('input[name="subject"]') }
    get messageTextarea() { return $('textarea[name="message"]') }
    get uploadInput() { return $('input[name="upload_file"]') }
    get submitButton() { return $('input[type="submit"], button[type="submit"]') }
    get successMessage() { return $('div.status, .status, .contact-message, .form-result') }
    get cookieButton() { return $('[class="fc-button-label"]') }

    async open() {
        await super.open('/')
    }

    async acceptCookies() {
        if (await this.cookieButton.isDisplayed()) {
            await this.click(this.cookieButton)
        }
    }

    async openContact() {
        await this.click(this.contactLink)
        await this.waitForDisplayed(this.nameInput)
    }

    /**
     * Submit the contact form. If `filePath` is provided it will be uploaded.
     * @param {string} name
     * @param {string} email
     * @param {string} subject
     * @param {string} message
     * @param {string|null} filePath - local path to file to upload (optional)
     */
    async submitContactForm(name, email, subject, message, filePath = null) {
        await this.openContact()
        await this.nameInput.setValue(name)
        await this.emailInput.setValue(email)
        await this.subjectInput.setValue(subject)
        await this.messageTextarea.setValue(message)

        if (filePath) {
            const remotePath = await browser.uploadFile(filePath)
            await this.uploadInput.setValue(remotePath)
        }

        await this.click(this.submitButton)
    }

    async getSuccessText(timeout = 5000) {
        await this.waitForDisplayed(this.successMessage, timeout)
        return await this.successMessage.getText()
    }
}

module.exports = new ContactPage()

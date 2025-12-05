const Page = require('./page')

class ContactPage extends Page {
    // Elements
    get contactLink() { return $('[href="/contact_us"]') }
    get header() { return $('h2=Get In Touch') }
    get nameInput() { return $('[data-qa="name"]') }
    get emailInput() { return $('[data-qa="email"]') }
    get subjectInput() { return $('[data-qa="subject"]') }
    get messageTextarea() { return $('[data-qa="message"]') }
    get uploadInput() { return $('[name="upload_file"]') }
    get submitButton() { return $('[data-qa="submit-button"]') }
    get submitButtonFallback() { return $('button[type="submit"]') }
    get successMessage() { return $('*=Success! Your details have been submitted successfully.') }
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
        try {
            await this.waitForDisplayed(this.header, 5000)
        } catch (err) {
            await this.waitForDisplayed(this.nameInput, 5000)
        }
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
        await this.waitForDisplayed(this.nameInput)
        await this.nameInput.setValue(name)
        await this.emailInput.setValue(email)
        await this.subjectInput.setValue(subject)
        await this.messageTextarea.setValue(message)

        if (filePath) {
            const remotePath = await browser.uploadFile(filePath)
            await this.uploadInput.setValue(remotePath)
        }

        if (await this.submitButton.isExisting()) {
            await this.click(this.submitButton)
        } else {
            await this.click(this.submitButtonFallback)
        }

        // Handle the confirm dialog that appears on submit (Press OK to proceed!)
        try {
            await browser.waitUntil(async () => await browser.isAlertOpen(), {
                timeout: 5000,
                interval: 200
            })
            await browser.acceptAlert()
        } catch (err) {
            // no alert appeared - continue
        }
    }

    // Home button (back to slider/home)
    get homeButton() { return $('[class="fa fa-angle-double-left"]') }

    /**
     * Click the Home button (the left-angle icon) and wait for the homepage slider
     */
    async goHome() {
        const home = this.homeButton
        try {
            await home.scrollIntoView()
        } catch (e) {}

        try {
            await this.click(home)
        } catch (err) {
            // fallback: use JS to click the nearest anchor or the element itself
            await browser.execute((sel) => {
                const el = document.querySelector(sel)
                if (!el) return
                const parent = el.closest('a') || el
                parent.click()
            }, '[class="fa fa-angle-double-left"]')
        }

        // wait for the home slider to appear
        await browser.waitUntil(async () => {
            const el = await $('section[id="slider"]')
            return el && await el.isDisplayed()
        }, { timeout: 5000, interval: 200 })
    }

    async getSuccessText(timeout = 5000) {
        const candidates = [
            this.successMessage,
            await $('.alert-success'),
            await $('div*=Success'),
            await $('div=Success! Your details have been submitted successfully.')
        ]

        const end = Date.now() + timeout
        while (Date.now() < end) {
            for (const el of candidates) {
                try {
                    if (el && await el.isExisting() && await el.isDisplayed()) {
                        return await el.getText()
                    }
                } catch (err) {
                    // ignore - element may be stale or in different document
                }
            }
            await browser.pause(250)
        }

        // On failure, capture screenshot and page source for debugging
        const fs = require('fs')
        const stamp = new Date().toISOString().replace(/[:.]/g, '-')
        const dir = './error-screenshots'
        try { fs.mkdirSync(dir, { recursive: true }) } catch (e) {}
        const png = `${dir}/contact-failure-${stamp}.png`
        const htmlPath = `${dir}/contact-failure-${stamp}.html`
        await browser.saveScreenshot(png)
        const pageSource = await browser.getPageSource()
        fs.writeFileSync(htmlPath, pageSource, 'utf8')

        throw new Error(`Success message not found after ${timeout}ms. Saved ${png} and ${htmlPath}`)
    }
}

module.exports = new ContactPage()

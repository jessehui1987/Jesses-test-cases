class Page {
    /**
     * Open a path on the base URL
     * @param {string} path
     */
    async open(path = '/') {
        await browser.url(`https://automationexercise.com${path}`)
    }

    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element
     * @param {number} timeout
     */
    async waitForDisplayed(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout })
    }

    /**
     * Click an element with a built-in wait for clickable
     * @param {WebdriverIO.Element} element
     */
    async click(element) {
        await element.waitForClickable({ timeout: 5000 })
        await element.click()
    }
}

module.exports = Page

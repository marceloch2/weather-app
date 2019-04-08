module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.login')
      .waitForElementVisible('button[name=login]', 500)
      /**
			 * Make login
			 */
      .click('button[name=login]')
      /**
			 * Make sure Home loaded waiting for logout button
			 */
      .waitForElementVisible('.logout', 2000)
      .assert.elementPresent('.logout')
      /**
			 * Have location component mounted
			 */
      .assert.elementPresent('.location')
      .assert.elementPresent('.today__city')
      /**
			 * Country should be invisible at start
			 */
      .assert.elementNotPresent('.today__country')
      /**
			 * Has Weather Chart mounted
			 */
      .assert.elementPresent('.weather__chart')
      /**
			 * Let's make a call to find Haarlem weather
			 */
      .setValue('.today__city', 'Haarlem')
      .click('.location button')
      /**
			 * Today should be present
			 */
      .waitForElementVisible('.today', 5000)
      /**
			 * Today - Temperature visible with data
			 */
      .assert.elementPresent('.today__temp')
      .assert.elementPresent('.today__temp .metric')
      .assert.elementPresent('.today__temp strong')
      /**
			 * Today - Wind Speed visible with data
			 */
      .assert.elementPresent('.today__wind')
      .assert.elementPresent('.today__wind .metric')
      .assert.elementPresent('.today__wind strong')
      /**
		 	* Today - Humidity visible with data
		 	*/
      .assert.elementPresent('.today__humidity')
      .assert.elementPresent('.today__humidity .metric')
      .assert.elementPresent('.today__humidity strong')
      /**
			* Today - City visible with data
			*/
      .assert.elementPresent('.today__city')
      /**
			 * Lets switch to Chart page and make a call with 
			 * wrong Country filled to trigger the error toast
			 */
      .click('a[name=chartButton]')
      .waitForElementVisible('.weather__chart', 5000)
      .setValue('.today__country', 'BR')
      .click('.location button')
      .waitForElementVisible('.hasError', 1000)
      .assert.containsText('.hasError span', ':(')
      .waitForElementVisible('.errorMessage', 2000)
      .assert.containsText('.errorMessage', 'No Weather data found for Haarlem')
      .pause(5000)
      // Error message hidded
      .assert.elementNotPresent('.errorMessage')
      // Fix country value
      .setValue('.today__country', 'NL')
      // Searching for a success weather data
      .click('.location button')
      // Chart can render
      .waitForElementVisible('.weather__chart .chart-container', 2000)
      /**
			 * Testing Chart tools
			 */
      .assert.elementPresent('.weather__chart-tool-wrapper')
      .assert.elementPresent('.weather__chart-tool-wrapper .weather__chart-tool')
      .assert.elementCount('.weather__chart-tool-wrapper .weather__chart-tool button', 3)
      /**
			 * Make logout
			 */
      .click('.logout')
      .pause(3000)
      .assert.elementPresent('.login')
      /**
			 * And that's all
			 */
      .end()
  }
}

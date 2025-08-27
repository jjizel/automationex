class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async fillSignupForm({ name, email, password, gender, dob, address }) {
   // await this.page.fill('input[data-qa="signup-name"]', name);
   // await this.page.fill('input[data-qa="signup-email"]', email);
   // await this.page.click('button[data-qa="signup-button"]');

    // Espera a próxima página carregar
    await this.page.waitForSelector('input[id="id_gender1"]');

    // Preenche os campos adicionais
    
    await this.page.check('#id_gender1');
    await this.page.fill('#password', '123123123');
    await this.page.selectOption('#days', '21');
    await this.page.selectOption('#months', 'January');
    await this.page.selectOption('#years', '2000');
    await this.page.check('input[id="newsletter"]');
    await this.page.check('input[id="optin"]');
    await this.page.fill('input[id="first_name"]', 'Pimpolho');
    await this.page.fill('input[id="last_name"]', 'Souza');
    await this.page.fill('#address1', 'rua infiniti de souza');
    await this.page.fill('input[id="address2"]', 'Apt 1');
    await this.page.selectOption('select[id="country"]', 'Canada');
    await this.page.fill('input[id="state"]', 'TestState');
    await this.page.fill('input[id="city"]', 'TestCity');
    await this.page.fill('input[id="zipcode"]', '12345');
    await this.page.fill('input[id="mobile_number"]', '+1234567890');

    await this.page.click('button[data-qa="create-account"]');
  }
}

module.exports = { RegisterPage };
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@shelex/cypress-allure-plugin';
import 'cypress-plugin-api'

// Bank Project XYZ ||
// Access Pages     ||

Cypress.Screenshot.defaults({
    capture: "runner",
});

Cypress.Commands.add("accessBankWebsite", () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject');
    cy.clearCookies()
    cy.clearLocalStorage()
});

const bankTitle = "XYZ Bank";

Cypress.Commands.add("bankReturn", (online) => {
    cy.request('/angularJs-protractor/BankingProject/main.html')
        .then((response) => {
            expect(response.status).to.eq(online)
        })
});

Cypress.Commands.add("seeWelcomeBankPage", () => {
    cy.get(".mainHeading").contains(bankTitle).should('be.visible');
    cy.get('body.ng-scope').screenshot();
});


// Bank Project XYZ ||
// Customer Login   ||

const ELEMENTSLOGIN = {

    //Customer
    customerLogin: `//button[@ng-click="customer()"]`,
    customerSelect: `//select[@ng-model="custId"]`,
    loginBtn: `//button[@type="submit"]`,
    customerNameLogged: `//span[@class="fontBig ng-binding"]`,
    btnSubmit: `//button[@type="submit"]`,

    //Manager Add Customer
    managerLogin: `//button[@ng-click="manager()"]`,
    formAddCustomer: `[ng-class="btnClass1"]`,
    formScreen: `form.ng-pristine`,

    //Manager Open Account
    formOpenAccount: `[ng-class="btnClass2"]`,
    formCurrency: `#currency`,

    //Manager Search
    formSeeCustomers: `[ng-class="btnClass3"]`,
    formTable: `.table`,
    formTableBinding: `//td[@class="ng-binding"]`,
    searchField: `[ng-model="searchCustomer"]`
   
};

Cypress.Commands.add("userCustomerLogin", () => {
    cy.xpath(ELEMENTSLOGIN.customerLogin)
        .contains("Customer Login")
        .should("be.visible")
        .click()
});

Cypress.Commands.add("userCustomerSelect", (customerName) => {

    let valueLogin = [0];

    if (customerName === 'Hermoine Granger') {
        valueLogin = [1]
    }
    else if (customerName === 'Harry Potter') {
        valueLogin = [2]
    }
    else if (customerName === 'Ron Weasly') {
        valueLogin = [3]
    }
    else if (customerName === 'Albus Dumbledore') {
        valueLogin = [4]
    }
    else if (customerName === 'Neville Longbottom') {
        valueLogin = [5]
    }

    cy.xpath(ELEMENTSLOGIN.customerSelect)
        .should("not.be.disabled")
        // {force: true})
        .select(valueLogin)
        .contains(customerName)
        .should('contain', customerName)
});

Cypress.Commands.add("btnLogin", () => {
    cy.xpath(ELEMENTSLOGIN.loginBtn)
        .should('contain', 'Login')
        .click()
});

Cypress.Commands.add("userCustomerSucess", (customerName) => {
    cy.xpath(ELEMENTSLOGIN.customerNameLogged)
        .contains(customerName)
        .should('contain', customerName)
});

// Bank Project XYZ ||
// Manager Login    ||
// Add Customer     ||

let addCustomer = {
    FirstNameForm: `//input[@placeholder="First Name"]`,
    LastNameForm: `//input[@placeholder="Last Name"]`,
    PostCodeForm: `//input[@placeholder="Post Code"]`,
}

Cypress.Commands.add("userManagerLogin", () => {
    cy.xpath(ELEMENTSLOGIN.managerLogin)
        .contains("Manager Login")
        .should("be.visible")
        .click()
});

Cypress.Commands.add("addCustomerSelect", () => {
    cy.get(ELEMENTSLOGIN.formAddCustomer)
        .contains("Add Customer")
        .should("be.visible")
        .click()
    cy.get(ELEMENTSLOGIN.formScreen)
        .should('be.visible')
});

Cypress.Commands.add("writeAppInfo", (FirstName, LastName, PostCode) => {
    cy.xpath(addCustomer.FirstNameForm).type(FirstName)
    cy.xpath(addCustomer.LastNameForm).type(LastName)
    cy.xpath(addCustomer.PostCodeForm).type(PostCode)
});

Cypress.Commands.add("btnSubmitNewCustomer", () => {
    cy.xpath(ELEMENTSLOGIN.btnSubmit)
        .contains("Add Customer")
        .should("not.be.empty")
        .click()
    cy.on("window:alert", (t) => {
        expect(t).to.contains("Customer added successfully");
    });
});

// Bank Project XYZ ||
// Manager Login    ||
// Open Account     ||

Cypress.Commands.add("openAccount", () => {
    cy.get(ELEMENTSLOGIN.formOpenAccount)
        .contains("Open Account")
        .should("be.visible")
        .click()
    cy.get(ELEMENTSLOGIN.formScreen)
        .should('be.visible')
});

Cypress.Commands.add("selectTypeCurrency", (typeCurrency) => {

    let valueCurrency = [''];

    if (typeCurrency === 'Dollar') {
        typeCurrency = 'Dollar'
    }
    else if (typeCurrency === 'Pound') {
        typeCurrency = 'Pound'
    }
    else if (typeCurrency === 'Rupee') {
        typeCurrency = 'Rupee'
    }

    cy.get(ELEMENTSLOGIN.formCurrency)
        .should("not.be.disabled")
        // {force: true})
        .select(typeCurrency)
        .contains(typeCurrency)
        .should('contain', typeCurrency)
});

Cypress.Commands.add("btnSubmitOpenAcc", () => {
    cy.xpath(ELEMENTSLOGIN.btnSubmit)
        .contains("Process")
        .should("not.be.empty")
        .click()
    cy.on("window:alert", (t) => {
        expect(t).to.contains("Account created successfully");
    });
});

// Bank Project XYZ ||
// Manager Login    ||
// Customers Search ||

Cypress.Commands.add("seeCustomers", () => {
    cy.get(ELEMENTSLOGIN.formSeeCustomers)
        .contains("Customers")
        .should("be.visible")
        .click()
    cy.get(ELEMENTSLOGIN.formTable)
        .should('be.visible')
});

Cypress.Commands.add("searchCustomer", (FirstName) => {
    cy.get(ELEMENTSLOGIN.searchField)
        .clear()
        .should("be.visible")
        .type(FirstName)
});

Cypress.Commands.add("custNameAvailable", (FirstName) => {
     cy.xpath(ELEMENTSLOGIN.formTableBinding)
        .should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain(FirstName)
      })
});

// Bank Project XYZ ||
// Transactions     ||
// Operation        ||

const ELEMENTSOP = {
    btnTransactions: `[ng-class="btnClass1"]`,
    btnDeposits: `[ng-class="btnClass2"]`,
    btnWithdrawls: `[ng-class="btnClass3"]`,
    btnConfirmDeposit: `form.ng-dirty > .btn`
}

Cypress.Commands.add("selectAcc", (accNumber) => {
    // let valueAccount = [0];
    // if (accNumber === '') {
    //     valueAccount = number:accNumber
    // }
    cy.get('#accountSelect')
        .select(accNumber)
        .should('contain', (accNumber))
});

Cypress.Commands.add("customerDeposits", (custDepositValue) => {
    cy.get(ELEMENTSOP.btnDeposits)
    .should('contain', 'Deposit').click()
    cy.get('label')
    .should('contain', 'Amount to be Deposited')
    cy.get('.form-control')
    .clear()
    .type(custDepositValue)
    cy.get(ELEMENTSOP.btnConfirmDeposit).click()
    cy.get('.error')
    .should('contain', 'Deposit Successful')
});

Cypress.Commands.add("customerWithdrawls", (custWithdrawlValue) => {
    cy.get(ELEMENTSOP.btnWithdrawls)
    .should('contain', 'Withdrawl').click()
    cy.get('label')
    .should('contain', 'Amount to be Withdrawn')
    cy.get('.form-control')
    .clear()
    .type(custWithdrawlValue)
    cy.get(ELEMENTSOP.btnConfirmDeposit).click()
    cy.get('.error')
    .should('contain', 'Transaction successful')
});

Cypress.Commands.add("custoLogout", () => {
    cy.get('.logout')
    .should('contain', 'Logout').click()
    cy.get('#userSelect')
    .should('be.visible')
});
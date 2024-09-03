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

// API Interactions ||

Cypress.Screenshot.defaults({
    capture: "runner",
});

// Booking API      ||
// Endpoint         ||
//                  ||

let bookingUrl = 'https://restful-booker.herokuapp.com/booking'
let bookingUrlAuth = 'https://restful-booker.herokuapp.com/auth'
let bookingUrlId = 'https://restful-booker.herokuapp.com/booking/'

Cypress.Commands.add("verifyBookingEndpoint", () => {
    cy.api(bookingUrl)
        .its('status')
        .should('eq', 200)
});

let tokenBooking

Cypress.Commands.add("createTokenBooking", () => {
    cy.api({
        method: 'POST',
        url: (bookingUrlAuth),
        body: {
            'username': 'admin',
            'password': 'password123'
        },
    }).then(function (response) {
        expect(response.status).to.eq(200);
        tokenBooking = response.body.token;
        console.log(tokenBooking)
    })
})

let idBooking

Cypress.Commands.add("submitNewBooking", () => {
    cy.api({
        method: 'POST',
        url: (bookingUrl),
        body: {
            "firstname": "Harry",
            "lastname": "Potter",
            "totalprice": 777,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2022-01-01",
                "checkout": "2022-01-07"
            },
        }
    }).then(function (response) {
        idBooking = response.body.bookingid;
        console.log(idBooking)
        expect(response.status).to.eq(200);
    })
})

Cypress.Commands.add("userGetsBooking", () => {
    cy.request({
        method: 'GET',
        url: (bookingUrlId + (idBooking)),
    }).then(function (response) {
        expect(response.status).to.eq(200);
        console.log(response.body)
    })
})

Cypress.Commands.add("userUpdatesBooking", () => {
    cy.api({
        method: 'PUT',
        url: (bookingUrlId + (idBooking)),
        body: {
            "firstname": "Harry",
            "lastname": "Potter",
            "totalprice": 888,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2022-01-01",
                "checkout": "2022-01-10"
            },
            "additionalneeds": "Ferrari"
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': ('token=' + tokenBooking)
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        console.log(response.body)
    })
})
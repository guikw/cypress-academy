#language: en
Feature: Operation Customer

Background: Access URL Base
    Given I access bank Website
    When the bank Website return status 200
    Then user sees the welcome Bank Website

    Scenario: Customer Operation
    Given user login is a Customer
    When select Customer Login "Harry Potter"
    When clicks on Login button
    Then "Harry Potter" access the bank account
    Given customer selects Account '1005'
    When customer Deposits '1000'
    When customer Withdrawls '500'
    Then customer Logouts


#language: en
Feature: Login Manager

Background: Access URL Base
    Given I access bank Website
    When the bank Website return status 200
    Then user sees the welcome Bank Website

    Scenario Outline: Manager Login: Add Customer
    Given user login is a Manager
    When selects to add a Customer
    When fill '<FirstName>' '<LastName>' '<PostCode>'
    Then submit new Customer and assert be successful
    Examples:
        | FirstName | LastName | PostCode |
        | Johnny    | Deep     | 777      |

    Scenario: Manager Login: Open Account
    Given user login is a Manager
    When selects to Open Account
    When select Customer Login "Harry Potter"
    When select type Currency "Dollar"
    Then process new Account and assert be sucessful

    Scenario Outline: Manager Login: Customers Search
    Given user login is a Manager
    When selects to see Customers
    When search for Customer '<FirstName>' 
    Then asserts this '<FirstName>' in the table
    Examples:
        | FirstName |
        | Harry     |




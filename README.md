## Enviroment Settings
* Install Node.js: Go to the official website, download and install the version for your computer.
* Install VSCode
* Install plugins in VSCode:
    * Cucumber (Gherkin) Full Support: For Cucumber snippets and templates.
    * vscode-icons: For better visualization of project file icons.
    * vscode-cy-helper: Enables "Go to Definition" for Cypress custom commands.
* Install cypress: npm install cypress --save-dev (Warning: antivirus may block).
* Install other project dependencies: npm install
<!-- * Install Allure Report: Scoop (for windows) can be used to install Allure in an automatic way, or do it manually: https://docs.qameta.io/allure/ -->

## Project Structure
* integration: files with test scenarios written in BDD format.
* plugin/index.js: this file is intended for configuring plugins. It is used to configure Cucumber, for example.
* support: this folder contains the steps, scripts and test elements mapping.
    * steps: steps that will make the connection between the BDD and the Cypress scripts.
    * commands: Cypress test scripts.
* node_modules: project dependencies, should not be tampered with.
* cypress.config.js: file that contains the project's global settings. Eg: global variables, browser resolution, default URL, among others.

## Installation of Packages
To install project dependencies:
- open the terminal and access the folder where the project is installed;
- in the same directory where the 'package.json' file is, run the command npm install;
- then finish installing the files for Cypress and then it will be displayed: npx cypress open.

*Observation*
If an error occurs when installing Cypress due to incompatibility with the architecture of the operating system, perform the following procedure:
- In the 'package.json' file locate the Cypress dependency and delete it;
- Then run the command in the terminal npm install cypress;
- After finishing run the command npx cypress open.

### > Official Cypress Documentation and Other Useful Links
* https://docs.cypress.io/ - Cypress Documentation
* https://cucumber.io/docs/cucumber/ - Cucumber Documentation
* https://www.npmjs.com/package/cypress-cucumber-preprocessor - Cypress+Cucumber Documentation
* https://docs.qameta.io/allure/ - Allure Documentation
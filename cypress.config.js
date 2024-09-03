const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  projectId: 'tkonth',
  video: false,
  e2e: {
    
    defaultCommandTimeout: 10000,
    experimentalSessionAndOrigin: true,
    
    async setupNodeEvents(on, config) {

      on('after:screenshot', (details) => {
        console.log(details) // print all details to terminal

        const newPath = 'cypress/support/screenshots/screenshot.png'

        return new Promise((resolve, reject) => {
          // fs.rename moves the file to the existing directory 'new/path/to'
          // and renames the image to 'screenshot.png'
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err)

            // because we renamed and moved the image, resolve with the new path
            // so it is accurate in the test results
            resolve({ path: newPath })
          })
        })
      })

      allureWriter(on, config);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },

    env: {
      allureReuseAfterSpec: true
    },

    specPattern: "cypress/integration/**/**/*.feature",
    baseUrl: "https://www.globalsqa.com/angularJs-protractor/BankingProject",
    chromeWebSecurity: false,
  },

});


/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
/**
 * @type {Cypress.PluginConfig}
 */
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    log(message) {
      console.log(message)
      return null
    }
  });
}

/**
* @type {Cypress.PluginConfig}
*/
const fs = require('fs')
const path = require("path");

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    log(message) {
      console.log(message)
      return null
    }
  });
  on('task', {
    readDir(folderName) {
      return new Promise((resolve, reject) => {
        fs.readdir(folderName, (err, files) => {
          if (err) {
            return reject(err)
          }
          resolve(files)
        })
      })
    },
  });
  on('task', {
    removeFiles(path) {
      removeDir(path);
      return true;
    }
  });
}

const removeDir = function (path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          fs.rmdirSync(path + "/" + filename, {
            recursive: true,
          });
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
    } else {
      console.log("No files found in the directory.")
    }
  } else {
    console.log("Directory path not found.")
  }
}

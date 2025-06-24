const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
        // viewportWidth: 1920, // Exemplo de largura para uma tela Full HD
        // viewportHeight: 1080, // Exemplo de altura para uma tela Full HD
    setupNodeEvents(on, config) {
      // implement node event listeners here
     },
     watchForFileChanges: false,      
  }
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
        // viewportWidth: 1920, // Exemplo de largura para uma tela Full HD
        // viewportHeight: 1080, // Exemplo de altura para uma tela Full HD
    setupNodeEvents(on, config) {
      // on('before:browser:launch', (browser = {}, launchOptions) => {
      //   if (browser.name === 'chrome' || browser.name === 'chromium' || browser.name === 'electron') {
      //     launchOptions.args.push('--enable-unsafe-swiftshader');
      //   }
      //   return launchOptions;
      // });
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium' || browser.name === 'electron') {
          launchOptions.args.push('--disable-gpu');
        }
        return launchOptions;
      });
     },
     watchForFileChanges: false,      
     specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Adapte ao padrão dos seus arquivos de teste
     browser: 'firefox',
     // --- Início da Configuração do Reporter Mochawesome ---
     reporter: 'mochawesome',
     reporterOptions: {
      reportDir: 'cypress/results',     // Diretório onde os relatórios JSON e HTML temporários serão salvos
      overwrite: false,                 // Não sobrescreve relatórios antigos, cria novos com timestamp
      html: false,                      // Não gera HTML imediatamente (vamos usar mochawesome-merge para isso)
      json: true,                       // Gera arquivos JSON para cada spec, que serão mesclados depois
      timestamp: 'mmddyyyy_HHMMss',     // Adiciona timestamp aos nomes dos arquivos JSON
     },
    // --- Fim da Configuração do Reporter Mochawesome ---
  },
  env: {
     TEST_USER_EMAIL: 'sara_rafaela_farias@carreiradasilva.com',
     TEST_USER_PASSWORD: 'sara_rafaela_farias',
     TEST_USER_NAME: 'Sara',
  },
});

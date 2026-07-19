# Imagem oficial do Cypress com navegadores inclusos (versão LTS estável em 2026)
FROM cypress/included:13.15.1

# Definir o diretório de trabalho dentro do container
WORKDIR /e2e

# Copiar os arquivos de gerenciamento de dependências
COPY package.json package-lock.json* ./

# Instalar dependências adicionais do projeto (se houver, como plugins ou cucumber)
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Comando padrão caso o container seja executado sem parâmetros (modo headless)
CMD ["npx", "cypress", "run"]
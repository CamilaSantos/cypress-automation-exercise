#!/bin/bash

# --- INÍCIO DO SCRIPT ---

echo "========================================"
echo "  Assistente de Commit e Push Diário    "
echo "========================================"

# Verifica se há alterações para commitar
if git diff-index --quiet HEAD --; then
    echo "Nenhuma alteração a ser commitada. Verifique se você salvou os arquivos e adicionou-os ao Git."
    read -p "Deseja continuar mesmo assim e tentar um push? (s/N): " confirm_continue
    if [[ ! "$confirm_continue" =~ ^[Ss]$ ]]; then
        echo "Operação cancelada."
        exit 0
    fi
fi

# Garante que todas as alterações estejam stageadas
echo "Executando: git add ."
git add .
if [ $? -ne 0 ]; then
    echo "Erro ao adicionar arquivos. Abortando."
    exit 1
fi

echo "========================================"
echo "  EXECUTANDO TESTES CYPRESS E GERANDO RELATÓRIOS LOCAIS  "
echo "========================================"

# Isso simula o nome da tag ou branch que você usaria no Actions
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPORT_NAME="${CURRENT_BRANCH}_$(date +'%Y%m%d_%H%M%S')" # Nome do relatório com branch e timestamp

# 1. Executa os testes Cypress (gerará os arquivos JSON em cypress/results)
echo "Executando: npx cypress run"
npx cypress run
if [ $? -ne 0 ]; then
    echo "ATENÇÃO: Testes Cypress falharam! No entanto, continuaremos com o processo de commit/push."
    # Se você quiser que o script aborte se os testes falharem, descomente a linha abaixo:
    # exit 1
fi

# 2. Mescla os arquivos JSON dos relatórios
echo "Executando: npx mochawesome-merge cypress/results/*.json > cypress/results/mochawesome-combined.json"
npx mochawesome-merge cypress/results/*.json > cypress/results/mochawesome-combined.json
if [ $? -ne 0 ]; then
    echo "Erro ao mesclar relatórios. Abortando."
    exit 1
fi

# 3. Gera o relatório HTML a partir do JSON mesclado
echo "Executando: npx marge cypress/results/mochawesome-combined.json --reportDir cypress/reports --reportFilename ${REPORT_NAME} --inline"
npx marge cypress/results/mochawesome-combined.json --reportDir cypress/reports --reportFilename ${REPORT_NAME} --inline
if [ $? -ne 0 ]; then
    echo "Erro ao gerar relatório HTML. Abortando."
    exit 1
fi


# 4. Limpeza dos arquivos JSON temporários
echo "Limpando arquivos JSON temporários..."
rm -f cypress/results/*.json # Remove todos os JSONs individuais e o combinado

echo "========================================"
echo "  GERAÇÃO DE RELATÓRIOS LOCAIS CONCLUÍDA  "
echo "  (Relatórios não serão enviados para o GitHub)  "
echo "========================================"

# Captura as alterações stageadas e as classifica
MODIFIED_FILES=$(git diff --name-only --diff-filter=M --cached)
ADDED_FILES=$(git diff --name-only --diff-filter=A --cached)
DELETED_FILES=$(git diff --name-only --diff-filter=D --cached)

# Monta o corpo da mensagem de commit em uma única linha
COMMIT_BODY=""
SEPARATOR=" | " # Escolha seu separador, por exemplo: " | ", ", ", " - "

declare -a parts # Declara um array para armazenar as partes da mensagem

if [ -n "$MODIFIED_FILES" ]; then
    # Substitui as quebras de linha por espaços para saída em linha única e une com o separador
    parts+=("Arquivos atualizados: $(echo "$MODIFIED_FILES" | tr '\n' ' ' | sed 's/ $//')")
fi

if [ -n "$ADDED_FILES" ]; then
    parts+=("Novos arquivos (inseridos): $(echo "$ADDED_FILES" | tr '\n' ' ' | sed 's/ $//')")
fi

if [ -n "$DELETED_FILES" ]; then
    parts+=("Arquivos removidos: $(echo "$DELETED_FILES" | tr '\n' ' ' | sed 's/ $//')")
fi

# Une todas as partes com o separador escolhido
if [ ${#parts[@]} -gt 0 ]; then
    IFS="$SEPARATOR" # Define o separador de campo interno
    COMMIT_BODY="${parts[*]}" # Une os elementos do array usando o IFS
fi

# Se não houver nenhuma alteração stageada, aborta (após o git add .)
if [ -z "$COMMIT_BODY" ]; then
    echo "Nenhuma alteração stageada após 'git add .'. Operação cancelada."
    exit 1
fi

# Monta a mensagem de commit final (cabeçalho + corpo)
COMMIT_MESSAGE="feat: Atualização do projeto ($COMMIT_BODY)"

echo "----------------------------------------"
echo "Preparando para commitar e enviar:"
echo "Mensagem de Commit:"
echo "$COMMIT_MESSAGE"
echo "----------------------------------------"

# 1. Executa git commit
echo "Executando: git commit -m \"$(echo "$COMMIT_MESSAGE")\""
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
    echo "Erro ao commitar. Abortando."
    exit 1
fi

# 2. Executa git push
echo "Executando: git push origin develop"
git push origin develop
if [ $? -ne 0 ]; then
    echo "Erro ao fazer push para o GitHub. Verifique sua conexão ou credenciais."
    exit 1
fi

echo "========================================"
echo "  Sucesso! Alterações enviadas para o GitHub.  "
echo "  O GitHub Actions foi acionado.             "
echo "========================================"

# --- FIM DO SCRIPT ---
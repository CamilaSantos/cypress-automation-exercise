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

# Captura as alterações stageadas e as classifica
MODIFIED_FILES=$(git diff --name-only --diff-filter=M --cached)
ADDED_FILES=$(git diff --name-only --diff-filter=A --cached)
DELETED_FILES=$(git diff --name-only --diff-filter=D --cached)

# Monta o corpo da mensagem de commit
COMMIT_BODY=""

if [ -n "$MODIFIED_FILES" ]; then
    COMMIT_BODY+="Arquivos atualizados:\n"
    for file in $MODIFIED_FILES; do
        COMMIT_BODY+="  - $file\n"
    done
fi

if [ -n "$ADDED_FILES" ]; then
    if [ -n "$COMMIT_BODY" ]; then # Adiciona uma linha em branco se já houver conteúdo
        COMMIT_BODY+="\n"
    fi
    COMMIT_BODY+="Novos arquivos (inseridos):\n"
    for file in $ADDED_FILES; do
        COMMIT_BODY+="  - $file\n"
    done
fi

if [ -n "$DELETED_FILES" ]; then
    if [ -n "$COMMIT_BODY" ]; then # Adiciona uma linha em branco se já houver conteúdo
        COMMIT_BODY+="\n"
    fi
    COMMIT_BODY+="Arquivos removidos:\n"
    for file in $DELETED_FILES; do
        COMMIT_BODY+="  - $file\n"
    done
fi

# Se não houver nenhuma alteração stageada, aborta (após o git add .)
if [ -z "$COMMIT_BODY" ]; then
    echo "Nenhuma alteração stageada após 'git add .'. Operação cancelada."
    exit 1
fi

# Monta a mensagem de commit final (cabeçalho + corpo)
COMMIT_MESSAGE="feat: Atualização do projeto

$COMMIT_BODY"

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
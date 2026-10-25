# ==============================================================================
# Estágio 1: Builder (Compilação e instalação de dependências com ferramentas de build)
# ==============================================================================
FROM node:20-slim AS builder

WORKDIR /app

# Instalar ferramentas de build para módulos nativos C++ 
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de manifesto para aproveitar o cache de camadas
COPY package*.json ./

# Instalar apenas dependências de produção de forma determinística
RUN npm ci --omit=dev || npm install --omit=dev

# ==============================================================================
# Estágio 2: Runner (Imagem final de produção limpa, leve e segura)
# ==============================================================================
FROM node:20-slim AS runner

LABEL maintainer="TCC Monitoramento de Ar-Condicionado"

# Definir ambiente de produção
ENV NODE_ENV=production

WORKDIR /app

# Instalar curl para healthchecks e remover arquivos temporários do apt
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar dependências instaladas e compiladas do estágio builder
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Copiar o restante do código-fonte da aplicação
COPY . .

# Ajustar permissões para o usuário seguro não-root 'node' (já existente no Debian Node)
RUN chown -R node:node /app

# Alternar para o usuário não-root
USER node

# Expor porta da aplicação Express
EXPOSE 3000

# Verificação de integridade (Healthcheck)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/web/login || exit 1

# Comando de inicialização do servidor
CMD ["node", "src/server.js"]

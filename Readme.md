# Documentação da API e Testes

Esta documentação apresenta as entidades gerenciadas no sistema e disponibiliza exemplos de comandos para testar as rotas da API REST e a interface Web.

## 📌 Entidades do Sistema

### 1. User (Usuário)
Representa as contas de acesso ao sistema.
- `id`: Identificador único (gerado automaticamente)
- `nome`: Nome completo do usuário
- `email`: Endereço de email (deve ser único)
- `senha`: Senha do usuário
- `papel`: Nível de acesso e permissões (ex: "ADMIN", "USER")
- `data_criacao`: Data/hora em que a conta foi registrada no sistema (não é automático, deve ser enviado)

### 2. Sala
Representa o espaço físico (uma sala de aula, laboratório, etc).
- `id`: Identificador único (gerado automaticamente)
- `setor`: Setor ou prédio onde a sala se encontra (ex: "Setor de Aulas IV")
- `andar`: Andar em que a sala está localizada (ex: "2")
- `corredor`: Identificação do corredor (ex: "Corredor C")
- `nome_sala`: Nome ou número da sala (ex: "C2")
- `capacidade`: Quantidade máxima de pessoas (ex: "50")
- `endereco_mac_esp32`: Endereço MAC do dispositivo IoT controlador daquela sala

### 3. ArCondicionado
Representa um aparelho de ar-condicionado que está instalado e vinculado a uma `Sala`.
- `id`: Identificador único (gerado automaticamente)
- `sala_id`: ID da sala onde o ar-condicionado está fisicamente instalado
- `marca_modelo`: Fabricante e modelo (ex: "LG Dual Inverter")
- `status`: Estado atual do aparelho (ex: "desligado", "ligado")
- `temperatura_atual`: Temperatura configurada atualmente no aparelho (ex: 23)
- `codigo_ir_*`: Códigos infravermelhos gravados para comandar as funções de ligar, desligar e mudar temperatura.

---

## 🚀 Testes de Rotas (cURL)

Você pode usar os comandos abaixo diretamente no seu terminal bash para testar as rotas da API em pleno funcionamento. *(Certifique-se de que o servidor Node.js esteja rodando com `npm run dev` na porta 3000)*.

### 🔹 Usuários (/api/users)

**1. Listar todos os usuários:**
```bash
curl -X GET http://localhost:3000/api/users -H "Content-Type: application/json"
```

**2. Criar um novo usuário:**
```bash
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{
  "nome": "Professor Teste",
  "email": "professor.teste@ufrn.br",
  "senha": "senha123",
  "papel": "USER"
}'
```

### 🔹 Salas (/api/salas)

**1. Listar todas as salas:**
```bash
curl -X GET http://localhost:3000/api/salas -H "Content-Type: application/json"
```

**2. Criar uma nova sala:**
```bash
curl -X POST http://localhost:3000/api/salas \
-H "Content-Type: application/json" \
-d '{
  "setor": "Setor de Aulas II",
  "andar": "1",
  "corredor": "Corredor B",
  "nome_sala": "B1",
  "capacidade": "40",
  "endereco_mac_esp32": "AA:BB:CC:DD:EE:11"
}'
```

### 🔹 Ares-Condicionados (/api/arCondicionados)

**1. Listar todos os ares-condicionados:**
```bash
curl -X GET http://localhost:3000/api/arCondicionados -H "Content-Type: application/json"
```

**2. Criar um novo ar-condicionado:**
*(Atenção: Para o teste funcionar sem erros, você deve substituir o valor de `sala_id` abaixo por um ID real de uma sala que você obteve no comando de "Listar salas")*
```bash
curl -X POST http://localhost:3000/api/arCondicionados \
-H "Content-Type: application/json" \
-d '{
  "sala_id": "COLOQUE_UM_ID_DE_SALA_AQUI",
  "marca_modelo": "Samsung WindFree",
  "status": "desligado",
  "temperatura_atual": 24
}'
```

---

## 🌐 Rotas de Interface Web (Renderização em PUG)

As seguintes rotas não retornam JSON, e sim páginas HTML renderizadas diretamente pelo backend. Para testá-las, basta clicar nos links e visualizá-las no seu navegador:

- [Lista de Usuários (Web)](http://localhost:3000/web/users)
- [Lista de Salas (Web)](http://localhost:3000/web/salas)
- [Lista de Ares-Condicionados (Web)](http://localhost:3000/web/ar-condicionados)

*Caso queira ver o código HTML gerado através do terminal:*
```bash
curl -X GET http://localhost:3000/web/salas
```

---

## 🐳 Executando com Docker e Docker Compose

O projeto está configurado para execução via Docker Compose, subindo de forma orquestrada o **Backend Node.js** e o broker MQTT **Eclipse Mosquitto**.

### 1. Iniciar os Serviços

Para construir as imagens e subir os contêineres em segundo plano:
```bash
docker compose up -d --build
# ou via script npm:
npm run docker:up
```

### 2. Verificar Status dos Contêineres

```bash
docker compose ps
```
Você verá:
- `tcc_mosquitto` (rodando nas portas `1883` para MQTT TCP e `9001` para WebSockets)
- `tcc_backend` (rodando na porta `3000`, conectado à rede interna do Mosquitto e ao MongoDB Atlas)

### 3. Visualizar Logs em Tempo Real

```bash
docker compose logs -f
# ou apenas do backend:
docker compose logs -f backend
# ou apenas do broker:
docker compose logs -f mosquitto
```

### 4. Parar os Contêineres

```bash
docker compose down
# ou via script npm:
npm run docker:down
```

---

## 📡 Testando a Comunicação MQTT (Mosquitto)

O broker MQTT está configurado com **autenticação obrigatória (conexões anônimas bloqueadas)**.

### Credenciais pré-configuradas:
- **Backend / Admin**:
  - Usuário: `admin_tcc`
  - Senha: `senha_segura_tcc_2026`
- **Dispositivo ESP32**:
  - Usuário: `esp32_device`
  - Senha: `senha_segura_esp32_2026`

### Comandos de Teste via Terminal:

**1. Assinar um tópico (escutar mensagens):**
```bash
docker compose exec mosquitto mosquitto_sub -u admin_tcc -P senha_segura_tcc_2026 -t "salas/+/temperatura" -v
```

**2. Publicar uma mensagem de teste:**
```bash
docker compose exec mosquitto mosquitto_pub -u esp32_device -P senha_segura_esp32_2026 -t "salas/C2/temperatura" -m '{"temperatura": 23.5, "umidade": 60}'
```

**3. Testar bloqueio de conexão anônima (deve falhar):**
```bash
docker compose exec mosquitto mosquitto_pub -t "teste" -m "deve falhar"
# Retorno esperado: Connection Refused: not authorised.
```


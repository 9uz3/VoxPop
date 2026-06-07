<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,50:5865F2,100:000000&height=200&section=header&text=VoxPop&fontSize=80&fontColor=FFFFFF&animation=fadeIn" width="100%"/>
</div>

<h1 align="center">VoxPop — Bot de Sugestoes para Discord</h1>

<p align="center">
  <a href="./README.md"><b>Voltar para selecao de idioma</b></a>
</p>

<p align="center">
  <b>Deixe sua comunidade ter voz.</b><br/>
  <sub>Envie, revise, aprove ou rejeite sugestoes com facilidade.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/discord.js-v14.18-5865F2?style=for-the-badge&logo=discord&logoColor=white&labelColor=000" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.0-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=000" />
  <img src="https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=000" />
  <img src="https://img.shields.io/badge/license-MIT-FF6B35?style=for-the-badge&labelColor=000" />
</p>

---

## Indice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como Usar](#como-usar)
- [Configuracao](#configuracao)
- [Comandos](#comandos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licenca](#licenca)

---

## Sobre

**VoxPop** (do latim *vox populi* — voz do povo) e um bot de sugestoes para Discord construido com **Discord.js v14** e **MongoDB**. Ele permite que membros do servidor enviem, revisem, aprovem ou rejeitem sugestoes atraves de um sistema organizado.

---

## Funcionalidades

- **Enviar sugestoes** via modais interativos
- **Aprovar / Rejeitar** sugestoes com cargos de revisao
- **Painel de sugestoes publicavel** em qualquer canal
- **Logs de auditoria detalhados** (criacao, aprovacao, rejeicao, admin)
- **Cargos de revisor personalizados** — apenas usuarios autorizados revisam
- **Configuracao multicanal** — painel, revisao e canais de log
- **Painel personalizavel** — titulo e descricao
- **Notificacoes via DM** para aprovacao/rejeicao

---

## Tecnologias

| Tecnologia | Versao | Finalidade |
|-----------|--------|------------|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime |
| [Discord.js](https://discord.js.org/) | 14.18 | API do Discord |
| [MongoDB](https://www.mongodb.com/) | 8.0 | Banco de dados |
| [Mongoose](https://mongoosejs.com/) | 8.9 | ODM para MongoDB |

---

## Como Usar

### Pre-requisitos

- Node.js **18+**
- Um bot no [Discord Developer Portal](https://discord.com/developers/applications)
- Uma instancia MongoDB (local ou [Atlas](https://www.mongodb.com/atlas))

### Instalacao

```bash
git clone https://github.com/9uz3/voxpop.git
cd voxpop
npm install
```

### Configuracao Rapida

```bash
cp .env.example .env
```

Edite o arquivo **`.env`**:

```env
DISCORD_TOKEN=seu_token_do_bot_aqui
MONGODB_URI=sua_string_de_conexao_mongodb_aqui
CLIENT_ID=seu_client_id_aqui
OWNER_ID=seu_id_do_discord_aqui
```

### Iniciar

```bash
npm start
```

---

## Configuracao

Use o comando `/painel` no Discord para acessar o painel administrativo:

| Botao | Funcao |
|--------|----------|
| **Configure Channels** | Definir canais de painel, revisao e logs gerais |
| **Configure Logs** | Definir canais de log de criacao, aprovacao e rejeicao |
| **Configure Title** | Personalizar o titulo do painel |
| **Configure Description** | Personalizar a descricao do painel |
| **Configure Roles** | Definir o cargo de revisor |
| **Publish Panel** | Publicar o painel no canal configurado |

---

## Comandos

### Administracao

| Comando | Descricao |
|---------|-----------|
| `/painel` | Abre o painel de administracao do sistema |
| `/addpermi` | Adiciona um usuario como administrador |
| `/removerpermi` | Remove acesso de administrador de um usuario |

---

## Estrutura do Projeto

```
voxpop/
├── index.js                    # Entrypoint
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── index.js                # Configuracao principal do bot
    ├── config/
    │   └── config.js           # Ambiente e constantes
    ├── database/
    │   └── mongoose.js         # Conexao com MongoDB
    ├── models/
    │   ├── Suggestion.js       # Schema de sugestao
    │   ├── AdminPermission.js  # Permissoes de admin
    │   ├── GuildSettings.js    # Configuracao do servidor
    │   └── AuditLog.js         # Schema de log de auditoria
    ├── commands/
    │   ├── painel.js           # Comando do painel admin
    │   ├── addpermi.js         # Adicionar permissao
    │   └── removerpermi.js     # Remover permissao
    ├── events/
    │   ├── ready.js            # Evento de inicializacao
    │   └── interactionCreate.js# Manipulador de interacoes
    ├── handlers/
    │   ├── commandHandler.js   # Carregador de comandos
    │   └── eventHandler.js     # Carregador de eventos
    └── interactions/
        ├── buttons/
        │   ├── buttonRouter.js
        │   ├── approveSuggestion.js
        │   ├── rejectSuggestion.js
        │   ├── submitSuggestion.js
        │   ├── publishPanel.js
        │   ├── configChannels.js
        │   ├── configLogs.js
        │   ├── configTitle.js
        │   ├── configDesc.js
        │   └── configRoles.js
        ├── modals/
        │   ├── modalRouter.js
        │   ├── submitSuggestion.js
        │   └── rejectReason.js
        └── selectMenus/
            └── selectMenuRouter.js
```

---

## Licenca

Distribuido sob a licenca **MIT**.

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,50:5865F2,100:000000&height=120&section=footer" width="100%"/>
  <br/><br/>
  <sub>Feito por <a href="https://github.com/9uz3">Andriel</a></sub>
</div>

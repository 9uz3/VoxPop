<div align="center">

# 🗣️ VoxPop

### Discord Suggestion Bot — Let your community have a voice.

![Discord.js](https://img.shields.io/badge/discord.js-v14.18-%235865F2?logo=discord&logoColor=white)
![Node](https://img.shields.io/badge/node-%3E%3D18.0-%23339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-%2347A248?logo=mongodb&logoColor=white)
![Licença](https://img.shields.io/badge/license-MIT-%23FF6B35)

---

</div>

## 📋 Index

- [About](#-about)
- [Features](#-features)
- [Technologies](#-technologies)
- [How to Use](#-how-to-use)
- [Configuration](#-configuration)
- [Commands](#-commands)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🧠 About

**VoxPop** (from Latin *vox populi* — voice of the people) is a Discord suggestion bot built with **Discord.js v14** and **MongoDB**. It allows server members to submit, review, approve, or reject suggestions through a clean and organized system.

---

## ✨ Features

- 💡 **Submit suggestions** via interactive modals
- ✅ **Approve / Reject** suggestions with review roles
- 📢 **Publishable suggestion panel** in any channel
- 📜 **Detailed audit logs** (creation, approval, rejection, admin actions)
- 🎭 **Custom reviewer roles** — only authorized users can review
- 📁 **Multi-channel config** — panel, review, and log channels
- 📝 **Customizable panel** — title and description
- 🔔 **DM notifications** for approval/rejection

---

## 🛠️ Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Node.js](https://nodejs.org/) | ≥ 18 | Runtime |
| [Discord.js](https://discord.js.org/) | 14.18 | Discord API |
| [MongoDB](https://www.mongodb.com/) | 8.0 | Database |
| [Mongoose](https://mongoosejs.com/) | 8.9 | ODM for MongoDB |

---

## 🚀 How to Use

### Prerequisites

- Node.js **18+**
- A bot on the [Discord Developer Portal](https://discord.com/developers/applications)
- A MongoDB instance (local or [Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# Clone the repository
git clone https://github.com/9uz3/voxpop.git

# Navigate to the folder
cd voxpop

# Install dependencies
npm install
```

### Quick Setup

```bash
# Create the environment file
cp .env.example .env
```

Edit the **`.env`** file:

```env
DISCORD_TOKEN=your_bot_token_here
MONGODB_URI=your_mongodb_connection_string_here
CLIENT_ID=your_client_id_here
OWNER_ID=your_discord_id_here
```

### Start

```bash
npm start
```

---

## ⚙️ Configuration

Use the `/painel` command in Discord to access the admin panel:

| Button | Function |
|--------|----------|
| 📁 **Configure Channels** | Set panel, review, and general log channels |
| 📜 **Configure Logs** | Set creation, approval, rejection, and admin log channels |
| 📝 **Configure Title** | Customize the suggestion panel title |
| 📄 **Configure Description** | Customize the suggestion panel description |
| 🎭 **Configure Roles** | Set the reviewer role |
| 🚀 **Publish Panel** | Publish the suggestion panel to the configured channel |

---

## 📁 Commands

### Administration

| Command | Description |
|---------|-------------|
| `/painel` | Opens the suggestion system admin panel |
| `/addpermi` | Adds a user to system administrators |
| `/removerpermi` | Removes administrator access from a user |

---

## 📂 Project Structure

```
voxpop/
├── index.js                    # Entrypoint
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── index.js                # Main bot setup
    ├── config/
    │   └── config.js           # Environment & constants
    ├── database/
    │   └── mongoose.js         # MongoDB connection
    ├── models/
    │   ├── Suggestion.js       # Suggestion schema
    │   ├── AdminPermission.js  # Admin permissions
    │   ├── GuildSettings.js    # Guild configuration
    │   └── AuditLog.js         # Audit log schema
    ├── commands/
    │   ├── painel.js           # Admin panel command
    │   ├── addpermi.js         # Add admin permission
    │   └── removerpermi.js     # Remove admin permission
    ├── events/
    │   ├── ready.js            # Bot ready event
    │   └── interactionCreate.js# Interaction handler
    ├── handlers/
    │   ├── commandHandler.js   # Slash command loader
    │   └── eventHandler.js     # Event loader
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

## 📄 License

Distributed under the **MIT** license.

---

<div align="center">

Made with ❤️ by [Andriel](https://github.com/9uz3)

</div>

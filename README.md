# How to Send Push Notifications in Medusa using Firebase

This repository is the codebase of tutorial [How to Send Push Notifications in Medusa using Firebase](tutorial-link).

[Medusa Documentation](https://docs.medusajs.com/) | [Medusa Website](https://medusajs.com/) | [Medusa Repository](https://github.com/medusajs/medusa)

## Medusa Version

This tutorial uses Medusa v1.7.12. It is not guaranteed that it will work with future releases.

## Prerequisites

- [Node.js at least v14](https://docs.medusajs.com/tutorial/set-up-your-development-environment#nodejs)
- [Git](https://docs.medusajs.com/tutorial/set-up-your-development-environment/#git)
- [Medusa CLI](https://docs.medusajs.com/tutorial/set-up-your-development-environment#medusa-cli)
- [Redis](https://docs.medusajs.com/tutorial/set-up-your-development-environment/#redis)
- [Firebase Account](https://firebase.google.com/)

## How to Install

1. Clone this repository:

```bash
git clone git@github.com:menard-codes/FirebaseMedusaNotifications.git
```

2. Change directory and install dependencies:

```bash
cd backend && npm install
cd ../admin && yarn
cd ../storefront && yarn
```

3. Start the Servers:

```bash
# Open 3 terminal windows:

# start backend
cd backend && medusa develop

# start admin
cd admin && yarn dev

# start storefront
cd storefront && yarn dev
```

## Other Resources

[Firebase Documentation](https://firebase.google.com/docs)

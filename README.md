# GalèreBuddy - Partage d'anecdotes professionnelles loufoques

## ✨ Qu'est-ce que GalèreBuddy ?
GalèreBuddy est une application web et mobile permettant aux employés de partager des anecdotes amusantes et parfois douloureuses sur leurs expériences professionnelles.

Le but est d'améliorer la création de liens amicaux entre employés tout en partageant des situations techniques cocasses avec une touche d'humour.

---

## 📚 Fonctionnalités
- ✏️ **Partage d'anecdotes** : Racontez vos moments de galère de manière humoristique.
- 📷 **Ajout de médias** : Ajoutez une image, un GIF ou une photo à votre anecdote.
- 📝 **Template prédéfini** : Structurez votre anecdote avec les champs suivants :
  - **Titre**
  - **Illustration** (image, GIF, photo)
  - **Problème rencontré**
  - **Solution trouvée**
  - **Conseil**
  - **Leçon apprise**
- 💬 **Interaction** : Commentez et likez les anecdotes des autres employés.
- 📈 **Classement des anecdotes** : Les anecdotes les plus drôles et instructives sont mises en avant.

---

## 📄 Exemples d'anecdotes

### 💀 Le jour où MongoDB m'a fait pleurer
- **Illustration** : ![Image d'illustration](https://example.com/mongodb-gif.gif)
- **Problème** : Requête qui prenait 5 minutes au lieu de 50 millisecondes.
- **Solution trouvée** : Création d'un index composite stratégique.
- **Conseil** : Toujours profilez vos requêtes !
- **Leçon** : Parfois, un petit changement peut tout résoudre 😅

---

## 🚀 Technologies utilisées
- **Backend** : [NestJS](https://nestjs.com/) avec [Prisma](https://www.prisma.io/) pour la gestion de la base de données.
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Token) + Passport.js
- **Frontend Web** : React
- **Temps réel** : WebSocket via Socket.IO

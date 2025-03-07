import { IPost } from "@/types/Post";

const POSTS: IPost[] = [
  {
    id: "b9a60ec8-7bb2-4a75-9d36-43046e73cbce",
    title: "Le jour où MongoDB m'a fait pleurer",
    imageUrl: "https://via.placeholder.com/500x300?text=MongoDB+Tears",
    problem:
      "J'ai passé 3 jours à comprendre pourquoi ma requête prenait 5 minutes au lieu de 50 millisecondes.",
    solution:
      "Après des heures de débogage, j'ai découvert qu'il me manquait un index composite crucial.",
    advice:
      "Toujours profiler vos requêtes MongoDB avant de les mettre en production!",
    lesson: "Parfois, un petit changement peut résoudre un problème énorme.",
    createdAt: new Date("2025-03-06T12:44:08.360Z"),
    updatedAt: new Date("2025-03-06T12:44:08.360Z"),
    authorId: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
    author: {
      id: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
      name: "test",
      avatarUrl: "sdflsdfkhsdlk",
    },
    tags: [],
    comments: [],
    _count: {
      reactions: 0,
      comments: 0,
    },
  },

  {
    id: "b9a60ec8-7bb2-4a75-9d36-43046e73cbce-2",
    title: "Le jour où MongoDB m'a fait pleurer",
    imageUrl: "https://via.placeholder.com/500x300?text=MongoDB+Tears",
    problem:
      "J'ai passé 3 jours à comprendre pourquoi ma requête prenait 5 minutes au lieu de 50 millisecondes.",
    solution:
      "Après des heures de débogage, j'ai découvert qu'il me manquait un index composite crucial.",
    advice:
      "Toujours profiler vos requêtes MongoDB avant de les mettre en production!",
    lesson: "Parfois, un petit changement peut résoudre un problème énorme.",
    createdAt: new Date("2025-03-06T12:44:08.360Z"),
    updatedAt: new Date("2025-03-06T12:44:08.360Z"),
    authorId: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
    author: {
      id: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
      name: "test",
      avatarUrl: "sdflsdfkhsdlk",
    },
    tags: [],
    comments: [],
    _count: {
      reactions: 0,
      comments: 0,
    },
  },

  {
    id: "b9a60ec8-7bb2-4a75-9d36-43046e73cbce-1",
    title: "Le jour où MongoDB m'a fait pleurer",
    imageUrl: "https://via.placeholder.com/500x300?text=MongoDB+Tears",
    problem:
      "J'ai passé 3 jours à comprendre pourquoi ma requête prenait 5 minutes au lieu de 50 millisecondes.",
    solution:
      "Après des heures de débogage, j'ai découvert qu'il me manquait un index composite crucial.",
    advice:
      "Toujours profiler vos requêtes MongoDB avant de les mettre en production!",
    lesson: "Parfois, un petit changement peut résoudre un problème énorme.",
    createdAt: new Date("2025-03-06T12:44:08.360Z"),
    updatedAt: new Date("2025-03-06T12:44:08.360Z"),
    authorId: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
    author: {
      id: "c62747d1-8bd9-4160-86a6-04bfc362a5c9",
      name: "test",
      avatarUrl: "sdflsdfkhsdlk",
    },
    tags: [],
    comments: [],
    _count: {
      reactions: 0,
      comments: 0,
    },
  },
];

export {POSTS}

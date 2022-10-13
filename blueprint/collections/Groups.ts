import { app, collection, field, relation, shortcuts, faker } from "../utils";

export const Groups = collection({
  id: "Groups",
  representedBy: "title",
  fields: [field.string("title")],
  mock: {
    count: 10,
  },
  relations: [
    relation({
      id: "todos",
      to: "ToDos",
      inversedBy: "group",
    }),
    relation({
      id: "user",
      to: "Users",
    }),
  ],
});

import { app, collection, field, relation, shortcuts, faker } from "../utils";

export const ToDos = collection({
  id: "ToDos",
  representedBy: "content",
  description: "Item in the to do list group",
  fields: [
    field.string("content"),
    field.integer("order"),
    field.boolean("isDone"),
  ],
  mock: {
    count: 100,
  },
  relations: [
    relation({
      id: "group",
      to: "Groups",
    }),
    relation({
      id: "user",
      to: "Users"
    })
  ],
});

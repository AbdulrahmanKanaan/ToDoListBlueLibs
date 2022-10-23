import { Constructor } from "@bluelibs/core";
import { Collection } from "@bluelibs/mongo-bundle";
import { NotAuthorizedException } from "../exceptions";

interface IAuthorizeMutationOptions {
  message?: string;
  idResolver?: (args: any) => any | Promise<any>;
  userIdResolver?: (document: any) => any | Promise<any>;
}

export function AuthorizeMutation<T>(
  collectionClass: Constructor<Collection<T>>,
  { message, idResolver, userIdResolver }: IAuthorizeMutationOptions = {}
) {
  if (!idResolver) {
    idResolver = (args) => args._id;
  }
  if (!userIdResolver) {
    userIdResolver = (document) => document.userId;
  }
  if (!message) {
    message = "Cannot mutate for another user";
  }
  return async function AuthorizeMutation(_, args, ctx, ast) {
    const { userId, container } = ctx;
    const collection = container.get(collectionClass);
    const document = await collection.findOne({ _id: await idResolver(args) });
    const documentUserId = await userIdResolver(document);
    if (!userId.equals(documentUserId)) {
      throw new NotAuthorizedException({ message });
    }
  };
}

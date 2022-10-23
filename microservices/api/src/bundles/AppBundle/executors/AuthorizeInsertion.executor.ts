import { NotAuthorizedException } from "../exceptions";

interface IAuthorizeInsertionOptions {
  message?: string;
  userIdResolver?: (document: any) => any | Promise<any>;
}

export function AuthorizeInsertion({
  message,
  userIdResolver,
}: IAuthorizeInsertionOptions) {
  if (!message) {
    message = "Cannot insert for another user";
  }
  if (!userIdResolver) {
    userIdResolver = (args) => args.document.userId;
  }
  return async function AuthorizeInsertion(_, args, ctx) {
    const { userId } = ctx;
    if (!userId.equals(await userIdResolver(args))) {
      throw new NotAuthorizedException({ message });
    }
  };
}

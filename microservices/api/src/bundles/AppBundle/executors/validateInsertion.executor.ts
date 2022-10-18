interface IValidateInsertionOptions {
  message?: string;
}

export function validateInsertion({ message }: IValidateInsertionOptions) {
  return async function validateInsertion(_, args, ctx) {
    const { document: input } = args;
    const { userId } = ctx;
    console.log("123hamadi", input, userId);
    if (!userId.equals(input.userId)) {
      throw new Error(message || "Cannot insert for another user");
    }
  };
}

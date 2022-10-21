interface IValidateInsertionOptions {
  message?: string;
  inputKey?: string;
}

export function validateInsertion({
  message,
  inputKey = "document",
}: IValidateInsertionOptions) {
  return async function validateInsertion(_, args, ctx) {
    const { [inputKey]: input } = args;
    const { userId } = ctx;
    console.log(input, userId);
    if (!userId.equals(input.userId)) {
      throw new Error(message || "Cannot insert for another user");
    }
  };
}

import { ResultSymbol } from "@bluelibs/graphql-bundle";
import { ResolverArguments } from "./types";

export function argumentsMapper(...extra: any[]) {
  return function argumentsMapper(args, ctx, ast): ResolverArguments[] {
    const userId = ctx.userId;
    const carry = ctx?.[ResultSymbol];
    return [{ args, userId, carry, ast, ctx }, ...extra];
  };
}

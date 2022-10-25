import { ObjectId } from "@bluelibs/ejson";

export type ResolverArguments<T = any> = {
  args: T;
  userId: ObjectId;
  carry?: any;
  ast: any;
  ctx: any;
};

export const ServiceMethods: <T>(M: keyof T) => typeof M = (S) => S;
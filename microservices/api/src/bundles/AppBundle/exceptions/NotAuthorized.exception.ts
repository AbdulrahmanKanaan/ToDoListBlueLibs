import { Exception } from "@bluelibs/core";

export interface INotAuthorizedExceptionData {
  message: string;
}

export class NotAuthorizedException extends Exception<INotAuthorizedExceptionData> {
  private defaultMessage: string = `You are not authorized to do this action.`;

  getMessage() {
    // Note: you have access to this.data
    const { message } = this.data;
    return message || this.defaultMessage;
  }
}

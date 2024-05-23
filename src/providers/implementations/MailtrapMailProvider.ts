import { IMailProvider, IMessage } from "../IMailProvider";

export class MailtrapMailProvider implements IMailProvider {
  async sendMail(message: IMessage): Promise<void> {}
}

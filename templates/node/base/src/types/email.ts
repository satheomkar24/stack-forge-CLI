import type { Attachment } from "nodemailer/lib/mailer";

type EmailAddress = string | string[];

export type EmailOptions = {
  subject: string;
  html: string;
  to: EmailAddress;
  cc?: EmailAddress;
  bcc?: EmailAddress;
  attachments?: Attachment[];
};

export type BulkEmailItem = {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
};

export type ActivationMailParams = {
  email: string;
  name: string;
  token: string;
  frontendUrl: string;
};

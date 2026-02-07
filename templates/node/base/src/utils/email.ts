import nodemailer from "nodemailer";
import { env } from "@config/env";
import type { BulkEmailItem, EmailOptions } from "types";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (email: EmailOptions) => {
  return transporter.sendMail({
    from: `"Support" <${env.SMTP_USER}>`,
    ...email,
  });
};

export const sendBulkEmails = async (emails: BulkEmailItem[]) => {
  await Promise.all(
    emails.map((email) =>
      transporter.sendMail({
        from: `"Support" <${env.SMTP_USER}>`,
        ...email,
      }),
    ),
  );
};

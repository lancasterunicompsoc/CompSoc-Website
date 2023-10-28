import { Resend } from "resend";

type Headers = {
  "List-Unsubscribe"?: string;
};

type EmailParams = {
  from: string;
  to: string | string[];
  subject: string;
  reply_to?: string;
  bcc?: string | string[];
  headers?: Headers;
} & ({ html: string } | { text: string });

export function sendEmail({ subject, to, bcc, ...params }: EmailParams) {
  const { resend_key: resendKey } = useRuntimeConfig();
  const resend = new Resend(resendKey);
  if (import.meta.env.DEV) {
    subject = `DEV - ${subject}`;
  }
  const options = { to, bcc, subject, ...params };
  return resend.emails.send(options);
}

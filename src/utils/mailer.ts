declare const MG_DOMAIN_NAME: string;
declare const MG_API_KEY: string;

const MG_API_URL = `https://api.mailgun.net/v3/${MG_DOMAIN_NAME}/messages`;

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  cc?: string;
  bcc?: string;
  'h-Reply-To'?: string;
  'o:testmode'?: boolean;
  template?: string;
  'h:X-Mailgun-Variables'?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlEncodeObject(obj: { [s: string]: any }) {
  return Object.keys(obj)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&');
}

export function isValidEmail(email: string): boolean {
  const res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return res.test(email);
}

export function sendEmail(data: EmailData): Promise<Response> {
  const dataUrlEncoded = urlEncodeObject(data);
  const fetchOpts = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`api:${MG_API_KEY}`),
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': dataUrlEncoded.length.toString(),
    },
    body: dataUrlEncoded,
  };

  return fetch(MG_API_URL, fetchOpts);
}

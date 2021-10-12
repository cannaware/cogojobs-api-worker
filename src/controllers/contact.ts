import { sendEmail, isValidEmail } from '../utils/mailer';

export async function sendContactForm(request: Request): Promise<Response> {
  const { to: toEmail } = await request.json();

  if (toEmail && isValidEmail(toEmail)) {
    const sendResponse = await sendEmail({
      from: 'Cogojobs <info@cogojobs.com>',
      to: toEmail,
      subject: 'New Contact email',
      template: 'template-base',
    });

    if (sendResponse.status === 200) {
      return new Response(JSON.stringify({ message: 'Message succesfully sent' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Email submission failed' }), {
      headers: { 'content-type': 'application/json' },
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid email address' }), {
    headers: { 'content-type': 'application/json' },
    status: 400,
  });
}

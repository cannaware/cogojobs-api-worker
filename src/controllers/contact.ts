import { sendEmail, isValidEmail } from '../utils/mailer';

export async function sendContactForm(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const toEmail = searchParams.get('to');

  if (toEmail && isValidEmail(toEmail)) {
    console.log('toEmail >', toEmail);
    const sendResponse = await sendEmail({
      from: 'Cogojobs <info@cogojobs.com>',
      to: toEmail,
      subject: 'New Contact email',
      text: 'Hello test email',
      html: 'Hello test HTML <strong>email</strong>',
    });

    if (sendResponse.status == 200) {
      return new Response(JSON.stringify({ message: 'Message succesfully sent' }), {
        headers: { 'content-type': 'text/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Email submission failed' }), {
      headers: { 'content-type': 'text/json' },
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid email address' }), {
    headers: { 'content-type': 'text/json' },
    status: 400,
  });
}

import { sendEmail, isValidEmail } from '../utils/mailer';

export async function sendContactForm(request: Request): Promise<void> {
  const { searchParams } = new URL(request.url);
  const toEmail = searchParams.get('to');

  if (toEmail && isValidEmail(toEmail)) {
    console.log('toEmail >', toEmail);
    await sendEmail({
      from: 'info@cogojobs.com',
      to: toEmail,
      subject: 'New Contact email',
      text: 'Hello test email',
      html: 'Hello test HTML email',
    });
  }
}

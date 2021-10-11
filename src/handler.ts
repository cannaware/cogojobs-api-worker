import { sendContactForm } from './controllers/contact';

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === 'POST' && url.pathname.startsWith('/api/contact')) {
    await sendContactForm(request);
  }

  const response = new Response(`request method: ${request.method}, ${request.url}`);
  return response;
}

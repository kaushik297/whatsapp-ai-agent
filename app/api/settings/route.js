import { updateSettings } from '@/lib/whatsapp';

export async function POST(request) {
  const { role, language } = await request.json();
  updateSettings(role, language);
  return Response.json({ success: true });
}

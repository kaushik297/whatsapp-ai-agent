import { toggleAI } from '@/lib/whatsapp';

export async function POST() {
  const newState = toggleAI();
  return Response.json({ aiEnabled: newState });
}

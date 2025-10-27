import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, json, env }) => {
  try {
    const fd = await request.formData();

    // антиспам (скрытое поле в форме)
    if (String(fd.get('_gotcha') || '')) {
      json(200, { ok: true, skipped: 'honeypot' });
      return;
    }

    const services = fd.getAll('services').map(String);
    const email = String(fd.get('email') || '');
    const idea = String(fd.get('idea') || '');

    const BOT = env.get('TELEGRAM_BOT_TOKEN');
    const CHAT = env.get('TELEGRAM_CHAT_ID');

    if (!BOT || !CHAT) {
      json(200, { ok: false, reason: 'missing_env' });
      return;
    }
    if (!email) {
      json(200, { ok: false, reason: 'email_required' });
      return;
    }

    const text =
      `🆕 Новый бриф\n` +
      `• Услуги: ${services.join(', ') || '—'}\n` +
      `• Email: ${email}\n` +
      `• Идея: ${idea || '—'}`;

    const resp = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text }),
    });

    const tg = await resp.json();
    json(200, { ok: !!tg?.ok });
  } catch (e: any) {
    json(200, { ok: false, reason: 'exception' });
  }
};
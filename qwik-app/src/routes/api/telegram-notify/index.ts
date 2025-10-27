import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async (ev) => {
  // 1) Забираем form-data (а не JSON!)
  const fd = await ev.request.formData();

  // honeypot
  if ((fd.get('_gotcha') as string)?.trim()) {
    ev.json(200, { ok: true }); // молча игнорим ботов
    return;
  }

  const email = String(fd.get('email') ?? '');
  const idea = String(fd.get('idea') ?? '');
  const services = fd.getAll('services') as string[];

  // 2) Сборка сообщения
  const text =
    `🆕 <b>New brief from godevca.com</b>\n` +
    (services.length ? `🧩 <b>Services:</b> ${services.join(', ')}\n` : '') +
    (email ? `📧 <b>Email:</b> ${email}\n` : '') +
    (idea ? `💡 <b>Idea:</b> ${idea}\n` : '');

  // 3) Токены из .env (на Vercel тоже так)
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  // 4) Отправляем сообщение
  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  // 5) Отвечаем браузеру
  ev.json(200, { ok: tgRes.ok });
  // ВАЖНО: ничего не возвращаем (ни return ev.json, ни Response)
};
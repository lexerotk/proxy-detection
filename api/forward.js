export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight isteğine cevap ver
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Sadece POST isteklerine izin veriliyor.');
  }

  const webhookUrl = 'https://discord.com/api/webhooks/1365641719181479946/2hBBZAU7XDtoMiEjv0v3nOeRP5H2KHetDpNR0FdYLlGq4OuOjLD-7JVfOVquz7NPbvWq'; // BURAYA kendi webhook'unu yaz

  try {
    const forward = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!forward.ok) {
      throw new Error('Discord Webhook isteği başarısız oldu.');
    }

    return res.status(200).json({ message: 'Başarıyla iletildi.' });
  } catch (error) {
    console.error('Webhook forwarding error:', error);
    return res.status(500).json({ message: 'Bir hata oluştu.' });
  }
}

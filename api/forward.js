export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Sadece POST isteklerine izin veriliyor.');
  }

  const webhookUrl = 'https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN'; // 🔥 BURAYA KENDİ WEBHOOK'unu koyacaksın

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

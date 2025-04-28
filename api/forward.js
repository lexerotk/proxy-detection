export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  if (req.method !== 'POST') {
    return res.status(405).send('WHAT ARE YOU DOING HERE?');
  }

  const webhookUrl = 'https://api.telegram.org/bot7904868022:AAGJ-6-V669RdFO137jkKMNy0ZbtcAyXjfU/sendMessage'; 

  try {
    const forward = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: "-1002579794170",
        text: req.text,
        parse_mode: "Markdown"
      })
    });

    if (!forward.ok) {
      throw new Error('Telegram bot gave an error.');
    }

    return res.status(200).json({ message: 'Successfully sent!' });
  } catch (error) {
    console.error('Webhook forwarding error:', error);
    return res.status(500).json({ message: 'An error happened.' });
  }
}

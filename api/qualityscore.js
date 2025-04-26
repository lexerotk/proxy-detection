export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP address not provided.' });
  }

  const apiKey = 'BURAYA_KENDİ_IPQUALITYSCORE_API_KEYİNİ_YAZ';

  try {
    const response = await fetch(`https://ipqualityscore.com/api/json/ip/${apiKey}/${ip}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('VPN Check API Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

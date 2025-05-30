export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP address not provided.' });
  }

  const apiKey = process.env.APIKEY;

  try {
    const response = await fetch(`http://proxycheck.io/v2/${ip}?key=${apiKey}&vpn=3&asn=1&cur=0&risk=1`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('API ERR:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

import * as fs from 'fs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow POST requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the Content-Type header

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else if (req.method === 'POST') {
    console.log(req.body);
    const { email } = req.body; // Extract email from form data

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    try {
      const data = await fs.promises.readdir('contactdata');
      await fs.promises.writeFile(`contactdata/${data.length + 1}.json`, JSON.stringify({ email }));
      res.status(200).json(data);
    } catch (error) {
      console.error('Error writing file:', error);
      res.status(500).json({ error: 'An error occurred while processing the form data' });
    }
  } else {
    res.status(500).json({ error: 'Unsupported method' });
  }
}

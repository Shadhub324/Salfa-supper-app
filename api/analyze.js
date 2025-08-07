export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No input provided' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are an education assistant that explains and analyzes academic topics simply and clearly for students.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
      }),
    });

    const json = await response.json();
    const output = json?.choices?.[0]?.message?.content || 'No analysis generated.';
    res.status(200).json({ analysis: output });
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze input.' });
  }
}

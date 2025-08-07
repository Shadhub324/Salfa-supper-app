export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Only POST allowed' });

  const { text } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are an academic assistant for school subjects. You summarize, explain, and analyze educational content clearly for students." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No analysis received.';
    res.status(200).json({ analysis: content });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

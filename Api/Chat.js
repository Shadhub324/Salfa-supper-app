export default async function handler(req) {
  const body = await req.json();
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: body.text }]
    })
  });

  const data = await resp.json();
  return new Response(JSON.stringify({ reply: data.choices?.[0]?.message?.content || "" }), {
    headers: { "Content-Type": "application/json" }
  });
}

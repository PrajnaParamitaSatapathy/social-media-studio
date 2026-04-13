export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    // 🛑 Validate input
    if (!idea || idea.trim() === "") {
      return Response.json(
        { error: "Idea is required" },
        { status: 400 }
      );
    }

    // 🧠 Strong prompt
    const prompt = `
You are an API that returns ONLY valid JSON.

Do NOT include any explanation, text, or formatting.
Do NOT write anything before or after JSON.

Return strictly this format:
{
  "slides": [
    { "title": "", "content": "" }
  ]
}

Rules:
- 4 to 6 slides
- Slide 1: Hook
- Middle: explanation
- Last: takeaway
- Simple language for parents

Idea: ${idea}
`;

    // 🤖 Call OpenAI API
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "";

    let slides;

    try {
      // 🔥 Extract JSON safely
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) throw new Error("No JSON found");

      const parsed = JSON.parse(jsonMatch[0]);

      slides = parsed.slides;
    } catch (err) {
      console.error("❌ RAW AI RESPONSE:", text);

      // ✅ Fallback slides (app never breaks)
      slides = [
        {
          title: "Hook",
          content: idea,
        },
        {
          title: "Problem",
          content: "Kids often forget what they learn due to lack of revision.",
        },
        {
          title: "Concept",
          content: "This is explained by the forgetting curve.",
        },
        {
          title: "Solution",
          content: "Spaced repetition helps strengthen memory over time.",
        },
        {
          title: "Takeaway",
          content: "Revise smart, not hard!",
        },
      ];
    }

    return Response.json({ slides });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea || idea.trim() === "") {
      return Response.json({ error: "Idea is required" }, { status: 400 });
    }

    // Mock slides (temporary)
    const slides = [
      { title: "Hook", content: "Why do kids forget what they learn?" },
      { title: "Problem", content: "Memory fades without revision." },
      { title: "Concept", content: "This is called the forgetting curve." },
      { title: "Solution", content: "Spaced repetition improves retention." },
      { title: "Takeaway", content: "Revise smart, not hard." },
    ];

    return Response.json({ slides });

  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
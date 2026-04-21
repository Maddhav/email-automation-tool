import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  const { email } = await request.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an email assistant. Analyze the email and respond in this exact JSON format:
        {
          "category": "one of: Complaint, Inquiry, Urgent, Spam, General",
          "summary": "one sentence summary of the email",
          "reply": "a professional reply to this email"
        }
        Return only the JSON, nothing else.`,
      },
      {
        role: "user",
        content: `Analyze this email: ${email}`,
      },
    ],
  });

  const result = JSON.parse(response.choices[0].message.content);
  return Response.json(result);
}
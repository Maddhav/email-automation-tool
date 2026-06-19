import { cookies } from "next/headers"

export async function GET(request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("gmail_token")?.value
  const { searchParams } = new URL(request.url)
  const pageToken = searchParams.get("pageToken")

  if (!token) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    // Calculate 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const dateString = thirtyDaysAgo.toISOString().split('T')[0] // YYYY-MM-DD

    // Fetch emails from last 30 days - up to 100 per page
    const listRes = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=100&q=after:${dateString}${pageToken ? `&pageToken=${pageToken}` : ""}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    const list = await listRes.json()

    if (!list.messages) {
      return Response.json({ emails: [], nextPageToken: null })
    }

    // Get full details for each email
    const emails = await Promise.all(
      list.messages.map(async (msg) => {
        const detailRes = await fetch(
          `https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        const detail = await detailRes.json()

        const headers = detail.payload.headers || []
        const getHeader = (name) => headers.find(h => h.name === name)?.value || ""

        let body = ""
        if (detail.payload.parts) {
          const textPart = detail.payload.parts.find(p => p.mimeType === "text/plain")
          if (textPart && textPart.body.data) {
            body = Buffer.from(textPart.body.data, "base64").toString("utf-8")
          }
        } else if (detail.payload.body?.data) {
          body = Buffer.from(detail.payload.body.data, "base64").toString("utf-8")
        }

        return {
          id: msg.id,
          from: getHeader("From"),
          subject: getHeader("Subject"),
          date: getHeader("Date"),
          snippet: detail.snippet || body.slice(0, 200),
          body: body,
        }
      })
    )

    return Response.json({ 
      emails,
      nextPageToken: list.nextPageToken || null
    })
  } catch (error) {
    console.error("Gmail API error:", error)
    return Response.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
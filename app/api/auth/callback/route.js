import { cookies } from "next/headers"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return Response.redirect("http://localhost:3000?error=no_code")
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      grant_type: "authorization_code",
    }),
  })

  const tokens = await tokenRes.json()
  
  // LOG THIS
  console.log("Token response:", tokens)

  if (!tokens.access_token) {
    console.log("NO ACCESS TOKEN - Full response:", JSON.stringify(tokens, null, 2))
    return Response.redirect("http://localhost:3000?error=no_token")
  }

  // Get user info
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  })
  const user = await userRes.json()

  // Store in cookie
  const cookieStore = await cookies()
  cookieStore.set("gmail_token", tokens.access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600,
    path: "/",
  })
  cookieStore.set("user_email", user.email, {
    httpOnly: false,
    maxAge: 3600,
    path: "/",
  })
  cookieStore.set("user_name", user.name, {
    httpOnly: false,
    maxAge: 3600,
    path: "/",
  })

  return Response.redirect("http://localhost:3000/dashboard")
}
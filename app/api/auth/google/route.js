export async function GET() {
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  
  googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID)
  googleAuthUrl.searchParams.set("redirect_uri", "http://localhost:3000/api/auth/callback")
  googleAuthUrl.searchParams.set("response_type", "code")
  googleAuthUrl.searchParams.set("scope", "openid email profile https://www.googleapis.com/auth/gmail.readonly")
  googleAuthUrl.searchParams.set("access_type", "offline")
  googleAuthUrl.searchParams.set("prompt", "consent")

  return Response.redirect(googleAuthUrl.toString())
}
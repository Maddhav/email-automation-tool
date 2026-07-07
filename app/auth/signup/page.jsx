"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [usernameError, setUsernameError] = useState("");
  const router = useRouter();

  function checkPasswordStrength(pwd) {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    setPasswordStrength(strength);
    return strength;
  }

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (passwordStrength < 3) {
      setError("Password must include: 8+ chars, uppercase, numbers, and special characters (!@#$%^&*)");
      setLoading(false);
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      const { data, error: insertError } = await supabase
        .from("users")
        .insert([{ email, username, password_hash: passwordHash, name }])
        .select();

      if (insertError) {
        if (insertError.message.includes("duplicate") || insertError.message.includes("Unique")) {
          if (insertError.message.includes("username")) {
            setError("Username already taken. Choose another.");
          } else {
            setError("Email already exists. Try logging in instead.");
          }
        } else {
          setError(insertError.message);
        }
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", data[0].id);
      localStorage.setItem("user_email", email);
      localStorage.setItem("username", username);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const passwordStrengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const passwordStrengthLabels = ["Very Weak", "Weak", "Good", "Strong"];

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

         <div>
  <label className="text-xs text-gray-400 mb-1 block">Username</label>
  <input
    type="text"
    placeholder="madhav_soni"
    value={username}
    onChange={async (e) => {
      const newUsername = e.target.value;
      setUsername(newUsername);
      
      if (newUsername.length > 0) {
        // Check if username exists
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("username", newUsername)
          .single();
        
        if (data) {
          setUsernameError("Username already taken");
        } else {
          setUsernameError("");
        }
      }
    }}
    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    required
  />
  {usernameError && <p className="text-xs text-red-400 mt-1">{usernameError}</p>}
</div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${
                        i < passwordStrength ? passwordStrengthColors[passwordStrength - 1] : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Strength: <span className={passwordStrength >= 3 ? "text-green-400" : "text-red-400"}>
                    {passwordStrengthLabels[passwordStrength]}
                  </span>
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p className={password.length >= 8 ? "text-green-400" : ""}>
                    {password.length >= 8 ? "✓" : "○"} 8+ characters
                  </p>
                  <p className={/[A-Z]/.test(password) ? "text-green-400" : ""}>
                    {/[A-Z]/.test(password) ? "✓" : "○"} Uppercase letter
                  </p>
                  <p className={/[0-9]/.test(password) ? "text-green-400" : ""}>
                    {/[0-9]/.test(password) ? "✓" : "○"} Number
                  </p>
                  <p className={/[!@#$%^&*]/.test(password) ? "text-green-400" : ""}>
                    {/[!@#$%^&*]/.test(password) ? "✓" : "○"} Special character (!@#$%^&*)
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || passwordStrength < 3 || usernameError}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
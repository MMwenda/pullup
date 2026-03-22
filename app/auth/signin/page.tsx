"use client"; //tells next to render it on the client side

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleCredentialsSignIn() {
        if (!email || !password) return;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, 
            //on credentials sign in, this prevents nextAuth from redirecting automatically so we can handle the error ourselves and show it to the user
        });

        if (result?.error) {
            setError("Invalid email or password");
        } 
        else {
            router.push("/");
        }
    }

    return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "360px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}>
        <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "24px", color:"grey" }}>
          Sign in to PullUp
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          Continue with Google
        </button>

        <p style={{ textAlign: "center", color: "#888", marginBottom: "20px" }}>or</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{error}</p>
        )}

        <button
          onClick={handleCredentialsSignIn}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sign In
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "grey" }}>
            {/*eslint-disable-next-line */}
          Don't have an account?
          <a href="/auth/register" style={{ color: "#4285F4" }}> Register</a>
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "13px",
    boxSizing: "border-box",
    color:"grey"
}
//React.CSSProperties ensures you don't accidentally use invalid CSS properties and helps catch typos.
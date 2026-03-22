"use client"; //tells next to render it on the client side

// import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleRegister() {
        if(!name || !email || !password) return;

        const res = await fetch("/api/auth/register",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password})
        })

        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
        }
        else{
            router.push("/auth/signin");
    }}

    return(
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
                <h1 style={{color: "grey"}}>Sign up to PullUp</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
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
            <p>{error}</p>
        )}

        <button onClick={handleRegister}
                style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}>
            Register
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color:"grey" }}>
          Already have an account?
          <a href="/auth/signin" style={{ color: "#4285F4" }}> Sign in</a>
        </p>

            </div>
        </div>
    )
}


const inputStyle: React.CSSProperties = {
    color:"grey",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "13px",
    boxSizing: "border-box",
}
//React.CSSProperties ensures you don't accidentally use invalid CSS properties and helps catch typos
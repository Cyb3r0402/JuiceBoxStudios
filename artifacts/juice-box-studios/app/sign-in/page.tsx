"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn.email({ email: String(form.get("email")), password: String(form.get("password")) });
    if (result.error) setError("Unable to sign in with those credentials."); else { router.push("/admin"); router.refresh(); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground"><form onSubmit={submit} className="flex w-full max-w-md flex-col gap-5 border border-primary/30 bg-card p-8"><div><p className="text-sm font-bold uppercase tracking-widest text-primary">Juice Box Studios</p><h1 className="cinzel mt-2 text-3xl font-black">Admin sign in</h1><p className="mt-2 text-sm text-muted-foreground">Only the studio owner can manage published realms.</p></div><label className="flex flex-col gap-2 text-sm font-bold">Email<input name="email" type="email" required className="h-11 border border-white/15 bg-background px-3" /></label><label className="flex flex-col gap-2 text-sm font-bold">Password<input name="password" type="password" required className="h-11 border border-white/15 bg-background px-3" /></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button className="h-12 bg-primary font-bold uppercase tracking-widest text-primary-foreground">Sign in</button></form></main>;
}

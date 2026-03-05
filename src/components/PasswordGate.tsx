import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  onAuthenticated: (password: string) => void;
}

const PasswordGate = ({ onAuthenticated }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://sooalxvjhgrenelyrhov.supabase.co/functions/v1/dashboard-data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (res.status === 401) {
        setError("Wrong password");
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error("Server error");

      onAuthenticated(password);
    } catch {
      setError("Connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8 shadow-lg"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-card-foreground">
            Intent Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter password to continue
          </p>
        </div>

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading || !password}>
          {loading ? "Checking…" : "Enter"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordGate;

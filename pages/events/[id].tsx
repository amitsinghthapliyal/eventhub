// Event detail page (React + Next.js)

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
};

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      try {
        setLoading(true);
        setFetchError(false);
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userEmail, eventId: id }),
      });

      if (!res.ok) throw new Error("Failed to register");
      setStatus("success");
      setName("");
      setUserEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading event...</div>
    );
  }

  if (fetchError || !event) {
    return (
      <div className="text-center mt-10 text-red-500">
        Event not found or failed to load.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/events" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Events
      </Link>

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(event.date).toLocaleString()} @ {event.location}
      </p>
      <p className="mb-6">{event.description}</p>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border p-2 w-full rounded"
        />
        <input
          type="email"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Registering..." : "Register"}
        </button>

        {status === "success" && (
          <p className="text-green-600">Registered successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-600">Registration failed. Please try again.</p>
        )}
      </form>
    </div>
  );
}

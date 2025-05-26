// Event listing page (React + Next.js)
import Link from "next/link";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // events per page

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(`/api/events?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data.events || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching events:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading events...</div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="border p-4 mb-2 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {events.length > 0 && (
        <div className="flex justify-start gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 mt-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

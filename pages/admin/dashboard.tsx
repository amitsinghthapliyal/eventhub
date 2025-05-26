// Dashboard for admin to see daily stats and polular events
import { useEffect, useState } from "react";

type DailyStat = {
  date: string;
  count: number;
};

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  registrations: number;
};

export default function AdminDashboard() {
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);

      try {
        // Fetch daily registrations
        const dailyRes = await fetch("/api/admin/daily");
        if (!dailyRes.ok) throw new Error("Failed to fetch daily stats");
        const dailyData = await dailyRes.json();
        setDailyStats(dailyData || []);

        // Fetch paginated popular events
        const popularRes = await fetch(
          `/api/admin/popular?page=${page}&limit=${limit}`
        );
        if (!popularRes.ok) throw new Error("Failed to fetch popular events");
        const popularJson = await popularRes.json();

        setPopularEvents(popularJson.events || []);
        setTotalPages(popularJson.totalPages || 1);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setDailyStats([]);
        setPopularEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>

      {/* Daily Stats */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Daily Registrations</h2>
        {dailyStats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dailyStats.map((stat) => (
              <div
                key={stat.date}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {new Date(stat.date).toLocaleDateString()}
                </h3>
                <p className="text-sm text-gray-600">
                  {stat.count} registrations
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No daily registration data available.
          </p>
        )}
      </section>

      {/* Popular Events */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Top Events in Last 30 Days
        </h2>

        {popularEvents.length > 0 ? (
          <>
            <div className="space-y-4">
              {popularEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative border p-4 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {event.registrations} Registrations
                  </div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    {new Date(event.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">{event.location}</p>
                  <p className="text-sm text-gray-700">{event.description}</p>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-start items-center mt-6 space-x-4">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">
            No popular events found in the last 30 days.
          </p>
        )}
      </section>
    </div>
  );
}

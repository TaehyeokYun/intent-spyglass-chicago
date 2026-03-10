import { useState, useEffect, useMemo, useCallback } from "react";
import { format, parseISO, subDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import SummaryCards from "@/components/dashboard/SummaryCards";
import EventChart from "@/components/dashboard/EventChart";
import HourlyChart from "@/components/dashboard/HourlyChart";
import IntentMap from "@/components/dashboard/IntentMap";
import FiltersBar from "@/components/dashboard/FiltersBar";
import TopRestaurants from "@/components/dashboard/TopRestaurants";
import DailyUniqueVisitors from "@/components/dashboard/DailyUniqueVisitors";
import { Loader2 } from "lucide-react";

const TZ = "America/Chicago";

export interface IntentEvent {
  intent_event_id: string;
  event_name: string;
  created_at: string;
  restaurant_id: number | null;
  campaign_id: number | null;
  neighborhood: string | null;
  anonymous_install_id: string | null;
  screen_name: string | null;
  cta_label: string | null;
  source: string | null;
  distance_miles: number | null;
  listing_position: number | null;
  priority_listing: boolean | null;
  app_platform: string | null;
  session_id: string | null;
  city: string | null;
}

export interface Restaurant {
  restaurant_id: number | null;
  name: string | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

export interface Campaign {
  campaign_id: number | null;
  offer_name: string | null;
  restaurant_id: number | null;
  status: string | null;
}

interface DashboardProps {
  password: string;
}

const Dashboard = ({ password }: DashboardProps) => {
  const [events, setEvents] = useState<IntentEvent[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [daysBack, setDaysBack] = useState(30);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  const effectiveStartDate = useMemo(() => {
    if (daysBack === -1 && customStartDate) return customStartDate.toISOString();
    if (daysBack === -1) return subDays(new Date(), 30).toISOString();
    return subDays(new Date(), daysBack).toISOString();
  }, [daysBack, customStartDate]);

  const effectiveEndDate = useMemo(() => {
    if (daysBack === -1 && customEndDate) {
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59, 999);
      return end.toISOString();
    }
    return undefined;
  }, [daysBack, customEndDate]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://sooalxvjhgrenelyrhov.supabase.co/functions/v1/dashboard-data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            startDate: effectiveStartDate,
            endDate: effectiveEndDate,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(data.events || []);
      setRestaurants(data.restaurants || []);
      setCampaigns(data.campaigns || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [password, effectiveStartDate, effectiveEndDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const restMap = useMemo(() => {
    const m = new Map<number, Restaurant>();
    restaurants.forEach((r) => {
      if (r.restaurant_id != null) m.set(r.restaurant_id, r);
    });
    return m;
  }, [restaurants]);

  const neighborhoods = useMemo(
    () =>
      Array.from(new Set(restaurants.map((r) => r.neighborhood).filter(Boolean))).sort() as string[],
    [restaurants]
  );

  const eventNames = useMemo(
    () => Array.from(new Set(events.map((e) => e.event_name))).sort(),
    [events]
  );

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (neighborhoodFilter !== "all") {
        const rest = e.restaurant_id != null ? restMap.get(e.restaurant_id) : null;
        if (!rest || rest.neighborhood !== neighborhoodFilter) return false;
      }
      if (eventFilter !== "all" && e.event_name !== eventFilter) return false;
      return true;
    });
  }, [events, neighborhoodFilter, eventFilter, restMap]);

  // Daily aggregation
  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((e) => {
      const day = format(toZonedTime(parseISO(e.created_at), TZ), "yyyy-MM-dd");
      map.set(day, (map.get(day) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));
  }, [filtered]);

  // Hourly aggregation
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      label: `${i.toString().padStart(2, "0")}:00`,
      count: 0,
    }));
    filtered.forEach((e) => {
      const h = toZonedTime(parseISO(e.created_at), TZ).getHours();
      hours[h].count++;
    });
    return hours;
  }, [filtered]);

  // Unique users (total, deduplicated across period)
  const uniqueUsers = useMemo(
    () => new Set(filtered.map((e) => e.anonymous_install_id).filter(Boolean)).size,
    [filtered]
  );

  // Total daily unique visits (same user on different days counted each day)
  const totalDailyVisits = useMemo(() => {
    const map = new Map<string, Set<string>>();
    filtered.forEach((e) => {
      if (!e.anonymous_install_id) return;
      const day = format(toZonedTime(parseISO(e.created_at), TZ), "yyyy-MM-dd");
      if (!map.has(day)) map.set(day, new Set());
      map.get(day)!.add(e.anonymous_install_id);
    });
    return Array.from(map.values()).reduce((sum, set) => sum + set.size, 0);
  }, [filtered]);

  // Daily unique visitors
  const dailyUniqueVisitors = useMemo(() => {
    const map = new Map<string, Set<string>>();
    filtered.forEach((e) => {
      if (!e.anonymous_install_id) return;
      const day = format(toZonedTime(parseISO(e.created_at), TZ), "yyyy-MM-dd");
      if (!map.has(day)) map.set(day, new Set());
      map.get(day)!.add(e.anonymous_install_id);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, ids]) => ({ date, uniqueVisitors: ids.size }));
  }, [filtered]);

  // Top restaurants
  const topRestaurants = useMemo(() => {
    const map = new Map<number, number>();
    filtered.forEach((e) => {
      if (e.restaurant_id != null) {
        map.set(e.restaurant_id, (map.get(e.restaurant_id) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([id, count]) => ({
        restaurantId: id,
        name: restMap.get(id)?.name || `Restaurant #${id}`,
        neighborhood: restMap.get(id)?.neighborhood || "Unknown",
        count,
      }));
  }, [filtered, restMap]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-card-foreground tracking-tight">
            🦕 Dinersaur Intent Dashboard
          </h1>
          <span className="text-xs text-muted-foreground">Chicago · CST</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <FiltersBar
          neighborhoods={neighborhoods}
          neighborhoodFilter={neighborhoodFilter}
          setNeighborhoodFilter={setNeighborhoodFilter}
          eventNames={eventNames}
          eventFilter={eventFilter}
          setEventFilter={setEventFilter}
          daysBack={daysBack}
          setDaysBack={setDaysBack}
          customStartDate={customStartDate}
          setCustomStartDate={setCustomStartDate}
          customEndDate={customEndDate}
          setCustomEndDate={setCustomEndDate}
        />

        <SummaryCards
          totalEvents={filtered.length}
          uniqueUsers={uniqueUsers}
          totalDailyVisits={totalDailyVisits}
          topNeighborhood={
            topRestaurants.length > 0 ? topRestaurants[0].neighborhood : "—"
          }
          avgEventsPerDay={
            dailyData.length > 0
              ? Math.round(filtered.length / dailyData.length)
              : 0
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <EventChart data={dailyData} />
          <HourlyChart data={hourlyData} />
        </div>

        <DailyUniqueVisitors data={dailyUniqueVisitors} />

        <div className="grid gap-6 lg:grid-cols-2">
          <IntentMap events={filtered} restaurants={restMap} />
          <TopRestaurants data={topRestaurants} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

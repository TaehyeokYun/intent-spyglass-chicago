import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { IntentEvent, Restaurant } from "@/components/Dashboard";

interface Props {
  events: IntentEvent[];
  restaurants: Map<number, Restaurant>;
}

const IntentMap = ({ events, restaurants }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([41.8781, -87.6298], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) map.removeLayer(layer);
    });

    // Aggregate by restaurant
    const counts = new Map<number, number>();
    events.forEach((e) => {
      if (e.restaurant_id != null) {
        counts.set(e.restaurant_id, (counts.get(e.restaurant_id) || 0) + 1);
      }
    });

    const maxCount = Math.max(...Array.from(counts.values()), 1);

    counts.forEach((count, rid) => {
      const rest = restaurants.get(rid);
      if (!rest?.latitude || !rest?.longitude) return;

      const radius = 6 + (count / maxCount) * 20;
      L.circleMarker([rest.latitude, rest.longitude], {
        radius,
        fillColor: "#22c55e",
        color: "#16a34a",
        weight: 1,
        fillOpacity: 0.7,
      })
        .bindPopup(
          `<strong>${rest.name || `#${rid}`}</strong><br/>${rest.neighborhood || ""}<br/>${count} intent events`
        )
        .addTo(map);
    });

    return () => {};
  }, [events, restaurants]);

  useEffect(() => {
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground">
          Intent Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-80 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default IntentMap;

import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, UserCheck, MapPin, TrendingUp } from "lucide-react";

interface Props {
  totalEvents: number;
  uniqueUsers: number;
  returningVisitors: number;
  topNeighborhood: string;
  avgEventsPerDay: number;
}

const SummaryCards = ({ totalEvents, uniqueUsers, returningVisitors, topNeighborhood, avgEventsPerDay }: Props) => {
  const cards = [
    { label: "Total Events", value: totalEvents.toLocaleString(), icon: Activity, color: "text-primary" },
    { label: "Unique Visitors", value: uniqueUsers.toLocaleString(), icon: Users, color: "text-[hsl(var(--chart-3))]" },
    { label: "Returning Visitors", value: returningVisitors.toLocaleString(), icon: UserCheck, color: "text-[hsl(var(--chart-2))]" },
    { label: "Top Neighborhood", value: topNeighborhood, icon: MapPin, color: "text-accent" },
    { label: "Avg / Day", value: avgEventsPerDay.toLocaleString(), icon: TrendingUp, color: "text-[hsl(var(--chart-4))]" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label} className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl bg-muted p-2.5 ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
              <p className="text-xl font-bold text-card-foreground">{c.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;

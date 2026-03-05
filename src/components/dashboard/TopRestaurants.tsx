import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: { restaurantId: number; name: string; neighborhood: string; count: number }[];
}

const TopRestaurants = ({ data }: Props) => (
  <Card className="border-border bg-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-semibold text-card-foreground">
        Top 10 Restaurants by Intent
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">No data</p>
      )}
      {data.map((r, i) => (
        <div
          key={r.restaurantId}
          className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-card-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.neighborhood}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-card-foreground">
            {r.count.toLocaleString()}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default TopRestaurants;

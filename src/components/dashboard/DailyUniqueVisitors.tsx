import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DailyRow {
  date: string;
  uniqueVisitors: number;
}

interface Props {
  data: DailyRow[];
}

const DailyUniqueVisitors = ({ data }: Props) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground">
          Daily Unique Visitors (CST)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => v.slice(5)}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value: number) => [value, "Unique Visitors"]}
              />
              <Bar
                dataKey="uniqueVisitors"
                fill="hsl(var(--chart-3))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="max-h-64 overflow-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Unique Visitors
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No data for selected range
                  </TableCell>
                </TableRow>
              ) : (
                [...data].reverse().map((row) => (
                  <TableRow key={row.date}>
                    <TableCell className="text-card-foreground">
                      {row.date}
                    </TableCell>
                    <TableCell className="text-right font-medium text-card-foreground">
                      {row.uniqueVisitors.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyUniqueVisitors;

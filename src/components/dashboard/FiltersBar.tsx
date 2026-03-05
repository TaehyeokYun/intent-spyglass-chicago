import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  neighborhoods: string[];
  neighborhoodFilter: string;
  setNeighborhoodFilter: (v: string) => void;
  eventNames: string[];
  eventFilter: string;
  setEventFilter: (v: string) => void;
  daysBack: number;
  setDaysBack: (v: number) => void;
}

const FiltersBar = ({
  neighborhoods,
  neighborhoodFilter,
  setNeighborhoodFilter,
  eventNames,
  eventFilter,
  setEventFilter,
  daysBack,
  setDaysBack,
}: Props) => (
  <div className="flex flex-wrap items-center gap-3">
    <Select value={String(daysBack)} onValueChange={(v) => setDaysBack(Number(v))}>
      <SelectTrigger className="w-[140px] bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="14">Last 14 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
      </SelectContent>
    </Select>

    <Select value={neighborhoodFilter} onValueChange={setNeighborhoodFilter}>
      <SelectTrigger className="w-[180px] bg-card">
        <SelectValue placeholder="Neighborhood" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Neighborhoods</SelectItem>
        {neighborhoods.map((n) => (
          <SelectItem key={n} value={n}>
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select value={eventFilter} onValueChange={setEventFilter}>
      <SelectTrigger className="w-[200px] bg-card">
        <SelectValue placeholder="Event type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Events</SelectItem>
        {eventNames.map((n) => (
          <SelectItem key={n} value={n}>
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FiltersBar;

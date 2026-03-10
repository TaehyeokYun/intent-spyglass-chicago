import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  customStartDate: Date | undefined;
  setCustomStartDate: (d: Date | undefined) => void;
  customEndDate: Date | undefined;
  setCustomEndDate: (d: Date | undefined) => void;
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
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={String(daysBack)}
        onValueChange={(v) => {
          const num = Number(v);
          setDaysBack(num);
          if (num !== -1) {
            setCustomStartDate(undefined);
            setCustomEndDate(undefined);
          }
        }}
      >
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="14">Last 14 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="90">Last 90 days</SelectItem>
          <SelectItem value="-1">Custom range</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal bg-card",
                  !customStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customStartDate ? format(customStartDate, "MM/dd/yyyy") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customStartDate}
                onSelect={setCustomStartDate}
                disabled={(date) => date > new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <span className="text-muted-foreground text-sm">→</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal bg-card",
                  !customEndDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customEndDate ? format(customEndDate, "MM/dd/yyyy") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customEndDate}
                onSelect={setCustomEndDate}
                disabled={(date) =>
                  date > new Date() || (customStartDate ? date < customStartDate : false)
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

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
};

export default FiltersBar;

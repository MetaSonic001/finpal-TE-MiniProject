/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  List,
  Star,
} from "lucide-react";
import axios from "axios";

// Define types
interface EarningsEvent {
  id: string;
  symbol: string;
  name: string;
  logoUrl: string;
  date: string;
  time: "Before Market Open" | "After Market Close" | "Unknown";
  eps: {
    estimate: number | null;
    actual: number | null;
    surprise: number | null;
  };
  revenue: {
    estimate: number | null;
    actual: number | null;
    surprise: number | null;
  };
  isFavorite: boolean;
}

// Helper function to get date of monday for the current week
const getMondayOfCurrentWeek = (date: Date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

// Helper function to format date as "MMM D"
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper function to get the weekday name
const getWeekdayName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

// Helper function to generate dates for the week
const generateWeekDates = (startDate: Date) => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Mock companies data
const companyLogos: Record<string, string> = {
  PYPL: "https://logo.clearbit.com/paypal.com",
  PDD: "https://logo.clearbit.com/pinduoduo.com",
  WDS: "https://logo.clearbit.com/woodside.com.au",
  TCOM: "https://logo.clearbit.com/trip.com",
  HEI: "https://logo.clearbit.com/heico.com",
  ERB: "https://logo.clearbit.com/erbessd-instruments.com",
  SHTDY: "https://logo.clearbit.com/shopi.com",
  ARCHY: "https://logo.clearbit.com/archerydx.com",
  CTLT: "https://logo.clearbit.com/catalent.com",
  SNLAY: "https://logo.clearbit.com/sino-land.com",
  S: "https://logo.clearbit.com/sentinelone.com",
  FLGZY: "https://logo.clearbit.com/flughafen-zuerich.ch",
  PVH: "https://logo.clearbit.com/pvh.com",
  BOX: "https://logo.clearbit.com/box.com",
  JWN: "https://logo.clearbit.com/nordstrom.com",
  NCNO: "https://logo.clearbit.com/ncino.com",
  SMTC: "https://logo.clearbit.com/semtech.com",
  AMBA: "https://logo.clearbit.com/ambarella.com",
  NVDA: "https://logo.clearbit.com/nvidia.com",
  CRM: "https://logo.clearbit.com/salesforce.com",
  CRWD: "https://logo.clearbit.com/crowdstrike.com",
  LI: "https://logo.clearbit.com/lixiang.com",
  OKTA: "https://logo.clearbit.com/okta.com",
  HPQ: "https://logo.clearbit.com/hp.com",
  CHWY: "https://logo.clearbit.com/chewy.com",
  VEEV: "https://logo.clearbit.com/veeva.com",
  PSEC: "https://logo.clearbit.com/prospectstreet.com",
  PSTG: "https://logo.clearbit.com/purestorage.com",
  BACY: "https://logo.clearbit.com/bankofcyprus.com",
  CIHKY: "https://logo.clearbit.com/chinamerchants.com",
  DELL: "https://logo.clearbit.com/dell.com",
  MRVL: "https://logo.clearbit.com/marvell.com",
  ADSK: "https://logo.clearbit.com/autodesk.com",
  PRNDY: "https://logo.clearbit.com/pernod-ricard.com",
  LULU: "https://logo.clearbit.com/lululemon.com",
  DHKLY: "https://logo.clearbit.com/daiichisankyo.co.jp",
  DG: "https://logo.clearbit.com/dollargeneral.com",
  "BF-A": "https://logo.clearbit.com/brown-forman.com",
  BBY: "https://logo.clearbit.com/bestbuy.com",
  IDCBY: "https://logo.clearbit.com/icbc.com.cn",
  CSUAY: "https://logo.clearbit.com/chinasouthernairlines.com",
  CTPCY: "https://logo.clearbit.com/citicpacific.com",
  YZCAY: "https://logo.clearbit.com/yanzhou.com.cn",
  FRO: "https://logo.clearbit.com/frontline.com",
};

// Generate mock earnings data for the week
const generateMockEarningsData = (dates: Date[]): EarningsEvent[] => {
  const companies = [
    { symbol: "PYPL", name: "PayPal Holdings Inc" },
    { symbol: "PDD", name: "PDD Holdings" },
    { symbol: "WDS", name: "Woodside Energy Group" },
    { symbol: "TCOM", name: "Trip.com Group" },
    { symbol: "HEI", name: "HEICO" },
    { symbol: "ERB", name: "Erbe's Electricals" },
    { symbol: "SHTDY", name: "Shopify Inc" },
    { symbol: "ARCHY", name: "Archer Daniels Midland" },
    { symbol: "CTLT", name: "Catalent" },
    { symbol: "SNLAY", name: "Sino Land Company" },
    { symbol: "S", name: "SentinelOne" },
    { symbol: "FLGZY", name: "Flughafen Zürich" },
    { symbol: "PVH", name: "PVH Corp" },
    { symbol: "BOX", name: "Box Inc" },
    { symbol: "JWN", name: "Nordstrom" },
    { symbol: "NCNO", name: "nCino" },
    { symbol: "SMTC", name: "Semtech" },
    { symbol: "AMBA", name: "Ambarella" },
    { symbol: "NVDA", name: "Nvidia" },
    { symbol: "CRM", name: "Salesforce" },
    { symbol: "CRWD", name: "CrowdStrike" },
    { symbol: "LI", name: "Li Auto" },
    { symbol: "OKTA", name: "Okta" },
    { symbol: "HPQ", name: "HP Inc" },
    { symbol: "CHWY", name: "Chewy" },
    { symbol: "VEEV", name: "Veeva Systems" },
    { symbol: "PSEC", name: "Prospect Capital" },
    { symbol: "PSTG", name: "Pure Storage" },
    { symbol: "BACY", name: "Bank of Cyprus" },
    { symbol: "CIHKY", name: "China Merchants Bank" },
    { symbol: "DELL", name: "Dell Technologies" },
    { symbol: "MRVL", name: "Marvell" },
    { symbol: "ADSK", name: "Autodesk" },
    { symbol: "PRNDY", name: "Pernod Ricard" },
    { symbol: "LULU", name: "Lululemon Athletica" },
    { symbol: "DHKLY", name: "BOC Hong Kong" },
    { symbol: "DG", name: "Dollar General" },
    { symbol: "BF-A", name: "Brown Forman" },
    { symbol: "BBY", name: "Best Buy Co" },
    { symbol: "IDCBY", name: "Industrial Bank Co" },
    { symbol: "CSUAY", name: "China Southern Airlines" },
    { symbol: "CTPCY", name: "CITIC Pacific" },
    { symbol: "YZCAY", name: "Yankuang Energy" },
    { symbol: "FRO", name: "Frontline" },
  ];

  // Distribute companies across the week
  const data: EarningsEvent[] = [];
  const timeOptions: (
    | "Before Market Open"
    | "After Market Close"
    | "Unknown"
  )[] = ["Before Market Open", "After Market Close", "Unknown"];

  let id = 1;
  dates.forEach((date, dateIndex) => {
    // Assign about 7-10 companies per day
    const numCompanies = 7 + Math.floor(Math.random() * 4);
    const startIdx = (dateIndex * 9) % companies.length;

    for (let i = 0; i < numCompanies; i++) {
      const companyIdx = (startIdx + i) % companies.length;
      const company = companies[companyIdx];

      // For companies on dates that have already passed, generate actual results
      const now = new Date();
      const isPast = date < now;

      const estimateEps = parseFloat((Math.random() * 2 + 0.1).toFixed(2));
      const actualEps = isPast
        ? parseFloat((estimateEps * (0.9 + Math.random() * 0.3)).toFixed(2))
        : null;
      const epsSurprise = actualEps
        ? parseFloat(
            (((actualEps - estimateEps) / estimateEps) * 100).toFixed(2)
          )
        : null;

      const estimateRevenue = parseFloat((Math.random() * 5 + 0.5).toFixed(2));
      const actualRevenue = isPast
        ? parseFloat((estimateRevenue * (0.9 + Math.random() * 0.3)).toFixed(2))
        : null;
      const revenueSurprise = actualRevenue
        ? parseFloat(
            (
              ((actualRevenue - estimateRevenue) / estimateRevenue) *
              100
            ).toFixed(2)
          )
        : null;

      data.push({
        id: id.toString(),
        symbol: company.symbol,
        name: company.name,
        logoUrl: companyLogos[company.symbol] || "",
        date: date.toISOString().split("T")[0],
        time: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        eps: {
          estimate: estimateEps,
          actual: actualEps,
          surprise: epsSurprise,
        },
        revenue: {
          estimate: estimateRevenue,
          actual: actualRevenue,
          surprise: revenueSurprise,
        },
        isFavorite: Math.random() > 0.8, // Random favorite status
      });
      id++;
    }
  });

  return data;
};

export default function EarningsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMondayOfCurrentWeek()
  );
  const [weekDates, setWeekDates] = useState(
    generateWeekDates(currentWeekStart)
  );
  const [earningsData, setEarningsData] = useState<EarningsEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDay() >= 1 && new Date().getDay() <= 5
      ? new Date().getDay() - 1
      : 0
  );
  const [view, setView] = useState<"companies" | "filter">("companies");
  const [filter, setFilter] = useState<"all" | "am-pm">("all");
  const [countries, setCountries] = useState<"all" | string>("all");

  // Initialize with mock data
  useEffect(() => {
    const mockData = generateMockEarningsData(weekDates);
    setEarningsData(mockData);
  }, [weekDates]);

  // Function to navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
    setWeekDates(generateWeekDates(newDate));
    setSelectedDay(0); // Reset to Monday when changing weeks
  };

  // Function to navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
    setWeekDates(generateWeekDates(newDate));
    setSelectedDay(0); // Reset to Monday when changing weeks
  };

  // Function to toggle favorite status
  const toggleFavorite = (id: string) => {
    setEarningsData((prevData) =>
      prevData.map((event) =>
        event.id === id ? { ...event, isFavorite: !event.isFavorite } : event
      )
    );
  };

  // Function to filter earnings data for selected day
  const getEarningsForSelectedDay = () => {
    const selectedDate = weekDates[selectedDay].toISOString().split("T")[0];
    let filteredData = earningsData.filter(
      (event) => event.date === selectedDate
    );

    // Apply AM/PM filter if selected
    if (filter === "am-pm") {
      filteredData = filteredData.filter(
        (event) =>
          event.time === "Before Market Open" ||
          event.time === "After Market Close"
      );
    }

    return filteredData;
  };

  // Get the earnings for the selected day
  const filteredEarnings = getEarningsForSelectedDay();

  // Get month and year for the header (e.g., "Sep 13 - 17, 2024")
  const formatWeekRange = () => {
    const startMonth = weekDates[0].toLocaleDateString("en-US", {
      month: "short",
    });
    const startDay = weekDates[0].getDate();
    const endDay = weekDates[4].getDate();
    const year = weekDates[0].getFullYear();
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-600">
              Earnings Calendar
            </h2>
            <h1 className="text-2xl font-semibold">{formatWeekRange()}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex border-b mb-6">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`flex-1 py-2 px-4 text-center cursor-pointer ${
                selectedDay === index ? "border-b-2 border-red-500" : ""
              }`}
              onClick={() => setSelectedDay(index)}
            >
              <div
                className={`font-medium ${
                  selectedDay === index ? "text-red-500" : ""
                }`}
              >
                {getWeekdayName(date)} {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mb-4">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "companies" | "filter")}
          >
            <TabsList>
              <TabsTrigger value="companies">Popular Companies</TabsTrigger>
              <TabsTrigger value="filter">Filter Companies</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-2">
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as "all" | "am-pm")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="AM & PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Times</SelectItem>
                <SelectItem value="am-pm">AM & PM</SelectItem>
              </SelectContent>
            </Select>

            <Select value={countries} onValueChange={setCountries}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredEarnings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">EPS Est</TableHead>
                <TableHead className="text-right">EPS Act</TableHead>
                <TableHead className="text-right">EPS Surp</TableHead>
                <TableHead className="text-right">Rev Est ($B)</TableHead>
                <TableHead className="text-right">Rev Act ($B)</TableHead>
                <TableHead className="text-right">Rev Surp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEarnings.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="w-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleFavorite(event.id)}
                    >
                      <Star
                        className="h-4 w-4"
                        fill={event.isFavorite ? "gold" : "none"}
                        color={event.isFavorite ? "gold" : "gray"}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-2">
                        {event.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.logoUrl}
                            alt={event.symbol}
                            className="w-6 h-6"
                          />
                        ) : (
                          <span className="text-xs">
                            {event.symbol.substring(0, 1)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-xs text-gray-500">
                          {event.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`
                      px-2 py-1 rounded text-xs inline-block
                      ${
                        event.time === "Before Market Open"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        event.time === "After Market Close"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                      ${
                        event.time === "Unknown"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                    `}
                    >
                      {event.time === "Before Market Open"
                        ? "BMO"
                        : event.time === "After Market Close"
                        ? "AMC"
                        : "N/A"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {event.eps.estimate !== null
                      ? event.eps.estimate.toFixed(2)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {event.eps.actual !== null
                      ? event.eps.actual.toFixed(2)
                      : "-"}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      event.eps.surprise === null
                        ? ""
                        : event.eps.surprise > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {event.eps.surprise !== null
                      ? `${event.eps.surprise > 0 ? "+" : ""}${
                          event.eps.surprise
                        }%`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {event.revenue.estimate !== null
                      ? event.revenue.estimate.toFixed(2)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {event.revenue.actual !== null
                      ? event.revenue.actual.toFixed(2)
                      : "-"}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      event.revenue.surprise === null
                        ? ""
                        : event.revenue.surprise > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {event.revenue.surprise !== null
                      ? `${event.revenue.surprise > 0 ? "+" : ""}${
                          event.revenue.surprise
                        }%`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg border">
            <p className="text-gray-500">No earnings events for this day</p>
          </div>
        )}
      </div>
    </div>
  );
}

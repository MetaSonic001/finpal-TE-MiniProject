"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data - would be replaced with actual API data
const mockData = {
  PYPL: {
    Revenue: {
      "2014": 8.02,
      "2015": 9.24,
      "2016": 10.84,
      "2017": 13.09,
      "2018": 15.45,
      "2019": 17.77,
      "2020": 21.45,
      "2021": 25.37,
      "2022": 27.51,
      "2023": 29.77,
    },
    "Net Income": {
      "2014": 0.41,
      "2015": 1.22,
      "2016": 1.4,
      "2017": 1.79,
      "2018": 2.05,
      "2019": 2.45,
      "2020": 4.2,
      "2021": 4.16,
      "2022": 2.41,
      "2023": 4.24,
    },
  },
  V: {
    Revenue: {
      "2014": 12.7,
      "2015": 13.88,
      "2016": 15.08,
      "2017": 18.35,
      "2018": 20.6,
      "2019": 22.97,
      "2020": 21.84,
      "2021": 24.1,
      "2022": 29.31,
      "2023": 32.65,
    },
    "Net Income": {
      "2014": 5.43,
      "2015": 6.32,
      "2016": 5.99,
      "2017": 6.69,
      "2018": 10.3,
      "2019": 12.08,
      "2020": 10.86,
      "2021": 12.31,
      "2022": 14.95,
      "2023": 17.21,
    },
  },
};

// Transform data for the chart
const transformDataForChart = (data: any) => {
  const years = Object.keys(data["PYPL"]["Revenue"]);
  return years.map((year) => {
    const obj: any = { name: year };
    if (selectedCompanies.includes("PYPL")) {
      if (selectedMetrics.includes("Revenue")) {
        obj["PYPL Revenue"] = data["PYPL"]["Revenue"][year];
      }
      if (selectedMetrics.includes("Net Income")) {
        obj["PYPL Net Income"] = data["PYPL"]["Net Income"][year];
      }
    }
    if (selectedCompanies.includes("V")) {
      if (selectedMetrics.includes("Revenue")) {
        obj["V Revenue"] = data["V"]["Revenue"][year];
      }
      if (selectedMetrics.includes("Net Income")) {
        obj["V Net Income"] = data["V"]["Net Income"][year];
      }
    }
    return obj;
  });
};

let selectedCompanies = ["PYPL", "V"];
let selectedMetrics = ["Revenue", "Net Income"];

const ChartingPage = () => {
  const [timeframe, setTimeframe] = useState("Annual");
  const [displayUnit, setDisplayUnit] = useState("Billions");
  const [periodRange, setPeriodRange] = useState("10Y");
  const [companies, setCompanies] = useState(selectedCompanies);
  const [metrics, setMetrics] = useState(selectedMetrics);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // In a real implementation, you would fetch data from the API here
    selectedCompanies = companies;
    selectedMetrics = metrics;
    setChartData(transformDataForChart(mockData));
  }, [companies, metrics]);

  const removeCompany = (company: string) => {
    setCompanies(companies.filter((c) => c !== company));
  };

  const removeMetric = (metric: string) => {
    setMetrics(metrics.filter((m) => m !== metric));
  };

  const addCompany = () => {
    // This would open a dialog to select a company in a real implementation
    // For now, we'll just add a dummy company if one is removed
    if (!companies.includes("PYPL")) {
      setCompanies([...companies, "PYPL"]);
    } else if (!companies.includes("V")) {
      setCompanies([...companies, "V"]);
    }
  };

  const addMetric = () => {
    // This would open a dialog to select a metric in a real implementation
    // For now, we'll just add a dummy metric if one is removed
    if (!metrics.includes("Revenue")) {
      setMetrics([...metrics, "Revenue"]);
    } else if (!metrics.includes("Net Income")) {
      setMetrics([...metrics, "Net Income"]);
    }
  };

  // Define bar colors
  const barColors = {
    "PYPL Revenue": "#007bff",
    "PYPL Net Income": "#ff7f00",
    "V Revenue": "#28a745",
    "V Net Income": "#9932cc",
  };

  // Generate bars dynamically based on selected companies and metrics
  const generateBars = () => {
    const bars = [];
    if (companies.includes("PYPL")) {
      if (metrics.includes("Revenue")) {
        bars.push(
          <Bar
            key="PYPL-Revenue"
            dataKey="PYPL Revenue"
            fill={barColors["PYPL Revenue"]}
          />
        );
      }
      if (metrics.includes("Net Income")) {
        bars.push(
          <Bar
            key="PYPL-Net-Income"
            dataKey="PYPL Net Income"
            fill={barColors["PYPL Net Income"]}
          />
        );
      }
    }
    if (companies.includes("V")) {
      if (metrics.includes("Revenue")) {
        bars.push(
          <Bar
            key="V-Revenue"
            dataKey="V Revenue"
            fill={barColors["V Revenue"]}
          />
        );
      }
      if (metrics.includes("Net Income")) {
        bars.push(
          <Bar
            key="V-Net-Income"
            dataKey="V Net Income"
            fill={barColors["V Net Income"]}
          />
        );
      }
    }
    return bars;
  };

  // Format table data for display
  const formatTableData = () => {
    const years = Object.keys(mockData["PYPL"]["Revenue"]);
    return years.map((year) => {
      const row: any = { year };

      if (companies.includes("PYPL")) {
        if (metrics.includes("Revenue")) {
          row["PYPL Revenue"] = `$${mockData["PYPL"]["Revenue"][year]}B`;
        }
        if (metrics.includes("Net Income")) {
          row["PYPL Net Income"] = `$${mockData["PYPL"]["Net Income"][year]}B`;
        }
      }

      if (companies.includes("V")) {
        if (metrics.includes("Revenue")) {
          row["V Revenue"] = `$${mockData["V"]["Revenue"][year]}B`;
        }
        if (metrics.includes("Net Income")) {
          row["V Net Income"] = `$${mockData["V"]["Net Income"][year]}B`;
        }
      }

      return row;
    });
  };

  const tableData = formatTableData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Charting</h1>

      {/* Time period selectors */}
      <div className="flex mb-6 space-x-2">
        <div className="flex space-x-2">
          <Button
            variant={timeframe === "Annual" ? "default" : "outline"}
            onClick={() => setTimeframe("Annual")}
          >
            Annual
          </Button>
          <Button
            variant={timeframe === "Quarterly" ? "default" : "outline"}
            onClick={() => setTimeframe("Quarterly")}
          >
            Quarterly
          </Button>
        </div>

        <Select value={displayUnit} onValueChange={setDisplayUnit}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Units" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Billions">Billions</SelectItem>
            <SelectItem value="Millions">Millions</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex space-x-2">
          <Button
            variant={periodRange === "1Y" ? "default" : "outline"}
            onClick={() => setPeriodRange("1Y")}
            size="sm"
          >
            1Y
          </Button>
          <Button
            variant={periodRange === "2Y" ? "default" : "outline"}
            onClick={() => setPeriodRange("2Y")}
            size="sm"
          >
            2Y
          </Button>
          <Button
            variant={periodRange === "3Y" ? "default" : "outline"}
            onClick={() => setPeriodRange("3Y")}
            size="sm"
          >
            3Y
          </Button>
          <Button
            variant={periodRange === "5Y" ? "default" : "outline"}
            onClick={() => setPeriodRange("5Y")}
            size="sm"
          >
            5Y
          </Button>
          <Button
            variant={periodRange === "10Y" ? "default" : "outline"}
            onClick={() => setPeriodRange("10Y")}
            size="sm"
          >
            10Y
          </Button>
        </div>
      </div>

      {/* Selected filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {companies.map((company) => (
          <div
            key={company}
            className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md"
          >
            <span
              className={`mr-1 h-2 w-2 rounded-full ${
                company === "PYPL" ? "bg-blue-500" : "bg-green-500"
              }`}
            ></span>
            <span>{company}</span>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => removeCompany(company)}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={addCompany}
        >
          + Company
        </button>

        {metrics.map((metric) => (
          <div
            key={metric}
            className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md"
          >
            <span>{metric}</span>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => removeMetric(metric)}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={addMetric}
        >
          + Metric
        </button>
      </div>

      {/* Chart */}
      <Card className="p-6 mb-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {generateBars()}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              {tableData.map((row) => (
                <th
                  key={row.year}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {row.year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) =>
              metrics.map((metric) => (
                <tr key={`${company}-${metric}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 mr-2 rounded-full"
                        style={{
                          backgroundColor:
                            metric === "Revenue"
                              ? company === "PYPL"
                                ? barColors["PYPL Revenue"]
                                : barColors["V Revenue"]
                              : company === "PYPL"
                              ? barColors["PYPL Net Income"]
                              : barColors["V Net Income"],
                        }}
                      ></div>
                      {company} {metric}
                    </div>
                  </td>
                  {tableData.map((row) => (
                    <td
                      key={row.year}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {row[`${company} ${metric}`]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartingPage;

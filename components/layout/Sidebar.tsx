import React from "react";
import {
  Globe,
  BarChart3,
  Newspaper,
  Calendar,
  LineChart,
  TrendingUp,
  Activity,
  Users,
  Briefcase,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-48 bg-white border-r border-gray-200 p-4 hidden md:block">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-black rounded mr-2" />
        <span className="text-lg font-semibold">Markets</span>
      </div>

      <nav className="space-y-1">
        <Link
          href="/investment"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Globe className="w-4 h-4 mr-2" />
          Screener
        </Link>
        <Link
          href="/heatmaps"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Heatmaps
        </Link>
        <Link
          href="/news"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Newspaper className="w-4 h-4 mr-2" />
          News
        </Link>

        <div className="pt-4 text-xs text-gray-500">Calendar</div>
        <Link
          href="/investment/earnings"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Earnings
        </Link>
        <Link
          href="/investment/earnings"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <LineChart className="w-4 h-4 mr-2" />
          Economy
        </Link>

        <div className="pt-4 text-xs text-gray-500">Data</div>
        <Link
          href="/macro"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Macro
        </Link>
        <Link
          href="/charting"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Activity className="w-4 h-4 mr-2" />
          Charting
        </Link>
        <Link
          href="/comparison"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Comparison
        </Link>

        <div className="pt-4 text-xs text-gray-500">Community</div>
        <Link
          href="/investment/superinvestors"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Users className="w-4 h-4 mr-2" />
          Superinvestors
        </Link>
        <Link
          href="/investment/portfolios"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Portfolios
        </Link>
        <Link
          href="/posts"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <FileText className="w-4 h-4 mr-2" />
          Posts
        </Link>
        <Link
          href="/articles"
          className="py-2 px-3 flex items-center text-sm font-medium rounded hover:bg-gray-100"
        >
          <FileText className="w-4 h-4 mr-2" />
          Articles
        </Link>
      </nav>

      <div className="mt-8 pt-4 border-t border-gray-200 text-sm">
        <Link href="/business" className="py-2 block hover:underline">
          For Business
        </Link>
        <Link href="/mobile-app" className="py-2 block hover:underline">
          Get Mobile App
        </Link>
      </div>
    </div>
  );
}

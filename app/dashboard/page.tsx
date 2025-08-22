"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const filteredReports = reports.filter((report) => {
    const statusMatch = filter === "ALL" || report.status === filter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      RESOLVED: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      DISMISSED:
        "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>

            {/* Right Side */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="text-neutral-400 text-sm sm:text-base">
                {session?.user?.name || "Admin"}
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 sm:px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filters Row */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center sm:justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReportStatus | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ReportType | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="ALL">All Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Report Count */}
          <div className="text-neutral-400 text-sm sm:text-base">
            Total Reports: {filteredReports.length}
          </div>
        </div>

        {/* Reports List */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-col gap-4">
                {/* Report Info */}
                <div className="space-y-4 flex-1">
                  {/* Title + Status */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-base sm:text-lg font-medium text-neutral-200">
                      {report.title}
                    </h2>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm sm:text-base">
                    {report.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {report.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {report.location || "N/A"}
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Image */}
                  {report.image && (
                    <img
                      src={report.image}
                      alt="Report"
                      className="mt-3 sm:mt-4 rounded-lg border border-neutral-800 w-full max-w-md"
                    />
                  )}
                </div>

                {/* Status Selector */}
                <select
                  value={report.status}
                  onChange={(e) =>
                    updateReportStatus(
                      report.id,
                      e.target.value as ReportStatus
                    )
                  }
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 w-full sm:w-auto"
                >
                  {Object.values(ReportStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-neutral-500 text-sm sm:text-base bg-neutral-900/50 rounded-xl border border-neutral-800">
              No reports found matching the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

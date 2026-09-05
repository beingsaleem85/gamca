"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAvailableCities, filterMedicalCenters } from "@/lib/medical-centers";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
} from "lucide-react";

function MedicalCentersContent() {
  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");

  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const cities = useMemo(() => getAvailableCities(), []);

  // Update selected city from URL search param if present
  useEffect(() => {
    if (queryCity && cities.includes(queryCity)) {
      setSelectedCity(queryCity);
      setCurrentPage(1);
    } else if (!queryCity) {
      setSelectedCity("All Cities");
    }
  }, [queryCity, cities]);

  // Filter dataset dynamically
  const filteredCenters = useMemo(() => {
    return filterMedicalCenters(selectedCity, searchQuery);
  }, [selectedCity, searchQuery]);

  // Reset page when filters change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalRecords = filteredCenters.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCenters = filteredCenters.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            Wafid Pakistan Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Wafid Medical Centers in Pakistan
          </h1>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Search and view official Wafid approved medical diagnostic centers across cities in Pakistan.
          </p>
        </div>

        {/* Wafid Rules Accuracy Disclaimer Banner */}
        <div className="mb-8 p-4 sm:p-5 bg-white text-[#061224] rounded-2xl border border-amber-500/30 shadow-sm flex items-start gap-4">
          <div className="p-2 bg-amber-500/10 text-amber-700 rounded-xl flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs space-y-1">
            <p className="font-bold text-amber-800 text-sm">Official Wafid System Rule:</p>
            <p className="text-slate-600 leading-relaxed">
              Medical center information is referenced from the official Wafid directory. According to Wafid regulations, candidates select their <strong>Examination City</strong>, while the specific medical center is assigned automatically by Wafid. The directory below is provided for informational and contact reference only.
            </p>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* City Dropdown Filter */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#061224] focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All Cities" ? "All Cities (All Pakistan)" : `${city} Centers`}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                Search Medical Center
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by center name, address or city..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Dynamic Counter Display */}
            <div className="md:col-span-2 text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Available
              </span>
              <span className="text-xl font-extrabold text-[#061224] font-mono">
                {totalRecords} {totalRecords === 1 ? "Center" : "Medical Centers"}
              </span>
            </div>

          </div>
        </div>

        {/* Directory Results Counter & Summary */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-semibold text-slate-500">
            Showing <span className="text-[#061224] font-bold">{totalRecords > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + pageSize, totalRecords)}</span> of <span className="text-[#061224] font-bold">{totalRecords}</span> Medical Centers
          </p>
          {selectedCity !== "All Cities" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold">
              City: {selectedCity}
            </span>
          )}
        </div>

        {/* Cards Grid */}
        {paginatedCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedCenters.map((center) => (
              <div
                key={center.id}
                className="bg-[#FFFFFF] rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge: City & Country */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-[#061224] rounded-full text-xs font-bold border border-slate-200">
                      📍 {center.city}, Pakistan
                    </span>
                  </div>

                  {/* Center Name */}
                  <h3 className="text-base font-bold text-[#061224] group-hover:text-amber-700 transition-colors mb-3 line-clamp-2">
                    <Link href={`/medical-centers/${center.slug}`}>
                      {center.name}
                    </Link>
                  </h3>

                  {/* Details List */}
                  <div className="space-y-2 text-xs text-slate-600">
                    {center.addressLine1 && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{center.addressLine1}{center.addressLine2 ? `, ${center.addressLine2}` : ""}</span>
                      </div>
                    )}

                    {center.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">{center.phone}</span>
                      </div>
                    )}

                    {center.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{center.email}</span>
                      </div>
                    )}

                    {center.website && (
                      <div className="flex items-center gap-2 text-amber-700 font-medium">
                        <Globe className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <a href={center.website} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                          {center.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3 mb-10">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#061224]">No Medical Centers Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No centers matched your search criteria for &quot;{selectedCity}&quot;. Try selecting &quot;All Cities&quot; or clearing your keyword query.
            </p>
            <button
              onClick={() => {
                setSelectedCity("All Cities");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#061224] text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Directory Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl border ${
                currentPage === 1
                  ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-[#061224] text-white shadow-md border border-[#061224]"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl border ${
                currentPage === totalPages
                  ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function MedicalCentersDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-500">Loading Medical Centers...</p>
          </div>
        </div>
      }
    >
      <MedicalCentersContent />
    </Suspense>
  );
}


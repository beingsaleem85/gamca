"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface WafidDatePickerProps {
  name: string;
  id?: string;
  value: string; // Format: YYYY-MM-DD
  onChange: (e: { target: { name: string; value: string; type?: string } } | any) => void;
  minDate?: string; // Format: YYYY-MM-DD
  maxDate?: string; // Format: YYYY-MM-DD
  placeholder?: string;
  error?: boolean;
  className?: string;
}

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

function parseISO(str: string): { year: number; month: number; day: number } | null {
  if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const parts = str.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return { year, month, day };
}

function formatISO(year: number, month: number, day: number): string {
  const y = year.toString().padStart(4, "0");
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(str: string): string {
  const parsed = parseISO(str);
  if (!parsed) return "";
  const dayStr = parsed.day.toString().padStart(2, "0");
  const monthStr = MONTH_NAMES_SHORT[parsed.month];
  return `${dayStr}-${monthStr}-${parsed.year}`;
}

export default function WafidDatePicker({
  name,
  id,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
  error = false,
  className = "",
}: WafidDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  const today = new Date();
  const parsedValue = parseISO(value);

  const [viewYear, setViewYear] = useState<number>(
    parsedValue ? parsedValue.year : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(
    parsedValue ? parsedValue.month : today.getMonth()
  );
  const [yearRangeStart, setYearRangeStart] = useState<number>(
    parsedValue ? parsedValue.year - (parsedValue.year % 12) : today.getFullYear() - (today.getFullYear() % 12)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal view state when value changes
  useEffect(() => {
    if (parsedValue) {
      setViewYear(parsedValue.year);
      setViewMonth(parsedValue.month);
      setYearRangeStart(parsedValue.year - (parsedValue.year % 12));
    }
  }, [value]);

  // Handle outside click & ESC key to close popover
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setViewMode("days");
  };

  // Header Navigation Handlers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "days") {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    } else if (viewMode === "months") {
      setViewYear(viewYear - 1);
    } else if (viewMode === "years") {
      setYearRangeStart(yearRangeStart - 12);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "days") {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
    } else if (viewMode === "months") {
      setViewYear(viewYear + 1);
    } else if (viewMode === "years") {
      setYearRangeStart(yearRangeStart + 12);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "days") {
      setViewMode("months");
    } else if (viewMode === "months") {
      setYearRangeStart(viewYear - (viewYear % 12));
      setViewMode("years");
    }
  };

  const handleSelectDay = (day: number) => {
    const formatted = formatISO(viewYear, viewMonth, day);
    onChange({ target: { name, value: formatted } });
    setIsOpen(false);
  };

  const handleSelectMonth = (monthIndex: number) => {
    setViewMonth(monthIndex);
    setViewMode("days");
  };

  const handleSelectYear = (yearNum: number) => {
    setViewYear(yearNum);
    setViewMode("months");
  };

  // Calendar Grid Calculations for "days" mode
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const isDateDisabled = (year: number, month: number, day: number) => {
    const iso = formatISO(year, month, day);
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    return false;
  };

  return (
    <div ref={containerRef} className="relative w-full inline-block">
      
      {/* Trigger Button Input Box (Keyboard Tabbable & Auto-Open on Focus) */}
      <button
        type="button"
        id={id}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setViewMode("days");
        }}
        onFocus={() => {
          setIsOpen(true);
          setViewMode("days");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
            setViewMode("days");
          }
        }}
        className={`w-full px-3.5 py-2.5 bg-white border ${
          error
            ? "border-red-500 bg-red-50/20 focus:ring-red-500/40"
            : "border-slate-300 hover:border-slate-400 focus:border-amber-500 focus:ring-amber-500/40"
        } rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between cursor-pointer focus:ring-2 focus:outline-none transition-all ${className}`}
      >
        <span className={value ? "text-slate-800 font-semibold" : "text-slate-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
      </button>

      {/* Custom Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Top Pointer Indicator Arrow */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-slate-200 rotate-45"></div>

          {/* Calendar Header Navigation */}
          <div className="flex items-center justify-between pb-3 pt-1 border-b border-slate-100 mb-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleHeaderClick}
              className="text-xs font-bold text-[#061224] hover:text-amber-600 hover:bg-slate-50 px-2.5 py-1 rounded-md transition-colors"
            >
              {viewMode === "days" && `${MONTH_NAMES_FULL[viewMonth]} ${viewYear}`}
              {viewMode === "months" && `${viewYear}`}
              {viewMode === "years" && `${yearRangeStart} - ${yearRangeStart + 11}`}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* VIEW MODE: DAYS */}
          {viewMode === "days" && (
            <div>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center mb-1">
                {WEEKDAY_NAMES.map((w, idx) => (
                  <span key={idx} className="text-[11px] font-bold text-slate-400 py-1">
                    {w}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                
                {/* Prev Month Faded Days */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => {
                  const prevDay = daysInPrevMonth - firstDayOfWeek + i + 1;
                  return (
                    <span
                      key={`prev-${i}`}
                      className="py-1.5 text-slate-300 text-[11px] pointer-events-none"
                    >
                      {prevDay}
                    </span>
                  );
                })}

                {/* Current Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDateDisabled(viewYear, viewMonth, day);
                  const isSelected =
                    parsedValue &&
                    parsedValue.year === viewYear &&
                    parsedValue.month === viewMonth &&
                    parsedValue.day === day;

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelectDay(day)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-[#061224] text-white shadow-sm ring-2 ring-amber-500/50"
                          : disabled
                          ? "text-slate-300 cursor-not-allowed bg-slate-50/50"
                          : "text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}

              </div>
            </div>
          )}

          {/* VIEW MODE: MONTHS */}
          {viewMode === "months" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {MONTH_NAMES_SHORT.map((mName, mIdx) => {
                const isSelected = parsedValue && parsedValue.year === viewYear && parsedValue.month === mIdx;
                return (
                  <button
                    key={mName}
                    type="button"
                    onClick={() => handleSelectMonth(mIdx)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#061224] text-white shadow-sm"
                        : "text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 border border-slate-100"
                    }`}
                  >
                    {mName}
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW MODE: YEARS */}
          {viewMode === "years" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const yearNum = yearRangeStart + i;
                const isSelected = parsedValue && parsedValue.year === yearNum;
                return (
                  <button
                    key={yearNum}
                    type="button"
                    onClick={() => handleSelectYear(yearNum)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#061224] text-white shadow-sm"
                        : "text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 border border-slate-100"
                    }`}
                  >
                    {yearNum}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

interface LazyMapEmbedProps {
  query: string;
  centerName: string;
  cityName: string;
  address: string;
}

export default function LazyMapEmbed({
  query,
  centerName,
  cityName,
  address,
}: LazyMapEmbedProps) {
  const [loadMap, setLoadMap] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative w-full aspect-[16/9] max-h-72 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
      {loadMap ? (
        <iframe
          title={`Map location for ${centerName} in ${cityName}`}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
          className="border-0 w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="w-12 h-12 rounded-full bg-white shadow-md border border-amber-500/30 flex items-center justify-center text-amber-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <p className="text-xs font-bold text-[#061224]">{centerName}</p>
            <p className="text-[11px] text-slate-500 truncate">{address}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setLoadMap(true)}
              className="px-4 py-2 bg-[#061224] hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Load Interactive Map</span>
            </button>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

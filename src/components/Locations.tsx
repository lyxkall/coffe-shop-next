"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

// ============================================================
// GANTI DATA INI DENGAN LOKASI ASLI KAMU
// lat/lng bisa dicari di: maps.google.com → klik kanan → koordinat
// ============================================================
const locations = [
  {
    id: 1,
    name: "Kedai Cengkar",
    address: "Jl. Sirnagalih, Sirnagalih, Kecamatan Cipeundeuy, Kabupaten Bandung Barat",
    hours: "07:00 – 22:00",
    phone: "+62 823-3558-1650",
    lat: -6.7064398,
    lng: 107.3608653,
  },
  // {
  //   id: 2,
  //   name: "Tuku Kemang",
  //   address: "Jl. Kemang Raya No. 5, Jakarta Selatan",
  //   hours: "08:00 – 23:00",
  //   phone: "+62 21 2345 6789",
  //   lat: -6.2615,
  //   lng: 106.8146,
  // },
  // {
  //   id: 3,
  //   name: "Tuku Senopati",
  //   address: "Jl. Senopati No. 20, Jakarta Selatan",
  //   hours: "07:00 – 22:00",
  //   phone: "+62 21 3456 7890",
  //   lat: -6.2394,
  //   lng: 106.8092,
  // },
  // {
  //   id: 4,
  //   name: "Tuku BSD",
  //   address: "Jl. Pahlawan Seribu, BSD City, Tangerang",
  //   hours: "09:00 – 21:00",
  //   phone: "+62 21 4567 8901",
  //   lat: -6.3017,
  //   lng: 106.6525,
  // },
];

export default function Locations() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activeId, setActiveId] = useState<number>(locations[0].id);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Dynamically load Leaflet (avoid SSR issues)
  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      const L = (await import("leaflet")).default;

      if (!mapRef.current) return;

      // Init map
      const map = L.map(mapRef.current, {
        center: [locations[0].lat, locations[0].lng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Dark warm tile layer (matching Tuku aesthetic)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      // Attribution (minimalist)
      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

      // Zoom control (custom position)
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Custom marker icon
      const customIcon = (isActive: boolean) =>
        L.divIcon({
          className: "",
          html: `
            <div style="
              width: ${isActive ? "20px" : "14px"};
              height: ${isActive ? "20px" : "14px"};
              background: ${isActive ? "#c8a96e" : "#7a5c34"};
              border-radius: 50%;
              border: 2px solid ${isActive ? "#fff" : "#c8a96e"};
              transition: all 0.3s ease;
              box-shadow: 0 0 ${isActive ? "12px" : "6px"} ${isActive ? "#c8a96e88" : "#00000044"};
            "></div>
          `,
          iconSize: [isActive ? 20 : 14, isActive ? 20 : 14],
          iconAnchor: [isActive ? 10 : 7, isActive ? 10 : 7],
        });

      // Add markers
      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: customIcon(loc.id === locations[0].id),
        }).addTo(map);

        marker.on("click", () => {
          setActiveId(loc.id);
        });

        markersRef.current.push({ id: loc.id, marker, customIcon });
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Update markers + fly to when activeId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    const activeLoc = locations.find((l) => l.id === activeId);
    if (!activeLoc) return;

    mapInstanceRef.current.flyTo([activeLoc.lat, activeLoc.lng], 15, {
      animate: true,
      duration: 1.2,
    });

    markersRef.current.forEach(({ id, marker, customIcon }) => {
      marker.setIcon(customIcon(id === activeId));
    });
  }, [activeId, mapLoaded]);

  return (
    <section
      id="locations"
      className="min-h-screen bg-coffee-950 text-foreground flex flex-col"
    >
      {/* Header */}
      <div className="px-10 md:px-24 pt-32 pb-10">
        <p className="text-xs tracking-widest uppercase text-coffee-400 mb-3">
          Find Us
        </p>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase">
          Our Locations
        </h2>
      </div>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row flex-1 min-h-[600px]">
        {/* LEFT — Map */}
        <div className="relative w-full md:w-2/3 h-[50vh] md:h-auto">
          {/* Map loading skeleton */}
          {!mapLoaded && (
            <div className="absolute inset-0 bg-coffee-900 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3 text-coffee-400">
                <div className="w-8 h-8 border-2 border-coffee-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs tracking-widest uppercase">Loading map…</span>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* RIGHT — Location list */}
        <div className="w-full md:w-1/3 bg-coffee-900 flex flex-col overflow-y-auto">
          <div className="p-8 border-b border-coffee-800">
            <p className="text-xs tracking-widest uppercase text-coffee-400">
              {locations.length} Locations
            </p>
          </div>

          <div className="flex flex-col divide-y divide-coffee-800">
            {locations.map((loc, i) => (
              <motion.button
                key={loc.id}
                onClick={() => setActiveId(loc.id)}
                className={`text-left p-8 transition-colors duration-300 group ${
                  activeId === loc.id
                    ? "bg-coffee-800"
                    : "hover:bg-coffee-850"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Number + Name */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-xs tracking-widest text-coffee-400 mt-1">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-medium tracking-tight transition-colors duration-300 ${
                        activeId === loc.id
                          ? "text-accent"
                          : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {loc.name}
                    </h3>
                  </div>
                  {/* Active indicator */}
                  <div
                    className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                      activeId === loc.id
                        ? "bg-accent scale-100"
                        : "bg-transparent scale-0"
                    }`}
                  />
                </div>

                {/* Details */}
                <div className="ml-8 flex flex-col gap-2">
                  <div className="flex items-start gap-2 text-sm text-coffee-400">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-coffee-400">
                    <Clock size={14} className="shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-coffee-400">
                    <Phone size={14} className="shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                {/* Get Directions link */}
                {activeId === loc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ml-8 mt-4"
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-widest uppercase text-accent border border-accent/30 px-4 py-2 hover:bg-accent hover:text-background transition-colors duration-300 inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Directions ↗
                    </a>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
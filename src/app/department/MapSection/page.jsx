"use client";

import dynamic from "next/dynamic";

const PotholeMap = dynamic(() => import("@/components/PotholeMap"), {
  ssr: false
});

export default function MapSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <h2 className="text-2xl font-bold mb-4">
        Pothole Hotspots Map
      </h2>

      <div className="rounded-xl overflow-hidden border">
        <PotholeMap />
      </div>
    </div>
  );
}
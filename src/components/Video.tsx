"use client";

import { useState } from "react";

/**
 * A YouTube video that only loads YouTube once someone presses play.
 * `hd` uses the full-size thumbnail, for big players (not every video has one).
 */
export function Video({ id, title, hd = false }: { id: string; title: string; hd?: boolean }) {
  const [on, setOn] = useState(false);
  if (on)
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        className="absolute inset-0 h-full w-full"
      />
    );
  return (
    <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sun text-ink shadow-xl transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
        </span>
      </span>
    </button>
  );
}

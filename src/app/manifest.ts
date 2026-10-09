import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Transformation Church",
    short_name: "Transformation",
    start_url: "/",
    display: "standalone",
    background_color: "#050f22",
    theme_color: "#050f22",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

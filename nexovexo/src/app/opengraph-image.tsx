import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NexoVexo — Cloud · AI · DevOps · Automation";

// Dynamically generated social share image (original brand composition).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(1000px 500px at 50% 0%, #0d1424 0%, #04050a 60%)",
          color: "#f3f5fb",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* brand N mark (original ribbon shape) */}
        <div style={{ display: "flex", marginBottom: 40 }}>
          <svg width="150" height="150" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#22b8ff" />
                <stop offset="0.5" stopColor="#3b6dff" />
                <stop offset="1" stopColor="#8b3dff" />
              </linearGradient>
            </defs>
            <path
              d="M22 98 V34 c0-6 2-10 7-12 l10 4 v72 c0 5-3 8-8 8 h-3 c-4 0-6-2-6-6Z M98 22 V86 c0 6-2 10-7 12 l-10-4 V22 c0-5 3-8 8-8 h3 c4 0 6 2 6 6Z M31 26 L89 94 c3 4 2 9-2 11 l-5 2 c-3 1-6 0-8-3 L24 42 c-3-4-2-9 2-11 l5-2Z"
              fill="url(#g)"
            />
          </svg>
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "0.12em",
            display: "flex",
          }}
        >
          NEXOVEXO
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#a6b0c6",
            letterSpacing: "0.22em",
            display: "flex",
          }}
        >
          CLOUD · AI · DEVOPS · AUTOMATION
        </div>
      </div>
    ),
    { ...size }
  );
}

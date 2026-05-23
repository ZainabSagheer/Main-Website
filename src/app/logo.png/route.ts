import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 200,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: "50%",
          border: "4px solid #00D9FF",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 56,
            fontWeight: 800,
            color: "#052E3B",
            letterSpacing: "-2px",
          }}
        >
          bitsol
        </span>
      </div>
    ),
    { width: 200, height: 200 }
  );
}

import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#0c141a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7bdb80",
          borderRadius: "36px",
          border: "8px solid #238636",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        &gt;_
      </div>
    ),
    {
      ...size,
    }
  );
}

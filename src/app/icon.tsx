import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#0c141a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7bdb80",
          borderRadius: "6px",
          border: "1.5px solid #238636",
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

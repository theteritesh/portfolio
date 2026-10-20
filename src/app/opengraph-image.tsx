import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";

export const alt = "Ritesh Thete | Software Developer, Pune | Java Full Stack & Spring Boot";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c141a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "monospace",
          color: "#dbe3ec",
          border: "12px solid #192126",
          boxSizing: "border-box",
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                background: "#ff5f56",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                background: "#ffbd2e",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                background: "#27c93f",
                marginRight: "24px",
              }}
            />
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                background: "#192126",
                borderRadius: "8px",
                border: "1px solid #3f4a3d",
                color: "#7bdb80",
                fontSize: "20px",
              }}
            >
              <span>git checkout -b main</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              background: "#151d22",
              borderRadius: "8px",
              border: "1px solid #3f4a3d",
              color: "#a2c9ff",
              fontSize: "20px",
            }}
          >
            <span>v2.5.0-prod</span>
          </div>
        </div>

        {/* Center Hero Information */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#7bdb80",
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "1px",
              marginBottom: "12px",
            }}
          >
            <span>$ whoami --verbose</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 800,
              color: "#f9fff3",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "8px",
            }}
          >
            <span>{portfolioData.personal.name}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#a2c9ff",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <span>{portfolioData.personal.title} • Pune, India</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#becaba",
              maxWidth: "960px",
              lineHeight: 1.4,
            }}
          >
            <span>
              Architecting high-performance distributed microservices, Spring Boot,
              reactive WebSockets, and modern Next.js / React ecosystems.
            </span>
          </div>
        </div>

        {/* Bottom Tags / Provenance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #232b31",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex" }}>
            {["Java 21", "Spring Boot", "React", "Next.js", "Docker", "AWS"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    background: "#192126",
                    border: "1px solid #3f4a3d",
                    borderRadius: "6px",
                    color: "#7bdb80",
                    fontSize: "20px",
                    marginRight: "14px",
                  }}
                >
                  <span>{tag}</span>
                </div>
              )
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#becaba",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#7bdb80", marginRight: "8px" }}>✔</span>
            <span>Cleanly merged</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

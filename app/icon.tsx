import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 7,
        color: "#111111",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      rak.
    </div>,
    { ...size },
  );
}

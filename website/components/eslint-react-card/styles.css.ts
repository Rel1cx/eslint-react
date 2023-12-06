import { style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  margin: "0 auto",
  padding: "32px",
  width: "fit-content",
});

export const title = style({
  fontWeight: "bold",
  fontSize: "24px",
  textAlign: "center",
});

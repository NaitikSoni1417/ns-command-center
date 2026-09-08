import { motion } from "framer-motion";

export default function AmbientBackground({ theme }) {
  if (theme === "light") {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #f5f5f7 0%, #ebebef 50%, #f5f5f7 100%)",
        }} />
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", background: "#000" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 60%)",
      }} />
    </div>
  );
}

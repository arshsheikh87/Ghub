// Homepage — implemented in Phase 4
export default function HomePage() {
  return (
    <main>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        color: "#fff",
        background: "#0a0a0f",
        fontFamily: "system-ui"
      }}>
        <h1 style={{ fontSize: "2rem", background: "linear-gradient(135deg,#8b5cf6,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          NexusPlay Gaming Cafe
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Phase 1 complete — Project foundation ready.</p>
      </div>
    </main>
  );
}

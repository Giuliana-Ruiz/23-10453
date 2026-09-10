///
/// ToolBar
///

interface Props {
  start: () => void;
  reset: () => void;
  uxColor: (mode: number) => string;
  setUX: (mode: number) => void;
  error?: string; 
}

const ToolBar = (props: Props) => {
  const modes = [
    { id: 0, label: "Raw", title: "Raw data view" },
    { id: 1, label: "Test", title: "Test & processing view" },
    { id: 2, label: "Chart", title: "Visual chart view" },
    { id: 3, label: "Image", title: "Image gallery view" },
    { id: 4, label: "List", title: "Data list view" },
  ];

  return (
    <div className="app-toolbar mt-2" data-bs-theme="dark" style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
      {props.error && <span className="toolbar-error" style={{ color: "#ef4444", fontWeight: 600, marginRight: "8px" }}>{props.error}</span>}
      
      <button
        title="Start the Macondian Reactor"
        style={{
          backgroundColor: "#10b981",
          color: "#ffffff",
          border: "none",
          fontWeight: 600,
          padding: "8px 16px",
        }}
        onClick={props.start}
      >
        ▶ Start Macondian
      </button>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: "4px", backgroundColor: "#0f172a", padding: "4px", borderRadius: "8px", border: "1px solid #334155" }}>
        {modes.map((m) => (
          <button
            key={m.id}
            title={m.title}
            style={{
              color: props.uxColor(m.id),
              backgroundColor: "transparent",
              border: "none",
              fontWeight: 600,
              padding: "6px 12px",
            }}
            onClick={() => props.setUX(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <button
        title="Reset the Macondian Reactor"
        style={{
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          color: "#f59e0b",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          fontWeight: 600,
          padding: "8px 16px",
        }}
        onClick={props.reset}
      >
        ↺ Reset Macondian
      </button>
    </div>
  );
};

export default ToolBar;
import { useState } from "react";

const TYPE_CONFIG = {
  task: { color: "#3a86ff", bg: "#eff5ff", icon: "◻", label: "Task" },
  reminder: { color: "#e76f51", bg: "#fef3ef", icon: "◷", label: "Reminder" },
  note: { color: "#7c6d64", bg: "#f5f1ee", icon: "◈", label: "Note" },
};

function EntryItem({ entry, onDelete, onEdit }) {
  const [hovered, setHovered] = useState(false);
  const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.note;

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div style={{ ...styles.accentBar, background: config.color }} />

      <div style={styles.cardInner}>
        {/* Top row */}
        <div style={styles.topRow}>
          <span
            style={{
              ...styles.typeBadge,
              color: config.color,
              background: config.bg,
            }}
          >
            <span style={styles.badgeIcon}>{config.icon}</span>
            {config.label}
          </span>

          {entry.date && (
            <span style={styles.date}>{entry.date}</span>
          )}

          <div style={{ ...styles.actions, opacity: hovered ? 1 : 0 }}>
            <button
              style={{ ...styles.iconBtn, color: "#3a86ff" }}
              onClick={() => onEdit(entry)}
              title="Edit"
            >
              🖊
            </button>
            <button
              style={{ ...styles.iconBtn, color: "#e76f51" }}
              onClick={() => onDelete(entry.id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <p style={styles.text}>{entry.text}</p>

        {/* Tags */}
        {entry.tags?.length > 0 && (
          <div style={styles.tagsRow}>
            {entry.tags.map((t, i) => (
              <span key={i} style={styles.tag}>#{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    overflow: "hidden",
    transition: "box-shadow 0.2s, transform 0.15s",
    cursor: "default",
  },
  cardHovered: {
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-1px)",
  },
  accentBar: {
    width: 4,
    flexShrink: 0,
  },
  cardInner: {
    flex: 1,
    padding: "14px 16px",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "3px 8px",
    borderRadius: 5,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  badgeIcon: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: "#b0aea6",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    marginLeft: "auto",
    marginRight: 8,
  },
  actions: {
    display: "flex",
    gap: 4,
     marginLeft: "auto",
    transition: "opacity 0.15s",
  },
  iconBtn: {
    width: 28,
    height: 28,
    border: "none",
    background: "#f5f3ef",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "background 0.15s",
  },
  text: {
    margin: 0,
    fontSize: 14,
    color: "#2c2b28",
    lineHeight: 1.6,
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  tagsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  tag: {
    fontSize: 11,
    color: "#9e9b94",
    background: "#f5f3ef",
    padding: "2px 8px",
    borderRadius: 20,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 500,
  },
};

export default EntryItem;

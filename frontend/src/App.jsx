import { useEffect, useState } from "react";
import EntryList from "./components/EntryList";
import InputBox from "./components/InputBox";
import { addEntry, getEntries, deleteEntry, updateEntry } from "./services/api";

const FILTERS = ["all", "task", "reminder", "note"];

const FILTER_ICONS = {
  all: "◈",
  task: "◻",
  reminder: "◷",
  note: "◈",
};

function App() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showInput, setShowInput] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const data = await getEntries();
    setEntries(data);
  };

  const handleAddEntry = async (text) => {
    await addEntry(text);
    fetchEntries();
    setShowInput(false);
  };

  const handleDelete = async (id) => {
    await deleteEntry(id);
    fetchEntries();
  };

const handleEdit = async (id, text) => {
  await updateEntry(id, text);
  await fetchEntries(); 
  setEditingEntry(null);
};

  const filteredEntries =
    filter === "all" ? entries : entries.filter((e) => e.type === filter);

  const stats = {
    total: entries.length,
    task: entries.filter((e) => e.type === "task").length,
    reminder: entries.filter((e) => e.type === "reminder").length,
    note: entries.filter((e) => e.type === "note").length,
  };

  return (
    <div style={styles.root}>
      <div style={styles.page}>

        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <span style={styles.logoMark}>C</span>
            </div>
            <div>
              <h1 style={styles.title}>Capture</h1>
              <p style={styles.subtitle}>Your productivity assistant</p>
            </div>
          </div>
          <button style={styles.newBtn} onClick={() => setShowInput(true)}>
            <span style={styles.newBtnPlus}>+</span> New Entry
          </button>
        </header>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {[
            { label: "Total", value: stats.total, accent: "#2d6a4f" },
            { label: "Tasks", value: stats.task, accent: "#3a86ff" },
            { label: "Reminders", value: stats.reminder, accent: "#e76f51" },
            { label: "Notes", value: stats.note, accent: "#7c6d64" },
          ].map(({ label, value, accent }) => (
            <div key={label} style={styles.statCard}>
              <div style={{ ...styles.statAccent, background: accent }} />
              <p style={styles.statLabel}>{label}</p>
              <h2 style={{ ...styles.statValue, color: accent }}>{value}</h2>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div style={styles.filterBar}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              <span style={styles.filterIcon}>{FILTER_ICONS[f]}</span>
              {f.charAt(0).toUpperCase() + f.slice(1)}

            </button>
          ))}
        </div>

        {/* Entry List */}
        <div style={styles.listWrapper}>
          <EntryList
            entries={filteredEntries}
            onDelete={handleDelete}
            onEdit={(entry) => setEditingEntry(entry)}
          />
        </div>
      </div>

      {/* Add Modal */}
      {showInput && (
        <div style={styles.overlay} onClick={() => setShowInput(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>New Entry</h3>
            <InputBox onAdd={handleAddEntry} onCancel={() => setShowInput(false)} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingEntry && (
        <div style={styles.overlay} onClick={() => setEditingEntry(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Edit Entry</h3>
            <InputBox
              initialText={editingEntry.text}
              onAdd={(text) => handleEdit(editingEntry.id, text)}
              onCancel={() => setEditingEntry(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#f5f3ef",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  page: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "2px solid #e8e4dd",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#2d6a4f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoMark: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "'Georgia', serif",
    lineHeight: 1,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1916",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: 13,
    color: "#9e9b94",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    marginTop: 2,
  },
  newBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 20px",
    background: "#2d6a4f",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  newBtnPlus: {
    fontSize: 18,
    lineHeight: 1,
    marginRight: 2,
  },

  /* Stats */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "16px 18px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  statAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: "12px 12px 0 0",
  },
  statLabel: {
    margin: "8px 0 4px",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#9e9b94",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 600,
  },
  statValue: {
    margin: 0,
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: "-1px",
  },

  /* Filter Bar */
  filterBar: {
    display: "flex",
    gap: 6,
    marginBottom: 20,
    background: "#fff",
    padding: 6,
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  filterBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#6b6a65",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.15s",
  },
  filterBtnActive: {
    background: "#2d6a4f",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(45,106,79,0.3)",
  },
  filterIcon: {
    fontSize: 14,
    lineHeight: 1,
  },
  filterCount: {
    fontSize: 11,
    opacity: 0.7,
    marginLeft: 2,
  },

  /* List */
  listWrapper: {
    minHeight: 200,
  },

  /* Modal */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(26,25,22,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backdropFilter: "blur(2px)",
  },
  modal: {
    background: "#fff",
    padding: "28px 28px 24px",
    borderRadius: 16,
    width: "100%",
    maxWidth: 480,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    margin: "0 0 16px",
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1916",
    letterSpacing: "-0.3px",
  },
};

export default App;

import EntryItem from "./EntryItem";

function EntryList({ entries, onDelete, onEdit }) {
  if (entries.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>◈</div>
        <p style={styles.emptyTitle}>Nothing here yet</p>
        <p style={styles.emptySubtitle}>Add a new entry to get started</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {entries.map((entry) => (
        <EntryItem
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
  },
  empty: {
    textAlign: "center",
    padding: "64px 24px",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  emptyIcon: {
    fontSize: 36,
    color: "#d4d0c9",
    marginBottom: 12,
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b6a65",
    fontFamily: "'Georgia', serif",
  },
  emptySubtitle: {
    margin: 0,
    fontSize: 13,
    color: "#b0aea6",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
};

export default EntryList;

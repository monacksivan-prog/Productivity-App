import { useState } from "react";

function InputBox({ onAdd, onCancel, initialText = "" }) {
  const [text, setText] = useState(initialText);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const isReady = !!text.trim();

  return (
    <div style={styles.wrapper}>
      <textarea
        autoFocus
        placeholder="e.g. Remind me to call John tomorrow at 3pm…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.textarea}
        rows={4}
      />
      <div style={styles.footer}>
        <p style={styles.hint}>↵ Enter to save &nbsp;·&nbsp; Esc to cancel</p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            style={{
              ...styles.saveBtn,
              opacity: isReady ? 1 : 0.45,
              cursor: isReady ? "pointer" : "not-allowed",
            }}
            onClick={handleSubmit}
            disabled={!isReady}
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  textarea: {
    width: "100%",
    border: "1.5px solid #e8e4dd",
    borderRadius: 10,
    padding: "14px 16px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: 15,
    color: "#1a1916",
    background: "#faf9f7",
    resize: "none",
    outline: "none",
    lineHeight: 1.65,
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  hint: {
    margin: 0,
    fontSize: 11,
    color: "#c4c0b8",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    letterSpacing: "0.3px",
  },
  actions: {
    display: "flex",
    gap: 8,
  },
  cancelBtn: {
    padding: "9px 18px",
    borderRadius: 8,
    border: "1.5px solid #e8e4dd",
    background: "transparent",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: "#6b6a65",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  saveBtn: {
    padding: "9px 22px",
    borderRadius: 8,
    border: "none",
    background: "#2d6a4f",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    transition: "opacity 0.15s",
    letterSpacing: "0.3px",
  },
};

export default InputBox;

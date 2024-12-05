import React from "react";

const DialogSuccess = ({ open, onClose, message }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3>Succès</h3>
        <p>{message || "L'action a été réalisée avec succès !"}</p>
        <button onClick={onClose} style={styles.closeButton}>
          OK
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    width: "300px",
  },
  closeButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default DialogSuccess;

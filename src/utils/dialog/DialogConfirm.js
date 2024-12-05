import React from "react";

const DialogConfirm = ({ open, onConfirm, onCancel, message }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3>Confirmation</h3>
        <p>{message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}</p>
        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancelButton}>
            Annuler
          </button>
          <button onClick={onConfirm} style={styles.confirmButton}>
            Confirmer
          </button>
        </div>
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
  actions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  confirmButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DialogConfirm;

import React from "react";
import { IoWarningSharp } from "react-icons/io5";

const DialogConfirm = ({ open, onConfirm, onClose, message }) => {
  if (!open) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        {/* Conteneur de l'icône */}
        <div style={styles.iconContainer}>
          <IoWarningSharp style={styles.icon} />
        </div>
        <h3 style={styles.title}> Confirmation </h3>
        <p style={styles.message}>{message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}</p>
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelButton}>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
    width: "400px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "red",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
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
    outline: "none",
  },
  confirmButton: {
    backgroundColor: "#d31900",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    fontSize: "50px",
    color: "#fd0a54",
  },
};

export default DialogConfirm;
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const DialogSuccess = ({ open, onClose, title, message, small_message }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        {/* Conteneur de l'icône */}
        <div style={styles.iconContainer}>
          <FiCheckCircle style={styles.icon} />
        </div>
        <h3 style={styles.title}> {title}</h3>
        <p style={styles.message}>
          {message}
        </p>
        <p style={styles.message}>
          {small_message || ""}
        </p>
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
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    fontSize: "50px",
    color: "#28a745",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#003d3b",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  closeButton: {
    backgroundColor: "#003d3b",
    color: "#ffffff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default DialogSuccess;

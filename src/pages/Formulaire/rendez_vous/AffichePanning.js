import React, { useState } from "react";

const AffichePlanning = () => {

    
  // Données initiales (exemple)
  const initialData = [
    { date: "03 déc.", slots: ["08:00", "08:20", "08:40"] },
    { date: "04 déc.", slots: ["08:00", "08:20", "08:40"] },
    { date: "05 déc.", slots: ["08:00", "08:20", "08:40"] },
    { date: "06 déc.", slots: ["08:00", "08:20", "08:40"] },
    { date: "07 déc.", slots: ["08:00", "08:20"] },
    { date: "08 déc.", slots: ["09:00", "09:20", "09:40"] },
    { date: "09 déc.", slots: ["10:00", "10:20"] },
    { date: "10 déc.", slots: ["11:00", "11:20", "11:40"] },
    // Ajoutez plus de données si nécessaire
  ];

  const [currentPage, setCurrentPage] = useState(0); // Pagination
  const [selectedSlot, setSelectedSlot] = useState(null); // Créneau sélectionné
  const itemsPerPage = 5; // Nombre de jours à afficher par page

  // Calcule les jours affichés en fonction de la page actuelle
  const visibleDays = initialData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Gestion de la navigation entre pages
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < initialData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Gestion du clic sur un créneau horaire
  const handleSlotClick = (dayIndex, slotIndex) => {
    setSelectedSlot({ dayIndex, slotIndex }); // Stocke l'index du créneau sélectionné
  };

  return (
    <div className="planning-container">
      <div className="navigation">
        <button
          onClick={handlePreviousPage}
          className="nav-button"
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <button
          onClick={handleNextPage}
          className="nav-button"
          disabled={(currentPage + 1) * itemsPerPage >= initialData.length}
        >
          &gt;
        </button>
      </div>

      <div className="days">
        {visibleDays.map((day, dayIndex) => (
          <div key={dayIndex} className="day-column">
            <div className="day-header">{day.date}</div>
            <div className="time-slots">
              {day.slots.length > 0 ? (
                day.slots.map((slot, slotIndex) => (
                  <button
                    key={slotIndex}
                    className={`time-slot ${
                      selectedSlot &&
                      selectedSlot.dayIndex === dayIndex &&
                      selectedSlot.slotIndex === slotIndex
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSlotClick(dayIndex, slotIndex)} // Gestion du clic
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <div className="no-slots">—</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffichePlanning;

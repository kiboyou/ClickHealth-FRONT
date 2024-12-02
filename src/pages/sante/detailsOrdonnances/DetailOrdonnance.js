import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@windmill/react-ui';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom'; // Pour récupérer la localisation (location.state)

const DetailOrdonnance = () => {
  // Récupérer l'ordonnance passée dans location.state
  const location = useLocation();
  const { ordonnance } = location.state || {}; // Si pas d'ordonnance, valeur par défaut

  const ordonnanceRef = useRef();

  // Afficher un message si l'ordonnance n'est pas disponible
  if (!ordonnance) {
    return <p className="text-center text-red-500">Aucune ordonnance sélectionnée.</p>;
  }

  // Fonction pour télécharger l'ordonnance en PDF
  const handleDownloadPDF = async () => {
    const element = ordonnanceRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ordonnance_${ordonnance.id}.pdf`);
  };

  return (
    <div className="w-full px-4 py-10">
      
      {/* Boutons pour télécharger ou imprimer */}
      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:border-none"
        >
          Imprimer
        </button>
        
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 text-white rounded-lg shadow bg-cadre1 focus:outline-none focus:border-none"
        >
          Télécharger PDF
        </button>
      </div>

      {/* Contenu de l'ordonnance */}
      <div
        ref={ordonnanceRef}
        id="ordonnanceRef"
        className="w-full p-8 mx-auto bg-white rounded-lg"
      >
        <h1 className="mb-12 text-3xl font-bold text-center text-gray-700">
          Ordonnance Médicale
        </h1>

        {/* Informations patient */}
        <div className="flex justify-between mb-10">
          <div className="w-1/2 text-left">
            <h2 className="text-lg font-bold text-gray-700">Informations Patient</h2>
            <p className="text-gray-600">
              <strong>Nom :</strong> {ordonnance.consultation_detail.patient_detail.user_detail.first_name}{" "}
              {ordonnance.consultation_detail.patient_detail.user_detail.last_name}
            </p>
            <p className="text-gray-600">
              <strong>Email :</strong> {ordonnance.consultation_detail.patient_detail.user_detail.email}
            </p>
            <p className="text-gray-600">
              <strong>Téléphone :</strong> {ordonnance.consultation_detail.patient_detail.telephone}
            </p>
          </div>

          <div className="w-1/2 text-right">
            <h2 className="text-lg font-bold text-gray-700">Détails Ordonnance</h2>
            <p className="text-gray-600">
              <strong>Type d'ordonnance :</strong> {ordonnance.type_ordonnance_detail.nom}
            </p>
            <p className="text-gray-600">
              <strong>Date :</strong> {new Date(ordonnance.date || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Liste des médicaments */}
        {ordonnance.prescriptions && ordonnance.prescriptions.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">Médicaments Prescrits</h2>
            <table className="w-full mb-6 border border-collapse border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 border border-gray-300">Médicament</th>
                  <th className="px-4 py-2 text-center text-gray-700 border border-gray-300">Posologie</th>
                  <th className="px-4 py-2 text-center text-gray-700 border border-gray-300">Quantité</th>
                </tr>
              </thead>
              <tbody>
                {ordonnance.prescriptions.map((prescriptions, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{prescriptions.medicament_detail.nom}</td>
                    <td className="px-4 py-2 text-center border border-gray-300">{prescriptions.posologie}</td>
                    <td className="px-4 py-2 text-center border border-gray-300">{prescriptions.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notes ou recommandations supplémentaires */}
        {ordonnance.notes && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-700">Recommandations</h2>
            <p className="text-gray-600">{ordonnance.notes}</p>
          </div>
        )}

        {/* Section : Fait à Tunis */}
        <div className="mt-6 text-right">
          <p className="mb-20 italic text-gray-600">
            Fait à Tunis, le {new Date(ordonnance.date || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Styles pour limiter l'impression */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #ordonnanceRef, #ordonnanceRef * {
              visibility: visible;
            }
            #ordonnanceRef {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DetailOrdonnance;

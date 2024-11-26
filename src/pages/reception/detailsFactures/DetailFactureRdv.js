import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";

const DetailFactureRdv = (props) => {
  const { facture } = props.location.state || {}; // Récupérer la facture via `props.location.state`
  const factureRef = useRef();

  if (!facture) {
    return <p className="text-center text-red-500">Aucune facture sélectionnée.</p>;
  }

  // Fonction pour télécharger la facture en PDF
  const handleDownloadPDF = async () => {
    const element = factureRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`facture_${facture.id}.pdf`);
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
          className="px-6 py-3 text-white rounded-lg shadow btnprise focus:outline-none focus:border-none"
        >
          Télécharger PDF
        </button>
        
      </div>
      
      {/* Contenu de la facture */}
      <div
        ref={factureRef}
        id="factureRef"
        className="w-full p-8 mx-auto bg-white rounded-lg"
      >
        <h1 className="mb-12 text-3xl font-bold text-center text-gray-700">
          Facture de la consultation
        </h1>

        {/* Section : Informations hôpital et patient */}
        <div className="flex justify-between mb-10">
          {/* Infos de l'hôpital */}
          <div className="w-1/2 text-left">
            <h2 className="text-lg font-bold text-gray-700">Hôpital XYZ</h2>
            <p className="text-gray-600">Adresse : 123, Rue El-ghazala, Tunis</p>
            <p className="text-gray-600">Téléphone : +216 12 345 678</p>
            <p className="text-gray-600">Email : contact@hopitalxyz.com</p>
          </div>

          {/* Infos du patient */}
          <div className="w-1/2 text-right">
            <h2 className="text-lg font-bold text-gray-700">Informations Patient</h2>
            <p className="text-gray-600">
              <strong>Nom :</strong> {facture.rendezVous_details.nom}{" "}
              {facture.rendezVous_details.prenom}
            </p>
            <p className="text-gray-600">
              <strong>Email :</strong> {facture.rendezVous_details.email}
            </p>
            <p className="text-gray-600">
              <strong>Date :</strong>{" "}
              {new Date(facture.date || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Table des services */}
        {facture.rendezVous_details && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Détails de la facture
            </h2>
            <table className="w-full mb-6 border border-collapse border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 border border-gray-300">
                    Type de consultation
                  </th>
                  <th className="px-4 py-2 text-center text-gray-700 border border-gray-300">
                    Quantité
                  </th>
                  <th className="px-4 py-2 text-right text-gray-700 border border-gray-300">
                    Prix Unitaire
                  </th>
                  <th className="px-4 py-2 text-right text-gray-700 border border-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {facture.rendezVous_details.type_consultation_detail.nom}
                    </td>
                    <td className="px-4 py-2 text-center border border-gray-300">
                      1
                    </td>
                    <td className="px-4 py-2 text-right border border-gray-300">
                      {facture.rendezVous_details.type_consultation_detail.prix} €
                    </td>
                    <td className="px-4 py-2 text-right border border-gray-300">
                      {facture.rendezVous_details.type_consultation_detail.prix} €
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Montant total et statut de paiement */}
        <div className="flex items-center justify-between py-10 border-t">
          <div>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Montant Total :</strong> {facture.montant} €
            </p>
          </div>
          <div>
            <p
              className={`text-lg font-semibold ${
                facture.statut_paiement === "Payé"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <strong>Statut de Paiement :</strong> {facture.statut_paiement}
            </p>
          </div>
        </div>

        {/* Section : Fait à Tunis */}
        <div className="mt-6 text-right">
          <p className="mb-20 italic text-gray-600">
            Fait à Tunis, le {new Date(facture.date || Date.now()).toLocaleDateString()}
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
            #factureRef, #factureRef * {
              visibility: visible;
            }
            #factureRef {
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

export default DetailFactureRdv;

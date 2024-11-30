// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import React, { useRef } from "react";

// const DetailRecu = (props) => {
//   const { paiement } = props.location.state || {}; // Récupérer la paiement via `props.location.state`
//   const paiementRef = useRef();

//   if (!paiement) {
//     return <p className="text-center text-red-500">Aucune paiement sélectionnée.</p>;
//   }

//   // Fonction pour télécharger la paiement en PDF
//   const handleDownloadPDF = async () => {
//     const element = paiementRef.current;
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`paiement_${paiement.id}.pdf`);
//   };

//   return (
//     <div className="w-full px-4 py-10">
      
//       {/* Boutons pour télécharger ou imprimer */}
//       <div className="flex justify-end mb-6 space-x-4">
//       <button
//           onClick={() => window.print()}
//           className="px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:border-none"
//         >
//           Imprimer
//         </button>
        
//         <button
//           onClick={handleDownloadPDF}
//           className="px-6 py-3 text-white rounded-lg shadow btnprise focus:outline-none focus:border-none"
//         >
//           Télécharger PDF
//         </button>
        
//       </div>
      
//       {/* Contenu de la paiement */}
//       <div
//         ref={paiementRef}
//         id="paiementRef"
//         className="w-full p-8 mx-auto bg-white rounded-lg"
//       >
//         <h1 className="mb-12 text-3xl font-bold text-center text-gray-700">
//           Reçu de Paiement <br/>
//          <span className="text-lg font-semibold text-gray-700"><strong>Référence </strong> : {paiement.reference_paiement}</span>

//         </h1>


//         {/* Section : Informations hôpital et patient */}
//         <div className="flex justify-between mb-10">
//           {/* Infos de l'hôpital */}
//           <div className="w-1/2 text-left">
//             <h2 className="text-lg font-bold text-gray-700">Hôpital XYZ</h2>
//             <p className="text-gray-600">Adresse : 123, Rue El-ghazala, Tunis</p>
//             <p className="text-gray-600">Téléphone : +216 12 345 678</p>
//             <p className="text-gray-600">Email : contact@hopitalxyz.com</p>
//           </div>

//           {/* Infos du patient */}
//           <div className="w-1/2 text-right">
//             <h2 className="text-lg font-bold text-gray-700">Informations Patient</h2>
//             <p className="text-gray-600">
//               <strong>Nom :</strong> {paiement.facture.patient_detail.user_detail.first_name}{" "}
//               {paiement.facture.patient_detail.user_detail.last_name}
//             </p>
//             <p className="text-gray-600">
//               <strong>Email :</strong> {paiement.facture.patient_detail.user_detail.email}
//             </p>
//             <p className="text-gray-600">
//               <strong>Date :</strong>{" "}
//               {new Date(paiement.date || Date.now()).toLocaleDateString()}
//             </p>
//           </div>
//         </div>


//         {/* Montant total et statut de paiement */}
//         <div className="flex items-center justify-between py-10 border-t">
//           <div>
//             <p className="mb-2 text-lg font-semibold text-gray-700">
//               <strong>Montant total :</strong> {paiement.facture.montant} €
//             </p>
//             <p className="mb-2 text-lg font-semibold text-gray-700">
//               <strong>Montant reçu :</strong> {paiement.montant} €
//             </p>
//             <p className="text-lg font-semibold text-gray-700">
//               <strong>Montant retourné :</strong> {paiement.montant_restant} €
//             </p>
//           </div>
          
//         </div>

//         {/* Section : Fait à Tunis */}
//         <div className="mt-6 text-right">
//           <p className="mb-20 italic text-gray-600">
//             Fait à Tunis, le {new Date(paiement.date || Date.now()).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

      

//       {/* Styles pour limiter l'impression */}
//       <style>
//         {`
//           @media print {
//             body * {
//               visibility: hidden;
//             }
//             #paiementRef, #paiementRef * {
//               visibility: visible;
//             }
//             #paiementRef {
//               position: absolute;
//               top: 0;
//               left: 0;
//               width: 100%;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DetailRecu;


import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";

const DetailRecu = (props) => {
  const { paiement } = props.location.state || {}; // Récupérer la paiement via `props.location.state`
  const paiementRef = useRef();

  if (!paiement) {
    return <p className="text-center text-red-500">Aucune paiement sélectionnée.</p>;
  }

  // Fonction pour télécharger la paiement en PDF
  const handleDownloadPDF = async () => {
    const element = paiementRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`paiement_${paiement.id}.pdf`);
  };

  return (
    <div className="w-full px-4 py-10 ">
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

      {/* Contenu du reçu */}
      <div
        ref={paiementRef}
        id="paiementRef"
        className="p-8 mx-auto rounded-lg max-w-7xl bg-gray-50"
      >
        {/* En-tête */}
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-700">
          Reçu de Paiement
        </h1>
        <p className="mb-10 text-center text-gray-500">
          Ce reçu confirme le règlement effectué pour les services rendus par <strong>Hôpital XYZ</strong>.
        </p>

        {/* Informations principales */}
        <div className="flex justify-between mb-10">
          {/* Infos de l'hôpital */}
          <div>
            <h2 className="text-lg font-bold text-gray-700">Hôpital XYZ</h2>
            <p className="text-gray-600">123, Rue El-ghazala, Tunis</p>
            <p className="text-gray-600">Téléphone : +216 12 345 678</p>
            <p className="text-gray-600">Email : contact@hopitalxyz.com</p>
          </div>

          {/* Infos du patient */}
          <div className="text-right">
            <h2 className="text-lg font-bold text-gray-700">Informations Patient</h2>
            {
                paiement.facture?.patient ? (
                  // Si `paiement.facture.patient` est défini
                  <>
                    <p className="text-gray-600">
                      <strong>Nom :</strong> {paiement.facture.patient_detail.user_detail.first_name}{" "}
                      {paiement.facture.patient_detail.user_detail.last_name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Email :</strong> {paiement.facture.patient_detail.user_detail.email}
                    </p>
                    <p className="text-gray-600">
                      <strong>Date :</strong>{" "}
                      {new Date(paiement.date || Date.now()).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <strong>Statut :</strong> Patient enregistré
                    </p>
                  </>
                ) : (
                  // Si `paiement.facture.patient` n'est pas défini
                  <>
                    <p className="text-gray-600">
                      <strong>Nom :</strong> {paiement.facture.rendezVous_details.nom}{" "}
                      {paiement.facture.rendezVous_details.prenom}
                    </p>
                    <p className="text-gray-600">
                      <strong>Email :</strong> {paiement.facture.rendezVous_details.email}
                    </p>
                    <p className="text-gray-600">
                      <strong>Date :</strong>{" "}
                      {new Date(paiement.date || Date.now()).toLocaleDateString()}
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        paiement.facture.statut_paiement === "Payé"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <strong>Statut de Paiement :</strong> {paiement.facture.statut_paiement}
                    </p>
                  </>
                )
              }

          </div>
        </div>

        {/* Référence et montants */}
        <div className="p-6 mb-10 border rounded-lg bg-gray-50">
          {/* <p className="mb-4 text-lg font-semibold text-gray-700">
            <strong>Référence :</strong> {paiement.reference_paiement}
          </p>
          <p className="mb-2 text-lg font-semibold text-gray-700">
            <strong>Montant Total :</strong> {paiement.facture.montant} €
          </p>
          <p className="mb-2 text-lg font-semibold text-gray-700">
            <strong>Montant Reçu :</strong> {paiement.montant} €
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <strong>Montant Retourné :</strong> {paiement.montant_restant} €
          </p> */}
          <p className="mb-4 text-lg font-semibold">
            <strong>Référence :</strong> {paiement.reference_paiement}
          </p>
          <p className="mb-2 text-lg font-semibold text-green-700">
            <strong>Montant Total :</strong> {paiement.facture.montant} €
          </p>
          <p className="mb-2 text-lg font-semibold text-red-700">
            <strong>Montant Reçu :</strong> {paiement.montant} €
          </p>
          <p className="text-lg font-semibold text-blue-700">
            <strong>Montant Retourné :</strong> {paiement.montant_restant} €
          </p>
        </div>

        {/* Authentification */}
        <p className="text-sm italic text-gray-500">
          Ce document est généré électroniquement et ne nécessite pas de signature.
        </p>

        {/* Date et lieu */}
        <div className="mt-6 mb-10 text-right">
          <p className="text-gray-600 talic ">
            Fait à Tunis, le {new Date(paiement.date || Date.now()).toLocaleDateString()}
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
            #paiementRef, #paiementRef * {
              visibility: visible;
            }
            #paiementRef {
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

export default DetailRecu;

import { Input, Label } from '@windmill/react-ui'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearSuccess } from '../../../Api/features/paiement/paiementSlice'
import { addPaiement } from '../../../Api/features/paiement/paiementThunks'
import Loading from '../../../utils/Loading'



const  AjoutPaiement = (props) => {
  const { facture } = props.location.state || {}; // Récupérer la facture via `props.location.state`
  
  const dispatch = useDispatch();
  const  navigate = useHistory().push;


  const [codeFaccture, setCodeFacture] = useState('');
  const [montantTotal, setMontantTotal] = useState('');
  const [montantRecu, setMontantRecu] = useState('');

  
  const { success, loading } = useSelector((state) => state.paiement)
  // const { examens } = useSelector((state) => state.examen)

  
  useEffect(() => {
    if (facture) {
      setCodeFacture(facture.numfacture);
      setMontantTotal(facture.montant);
    }
  }, [facture]);
  
  
    
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPaiement({numero_facture: codeFaccture, montant: montantRecu}));
    

  };

  useEffect(() => {
    if (success === 'Paiement added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/reception/factures/paiement');      
      console.log(success);
    }
  }, [dispatch, navigate, success]);
      
  
  
  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      { loading && <Loading/>}
      {/* {console.log(facture)} */}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Faire un paiement
              </h1>
              <Label className="mt-4">
                <span>Entrez le code de la facture </span>
                <Input className="px-4 py-3 mt-1" placeholder="Ex : FACT-18293" onChange={(e) => setCodeFacture(e.target.value)} value={facture.numfacture}/>
              </Label>

              <Label className="mt-4">
                <span>Montant total </span>
                <Input className="px-4 py-3 mt-1" placeholder="Ex : 199 " onChange={(e) => setMontantTotal(e.target.value)} value={facture.montant}/>
              </Label>

              <Label className="mt-4">
                <span>Montant reçu </span>
                <Input className="px-4 py-3 mt-1" placeholder="10000 " onChange={(e) => setMontantRecu(e.target.value)}/>
              </Label>
              
              
                {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none sm:text-xl btnprise font-montserrat"
              >
                Ajouter
              </button>
              
            </form>  
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AjoutPaiement

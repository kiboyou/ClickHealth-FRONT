import React, { useEffect, useState } from 'react'

import { Input, Label } from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearSuccess } from '../../../Api/features/groupe/groupeSlice'
import { addGroup } from '../../../Api/features/groupe/groupeThunks'
import Loading from '../../../utils/Loading'
import DialogSuccess from "../../../utils/dialog/DialogSuccess";


const  AjoutGroupe = () => {
  
  const dispatch = useDispatch();
  const  navigate = useHistory().push;


  const [first_name, setFirst_name] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  
  const { success, error, loading, selectedGroup } = useSelector((state) => state.groupe);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGroup({name: first_name}));

  };

  useEffect(() => {
    if (success === 'Group added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      setIsSuccessModalOpen(true);
      console.log(success);
    }
  }, [dispatch, navigate, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/configuration/groupes');
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      
      { loading && <Loading/>}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter un groupe
              </h1>
              <Label className="mt-4">
                <span className='text-gray-200'>Nom du groupe </span>
                <Input className="px-4 py-3 mt-1 border-0 focus:ring-0" placeholder="Ex : administrateur" onChange={(e) => setFirst_name(e.target.value)}/>
              </Label>
                <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat" >
                  Ajouter
                </button>
            </form>  
            </div>
          </main>
        </div>
      </div>
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`Le groupe ${selectedGroup?.name} a été ajouté avec succès.`}
      />
    </div>
  )
}

export default AjoutGroupe
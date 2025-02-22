import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import ImageLight from '../../assets/img/update.jpg';
import ImageDark from '../../assets/img/update.jpg';
import { Label, Input } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser, changePasseWordUser } from '../../Api/features/userAuth/authThunks';
import Loading from '../../utils/Loading';

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  const [ancien_password, setPassword] = useState('');
  const [nouveau_password, setNewPassword] = useState('');
  const [savepassword, setSavePassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSavePassword, setShowSavePassword] = useState(false);

  // Récupère le statut d'authentification, le succès, et les erreurs depuis Redux
  const { isAuthenticated, success, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nouveau_password == savepassword) {
      dispatch(changePasseWordUser({ ancien_password, nouveau_password }));
    } else {
      alert('Les mots de passe ne correspondent pas');
    }
  };

  // Déconnecte l'utilisateur et redirige après un changement de mot de passe réussi
  useEffect(() => {
    if (success) {
      dispatch(logoutUser());
      navigate('/login');
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      { loading && <Loading/>}
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-cadre1">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ImageLight} alt="Office" />
            <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ImageDark} alt="Office" />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">Modifer le mot de passe</h1>
                {error && typeof error === 'string' && <p style={{ color: 'red' }}>{error}</p>}
                {error && typeof error === 'object' && <p style={{ color: 'red' }}>{error.email || error.password || 'Une erreur est survenue.'}</p>}

                <Label className="relative mt-6">
                  <span className="text-gray-200">Ancien mot de passe</span>
                  <Input
                    className="px-4 py-3 mt-1 outline-none border-0 focus:ring-0"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="***************"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center p-2 pt-8 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                  </button>
                </Label>

                <Label className="relative mt-6">
                  <span className="text-gray-200">Nouveau mot de passe</span>
                  <Input
                    className="px-4 py-3 mt-1 outline-none border-0 focus:ring-0"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="***************"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center p-2 pt-8 focus:outline-none"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                  </button>
                </Label>

                <Label className="relative mt-6">
                  <span className="text-gray-200">Confirmer le nouveau mot de passe</span>
                  <Input
                    className="px-4 py-3 mt-1 outline-none border-0 focus:ring-0"
                    type={showSavePassword ? 'text' : 'password'}
                    placeholder="***************"
                    onChange={(e) => setSavePassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center p-2 pt-8 focus:outline-none"
                    onClick={() => setShowSavePassword(!showSavePassword)}
                  >
                    {showSavePassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                  </button>
                </Label>

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg sm:text-xl btnprise font-montserrat focus:outline-none"
                >
                  Modifer
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;

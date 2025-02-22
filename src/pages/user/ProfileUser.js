import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedecins } from "../../Api/features/medecins/medecinThunks";
import { fetchPatients } from "../../Api/features/patient/patientThunks";
import { fetchReceptionnistes } from "../../Api/features/receptionnistes/receptionnisteThunk";
import groupeUser from "../../utils/GrourpeUser";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


function ProfileUser() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [userForm, setUserForm] = useState();
  const [userDetail, setUserDetail] = useState();

  const { user } = useSelector((state) => state.auth);
  const { patients } = useSelector((state) => state.patient);
  const { medecins } = useSelector((state) => state.medecins);
  const { receptionnistes } = useSelector((state) => state.receptionnistes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user && user.groups) {
      const groupName = user.groups[0].name;

      if (groupName === groupeUser.medecin) {
        const medecin = medecins.filter(
          (medecinre) => medecinre.utilisateur_info.id === user.id
        );
        setUserData(medecin.utilisateur_info);
        setUserDetail(...medecin);
      } else if (groupName === groupeUser.receptionniste) {
        const receptionniste = receptionnistes.filter(
          (receptionniste) => receptionniste.utilisateur_info.id === user.id
        );
        setUserData(receptionniste.utilisateur_info);
        setUserDetail(...receptionniste);
      } else if (groupName === groupeUser.patient) {
        const patient = patients.filter(
          (patient) => patient.user_detail.id === user.id
        );
        setUserData(patient.user_detail);
        setUserDetail(...patient);
      } else {
        setUserData(user);
      }
    }
  }, [patients, user, receptionnistes, medecins]);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchMedecins());
    dispatch(fetchReceptionnistes());
  }, [dispatch]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Profile updated:", userForm);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (userForm.newPassword === userForm.confirmPassword) {
      console.log("Password updated successfully!");
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <main className="w-full p-6 mx-auto">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Afficher les informations de l'utilisateur */}
        <div className="p-6 rounded-md shadow-md card bg-cadre1 text-cool-gray-100">
          <h2 className="mb-10 text-xl font-bold text-c">Utilisateur</h2>
          <div className="mb-8">
            <p className="text-sm font-medium text-c">Nom:</p>
            <p className="text-lg">{user?.first_name}</p>
          </div>
          <div className="mb-8">
            <p className="text-sm font-medium text-c">Prenom:</p>
            <p className="text-lg">{user?.last_name}</p>
          </div>
          <div className="mb-8">
            <p className="text-sm font-medium text-c">Email:</p>
            <p className="text-lg">{user?.email}</p>
          </div>
        </div>

        {/* Modifier le profil */}
        <div className="p-6 bg-white rounded-md shadow-md text-c1 card bg-cadre1 text-cool-gray-100">
          <h2 className="mb-4 text-xl font-bold text-c">Modifier l' utilisateur</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Nom</label>
              <input
                type="text"
                name="first_name"
                value={user?.first_name}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Prenom</label>
              <input
                type="text"
                name="last_name"
                value={user?.last_name}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                required
              />
            </div>
            <div className="mb-10">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-c1 btnprise focus:outline-none"
            >
              Modifier
            </button>
          </form>
        </div>
      </section>
      {console.log("donne", userDetail)}
      {/* Changer le mot de passe */}
      {user && user.groups[0].name !== groupeUser.administrateur && (
        <section className="grid grid-cols-1 gap-6 mt-6 text-cool-gray-100 lg:grid-cols-2">
         {/* Afficher le profil */}
         
         <div className="p-6 rounded-md shadow-md card bg-cadre1 text-cool-gray-100">
            <h2 className="mb-10 text-xl font-bold text-c">Profil </h2>
            {(() => {
                switch (user.groups[0]?.name) {
               
                case groupeUser.medecin:
                    return (
                    <>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Fonction:</p>
                        <p className="text-lg">{userDetail?.fonction_detail?.nom_fonction || "Non spécifié"}</p>
                        </div>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Spécialité:</p>
                        <p className="text-lg">{userDetail?.specialite_detail?.nom_specialite || "Non spécifié"}</p>
                        </div>
                    </>
                    );
                case groupeUser.patient:
                    return (
                    <>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Téléphone:</p>
                        <p className="text-lg">{userDetail?.telephone || "Non spécifié"}</p>
                        </div>
    
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Adresse:</p>
                        <p className="text-lg">{userDetail?.adresse || "Non spécifié"}</p>
                        </div>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Ville:</p>
                        <p className="text-lg">{userDetail?.ville || "Non spécifié"}</p>
                        </div>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Profession:</p>
                        <p className="text-lg">{userDetail?.profession || "Non spécifié"}</p>
                        </div>
                    </>
                    );
                case groupeUser.receptionniste:
                    return (
                    <>
                        <div className="mb-8">
                        <p className="text-sm font-medium text-c">Caisse:</p>
                        <p className="text-lg">{userDetail?.caisse_detail?.caisse || "Non spécifié"}</p>
                        </div>
                    </>
                    );
                default:
                    return null;
                }
            })()}
            </div>

          <div className="p-6 rounded-md shadow-md card bg-cadre1">
            <h2 className="mb-10 text-xl font-bold text-c">Changer le mot de passe</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                  placeholder="********"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                  placeholder="********"
                  required
                />
                
              </div>
              <div className="mb-10">
                <label className="block mb-2 text-sm font-medium">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded-md text-c1 focus:shadow-outline-gray focus:outline-none"
                  placeholder="********"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-c1 btnprise focus:outline-none"
              >
                Modifier mon mot de passe
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProfileUser;

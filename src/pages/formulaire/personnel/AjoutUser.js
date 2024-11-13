import React, { useEffect, useState } from 'react'

import { Input, Label, Select } from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addUser } from '../../../Api/features/user/userThunks'
import { fetchGroups } from '../../../Api/features/groupe/groupeThunks'
import Loading from '../../../utils/Loading'

const  AjoutUser = () => {
  
  const dispatch = useDispatch();
  const  navigate = useHistory().push;
  
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [groupes, setGroups] = useState([]);
  
  const { success, error, loading } = useSelector((state) => state.user);
  const { groups } = useSelector((state) => state.groupe)

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, first_name, last_name, groupes);
    dispatch(addUser({email, first_name, last_name, groups: groupes}));

  };

  useEffect(() => {
    dispatch(fetchGroups())
  }, [groups.length, dispatch])

  
  useEffect(() => {
    if (success == 'User added successfully') {
      navigate('/app/user');
    }
  }, [dispatch, navigate, success]);
      
  return (
    
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      
      { loading && <Loading/>}
          
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          {/* <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div> */}
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Ajouter un patient
              </h1>
              
              <Label className="mt-4">
                <span>Email</span>
                <Input className="px-4 py-3 mt-1" type="email" placeholder="kiboyou@gmail.com" onChange={(e) => setEmail(e.target.value)} />
              </Label>
              
              <Label className="mt-4">
                <span>Nom</span>
                <Input className="px-4 py-3 mt-1" placeholder="OUATTARA" onChange={(e) => setFirst_name(e.target.value)}/>
              </Label>

              <Label className="mt-4">
                <span>Prenoms</span>
                <Input className="px-4 py-3 mt-1" placeholder="Kiboyou Mohamed" onChange={(e) => setLast_name(e.target.value)}/>
              </Label>

              <Label className="mt-4">
                <span>Groupe</span>
                <Select className="mt-1" onChange={(e) => setGroups([e.target.value])}>
                  <option></option>
                  {
                    groups.map((groupe, i) => (
                      <option key={i}>{groupe.name}</option>
                    ))
                  }
                
                </Select>
              </Label>
              
              {/* <Label className="mt-4">
                <span>Password</span>
                <Input className="px-4 py-3 mt-1" placeholder="***************" type="password" />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input className="px-4 py-3 mt-1" placeholder="***************" type="password" />
              </Label> */}

                <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
                  Ajouter
                </button>

              {/* <hr className="my-8" /> */}


              {/* <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-white"
                  to="/login"
                >
                  Already have an account? Login
                </NavLink>
              </p> */}
            </form>  
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AjoutUser

import { useEffect, useState } from 'react'
import './App.css'
import AuthScreen from './components/AuthScreen/AuthScreen'

import Trips from './components/Trips'

function App() {

  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {

    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <div className='app'>
      {authToken ? <Trips /> : <AuthScreen setAuthToken={setAuthToken} />}
      
     
    </div>
  )
}

export default App

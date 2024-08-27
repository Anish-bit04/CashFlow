import React, { lazy, Suspense, useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
const Signup = lazy( ()=> import('./pages/Signup.jsx'))
const Signin = lazy(()=>import('./pages/Signin.jsx')) 
const Dashboard =  lazy(()=>import('./pages/Dashboard.jsx')) 
const SendMoney = lazy(()=>import ('./pages/SendMoney.jsx')) 

const App = () => {

  const [isAuthenticated,setisAuthenticated] = useState(false)

  const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/signup" />;
  };

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={['/signup','/']} element={<Suspense fallback={'Loading...'}><Signup setisAuthenticated = {setisAuthenticated}/> </Suspense> }/>
        <Route path='/signin' element={<Suspense fallback={'Loading...'}><Signin setisAuthenticated = {setisAuthenticated}/></Suspense> }/>
        <Route path='/dashboard' element={ 
          <Suspense fallback={'Loading'}>
            <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard/>
            </PrivateRoute>
          </Suspense>}/>
        <Route path='/send' element={ <Suspense fallback={'Loading...'}> <SendMoney/></Suspense>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
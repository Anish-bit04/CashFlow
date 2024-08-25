import React, { lazy, Suspense } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
const Signup = lazy( ()=> import('./pages/Signup.jsx'))
const Signin = lazy(()=>import('./pages/Signin.jsx')) 
const Dashboard =  lazy(()=>import('./pages/Dashboard.jsx')) 
const SendMoney = lazy(()=>import ('./pages/SendMoney.jsx')) 

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Suspense fallback={'Loading...'}><Signup/> </Suspense> }/>
        <Route path='/signin' element={<Suspense fallback={'Loading...'}><Signin/></Suspense> }/>
        <Route path='/dashboard' element={ <Suspense fallback={'Loading'}><Dashboard/></Suspense>}/>
        <Route path='/send' element={ <Suspense fallback={'Loading...'}> <SendMoney/></Suspense>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
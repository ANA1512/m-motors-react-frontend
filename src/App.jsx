import { useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Filter from './components/Filter'
import VehiculeList from './components/VehiculeList'
import Login from './components/Login'
import Register from './components/Register'
import VehiculeDetail from './components/VehiculeDetails'
import Cart from './components/Cart'

import './App.css'


function App() {

  const [search, setSearch] = useState('')

  return (
    <div className='container mt-4'>
      <Navbar/>
      <Routes>
        < Route
          path ="/" 
          element={
            <>
              <Filter search={search} setSearch={setSearch} />
              <VehiculeList search={search} />
            </>
             }/>

         <Route 
          path = "/login"
          element={<Login/>}
          />

          <Route
          path = "/register"
          element={<Register/>}
          />

          <Route
          path = "/vehicules/:id"
          element = {<VehiculeDetail/>}
          />
          <Route 
          path="/cart" 
          element={<Cart />} 
          />
      
         
      </Routes>
     
     
   
    </div>
  )
}

export default App

import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Filter from './components/Filter'
import VehiculeList from './components/VehiculeList'
import './App.css'


function App() {

   const[search,setSearch] = useState('')

  return (
    <div className='container mt-4'>
      <Navbar/>
      <Filter search={search} setSearch={setSearch}/>
      <VehiculeList search={search} />
   
    </div>
  )
}

export default App

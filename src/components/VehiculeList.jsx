import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function VehiculeList({ search }) {
  const [vehicules, setVehicules] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5001/vehicules")
      .then(response => response.json())
      .then(data => setVehicules(data))
  }, [])

  const vehiculesFiltres = vehicules.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {vehiculesFiltres.map(vehicule => (
       <Link to={`/vehicules/${vehicule.id}`}
              key={vehicule.id}>
        <li>
          <p>Name : 
            {vehicule.name}
            {vehicule.description} 
            {vehicule.price}
          </p>
        </li>
        </Link>
      ))}
    </div>
  )
}

export default VehiculeList

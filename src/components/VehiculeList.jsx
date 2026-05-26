import { useState, useEffect } from 'react'

function VehiculeList({ search }) {
  const [vehicules, setVehicules] = useState([])

  useEffect(() => {
    fetch("http://localhost:5001/vehicules")
      .then(response => response.json())
      .then(data => setVehicules(data))
  }, [])

  const vehiculesFiltres = vehicules.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {vehiculesFiltres.map(vehicule => (
        <li key={vehicule.id}>
          <p>Name : {vehicule.name} {vehicule.description} {vehicule.price}</p>
        </li>
      ))}
    </div>
  )
}

export default VehiculeList

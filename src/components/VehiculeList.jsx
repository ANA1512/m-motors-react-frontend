import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Images placeholder pour les voitures
const carImages = {
  'Vente': [
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=640',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=640',
    'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=640',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640',
  ],
  'Location': [
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=640',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=640',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=640',
    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=640',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=640',
  ]
}

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

  const ventes = vehiculesFiltres.filter(v => v.type === 'Vente')
  const locations = vehiculesFiltres.filter(v => v.type === 'Location')

  const renderCartes = (liste, type) => (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {liste.map((vehicule, index) => (
        <div className="col" key={vehicule.id}>
          <div className="card h-100 shadow-sm">
            <img
              src={carImages[type][index % carImages[type].length]}
              className="card-img-top"
              alt={vehicule.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{vehicule.name}</h5>
              <p className="card-text text-muted">{vehicule.description}</p>
              <ul className="list-unstyled small">
                <li><strong>Marque :</strong> {vehicule.marque || '-'}</li>
                <li><strong>Kilométrage :</strong> {vehicule.kilometrage} km</li>
                <li><strong>Transmission :</strong> {vehicule.transmission || '-'}</li>
                <li><strong>Places :</strong> {vehicule.places || '-'}</li>
              </ul>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <span className="fw-bold text-primary fs-5">
                {vehicule.price} {type === 'Location' ? '€/mois' : '€'}
              </span>
              <Link
                to={`/vehicules/${vehicule.id}`}
                className="btn btn-outline-dark btn-sm"
              >
                Voir le détail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mt-4">
      {/* SECTION VENTE */}
      <section className="mb-5">
        <h2 className="mb-4 border-bottom pb-2"> Véhicules à la vente</h2>
        {ventes.length > 0
          ? renderCartes(ventes, 'Vente')
          : <p className="text-muted">Aucun véhicule disponible à la vente.</p>
        }
      </section>

      {/* SECTION LOCATION */}
      <section className="mb-5">
        <h2 className="mb-4 border-bottom pb-2">Véhicules en location</h2>
        {locations.length > 0
          ? renderCartes(locations, 'Location')
          : <p className="text-muted">Aucun véhicule disponible à la location.</p>
        }
      </section>

    </div>
  )
}

export default VehiculeList

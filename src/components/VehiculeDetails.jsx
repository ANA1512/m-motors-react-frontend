import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function VehiculeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehiculesSelected, setVehiculesSelected] = useState(null)

  useEffect(() => {
    fetch(`https://m-motors-flask-backend.onrender.com:5001/vehicule/${id}`)
      .then(response => response.json())
      .then(data => setVehiculesSelected(data))
  }, [id])

  if (!vehiculesSelected) return <p className="text-center mt-5">Chargement...</p>

  const handleAddToCart = () => {
    if (localStorage.getItem("data") == null) {
      localStorage.setItem("data", JSON.stringify([]))
    }

    let old = JSON.parse(localStorage.getItem("data"))
    const existVehicule = old.some(v => v.id === vehiculesSelected.id)

    if (existVehicule) {
      return alert("Ce véhicule a déjà été ajouté au panier")
    } else {
      old.push({
        ...vehiculesSelected,
        type: vehiculesSelected.type
      })
      localStorage.setItem("data", JSON.stringify(old))
      navigate('/cart')
    }
  }

  const carImage = vehiculesSelected.type === 'Location'
    ? 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop'
    : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=400&fit=crop'

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/')}
      >
        ← Retour
      </button>

      <div className="row g-4">

        {/* IMAGE */}
        <div className="col-md-6">
          <img
            src={carImage}
            alt={vehiculesSelected.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: '350px', objectFit: 'cover' }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h2 className="fw-bold">{vehiculesSelected.name}</h2>
          <span className={`badge mb-3 ${vehiculesSelected.type === 'Location' ? 'bg-info text-dark' : 'bg-success'}`}>
            {vehiculesSelected.type}
          </span>

          <p className="text-muted">{vehiculesSelected.description}</p>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Marque</th>
                <td>{vehiculesSelected.marque || '-'}</td>
              </tr>
              <tr>
                <th>Kilométrage</th>
                <td>{vehiculesSelected.kilometrage} km</td>
              </tr>
              <tr>
                <th>Transmission</th>
                <td>{vehiculesSelected.transmission || '-'}</td>
              </tr>
              <tr>
                <th>Places</th>
                <td>{vehiculesSelected.places || '-'}</td>
              </tr>
              <tr>
                <th>Prix</th>
                <td className="fw-bold text-primary fs-5">
                  {vehiculesSelected.price} {vehiculesSelected.type === 'Location' ? '€/mois' : '€'}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-dark w-100 mt-2"
            onClick={handleAddToCart}
          >
            🛒 Ajouter au panier
          </button>
        </div>

      </div>
    </div>
  )
}

export default VehiculeDetails

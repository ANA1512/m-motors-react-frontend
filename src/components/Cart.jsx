import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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

function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("data")) || [])

  const handleCreateFiles = async (e, vehicule) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    if (!token) {
      localStorage.setItem("waitForVehicule", JSON.stringify(vehicule))
      navigate("/login")
      return
    }

    const sendDataFiles = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        vehicule_id: vehicule.id,
        type_financement: vehicule.type,
        statut: 'à compléter'
      })
    }

    fetch('https://m-motors-flask-backend.onrender.com/dossier', sendDataFiles)
      .then(response => response.json())
      .then(() => {
        alert('Dossier créé. Compléter votre demande sur votre compte')
        navigate("/moncompte")
      })
  }

  const handleRemove = (id) => {
    const updated = cart.filter(v => v.id !== id)
    setCart(updated)
    localStorage.setItem("data", JSON.stringify(updated))
  }

  const getImage = (vehicule, index) => {
    const type = vehicule.type === 'Location' ? 'Location' : 'Vente'
    const images = carImages[type]
    return images[index % images.length]
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4"> Mon panier</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          Votre panier est vide. <a href="/" className="alert-link">Voir les véhicules</a>
        </div>
      ) : (
        <div className="row g-4">
          {cart.map((vehicule, index) => (
            <div className="col-md-6 col-lg-4" key={vehicule.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={getImage(vehicule, index)}
                  alt={vehicule.name}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{vehicule.name}</h5>
                  <span className={`badge mb-2 ${vehicule.type === 'Location' ? 'bg-info text-dark' : 'bg-success'}`}>
                    {vehicule.type}
                  </span>
                  <p className="card-text fw-bold text-primary fs-5">
                    {vehicule.price} {vehicule.type === 'Location' ? '€/mois' : '€'}
                  </p>
                </div>
                <div className="card-footer d-flex gap-2">
                  <button
                    className="btn btn-dark flex-grow-1"
                    onClick={(e) => handleCreateFiles(e, vehicule)}
                  >
                    Créer un dossier
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleRemove(vehicule.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cart

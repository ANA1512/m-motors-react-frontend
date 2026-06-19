
import{useState} from 'react'


function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("data")) || [])
    console.log("cart:", cart)
   
    
    const handleCreateFiles = async (e,vehicule) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    if (!token) {
    localStorage.setItem("waitForVehicle", JSON.stringify(vehicule))
    window.location.href = "/login"
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
            statut: 'à complèter'
        })
    }

    fetch('http://127.0.0.1:5001/dossier', sendDataFiles)
        .then(response => response.json())
        .then(data => {
         alert('Dossier crée. Complèter votre demande sur votre compte')
         window.location.href = "/moncompte"
        })
  }
  

  return (
    <div>
      {cart.map(vehicule => (
        <li key={vehicule.id}>
            {vehicule.name} -
            {vehicule.type} -
            {vehicule.price} -
            
          <form>
            
          <input 
            onClick={(e) => handleCreateFiles(e, vehicule)}
            type="submit"
            value="Créer un dossier"
          />
      </form>
        </li>
))}
    </div>
  )
}


export default Cart

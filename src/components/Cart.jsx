
import{useState} from 'react'


function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("data")) || [])
    console.log("cart:", cart)
    const[revenuMensuel, setRevenuMensuel] = useState('')
    
  const handleCreateFiles = (e, vehicule) => {
    e.preventDefault()

    const sendDataFiles = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            vehicule_id: vehicule.id,
            type_financement: vehicule.type,
            revenu_mensuel: parseInt(revenuMensuel),
            statut: 'en attente'
        })
    }

    fetch('http://127.0.0.1:5001/dossier', sendDataFiles)
        .then(response => response.json())
        .then(data => alert('Dossier envoyé et en cours d\'examen'))
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
                type="text" 
                value={revenuMensuel}
                onChange={(e) => setRevenuMensuel(e.target.value)} 
           />
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

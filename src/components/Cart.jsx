
import{useState} from 'react'

function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("data")) || [])
    console.log("cart:", cart)

  return (
    <div>
      {cart.map(vehicule => (
        <li key={vehicule.id}>
            {vehicule.name} -
            {vehicule.type} -
            {vehicule.price} -
        </li>
))}
    </div>
  )
}

export default Cart

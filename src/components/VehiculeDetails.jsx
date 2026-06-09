import{useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import{useNavigate} from 'react-router-dom'



function VehiculeDetails() {
    const {id} = useParams()
    const navigate  = useNavigate()
    const [vehiculesSelected, setVehiculesSelected] = useState(null)
    const [selectedChoice, setSelectedChoice] = useState('Vente')
   
    

    const handleChange =(event) =>{
        setSelectedChoice(event.target.value)
       
    }


     useEffect(() => {
       fetch(`http://127.0.0.1:5001/vehicule/${id}`)
         .then(response => response.json())
         .then(data => setVehiculesSelected(data))
     }, [id])
   
     if(!vehiculesSelected) return <p>Chargement....</p>
    
         const handleAddToCart =()=>{

        if(localStorage.getItem("data")==null){
           localStorage.setItem("data", JSON.stringify([]))
        }

     
        let old =JSON.parse(localStorage.getItem("data"));
      
         //existing vehicule
        const existVehicule = old.some(v => v.id === vehiculesSelected.id)
        
        if( existVehicule){
            return alert("ce vehicule a deja ete ajouté")

        }else 
            console.log("ajout du vehicule", vehiculesSelected)
            old.push({
                 ...vehiculesSelected,
                type :selectedChoice
            });
            localStorage.setItem("data", JSON.stringify(old)) 
             navigate('/cart')
        }
        
    
    

  return (
    <div>
          
        <li key={vehiculesSelected.id}>
          <p>Name : 
            {vehiculesSelected.name} 
            {vehiculesSelected.description} 
            {vehiculesSelected.price} 
            {vehiculesSelected.kilometrage}
            {vehiculesSelected.marque}
            {vehiculesSelected.transmission}
            {vehiculesSelected.places}
          </p>
        </li>

        <label>
            <input
                type ="radio"
                name ="type"
                value ="Vente"
                checked={selectedChoice === 'Vente'}
                onChange ={handleChange}/>
                <p>Vente</p>
               
        </label>
        <br/>
         <label>
            <input
                type ="radio"
                name ="type"
                value ="Location"
                checked={selectedChoice === 'Location'}
                onChange ={handleChange}/>
                <p>location</p>
        </label>
        
        <br/>
     
        <button onClick={handleAddToCart}>
            Ajouter au panier
        </button>

      
    </div>
  )
}


export default VehiculeDetails


import { useState} from 'react'
import{Link, useNavigate} from 'react-router-dom'

function Login() {

const navigate  = useNavigate()
const[userEmail, setUserEmail] = useState('')
const[userPassword, setUserPassword]= useState('')
const[errorMessage, setErrorMessage] = useState('')


const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!userEmail || !userPassword) return

    const response = await fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword })

    })
    const data = await response.json()
    
    if (!response.ok) {
        setErrorMessage(data.message || "Email ou mot de passe incorrect")
    return
    }
    

    if(response.ok){
         localStorage.setItem("token", data.token)

         const waitForVehicle = localStorage.getItem("waitForVehicle")

    if (waitForVehicle) {
    const vehicule = JSON.parse(waitForVehicle)

    await fetch("http://127.0.0.1:5001/dossier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token
      },
      body: JSON.stringify({
        vehicule_id: vehicule.id,
        type_financement: vehicule.type,
         revenu_mensuel: 0,
        statut: "à compléter"
      })
    })

    localStorage.removeItem("waitForVehicle")
    window.location.href = "/moncompte"
    return
    }
        
    const meResponse = await fetch("http://127.0.0.1:5001/me", {
    headers: { "Authorization": `Bearer ${data.token}` }
    })
    const meData = await meResponse.json()
    localStorage.setItem('role', meData.role)

  
    
    if(meData.role === "admin"){
        navigate('/admin')
    } else {
        navigate('/')
    }

    }
}

    
  return (
    <div>
        <form onSubmit={handleSubmit} >
            <label>
                 Email:
            <input 
                type="text"
                name="email"
                value={userEmail}
                onChange={(e)=> setUserEmail(e.target.value)}
            />
            </label>
             <label>
                 Password:
            <input 
                type="password" 
                name="password"
        
                value={userPassword}
                onChange={(e)=> setUserPassword( e.target.value)}
            
            />
            </label>

            <input 
                type="submit" value="Submit"
             />
            {errorMessage && (
                <p className="text-danger">
            {errorMessage}
            </p>
            )}


        </form>

        <Link className="link-register-page" to="/register">
            créer votre compte 
        </Link>
      
    </div>
  )
}

export default Login

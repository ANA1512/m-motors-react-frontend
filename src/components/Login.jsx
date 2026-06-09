
import { useState} from 'react'
import{useNavigate} from 'react-router-dom'

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

    if(response.ok){
        localStorage.setItem('token', data.token)
        navigate('/')

    }else{
       setErrorMessage(data.message) 
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
            <p>{errorMessage}</p>
        </form>
      
    </div>
  )
}

export default Login

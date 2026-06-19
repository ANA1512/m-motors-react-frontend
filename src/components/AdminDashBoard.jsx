
import { useEffect, useState } from "react"

function AdminDashBoard() {

    const [dossiers, setDossiers] =useState([])
    const token = localStorage.getItem('token')
    console.log(token)

    useEffect(()=>{

        fetch("http://127.0.0.1:5001/admin/dossier",{
            headers :{ "Authorization" : `Bearer ${token}`}

        })

        .then(res => res.json())
        .then(data =>setDossiers(data))
    },[])

    const updateStatut =(id,newStatut)=>{
        fetch(`http://127.0.0.1:5001/dossier/${id}`,{
        
            method :"PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },

            body: JSON.stringify({statut : newStatut})

        })
        .then(res => res.json())
        .then(updated =>{
            setDossiers(dossiers.map(d => d.id === id ? updated : d))
        })
    }
  return (
    <div>
            <h2>Dashboard Admin</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Véhicule ID</th>
                        <th>Type financement</th>
                        <th>Revenu mensuel</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {dossiers.map(d => (
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.user_id}</td>
                            <td>{d.vehicule_id}</td>
                            <td>{d.type_financement}</td>
                            <td>{d.revenu_mensuel}</td>
                           
                            <td>
                                <select 
                                    value={d.statut} 
                                    onChange={e => updateStatut(d.id, e.target.value)}
                                >
                                    <option value="en attente">en attente</option>
                                    <option value="validé">validé</option>
                                    <option value="refusé">refusé</option>
                                </select>
                            </td>
                             <td>{d.document}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default AdminDashBoard

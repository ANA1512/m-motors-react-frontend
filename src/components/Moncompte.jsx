import {useState, useEffect} from 'react'

function Moncompte() {
    const [getAllClientFiles, setgetAllClientFiles] = useState([])

      useEffect(() => {
        fetch('http://127.0.0.1:5001/dossier', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => setgetAllClientFiles(data))
    }, [])

    
  return (
    <div>
      {
        getAllClientFiles.map(files =>(

            <li key = {files.id}>
                <strong>type :</strong> {files.type_financement} |
                <strong>revenu :</strong> {files.revenu_mensuel} |
                <strong>Statut :</strong> {files.statut}
            </li>

        ))
      }
      
    </div>
  )
}


export default Moncompte

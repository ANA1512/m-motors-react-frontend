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
                {files.type_financement}
                {files.revenu_mensuel}
                {files.statut}
            </li>

        ))
      }
      
    </div>
  )
}


export default Moncompte

import React from 'react'

function Filter({ search, setSearch }) {
  return (
    <div>
      <div className="row g-3 align-items-center mt-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <select className="form-select">
            <option>Tous</option>
            <option>Vente</option>
            <option>Location</option>
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Rechercher</button>
        </div>
      </div>
    </div>
  )
}

export default Filter

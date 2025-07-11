import React from 'react'
import ListDemandeReparation from '../DemandeReparation/ListDemandeReparation'
import ListReparation from '../Reparation/ListReparation'

const Home = ({caller}) => {
  return (
    <>
      {caller!="admin" &&<h2 className="text-center mb-4">RepAppBuro</h2>}
      <div className="row">
        <div className="col-12 col-md-6">
          <ListDemandeReparation />
        </div>
        <div className="col-12 col-md-6">
          <ListReparation />
        </div>
      </div>
    </>
  )
}

export default Home

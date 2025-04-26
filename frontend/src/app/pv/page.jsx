import React from 'react'
import PvTable from './_data/pv-table'

export default function page() {
  return (
        <div className="w-full ">
      <div className="flex justify-between w-full p-2">
        <h1 className="text-3xl">PV</h1>
      </div>
      <div>
        <PvTable/>
      </div>
    </div>
  )
}

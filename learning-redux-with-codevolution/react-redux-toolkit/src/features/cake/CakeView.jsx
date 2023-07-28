import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from './cakeSlice'

const CakeView = () => {
  const [caketoRestock, setCakeToRestock] = useState(5)
  const noOfCakes = useSelector(state => state.cake.noOfCakes)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>No of Cakes: {noOfCakes}</h3>
      <button onClick={() => dispatch(ordered())}>Order Cake</button> <br />
      <input type='text' value={caketoRestock} onChange={e => setCakeToRestock(e.target.value)} />
      <button onClick={() => dispatch(restocked(parseInt(caketoRestock)))}>Restock Cake</button>
    </div>
  )
}

export default CakeView

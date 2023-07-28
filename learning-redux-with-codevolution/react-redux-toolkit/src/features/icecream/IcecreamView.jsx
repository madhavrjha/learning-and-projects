import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from './icecreamSlice'

const IcecreamView = () => {
  const [icecreamToRestock, setIcecreamToRestock] = useState(5)
  const noOfIcecreams = useSelector(state => state.icecream.noOfIcecreams)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>No of Icecream: {noOfIcecreams}</h3>
      <button onClick={() => dispatch(ordered())}>Order Icecream</button> <br />
      <input type='text' value={icecreamToRestock} onChange={e => setIcecreamToRestock(e.target.value)} />
      <button onClick={() => dispatch(restocked(parseInt(icecreamToRestock)))}>Restock Icecream</button>
    </div>
  )
}

export default IcecreamView

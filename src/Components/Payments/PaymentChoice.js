import React from 'react'
import './Paymentmethods.css'
import { NavLink } from 'react-router-dom';
function PaymentChoice() {
  return (
    <div>
      <h1>Payments methods</h1>
      <div className='PaymentContainer'>
        <div className="PaymentBtns">
          <NavLink to="../Card" exact='true' ><button className='payingBtn'>Pay with Card</button> </NavLink>
        </div>
      </div>
    </div>
  )
}

export default PaymentChoice
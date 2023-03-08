import React, { useState, useEffect } from 'react'
import './Card.css'
function Card() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profileInfo")));
    const [todoResult, setTodoResult] = useState([]);
    const [cardNumbers, setCardNumber] = useState("");
    const [cardMm, setMm] = useState("");
    const [cardYy, setYy] = useState("");
    const [cvv, setCvvNumbers] = useState("");
    const pay = () => {
        let todoDetails = {
            cardNumber: cardNumbers,
            cardMonth: cardMm,
            cardYear: cardYy,
            cvvNumber: cvv,
            user: user.email,
            userName: user.name,
            id: Date.now()
        }

        let bankCode ={
            code: Date.now()
        }

        if (cardNumbers !== "" && cardMm !== "" && cardYy !== "" && cvv !== "") {
            let storedUserDetails = new Array();
            let storedUsers = JSON.parse(localStorage.getItem("todo"));
            if (storedUsers) {
                storedUserDetails = storedUsers;
                storedUserDetails.push(todoDetails);
            }
            else {
                storedUserDetails.push(todoDetails);
            }
            sessionStorage.setItem("Code", JSON.stringify(bankCode));
            localStorage.setItem("todo", JSON.stringify(storedUserDetails));
            window.location = "/BankCode";
            sortToDoList();

        }
        
         else {

            alert('Inputs are empty');
        }
       
        let storedCard = JSON.parse(localStorage.getItem("todo"));
        for (let cards of storedCard) {
            
           console.log(cards)
            
          }

    }
    const sortToDoList = () => {
        const toDoList = JSON.parse(localStorage.getItem("todo"))
        const toDoArray = new Array();
        for (let x = 0; x < toDoList?.length; x++) {
            if (toDoList[x].user === user.email) {
                toDoArray.push(toDoList[x])
            }
        }
        setTodoResult(toDoArray)
        console.log(toDoArray)
    }
    useEffect(() => {
        sortToDoList();
        
    }, [])

   


    return (
        <div className='Card'>
            <br></br>
            <br></br>
            <br></br>
            <div className='cardContent'>
                <input type="number" autoComplete='on' className='cardNumbers' placeholder='Card Number' required  value={cardNumbers}
            onChange={(text) => {
              setCardNumber(text.target.value);
            }} />
                <div className='cardDate'>
                    <input type="number" autoComplete='on' placeholder='mm' required value={cardMm}
                        onChange={(text) => {
                            setMm(text.target.value);
                        }} />
                    <input type="number" autoComplete='on' placeholder='yy' required value={cardYy}
                        onChange={(text) => {
                            setYy(text.target.value);
                        }} />
                </div>
                <div>
                    <input type="number" autoComplete='on' className='cvvNumbers' placeholder='Cvv' required  onChange={(text) => {
                            setCvvNumbers(text.target.value);
                        }}  />
                </div>
            </div>
            <div>
                <button onClick={pay}>Submit</button>
            </div>
        </div>
    )
}

export default Card
import React, { useState } from 'react'

export default function BankCode() {
    const [inputCode, setInPut] = useState("");
    const [userCode] = useState(JSON.parse(sessionStorage.getItem("Code")));
    console.log(userCode)
    const code = () => {
       if (inputCode === userCode.code) {
            console.log("correct code")
        }
        else {
            console.log("wrong code")
        }
    }

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <div className='Container'>
                <h1>BankCode</h1>
                <div>
                    <label>Code</label>
                    <input type="text" autoComplete='on' placeholder='Enter Code here' required value={inputCode}
                        onChange={(text) => {
                            setInPut(text.target.value);
                        }} />
                </div>
                <div>
                    <button onClick={code}>Code</button>
                </div>
            </div>
        </div>
    )
}

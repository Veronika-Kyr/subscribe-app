import React, { useState, useEffect } from 'react';
import "./JoinProgram.css";

export default function JoinProgram() {
    const [email, setEmail] = useState('');
    const [clickedSubBTN, setclickedSubBTN] = useState(false);
    const [clickedunSubBTN, setclickedunSubBTN] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [disabledBtn, setdisabledBtn] = useState(false);

    useEffect(() => {
        if (!clickedSubBTN) return;
        setdisabledBtn(true);

        fetch('http://localhost:3000/subscribe', {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email })
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) {
                    window.alert(data.error);
                    setclickedSubBTN(false);
                    unsubscribeView();
                    throw Error();
                }
                else {
                    subscribeView();
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
                unsubscribeView();
                setclickedSubBTN(false);
            })
    }, [clickedSubBTN]);

    useEffect(() => {
        if (!clickedunSubBTN) { return }

        setdisabledBtn(true);
        fetch('http://localhost:3000/unsubscribe', {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((resp) => resp.json())
            .then((data) => {
                unsubscribeView();
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                subscribeView();
                setclickedunSubBTN(false);
            })
    }, [clickedunSubBTN]);

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function subscribeView() {
        setdisabledBtn(false);
        setIsSubscribed(true);
        setclickedSubBTN(false);
    }

    function unsubscribeView() {
        setdisabledBtn(false);
        setIsSubscribed(false);
        setEmail('');
        setclickedunSubBTN(false);
    }

    return (
        <div className='joinProgram'>
            <div className='joinProgram_cover'>
                <h2 className='joinHeader'> Join Our Program</h2>
                <p className='joinText'> Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua</p>
                <form className='joinForm'>
                    {!isSubscribed && (<input className='joinMail' placeholder='E-mail' value={email} type="text" onChange={getEmail} />)}
                    {!isSubscribed && (<input className='joinBtns' type="submit" value="SUBSCRIBE" disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedSubBTN(true); }} />)}
                    {isSubscribed && (<button className='joinBtns' type='submit' disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedunSubBTN(true); }} >UNSUBSCRIBE</button>)}
                </form>
            </div>
        </div>
    )

}
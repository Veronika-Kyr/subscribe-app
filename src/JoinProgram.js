import React, { useState, useEffect } from 'react';
import "./JoinProgram.css";

export default function JoinProgram() {
    const [email, setEmail] = useState('');
    const [clickedSubBTN, setclickedSubBTN] = useState(false);
    const [clickedunSubBTN, setclickedunSubBTN] = useState(false);
    const [emailClass, setEmailClass] = useState('joinMail');
    const [subBtnClass, setsubBtnClass] = useState('joinBtns');
    const [unsubBtnClass, setunsubBtnClass] = useState('dispNone');

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
                    unsubscribing();
                    throw Error();
                }
                else {
                    subscribing();
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
                unsubscribing();
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
                unsubscribing();
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [clickedunSubBTN]);

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function subscribing() {
        setdisabledBtn(false);
        setEmailClass('dispNone');
        setsubBtnClass('dispNone');
        setunsubBtnClass('joinBtns');
        setclickedSubBTN(false);
    }

    function unsubscribing() {
        setdisabledBtn(false);
        setEmailClass('joinMail');
        setsubBtnClass('joinBtns');
        setunsubBtnClass('dispNone');
        setEmail('');
        setclickedunSubBTN(false);
    }

    return (
        <div className='joinProgram'>
            <div className='joinProgram_cover'>
                <h2 className='joinHeader'> Join Our Program</h2>
                <p className='joinText'> Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua</p>
                <form className='joinForm'>
                    <input className={emailClass} placeholder='E-mail' value={email} type="text" onChange={getEmail} />
                    <input className={subBtnClass} type="submit" value="SUBSCRIBE" disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedSubBTN(true); }} />
                    <button className={unsubBtnClass} type='submit' disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedunSubBTN(true); }} >UNSUBSCRIBE</button>
                </form>
            </div>
        </div>
    )

}
import React, { useState } from 'react';
import "./BigCommunity.css";
import Users from './Users';


export default function BigCommunity() {
    const [visClassSection, setVisClassSection] = useState('visibleSection');
    const [valueBtn, setValueBtn] = useState('Hide section');

    return (
        <div className='bigCommunity'>
            <h2 className='headCommunity'>Big Community of <br />People Like You </h2>
            <button className='visibleBtn' value={valueBtn} onClick={() => {
                if (visClassSection === 'visibleSection') {
                    setVisClassSection('invisibleSection');
                    setValueBtn('Show section');
                }
                else {
                    setVisClassSection('visibleSection');
                    setValueBtn('Hide section');
                }
            }} >{valueBtn}</button>
            <div className={visClassSection}>
                <p className='textCommunity'>We're proud of our products, and we're really excited <br /> when we get feedback from our users.</p>
                <Users />
            </div>
        </div>
    )

}
import React, { useState } from 'react';
import "./BigCommunity.css";
import Users from './Users';


export default function BigCommunity() {
    const [showSect, setshowSect] = useState(true);

    return (
        <div className='bigCommunity'>
            <h2 className='headCommunity'>Big Community of <br />People Like You </h2>
            <button className='visibleBtn' onClick={() => setshowSect((prev) => !prev)} >{showSect ? "Hide section" : "Show section"}</button>
            {showSect && (<div className='visibleSection'>
                <p className='textCommunity'>We're proud of our products, and we're really excited <br /> when we get feedback from our users.</p>
                <Users />
            </div>)}
        </div>
    )

}
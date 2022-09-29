import React, { useState, useEffect } from 'react';
import "./BigCommunity.css";

export default function Users() {
    const [userdata, setuserData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/community')
            .then((resp) => resp.json())
            .then((setuserData))
    }, []);
    if (userdata) {
        return (
            <div className='sectionCards'>

                {userdata.map((user, index) => {
                    return (
                        <div key={index} className='userCard'>
                            <img className='userImage' src={user.avatar} alt='photography of user' />
                            <p className='userCitate'>{user.citate}</p>
                            <h4> {user.firstName}  {user.lastName}</h4>
                            <h5> {user.position}</h5>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
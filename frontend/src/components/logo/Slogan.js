//logo component to be used in the header

import React from 'react';
import './logo.css';
import './scrip.js';

const Slogan = () => {

    return (
        <>
            <div className="sloganContainer">
                <h1 className="slogan">Let's&#8287;
                    <span
                        className="txt-rotate"
                        data-period="2000"
                        data-rotate='[ "chat..", "share ideas..", "explore..", "tell stories..", "create..", "stay connected.." ]'
                        >
                    </span>
                </h1>
            </div>
        </>
    );
};


export default Slogan;


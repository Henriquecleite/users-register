import React from 'react';

import classes from './Header.css';

const header = (props) => {
    return (
        <div className={classes.Header}>            
            <div className={classes.Title}>
                Users
            </div>
        </div>
    )
}

export default header;
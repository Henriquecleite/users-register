import React from 'react';

import classes from './RegisterFields.css';

const registerFields = (props) => {
    let fieldClass = props.name.replace(" ","");
    let invalidMessage = null;

    if (props.validity === false && props.name !== "Password") {
        switch (props.name) {
            case "First Name": 
            case "Last Name":
            case "Company Name": 
                invalidMessage = (
                    <div className={classes.InvalidMessage}>
                        {props.name} can't be blank
                    </div>
                ) 
                break;  
            case "Email":
                invalidMessage = (
                    <div className={classes.InvalidMessage}>
                        {props.name} invalid
                    </div>
                ) 
                break;  
            case "Repeat Password":
                invalidMessage = (
                    <div className={classes.InvalidMessage}>
                        Passwords must be valid and match
                    </div>
                )
                break;
            default:
                break;
        }
    }

    return (
        <div className={classes[fieldClass]}>
            <label htmlFor={props.name}>{props.name}</label>
            <div className={classes.InputContainer}>
                <input 
                    type={props.type}
                    id={props.name} 
                    value={props.value}
                    onChange={props.changed}
                    onBlur={props.blurred} /> 
            </div> 
            {invalidMessage}                  
        </div>
    )
}

export default registerFields;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import RegisterFields from '../../components/RegisterFields/RegisterFields';
import classes from './Register.css';

class Register extends Component {

    render() {
        let fieldsMap = null,
            formValidity = null,
            nextStepButtonClass = classes.NextStepButtonDisabled;
        
        fieldsMap = this.props.registerFields.map( field => {
            return (
                <RegisterFields 
                    key={field.name}
                    name={field.name}
                    type={field.type} 
                    value={field.value}
                    validity={field.validity}
                    changed={(event) => this.props.inputChanged(field.name, event)} 
                    blurred={(event) => this.props.inputBlurred(field.name, event)} />
            )
        })

        formValidity = this.props.registerFields.map( field => field.validity).reduce( (acc, validity) => {
            return acc && validity;
        }, true)

        if (formValidity) {
            nextStepButtonClass = classes.NextStepButtonEnabled;
        }

        return (
            <div className={classes.Register}>
                <div className={classes.Container}>
                    <div className={classes.RegisterHeader}>
                        <div className={classes.Title}>
                            Register
                        </div>
                        <div className={classes.Steps}>
                            <div className={classes.Step1}>1</div>
                            <div className={classes.StepsLink}></div>
                            <div className={classes.Step2}>2</div>
                        </div>
                    </div>
                    <div className={classes.RegisterContent}>
                        {fieldsMap}
                        <div className={nextStepButtonClass}
                            onClick={formValidity ? () => this.props.changeScreen("pic-register", "register") : undefined}>
                            NEXT STEP <span>&#62;</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        registerFields: state.registerFields,
        up: state.uploadedPic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeScreen: (screenTo, screenFrom) => dispatch(actions.changeScreen(screenTo, screenFrom)),
        inputChanged: (field, event) => dispatch(actions.inputChanged(field, event)),
        inputBlurred: (field, event) => dispatch(actions.inputBlurred(field, event)),
        saveUser: (field, event) => dispatch(actions.saveUser(field, event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);


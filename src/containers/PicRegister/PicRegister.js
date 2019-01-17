import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import classes from './PicRegister.css';

class PicRegister extends Component {
    
    picInput = React.createRef();

    render() {
        let pictureClass = classes.PictureNo,
            picturStyle = null,
            picturelabel = "Click to upload your profile image";


        if (this.props.picture) {
            pictureClass = classes.PictureYes;
            picturStyle = {
                backgroundImage: 'url(' + this.props.picture + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }
            picturelabel = "Click to edit image";
        }

        return (
            <div className={classes.PicRegister}>
                <div className={classes.Container}>
                    <div className={classes.PicRegisterHeader}>
                        <div className={classes.Title}>
                            Profile photo
                        </div>
                    </div>
                    <div className={classes.PicRegisterContent}>
                        <div 
                            className={pictureClass}
                            style={picturStyle}
                            onClick={() => this.picInput.click()} >
                            <input 
                                id="uploadPicture"
                                type="file"
                                ref={input => this.picInput = input}
                                onChange={event => this.props.uploadPic(event)} />
                            <div 
                                className={classes.PictureLabel} >
                                {picturelabel}
                            </div>
                        </div>     
                        <div className={classes.Buttons}>
                            <div 
                                className={classes.BackButton}
                                onClick={() => this.props.changeScreen("register", "pic-register")} >
                                <span>&#60;</span> Back
                            </div>
                            <div 
                                className={classes.FinishButton}
                                onClick={() => this.props.saveUser()} >
                                FINISH <span>&#62;</span>
                            </div>                            
                            <div className={classes.RightSpace}>
                            </div>                            
                        </div>     
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        picture: state.uploadedPic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeScreen: (screenTo, screenFrom) => dispatch(actions.changeScreen(screenTo, screenFrom)),
        uploadPic: (event) => dispatch(actions.uploadPic(event)),
        saveUser: (field, event) => dispatch(actions.saveUser(field, event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicRegister);


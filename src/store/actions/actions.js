import * as actionTypes from '../actions/actionTypes';

export const changeScreen = (screenTo, screenFrom) => {
    return {
        type: actionTypes.CHANGE_SCREEN,
        screenTo: screenTo,
        screenFrom: screenFrom
    }
};

export const inputChanged = (field, event) => {
    return {
        type: actionTypes.INPUT_CHANGED,
        field: field,
        event: event
    }
};

export const inputBlurred = (field, event) => {
    return {
        type: actionTypes.INPUT_BLURRED,
        field: field,   
        event: event
    }
};

export const saveUser = () => {
    localStorage.removeItem("users-register");
    return {
        type: actionTypes.SAVE_USER,
    }
};

export const savePic = (result) => {
    return {
        type: actionTypes.SAVE_PIC,
        picture: result,
    }
};

export const orderList = (column) => {
    return {
        type: actionTypes.ORDER_LIST,
        column: column,
    }
};

export const uploadPic = (event) => {
    return dispatch => {
        let reader = new FileReader();

        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0])
        }

        reader.onload = event => {
            dispatch(savePic(event.target.result))
        }

    }
};
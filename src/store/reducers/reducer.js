import * as actionTypes from '../actions/actionTypes';

const localStorageRegister = localStorage.getItem("users-register");

const emptyRegisterFields = [
    {name: "First Name", type: "text", value: "", validity: null},
    {name: "Last Name", type: "text", value: "", validity: null},
    {name: "Company Name", type: "text", value: "", validity: null},
    {name: "Email", type: "email", value: "", validity: null},
    {name: "Password", type: "password", value: "", validity: null},
    {name: "Repeat Password", type: "password", value: "", validity: null},
];

const initialState = {
    screen: "list",
    users: [
        {firstName: "Ana", lastName: "Silva", companyName: "Company2", email: "anasilva@gmail.com", pic: null, date: 1515328320000, password: "123"},
        {firstName: "Bruno", lastName: "Souza", companyName: "Company1", email: "brunosouza@gmail.com", pic: null, date: 1515501120000, password: "123"},
        {firstName: "João", lastName: "Oliveira", companyName: "Company3", email: "joaooliveira@gmail.com", pic: null, date: 1515241920000, password: "123"},
    ],
    registerFields: 
        localStorageRegister ? JSON.parse(localStorageRegister) 
            : emptyRegisterFields.map( field => {
                return { ...field }
            }),
    uploadedPic: null,
    listOrder: "date_descending",    
};

const changeScreen = (state, action) => {
    if (action.screenFrom === "register") {
        localStorage.setItem("users-register", JSON.stringify(state.registerFields))
    }

    return {
        ...state,
        screen: action.screenTo,
        registerFields: state.registerFields.map( (field) => {
            return {
                ...field
            }
        })
    }
};

const inputChanged = (state, action) => {
    const inputIndex = state.registerFields.findIndex( field => field.name === action.field
    )
    
    return {
        ...state,
        registerFields: state.registerFields.map( (field, index) => {
            if (index !== inputIndex) {
                return {
                    ...field
                }
            }
            return {
                ...field,
                value: action.event.target.value
            }
        }),
    }
};

const inputBlurred = (state, action) => {
    let validity = null;
    const value = action.event.target.value;
    const inputIndex = state.registerFields.findIndex( field => field.name === action.field
    )
    
    switch (action.field) {
        case "First Name": 
        case "Last Name":
        case "Company Name": 
            value.length > 0 ? validity = true : validity = false;
            break;  
        case "Email":
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            validity = re.test(value);
            break;
        case "Password":
            if (state.registerFields[5].value !== "") {
                validity = (value === state.registerFields[5].value)
            }
            break;
        case "Repeat Password":
            if (state.registerFields[4].value !== "") {
                validity = (value === state.registerFields[4].value)
            }
            break;
        default:
            break;
    }

    return {
        ...state,
        registerFields: state.registerFields.map( (field, index) => {
            if (inputIndex === 4 || inputIndex === 5) {
                if (index !== 4 && index !== 5) {
                    return {
                        ...field
                    }
                } else {
                    return {
                    ...field,
                    validity: validity
                    }
                }
            }

            if (index !== inputIndex) {
                return {
                    ...field
                }
            } else {
                return {
                ...field,
                validity: validity
                }
            }

        }),
    }
};

const saveUser = (state, action) => {
    let currentDate = new Date().getTime();
    return {
        ...state,
        ...initialState,
        registerFields: emptyRegisterFields.map( field => {
            return { ...field }
        }),
        users: [
            ...state.users.map( user => {
                return {
                    ...user
                }
            }),
            {
                firstName: state.registerFields[0].value,
                lastName: state.registerFields[1].value,
                companyName: state.registerFields[2].value,
                email: state.registerFields[3].value,
                password: state.registerFields[4].value,
                date: currentDate,
                pic: state.uploadedPic 
            }  
        ]     
    }
}

const savePic = (state, action) => { 
    return {
        ...state,
        registerFields: state.registerFields.map( field => {
            return {
                ...field
            }
        }),
        users: state.users.map( user => {
            return {
                ...user
            }
        }),
        uploadedPic: action.picture
    }
};

const orderList = (state, action) => {
    let order = null;

    if (action.column === "name") {
        state.listOrder === "name_ascending" ? order = "name_descending" : order = "name_ascending";
    } else if (action.column === "date") {
        state.listOrder === "date_descending" ? order = "date_ascending" : order = "date_descending";
    }
    
    return {
        ...state,
        registerFields: state.registerFields.map( field => {
            return {
                ...field
            }
        }),
        users: state.users.map( user => {
            return {
                ...user
            }
        }),
        listOrder: order,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SCREEN: return changeScreen(state, action);
        case actionTypes.INPUT_CHANGED: return inputChanged(state, action);
        case actionTypes.INPUT_BLURRED: return inputBlurred(state, action);
        case actionTypes.SAVE_USER: return saveUser(state, action);
        case actionTypes.SAVE_PIC: return savePic(state, action);
        case actionTypes.ORDER_LIST: return orderList(state, action);
        default: return state;
    }
}

export default reducer;
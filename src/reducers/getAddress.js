
const initialState = {
    designation:"",
    brandname:"",
    clientname:"",
    domain:"",
    baselocation:"",
    addressLine1:"",
    addressLine2:"",
    pincode:"",
    country:"",
    state:"",
    district:"",
    city:"",
    landmark:"",
    contacts:{
        primaryContact:{
            title:"",
            firstName:"",
            lastName:"",
            email:"",
            contactNumber:"",
            otherContactNumber:"",
        },
        secondaryContact:{
            title:"",
            firstName:"",
            lastName:"",
            email:"",
            contactNumber:"",
            otherContactNumber:"",
        },
        tertiaryContact:{
            title:"",
            firstName:"",
            lastName:"",
            email:"",
            contactNumber:"",
            otherContactNumber:"",
        }
    }
};

const cimsState = {
    form: {...JSON.parse(JSON.stringify(initialState)), country:"India-in"},
    errors: JSON.parse(JSON.stringify(initialState)),
    countries: {},
    ccode: 'in',
    loc: {
        state: "",
        districts: {
            "":[""]
        }
    }
}


const getAddressReducer = (state = cimsState, action) => {
    if(action.type === 'setLoc'){
        const data = action.payload;
        const stateName = data['state'];
        const districtName = Object.keys(data['districts'])[0];
        const cityName = data['districts'][districtName][0];
        return {...state,
            loc: data,
            form: {...state.form, state: stateName, district: districtName, city:cityName}
        };
    }
    else if(action.type === 'setCcode'){
        return {...state,
            ccode: action.payload
        };
    }
    else if(action.type === 'resetForm'){
        return {
            ...state,
            form: {...JSON.parse(JSON.stringify(initialState)), country:"India-in"},
            ccode: 'in',
            loc: {
                state: "",
                districts: {
                    "":[""]
                }
            }
        };
    }
    else if(action.type === 'setCountries'){
        return {
            ...state,
            countries: action.payload
        };
    }
    else{
    return state;}
}

export default getAddressReducer
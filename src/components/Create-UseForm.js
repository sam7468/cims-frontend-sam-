import {useState} from "react";
import axios from 'axios'


// active client - dropdown
// update only on onChange
// phone no validation


const initialFormValues = {
    designation:"",
    brandname:"",
    clientname:"",
    domain:"",
    baselocation:"",
    companyaddress:"",
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
}

const errorValues =  JSON.parse(JSON.stringify(initialFormValues));

const contactSchema = {
    title:"",
    firstName:"",
    lastName:"",
    email:"",
    contactNumber:"",
    otherContactNumber:"",
};

const initialContacts = [
    {label: 'Primary Contact *', title: 'primaryContact'},
    {label: 'Secondary Contact *', title: 'secondaryContact'},
    {label: 'Tertiary Contact', title: 'tertiaryContact'}
]

const fields = [
    {id: 'title', label: 'Title *'},
    {id: 'firstName', label: 'First name *'},
    {id: 'lastName', label: 'Last name *'},
    {id: 'email', label: 'Email address *'},
    {id: 'contactNumber', label: 'Contact Number *'},
    {id: 'otherContactNumber', label: 'Other contact number *'}
]

export default function UseForm() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }; 
    
    const handleOthers = (e) => {
        const d = e.currentTarget.dataset;
        setContacts([...initialContacts, {...d}]);
        setValue(d.title);
        handleClose();
    };

    const [value, setValue] = useState('primaryContact');
    const [contacts, setContacts] = useState(initialContacts);
    const [formData,setformData] = useState(initialFormValues);
    const [n, setN] = useState(Object.keys(formData.contacts).length);
    const [addOthers, setAddOthers] = useState(false);

    // Handel errors
    const [errors, setErrors] = useState(errorValues);
    const validate = (type='', fieldValues) => {
        let temp = { ...errors }
        if ("title" in fieldValues)
            temp['contacts'][type].title = fieldValues.title ? "" : "This field is required."
        if ("firstName" in fieldValues)
            temp['contacts'][type].firstName = fieldValues.firstName ? "" : "This field is required."
        if ("lastName" in fieldValues)
            temp['contacts'][type].lastName = fieldValues.lastName ? "" : "This field is required."
        if ("email" in fieldValues) {
            temp['contacts'][type].email = fieldValues.email ? "" : "This field is required."
            if (fieldValues.email)
                temp['contacts'][type].email = (/^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/).test(fieldValues.email)
                ? ""
                : "Email is not valid."
        }
        if ("contactNumber" in fieldValues){
            temp['contacts'][type].contactNumber = fieldValues.contactNumber ? "" : "This field is required."
            if (fieldValues.contactNumber)
                temp['contacts'][type].contactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.contactNumber)
                ? ""
                : "Contact number is not valid."
        }
        if ("otherContactNumber" in fieldValues){
            temp['contacts'][type].otherContactNumber = fieldValues.otherContactNumber ? "" : "This field is required."
            if (fieldValues.otherContactNumber)
                temp['contacts'][type].otherContactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.otherContactNumber)
                ? ""
                : "Other contact number is not valid."
        }
        setErrors({
            ...temp
        });
    }

    const validateOptional = (type='', fieldValues) => {
        let temp = { ...errors }
        if (fieldValues.title || fieldValues.firstName || fieldValues.lastName ||
            fieldValues.email || fieldValues.contactNumber || fieldValues.otherContactNumber){
                temp['contacts'][type].title = fieldValues.title ? "" : "This field is required."
                temp['contacts'][type].firstName = fieldValues.firstName ? "" : "This field is required."
                temp['contacts'][type].lastName = fieldValues.lastName ? "" : "This field is required."
                temp['contacts'][type].email = fieldValues.email ? "" : "This field is required."
                if (fieldValues.email)
                    temp['contacts'][type].email = (/^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/).test(fieldValues.email)
                    ? ""
                    : "Email is not valid."
                temp['contacts'][type].contactNumber = fieldValues.contactNumber ? "" : "This field is required."
                if (fieldValues.contactNumber)
                    temp['contacts'][type].contactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.contactNumber)
                    ? ""
                    : "Contact number is not valid."
                temp['contacts'][type].otherContactNumber = fieldValues.otherContactNumber ? "" : "This field is required."
                if (fieldValues.otherContactNumber)
                    temp['contacts'][type].otherContactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.otherContactNumber)
                    ? ""
                    : "Other contact number is not valid."
        }
        else{
            temp['contacts'][type].title = ""
            temp['contacts'][type].firstName = ""
            temp['contacts'][type].lastName = ""
            temp['contacts'][type].email = ""
            temp['contacts'][type].contactNumber = ''
            temp['contacts'][type].otherContactNumber = ''
        }
        setErrors({
            ...temp
        });
        return Object.values(temp['contacts'][type]).every((x) => x === "") &&
            Object.values(formData['contacts'][type]).every((x) => x !== "")
    }

    const validateBasic = (fieldValues) => {
        let temp = { ...errors }
        console.log(fieldValues.designation)
        console.log("designation" in fieldValues)
        if ("designation" in fieldValues)
            temp["designation"] = fieldValues.designation ? "" : "This field is required."
        if ("brandname" in fieldValues)
            temp["brandname"] = fieldValues.brandname ? "" : "This field is required."
        if ("clientname" in fieldValues)
            temp["clientname"] = fieldValues.clientname ? "" : "This field is required."
        if ("domain" in fieldValues)
            temp["domain"] = fieldValues.domain ? "" : "This field is required."
        if ("baselocation" in fieldValues)
            temp["baselocation"] = fieldValues.baselocation ? "" : "This field is required."
        if ("companyaddress" in fieldValues)
            temp["companyaddress"] = fieldValues.companyaddress ? "" : "This field is required."
        
        setTimeout(() => {
            setErrors({...temp})    
        }, 100)
        console.log("from temp",temp)
        console.log("from errors",errors)
    }

    // End handel errors
    
    const setformvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        if (e.target.name === 'primaryContact' || e.target.name === 'secondaryContact')
            validate(e.target.name, { [e.target.id]: e.target.value });
        if (e.target.id && e.target.name !== 'primaryContact' && e.target.name !== 'secondaryContact')
            validateOptional(e.target.name, new_form['contacts'][e.target.name])
        if (e.target.name === 'designation' )
            validateBasic({ [e.target.name]: e.target.value })
        if (e.target.name === 'brandname' )
            validateBasic({ [e.target.name]: e.target.value })
        if (e.target.name === 'domain' )
            validateBasic({ [e.target.name]: e.target.value }) 
        if (e.target.name === 'baselocation' )
            validateBasic({ [e.target.name]: e.target.value })
        if (e.target.name === 'companyaddress' )
            validateBasic({ [e.target.name]: e.target.value })
        if (e.target.name === 'clientname' )
            validateBasic({ [e.target.name]: e.target.value })            

        if (validateOptional('tertiaryContact', new_form['contacts']['tertiaryContact'])){
            if(n===3 ? true : (validateOptional(`otherContact${n-3}`, new_form.contacts[`otherContact${n-3}`]) &&
                Object.keys(new_form.contacts).length <= n)){
                    setAddOthers(true)
            }
            else{
                setAddOthers(false)
            }
        }
        else{
            setAddOthers(false)
        }
        setformData(new_form);
        console.log(errors)
    }

    const handleAddOthers = () => {
        let new_form = {...formData}
        new_form['contacts'] = {...new_form['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
        let new_errors = {...errors}
        new_errors['contacts'] = {...new_errors['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
        const d = {label: `Other Contact ${n-2}`, title: `otherContact${n-2}`}
        setformData(new_form)
        setContacts([...initialContacts, {...d}]);
        setErrors(new_errors)
        setValue(d.title);
        setN(Object.keys(new_form.contacts).length);
        setAddOthers(false)
    };

    // Sam
    const [store,setStore] = useState("")
    const [login,setLogin] = useState(true)

    const authStore= ()=>{

        let store = localStorage.getItem('authorization')
        if(store && login)
        {setLogin(true)
         setStore(store) 
         console.log(store)  
        }   
    }

    const submitForm = async(e) =>{
        console.log(formData)
        e.preventDefault()
        // let token = "Bearer "+ store
        const token = localStorage.getItem('authorization')
        try {
            await axios.post('http://localhost:4000/cims', {formData},  
                                                    {headers: {
                                                        'authorization': `bearer ${token}`
                                                        }}) 
            .then(res=>{
                alert('Client Created Successfully!') 
                console.log(res)
            })  
            
        } catch (error) {
            console.log(error)
        }      
    }


    const handleSaveBtn = () =>{
        return(
            formData.designation === "" || formData.brandname === "" || formData.domain === "" || formData.baselocation === "" || formData.clientname === "" ||formData.companyaddress === "" || 
            formData.contacts.primaryContact.title === "" || formData.contacts.primaryContact.firstName === "" || formData.contacts.primaryContact.lastName === "" || formData.contacts.primaryContact.email === "" || formData.contacts.primaryContact.contactNumber === "" ||
            formData.contacts.secondaryContact.title === "" || formData.contacts.secondaryContact.firstName === "" || formData.contacts.secondaryContact.lastName === "" || formData.contacts.secondaryContact.email === "" || formData.contacts.secondaryContact.contactNumber === ""
        )   
    } 

    //end Sam

    return {
        fields,
        formData,
        value,
        setformvalue,
        contacts,
        setValue,
        open,
        handleClick,
        anchorEl,
        handleClose,
        n,
        handleOthers,
        addOthers,
        handleAddOthers,
        errors,
        handleSaveBtn,
        authStore,
        submitForm,
        setformData
    }
}
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import { Box, Tab, Grid, TextField, Button, MenuItem, Menu, FormControl } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
    AddRounded as AddRoundedIcon,
} from '@mui/icons-material';
import UseForm from './Create-UseForm';
import '../styles/FormStyle.css'
import { useSelector,useDispatch } from "react-redux";
import setCcode from "../actions/SetcCode";
import setLoc from "../actions/SetLoc"

const useStyles = makeStyles({  
    formControl: {
        width: '100%'
    }

})

function UpdateForm(props){

    const {
        fields,
        initialContacts,
        initialFormValues2,
        addressFields,
    } = UseForm()
    const contactSchema = {
        title:"",
        firstName:"",
        lastName:"",
        email:"",
        contactNumber:"",
        otherContactNumber:"",
    };
    const {id} = useParams()
    const classes = useStyles()  
    const dispatch = useDispatch();
    const clientdata = useSelector(state=>state.clientformdata)
    const initialFormValues = clientdata.data[0]
    const errorValues =  JSON.parse(JSON.stringify(initialFormValues2));
    const [anchorEl, setAnchorEl] = useState(null);
    const [editMode,seteditMode] = useState(props.editmode)
    const [value, setValue] = useState('primaryContact');
    const [contacts, setContacts] = useState(initialContacts);
    const [formData,setformData] = useState(initialFormValues);
    const [n, setN] = useState(Object.keys(formData.contacts).length);
    const [addOthers, setAddOthers] = useState(false);
    const [errors, setErrors] = useState(errorValues);  
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }; 
    
    //postal api values
    const ccode = useSelector(state => state.getaddress);
    const loc = useSelector(state => state.getaddress);
    const [countries,setCountries] = useState({})
    
    //direct fetch countries
    async function fetchData() {
        const response = await fetch('http://localhost:4000/countries');
        const data = await response.json();
        setCountries(data)
    }

    useEffect(async() => {
      fetchData()  
      const token = localStorage.getItem('authorization')
      await axios.get('http://localhost:4000/getclientinfo', {headers: {'authorization': `bearer ${token}`,
                                                                         'id':id }})
      .then(clientdata=>clientdata)
      .then(clientInfo => {
        setformData(clientInfo.data[0])
        setN(Object.keys(clientInfo.data[0].contacts).length)
        if(Object.keys(clientInfo.data[0].contacts).length>3){
        for(let i=0 ; i < Object.keys(clientInfo.data[0].contacts).length-3 ; i++){   
            var temp = {...errors}
            temp.contacts[`otherContact${i+1}`] = contactSchema
        }
        setErrors(temp)}
        })
      },[])   


    const handleOthers = (e) => {
        const d = e.currentTarget.dataset;
        setContacts([...initialContacts, {...d}]);
        setValue(d.title);
        handleClose();
    };

      //new
      const handelInvalidPincode = () => {
        let new_form = {...formData}
        new_form['city'] = '';
        new_form['district'] = '';
        new_form['state'] = '';
        new_form['pincode'] = '';
        setformData(new_form);
    }

    const handleSaveBtn = () =>{
        return(
            formData.designation === "" || formData.brandname === "" || formData.domain === "" || formData.baselocation === "" || formData.clientname === "" || formData.addressLine1 === "" || formData.country === "" || formData.pincode === ""  || formData.state === "" || formData.district === ""  || formData.city === "" ||
            formData.contacts.primaryContact.title === "" || formData.contacts.primaryContact.firstName === "" || formData.contacts.primaryContact.lastName === "" || formData.contacts.primaryContact.email === "" || formData.contacts.primaryContact.contactNumber === "" ||
            formData.contacts.secondaryContact.title === "" || formData.contacts.secondaryContact.firstName === "" || formData.contacts.secondaryContact.lastName === "" || formData.contacts.secondaryContact.email === "" || formData.contacts.secondaryContact.contactNumber === ""
        )   
    } 

    const getAddressByPincode = async(pincode) => {
        console.log("In getAddressByPincode")
        try {
            await axios.get('http://localhost:4000/location',
                {headers: {
                    'pincode': pincode,
                    'country' : ccode.ccode
                }}
            )
            .then(res=>{
                if(res.data){
                    dispatch(setLoc(res.data))}
                else if(!res.data && formData.city ===''){
                    window.alert("Invalid Pincode!")
                    handelInvalidPincode()
                }
            })
            
        } catch (error){
            console.log(error)
        }
        console.log("End getAddressByPincode")
    }

    const handelAddressOnBlur = (e) => {
        setformvalue(e);
        const data = e.target.value;
        if (data.length > 1 && formData.pincode !== '' && errors.pincode === '' && e.target.name === "pincode"){
            getAddressByPincode(data);
        }
    }

    const handelCountry = (e) => {
        let new_form = {...formData}
        const data = e.target.value;
        const name = e.target.name;

        if (name === 'country'){
            dispatch(setCcode(data.split('-')[1]));
            new_form['city'] = '';
            new_form['district'] = '';
            new_form['state'] = '';
            new_form['pincode'] = '';
        }
        new_form[name] = data;
        if (name === 'district' && data !== ''){
            new_form['state'] = loc.loc.state;
            new_form['city'] = loc.loc['districts'][data][0] ? loc.loc['districts'][data][0] : ""
        }
        setformData(new_form);
    }
    //new)

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
                else
                    temp['contacts'][type].otherContactNumber = ''    
        }
        else{
            temp['contacts'][type].title = ""
            temp['contacts'][type].firstName = ""
            temp['contacts'][type].lastName = ""
            temp['contacts'][type].email = ""
            temp['contacts'][type].contactNumber = ""
            temp['contacts'][type].otherContactNumber = ""
        }
        setErrors({
            ...temp
        });
        return Object.values(temp['contacts'][type]).every((x) => x === "") &&
            Object.values(formData['contacts'][type]).every((x) => x !== "")
    }

    const validateBasic = (fieldValues) => {
        let temp = { ...errors }

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
            if ("pincode" in fieldValues){
                temp.pincode = fieldValues.pincode ? "" : "This field is required."
                if (fieldValues.pincode){
                    temp.pincode = (/^.{2,}$/).test(fieldValues.pincode)
                    ? ""
                    : "Pincode should have minimum 2 characters."
                    if (errors.state)
                        temp.state = temp.pincode ? "This field is required." : ""
                    if (errors.district)
                        temp.district = temp.pincode ? "This field is required." : ""
                    if (errors.city)
                        temp.city = temp.pincode ? "This field is required." : ""
                }
            }
            if ("country" in fieldValues){
                temp.country = fieldValues.country || formData.country ? "" : "This field is required."
            }
            if ("state" in fieldValues)
                temp.state = fieldValues.state ? "" : "This field is required."
            if ("district" in fieldValues)
                temp.district = fieldValues.district || formData.district ? "" : "This field is required."
            if ("city" in fieldValues)
                temp.city = fieldValues.city || formData.city ? "" : "This field is required."
        
                setTimeout(() => {
            setErrors({...temp})    
        }, 100)

    }

    const setformvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        
        if (e.target.name === 'pincode'){
            new_form['city'] = '';
            new_form['district'] = '';
            new_form['state'] = '';
        }
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
            if(n===3 ? true : 
                Object.keys(new_form.contacts).length <= n){
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
    }

    const submitForm = async(e) =>{
        console.log(formData , "--> from submit form")
        e.preventDefault()
        const token = localStorage.getItem('authorization')
        try {
            await axios.patch('http://localhost:4000/cims', {formData},  
                                                    {headers: {'authorization': `bearer ${token}`},
                                                    params: {id:formData._id,}}) 
            .then(res=>{
                console.log(res)
                alert('updated Successfully!')  
            })  
            
        } catch (error) {
            console.log(error)
        }      
    }

    const contactFields = fields.map(field => {
        const data = formData.contacts[value];
        return(
            <Grid item xs={12} sm={6} md={4} key={`${value}.${field.id}`}> 
                <TextField 
                    autoFocus={true}
                    InputProps={!editMode && {readOnly: true, disableUnderline: false}}
                    variant="outlined"
                    label={field.label}
                    name={value}
                    defaultValue={data[field.id]}
                    {...(formData[field.id] === "" && {key:formData[field.id],autoFocus:"autoFocus"})}
                    Inputprops={!editMode && {readOnly: true}}
                    id={field.id}
                    onChange={(e)=>{setformvalue(e)}}
                    onBlur={editMode && setformvalue}
                    fullWidth
                    size="small"
                    autoComplete="none"
                    {...(errors['contacts'][value][field.id] && { error: true, helperText: errors['contacts'][value][field.id] })}
                />
            </Grid>
        );
    });

    const addressField = addressFields.map(field => {
        const gridStyle = field.name === 'addressLine1' || field.name === 'addressLine2' ? 12 : 6 
        if (field.name === 'country'){
            return(
                
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="country">{field.label}</InputLabel>
                        <Select labelId="country"
                            Inputprops={!editMode && {readOnly: true, disableUnderline: false}}
                            name={field.name}
                            value={formData[field.name]}
                            defaultValue={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={editMode && handelCountry}
                        >
                            {Object.keys(countries).map((key) => (
                                <MenuItem
                                    disabled = {!editMode}
                                    key={key}
                                    value={`${countries[key].name}-${countries[key].code}`}
                                >
                                {countries[key].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }
        
        if (field.name === 'district' && formData.pincode !== '' && Object.keys(loc.loc['districts'])[0].length>1){
            return(
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="district">{field.label}</InputLabel>
                        <Select labelId="district"
                            name={field.name}
                            value={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={editMode && handelCountry}
                        >
                            {Object.keys(loc.loc['districts']).map((key) => (
                                <MenuItem
                                    disabled = {!editMode}
                                    key={key}
                                    value={key}
                                >
                                {key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }

        if (field.name === 'city' && formData.district !== '' && formData.pincode !== '' && loc.loc['districts'][formData['district']] ? loc.loc['districts'][formData['district']].length>1 : false){
            return(
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="city">{field.label}</InputLabel>
                        <Select labelId="city"
                            name={field.name}
                            value={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={editMode && handelCountry}
                        >
                            {loc.loc['districts'][formData['district']].map((dist) => (
                                <MenuItem
                                    disabled = {!editMode}
                                    key={dist}
                                    value={dist}
                                >
                                {dist}
                                </MenuItem>
                            )) || ""}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }
        return(
            <Grid item sm={gridStyle}> 
                <TextField
                    autoFocus={true}
                    InputProps={!editMode && {readOnly: true, disableUnderline: true}}
                    label={field.label}
                    variant="outlined"
                    name={field.name}
                    fullWidth
                    size="small"
                    defaultValue={formData[field.name]}
                    {...(formData[field.name] === "" && {key:formData[field.name],autoFocus:"autoFocus"})}
                    onChange={(e)=>{setformvalue(e)}}
                    onBlur={editMode && handelAddressOnBlur}
                    {...(errors[field.name] && 
                    { error: true, helperText: errors[field.name] })}
                />
            </Grid> 

       
        );
    });

    const tabs = contacts.map(contact =>
        <Tab key={contact.title} label={contact.label} value={contact.title} sx={{textTransform: 'none'}}/>
    );

    const dropDown = (
        <Grid>
            <FormControl size="small">
                <Button 
                    size="small" 
                    id="othersBtn" 
                    sx={{color: 'gray', borderColor: 'white'}} 
                    variant="outlined"
                    aria-haspopup="true"
                    aria-controls="others"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <KeyboardArrowDownRoundedIcon sx={{fontSize: "2.5rem"}}/>
                </Button>
                <Menu
                    id='others'
                    sx={{maxHeight: 230, overflow: 'visible'}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListprops={{
                        'aria-labelledby': 'othersBtn',
                    }}
                >
                    {[...Array(n-3)].map((e, i) => {
                        return(
                            <MenuItem
                                key={i+1}
                                data-label={`Other Contact ${i+1}`}
                                data-title={`otherContact${i+1}`}
                                onClick={handleOthers}
                            >
                            {`Other Contact ${i+1}`}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </FormControl>
        </Grid>
    );

    return(
        <>
            <div className="FormContainer">
                
                <div className="form-header">
                    <h2>
                        Client Information
                    </h2>
                    
                    <div className="header-end">
                        <div>
                            <p>Edit mode</p>
                            <Switch defaultChecked={props.editmode}  onClick={()=>{seteditMode(!editMode)}} color="success" />
                        </div>
                    </div>
                </div>

                <div className="form-body">    
                    <form>
                        <Typography>
                            Legal Name of the entity
                        </Typography>
                        <TextField
                            autoFocus={true}
                            InputProps={!editMode && {readOnly: true, disableUnderline: false}}
                            variant="outlined"
                            name="designation"
                            defaultValue={formData.designation ?? ""}
                            {...(formData.designation === "" && {key:formData.designation,autoFocus:"autoFocus"})}
                            fullWidth
                            required
                            size="small"
                            onChange={(e)=>{setformvalue(e)}}
                            onBlur={editMode && setformvalue}
                            {...(errors.designation && 
                            { error: true, helperText: errors.designation })}  
                        />
                        
                        <Grid container spacing={2} >
                                <Grid container item xs={6} direction="column" >            
                                    <div >
                                        <Typography >
                                            Brand Name
                                        </Typography>
                                        <TextField
                                            autoFocus={true}
                                            variant="outlined"
                                            InputProps={!editMode && {readOnly: true, disableUnderline: true}}
                                            name="brandname"
                                            defaultValue={formData.brandname ?? ""}
                                            {...(formData.brandname === "" && {key:formData.brandname,autoFocus:"autoFocus"})}
                                            fullWidth
                                            required
                                            size="small"
                                            onChange={(e)=>{setformvalue(e)}}
                                            onBlur={editMode && setformvalue}
                                            {...(errors.brandname && 
                                            { error: true, helperText: errors.brandname })}
                                        />
                                    </div>

                                    <div >
                                    <Typography>
                                        Base Location
                                    </Typography>
                                    <TextField
                                        autoFocus={true}
                                        variant="outlined"
                                        name="baselocation"
                                        InputProps={!editMode && {readOnly: true, disableUnderline: true}}
                                        defaultValue={formData.baselocation}
                                        {...(formData.baselocation === "" && {key:formData.baselocation,autoFocus:"autoFocus"})}
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e)=>{setformvalue(e)}}
                                        onBlur={editMode && setformvalue}
                                        {...(errors.baselocation && 
                                        { error: true, helperText: errors.baselocation })}
                                        />
                                    </div>     
                                    </Grid>

                            <Grid container item xs={6} direction="column" >                        
                                <div >
                                    <Typography>
                                        Domain/Sector
                                    </Typography>
                                    <TextField
                                        autoFocus={true}
                                        variant="outlined"
                                        name="domain"
                                        InputProps={!editMode && {readOnly: true, disableUnderline: true}}                       
                                        defaultValue={formData.domain ?? ""}
                                        {...(formData.domain === "" && {key:formData.domain,autoFocus:"autoFocus"})}
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e)=>{setformvalue(e)}}
                                        onBlur={editMode && setformvalue}
                                        {...(errors.domain && 
                                        { error: true, helperText: errors.domain })}
                                    />
                                </div>

                                <div >
                                    <Typography>
                                        Active Client
                                    </Typography>
                                    <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="label">Select a Client name</InputLabel>
                                        <Select
                                        
                                        name="clientname"
                                        defaultValue={formData.clientname}
                                        {...(formData.clientname === "" && {key:formData.clientname,autoFocus:"autoFocus"})}
                                        onChange={setformvalue}
                                        InputProps={!editMode && {readOnly: true, disableUnderline: true}} 
                                        onBlur={editMode && setformvalue}
                                        {...(errors.clientname && 
                                        { error: true, helperText: errors.clientname })}
                                        size="small"
                                        input={<OutlinedInput label="Select a Client name" />}
                                        >
                                        <MenuItem disabled = {!editMode} value={"client 1"}>client 1</MenuItem>
                                        <MenuItem disabled = {!editMode} value={"client 2"}>client 2</MenuItem>
                                        <MenuItem disabled = {!editMode} value={"client 3"}>client 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>


                        <Typography>
                            Complete address of the company
                        </Typography>                        
                        
                        <Grid container spacing={2} justify="space-between" >    
                        {addressField}
                        </Grid>

                        <a href="/">
                            <Button
                            variant="contained"
                            color="error"
                            id="cancel-btn"
                            >
                            Cancel
                            </Button>
                        </a>
                        
                        {editMode && 
                        <>
                        {handleSaveBtn() 
                        ? <Button
                        disabled
                        onClick={submitForm}
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="save-btn"
                        >
                        Update
                        </Button>

                        : <Button
                        onClick={submitForm}
                        disabled={!editMode}
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="save-btn"
                        >
                        Update
                        </Button>}
                        </>
                        }
                        
                    </form>
                
                    <div className="contact-form">
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderTop: 2, borderBottom: 2, borderColor: 'divider' }}>
                                <TabList variant='scrollable' onChange={(e, newValue) => setValue(newValue)}>
                                    {tabs}
                                    {n>3? dropDown : <></>}
                                    {editMode && <Grid container>
                                        <Button
                                            id="addOthersBtn" 
                                            sx={{color: 'gray', borderColor: 'white'}} 
                                            variant={!addOthers?"contained":"outlined"}
                                            onClick={ handleAddOthers}
                                            disabled={!addOthers}
                                        >
                                            <AddRoundedIcon sx={{fontSize: "2rem"}} />
                                        </Button>
                                    </Grid>}
                                </TabList>
                            </Box>
                            <TabPanel value={value}>
                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {contactFields}
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box> 
                    </div>
                
                </div>

            </div>
        </>
    )
}

export default UpdateForm

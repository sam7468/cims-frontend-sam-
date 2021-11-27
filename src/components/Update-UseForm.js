
const initialFormValues2 = {
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
];

const fields = [
    {id: 'title', label: 'Title *'},
    {id: 'firstName', label: 'First name *'},
    {id: 'lastName', label: 'Last name *'},
    {id: 'email', label: 'Email address *'},
    {id: 'contactNumber', label: 'Contact Number *'},
    {id: 'otherContactNumber', label: 'Other contact number *'}
];


export default function UseForm() {

    return {
        fields,
        initialContacts,
        contactSchema,
        initialFormValues2
    }
}
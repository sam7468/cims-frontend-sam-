import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import setCcode from "../actions/SetcCode";
import setLoc from "../actions/SetLoc";

const initialFormValues2 = {
  designation: "",
  brandname: "",
  clientname: "",
  domain: "",
  baselocation: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  country: "",
  state: "",
  district: "",
  city: "",
  landmark: "",
  contacts: {
    primaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    secondaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    tertiaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
  },
};

const initialFormValues = {
  designation: "",
  brandname: "",
  clientname: "",
  domain: "",
  baselocation: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  country: "",
  state: "",
  district: "",
  city: "",
  landmark: "",
  contacts: {
    primaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    secondaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    tertiaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
  },
};

const errorValues = JSON.parse(JSON.stringify(initialFormValues));

const contactSchema = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

const initialContacts = [
  { label: "Primary Contact *", title: "primaryContact" },
  { label: "Secondary Contact *", title: "secondaryContact" },
  { label: "Tertiary Contact", title: "tertiaryContact" },
];

const fields = [
  { id: "title", label: "Title *" },
  { id: "firstName", label: "First name *" },
  { id: "lastName", label: "Last name *" },
  { id: "email", label: "Email address *" },
  { id: "contactNumber", label: "Contact Number *" },
  { id: "otherContactNumber", label: "Other contact number" },
];

// new
const addressFields = [
  { name: "addressLine1", label: "Address Line 1 *" },
  { name: "addressLine2", label: "Address Line 2" },
  { name: "country", label: "Country *" },
  { name: "pincode", label: "Postal/Pin Code *" },
  { name: "state", label: "State *" },
  { name: "district", label: "District *" },
  { name: "city", label: "City *" },
  { name: "landmark", label: "Landmark" },
];

export default function UseForm() {
  const ccode = useSelector((state) => state.getaddress);
  const loc = useSelector((state) => state.getaddress);
  const dispatch = useDispatch();

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
    setContacts([...initialContacts, { ...d }]);
    setValue(d.title);
    handleClose();
  };

  const [value, setValue] = useState("primaryContact");
  const [contacts, setContacts] = useState(initialContacts);
  const [formData, setformData] = useState(initialFormValues);
  const [n, setN] = useState(Object.keys(formData.contacts).length);
  const [addOthers, setAddOthers] = useState(false);

  // Handel errors
  const [errors, setErrors] = useState(errorValues);
  const validate = (type = "", fieldValues) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp["contacts"][type].title = fieldValues.title
        ? ""
        : "This field is required.";
    if ("firstName" in fieldValues)
      temp["contacts"][type].firstName = fieldValues.firstName
        ? ""
        : "This field is required.";
    if ("lastName" in fieldValues)
      temp["contacts"][type].lastName = fieldValues.lastName
        ? ""
        : "This field is required.";
    if ("email" in fieldValues) {
      temp["contacts"][type].email = fieldValues.email
        ? ""
        : "This field is required.";
      if (fieldValues.email)
        temp["contacts"][type].email = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/.test(
          fieldValues.email
        )
          ? ""
          : "Email is not valid.";
    }
    if ("contactNumber" in fieldValues) {
      temp["contacts"][type].contactNumber = fieldValues.contactNumber
        ? ""
        : "This field is required.";
      if (fieldValues.contactNumber)
        temp["contacts"][type].contactNumber = /^[6-9][0-9]{9}$/.test(
          fieldValues.contactNumber
        )
          ? ""
          : "Contact number is not valid.";
    }
    if ("otherContactNumber" in fieldValues) {
      temp["contacts"][type].otherContactNumber = fieldValues.otherContactNumber
        ? ""
        : "This field is required.";
      if (fieldValues.otherContactNumber)
        temp["contacts"][type].otherContactNumber = /^[6-9][0-9]{9}$/.test(
          fieldValues.otherContactNumber
        )
          ? ""
          : "Other contact number is not valid.";
      else temp["contacts"][type].otherContactNumber = "";
    }
    setErrors({
      ...temp,
    });
  };

  const validateOptional = (type = "", fieldValues) => {
    let temp = { ...errors };
    if (
      fieldValues.title ||
      fieldValues.firstName ||
      fieldValues.lastName ||
      fieldValues.email ||
      fieldValues.contactNumber ||
      fieldValues.otherContactNumber
    ) {
      if (fieldValues.email)
        temp["contacts"][type].email = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/.test(
          fieldValues.email
        )
          ? ""
          : "Email is not valid.";
      else temp["contacts"][type].email = "";
      if (fieldValues.contactNumber)
        temp["contacts"][type].contactNumber = /^[6-9][0-9]{9}$/.test(
          fieldValues.contactNumber
        )
          ? ""
          : "Contact number is not valid.";
      else temp["contacts"][type].contactNumber = "";
      if (fieldValues.otherContactNumber)
        temp["contacts"][type].otherContactNumber = /^[6-9][0-9]{9}$/.test(
          fieldValues.otherContactNumber
        )
          ? ""
          : "Other contact number is not valid.";
      else temp["contacts"][type].otherContactNumber = "";
    } else {
      temp["contacts"][type].title = "";
      temp["contacts"][type].firstName = "";
      temp["contacts"][type].lastName = "";
      temp["contacts"][type].email = "";
      temp["contacts"][type].contactNumber = "";
      temp["contacts"][type].otherContactNumber = "";
    }
    setErrors({
      ...temp,
    });
    return (
      Object.values(temp["contacts"][type]).every((x) => x === "") &&
      fields
        .map((field) =>
          field.id === "otherContactNumber"
            ? true
            : formData["contacts"][type][field.id] !== ""
        )
        .every((x) => x)
    );
  };

  const validateBasic = (fieldValues) => {
    let temp = { ...errors };
    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation
        ? ""
        : "This field is required.";
    if ("brandname" in fieldValues)
      temp.brandname = fieldValues.brandname ? "" : "This field is required.";
    if ("clientname" in fieldValues)
      temp.clientname = fieldValues.clientname ? "" : "This field is required.";
    if ("domain" in fieldValues)
      temp.domain = fieldValues.domain ? "" : "This field is required.";
    if ("baselocation" in fieldValues)
      temp.baselocation = fieldValues.baselocation
        ? ""
        : "This field is required.";
    if ("addressLine1" in fieldValues)
      temp.addressLine1 = fieldValues.addressLine1
        ? ""
        : "This field is required.";
    if ("pincode" in fieldValues) {
      temp.pincode = fieldValues.pincode ? "" : "This field is required.";
      if (fieldValues.pincode) {
        temp.pincode = /^.{2,}$/.test(fieldValues.pincode)
          ? ""
          : "Pincode should have minimum 2 characters.";
        if (errors.state)
          temp.state = temp.pincode ? "This field is required." : "";
        if (errors.district)
          temp.district = temp.pincode ? "This field is required." : "";
        if (errors.city)
          temp.city = temp.pincode ? "This field is required." : "";
      }
    }
    if ("country" in fieldValues) {
      temp.country =
        fieldValues.country || formData.country
          ? ""
          : "This field is required.";
    }
    if ("state" in fieldValues)
      temp.state = fieldValues.state ? "" : "This field is required.";
    if ("district" in fieldValues)
      temp.district =
        fieldValues.district || formData.district
          ? ""
          : "This field is required.";
    if ("city" in fieldValues)
      temp.city =
        fieldValues.city || formData.city ? "" : "This field is required.";

    setTimeout(() => {
      setErrors({ ...temp });
    }, 100);
  };

  //new
  const handelInvalidPincode = () => {
    let new_form = { ...formData };
    new_form["city"] = "";
    new_form["district"] = "";
    new_form["state"] = "";
    new_form["pincode"] = "";
    setformData(new_form);
  };

  // change
  const getAddressByPincode = async (pincode) => {
    console.log("fetching pincode details...");
    try {
      await axios
        .get("http://localhost:4000/location", {
          headers: {
            pincode: pincode,
            country: ccode.ccode,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            dispatch(setLoc(res.data.data));
          } else if (!res.data.status && formData.city === "") {
            window.alert("Invalid Pincode!");
            handelInvalidPincode();
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
    console.log("fetched!");
  };

  const setformvalue = (e) => {
    let new_form = { ...formData };
    e.target.id
      ? (new_form["contacts"][e.target.name][e.target.id] = e.target.value)
      : (new_form[e.target.name] = e.target.value);
    if (e.target.name === "pincode") {
      new_form["city"] = "";
      new_form["district"] = "";
      new_form["state"] = "";
    }
    if (
      e.target.name === "primaryContact" ||
      e.target.name === "secondaryContact"
    )
      validate(e.target.name, { [e.target.id]: e.target.value });
    if (
      e.target.id &&
      e.target.name !== "primaryContact" &&
      e.target.name !== "secondaryContact"
    )
      validateOptional(e.target.name, new_form["contacts"][e.target.name]);
    if (!e.target.id) validateBasic({ [e.target.name]: e.target.value });

    if (
      validateOptional(
        "tertiaryContact",
        new_form["contacts"]["tertiaryContact"]
      )
    ) {
      if (
        n === 3
          ? true
          : validateOptional(
              `otherContact${n - 3}`,
              new_form.contacts[`otherContact${n - 3}`]
            ) && Object.keys(new_form.contacts).length <= n
      ) {
        setAddOthers(true);
      } else {
        setAddOthers(false);
      }
    } else {
      setAddOthers(false);
    }
    setformData(new_form);
  };

  const handelAddressOnBlur = (e) => {
    setformvalue(e);
    const data = e.target.value;
    if (data.length > 1 && formData.pincode !== "" && errors.pincode === "") {
      getAddressByPincode(data);
    }
  };

  const handelCountry = (e) => {
    let new_form = { ...formData };
    const data = e.target.value;
    const name = e.target.name;
    console.log("country ---  ", data.split("-")[1]);
    if (name === "country") {
      dispatch(setCcode(data.split("-")[1]));
      new_form["city"] = "";
      new_form["district"] = "";
      new_form["state"] = "";
      new_form["pincode"] = "";
    }
    new_form[name] = data;
    if (name === "district" && data !== "") {
      new_form["state"] = loc.loc.state;
      new_form["city"] = loc.loc["districts"][data][0]
        ? loc.loc["districts"][data][0]
        : "";
    }
    console.log("new data----", new_form);
    setformData(new_form);
  };
  //new)

  const handleAddOthers = () => {
    let new_form = { ...formData };
    new_form["contacts"] = {
      ...new_form["contacts"],
      [`otherContact${n - 2}`]: { ...contactSchema },
    };
    let new_errors = { ...errors };
    new_errors["contacts"] = {
      ...new_errors["contacts"],
      [`otherContact${n - 2}`]: { ...contactSchema },
    };
    const d = {
      label: `Other Contact ${n - 2}`,
      title: `otherContact${n - 2}`,
    };
    setformData(new_form);
    setContacts([...initialContacts, { ...d }]);
    setErrors(new_errors);
    setValue(d.title);
    setN(Object.keys(new_form.contacts).length);
    setAddOthers(false);
  };

  // Sam
  const [store, setStore] = useState("");
  const [login, setLogin] = useState(true);

  const authStore = () => {
    let store = localStorage.getItem("authorization");
    if (store && login) {
      setLogin(true);
      setStore(store);
      console.log(store);
    }
  };

  const submitForm = async (e) => {
    console.log(formData);
    e.preventDefault();
    // let token = "Bearer "+ store
    const token = localStorage.getItem("authorization");
    try {
      await axios
        .post(
          "http://localhost:4000/cims",
          { formData },
          { headers: { authorization: `bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          alert("Client Created Successfully!");
        });
    } catch (error) {
      if (error.response) {
        alert("invalid form data!");
        console.log(error.response, "from err response");
      }
    }
  };

  const handleSaveBtn = () => {
    return (
      formData.designation === "" ||
      formData.brandname === "" ||
      formData.domain === "" ||
      formData.baselocation === "" ||
      formData.clientname === "" ||
      formData.addressLine1 === "" ||
      formData.country === "" ||
      formData.pincode === "" ||
      formData.state === "" ||
      formData.district === "" ||
      formData.city === "" ||
      formData.contacts.primaryContact.title === "" ||
      formData.contacts.primaryContact.firstName === "" ||
      formData.contacts.primaryContact.lastName === "" ||
      formData.contacts.primaryContact.email === "" ||
      formData.contacts.primaryContact.contactNumber === "" ||
      formData.contacts.secondaryContact.title === "" ||
      formData.contacts.secondaryContact.firstName === "" ||
      formData.contacts.secondaryContact.lastName === "" ||
      formData.contacts.secondaryContact.email === "" ||
      formData.contacts.secondaryContact.contactNumber === ""
    );
  };

  return {
    fields,
    formData,
    value,
    setformvalue,
    contacts,
    contactSchema,
    setValue,
    open,
    handleClick,
    anchorEl,
    handleClose,
    n,
    handleOthers,
    addOthers,
    initialFormValues2,
    handleAddOthers,
    errors,
    handleSaveBtn,
    authStore,
    submitForm,
    setformData,
    handelCountry,
    addressFields,
    handelAddressOnBlur,
    initialContacts,
    validate,
    validateBasic,
    validateOptional,
  };
}

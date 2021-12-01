import { useParams } from "react-router";
import axios from "axios";

const clientdata = { data: {} };
const clientDataReducer = (state = clientdata, action) => {
  switch (action.type) {
    case "addData":
      console.log(action.payload, "user data added to reducer");
      state.data = action.payload;
      return { ...state, data: action.payload };

    default:
      return {
        data: [
          {
            _id: " ",
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
          },
        ],
      };
  }
};

export default clientDataReducer;

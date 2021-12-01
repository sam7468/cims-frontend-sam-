const addClientData = (clientinfo) => {
  return {
    type: "addData",
    payload: clientinfo,
  };
};
export default addClientData;

const editModeReducer = (state = false, action) => {
    switch (action.type){ 
      case "enable": 
        console.log(state,"-- allowed usetr to edit")
        return true
      case "disable": 
        console.log(state,"--  not-allowed to edit")
        return false
      default : 
        console.log("from boolean reducer default---", state)
        return state
    }

  }
  

export default editModeReducer
const editModeReducer = (state = false, action) => {
    switch (action.type){ 
      case "enable": 
        return true
      case "disable": 
        return false
      default : 
        return state
    }

  }
  

export default editModeReducer
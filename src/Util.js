export const validatePattern = (field, state) => {
    let reg;
    switch(field) {
      case "name" : 
        reg = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        return reg.test(state.payload.name)? null : "must contain both first and last name";
      case "email":
        reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i;
        return reg.test(state.payload.email) ? null : "must be a valid email";
      case "birthday":
        reg= /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        return reg.test(state.payload.birthday) ? null : "must be a valid date";
      case "password":
        var minLength = 6;
        return state.payload.password.length >= minLength ? null : "must be at least 6 charaters.";
      default: 
        return null;
    }
}; 
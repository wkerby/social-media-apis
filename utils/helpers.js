const validateEmail = (email) => {
    let validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validate.test(email);


}

module.exports = validateEmail; 
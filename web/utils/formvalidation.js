/*  Just a temporary fix. 
    we should probably use a library for this, and validate stuff again server-side because javascript can easily be disabled
    (making some requests slip through) */

export const validateSignUp = (email, pass1, pass2) => {
    if (!email && (!pass1 || !pass2)) {
        return { error: 'Enter an Email and Password' }
    } else if (!pass1 || !pass2) {
        return { error: 'Please enter and confirm a Password' }
    } else if (!email) {
        return { error: 'Enter an Email' }
    } else if (pass1!==pass2) {
        return { error: 'Passwords do not match' }
    /*} else if (!validateEmail(email)) {
        return { error: 'Enter a valid Email.' }*/
    } else return false
}

export const validateSignIn = (email, pass) => {
    if (!email && !pass) {
        return { error: 'Enter your Email and Password' }
    } else if (!email) {
        return { error: 'Enter your account Email' }
    } else if (!pass) {
        return { error: 'Enter your account Password' }
    /*} else if (!validateEmail(email)) {
        return { error: 'Enter a valid Email.' }*/
    } else return false
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
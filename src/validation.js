export default function validate(values) {
    let errors = {};

    if(!values.username) {
        errors.username = 'Name required'
    } else if (!/^[a-zA-Z]+$/.test(values.name)) {
        errors.username = 'Only characters allowed and above 2 characters'
    }

    if (!values.email) {
        errors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid Email'
    }

    if (!values.password1) {
        errors.password1 = 'Password required'
    } else if (values.password1.length < 8) {
        errors.password1 = 'Password needs to be more than 8 characters'
    }
    
    if(!values.password2){
        errors.password2 = 'Password required'
    } else if(values.password1 !== values.password2) {
        errors.password2 = 'Password does not match. Please try again'
    }
    return errors;
}

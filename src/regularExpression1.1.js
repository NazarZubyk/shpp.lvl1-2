let Validator = {
    validateEmail(email){
        regexp = /[A-Za-z][A-Za-z\d-\.+]{1,19}[@][\w\d\.!$%&\’*+/=?^\-_]{1,15}[\.][\w]{1,5}[.]{0}/g;
        let emptyLine = email.replace(regexp, "")
        return (!emptyLine && regexp.test(email));
        
    },

    validatePhone(phone){
        regexp = /([- ]*?)(([+]?[- ]*?([0-9][- ]*?){2})?)([- ]*?[(]?[- ]*?([0-9][- ]*?){3}[- ]*?[)]?)[- ]*?(([0-9][- ]*?){7})/g;
        let emptyLine = phone.replace(regexp, "")
        return (!emptyLine && regexp.test(phone) && phone.length <= 25 );
    },

    validatePassword(password){
        regexp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\w\d]{8,}/g;
        let emptyLine = password.replace(regexp, "")
        return (!emptyLine && regexp.test(password));
    }
    
};

console.log("\nemails\n")

console.log(Validator.validateEmail("fi@secondpart.end") + " - true");
console.log(Validator.validateEmail("first-part@.se=cond%p.art.end") + " - true");
console.log(Validator.validateEmail("first.part@se=cond%part.r") + " - true");

console.log(Validator.validateEmail("fi@secondpart.endfi@secondpart.end") + " - false");
console.log(Validator.validateEmail("f@secondart.end,") + " - false");
console.log(Validator.validateEmail("first-part@.se=cond@part.end") + " - false");
console.log(Validator.validateEmail("-firstpart@.se=cond%.enddeded") + " - false");
console.log(Validator.validateEmail("firs_tpart@.se.en") + " - false");
console.log(Validator.validateEmail("firstpart@.se.enddeded") + " - false");

console.log("\nnumbers\n")

console.log(Validator.validatePhone('+38 (099) 567 8901') + " - true" );
console.log(Validator.validatePhone('+38 099 5 6 7 8 9  01') + " - true" );
console.log(Validator.validatePhone('(09-9) 567-890-1') + " - true" );
console.log(Validator.validatePhone('--  (099) 567 890-1') + " - true" );

console.log(Validator.validatePhone('+38 (099) 567 8901 0') + " - false" );
console.log(Validator.validatePhone('+38 099 a0000000') + " - false" );
console.log(Validator.validatePhone('+38 (0989) 567 8901') + " - false" );
console.log(Validator.validatePhone('+48 (0989) 567 8901') + " - false" );
console.log(Validator.validatePhone('+48 (0989) 567 890100000000000000000000000000') + " - false" );

console.log("\npasswords\n")

console.log(Validator.validatePassword("C00l_Pass") + " - true" );
console.log(Validator.validatePassword('SupperPas1') + " - true" );

console.log(Validator.validatePassword('Cool_pass') + " - false" );
console.log(Validator.validatePassword('C00l') + " - false" );
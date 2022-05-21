const fnameEl = document.querySelector('#fname');
const lnameEl = document.querySelector('#lname');
const dateEl = document.querySelector('#date');
const streetEl = document.querySelector('#street');
const houseEl = document.querySelector('#house');
const flatEl = document.querySelector('#flat');


const form = document.querySelector('#form');


const checkfname = () => {

    let valid = false;

    const min = 4,
        max = 50;

    const fname = fnameEl.value.trim();

    if (!isRequired(fname)) {
        showError(fnameEl, 'Name cannot be blank.');
    } else if (!isBetween(fname.length, min, max)) {
        showError(fnameEl, `Name must be min ${min} characters.`)
    }
    else if (!onlyLetters(fname)) {
        showError(fnameEl, `Name must be only string `)
    } else {
        showSuccess(fnameEl);
        valid = true;
    }
    return valid;
};

const checklname = () => {

    let valid = false;

    const min = 5,
        max = 50;

    const lname = lnameEl.value.trim();

    if (!isRequired(lname)) {
        showError(lnameEl, 'Surname cannot be blank.');
    } else if (!isBetween(lname.length, min, max)) {
        showError(lnameEl, `Surname must be min ${min} characters.`)
    } else if (!onlyLetters(lname)) {
        showError(lnameEl, `Surname must be only string `)
    } else {
        showSuccess(lnameEl);
        valid = true;
    }
    return valid;
};



const checkDate = () => {
    let valid = false;
    const date = dateEl.value.trim();
    if (!isRequired(date)) {
        showError(dateEl, 'Date cannot be blank.');
    } else if (!dateValidation(date)) {
        showError(dateEl, `Date shouldn't be earlier than next day`)
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
};

const checkStreet = () => {
    let valid = false;

    const min = 5,
        max = 50;

    const street = streetEl.value.trim();
    if (!isRequired(street)) {
        showError(streetEl, 'Street cannot be blank.');
    }
    else if (!isBetween(lname.length, min, max)) {
        showError(lnameEl, `Street must be min ${min} characters.`)
    }
    else {
        showSuccess(streetEl);
        valid = true;
    }
    return valid;
};


const checkHouse = () => {
    let valid = false;
    const house = houseEl.value.trim();
    if (!isRequired(house)) {
        showError(houseEl, 'House cannot be blank.');
    }
    else if (!isPositiveNums(house)) {
        showError(houseEl, `Value should be positive numbers`)
    }
    else {
        showSuccess(houseEl);
        valid = true;
    }
    return valid;
};

const checkFlat = () => {
    let valid = false;
    const flat = flatEl.value.trim();
    if (!isRequired(flat)) {
        showError(flatEl, 'Flat cannot be blank.');
    } else if (!isFlatValid(flat)) {
        showError(flatEl, `Invalid characters`)
    } else {
        showSuccess(flatEl);
        valid = true;
    }
    return valid;
};

const isPositiveNums = (value) => {
    const re = /^[1-9]+[0-9]*$/;
    return re.test(value);
};

const isFlatValid = (value) => {
    const re = /^[-1-9–]+[-0-9–]*$/;
    return re.test(value);
};

const dateValidation = (fieldValue) => {
    let today = new Date();
    let inputDate = new Date(fieldValue);

    return inputDate <= today ? false : true;
}

const onlyLetters = (fieldValue) => {
    const re = /^[A-Za-z]+$/;
    return re.test(fieldValue);
}


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;




const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    let nameValue = document.getElementById("fname").value;
    let surnameValue = document.getElementById("lname").value;
    let dateValue = document.getElementById("date").value;
    let streetValue = document.getElementById("street").value;
    let houseValue = document.getElementById("house").value;
    let flatValue = document.getElementById("flat").value;

    let paymentTypes = document.getElementsByName('payment_type');

    document.getElementById("details").style.display = "block";

    for (i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].checked)
            var radioValue = paymentTypes[i].value
    }
    document.getElementById("streetVal").innerHTML
    = streetValue;
    document.getElementById("houseVal").innerHTML
    = houseValue;
    document.getElementById("nameVal").innerHTML
    = nameValue;
    document.getElementById("surnameVal").innerHTML
    = surnameValue;
    document.getElementById("flatVal").innerHTML
    = flatValue;
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
// 
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkfname();
            break;
        case 'lname':
            checklname();
            break;
        case 'date':
            checkDate();
            break;
        case 'street':
            checkStreet();
            break;
        case 'house':
            checkHouse();
            break;
        case 'flat':
            checkFlat();
            break;
    }
    // validate forms
    let isFnameValid = checkfname(),
        isLnameValid = checklname(),
        isDateValid = checkDate(),
        isStreetValid = checkStreet(),
        isFlatValid = checkFlat(),
        isHouseValid = checkHouse();

    let isFormValid = isFnameValid &&
        isLnameValid &&
        isDateValid &&
        isStreetValid && isFlatValid && isHouseValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        document.getElementById('form-btn').removeAttribute('disabled');

    }
}));
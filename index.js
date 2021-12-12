const form = document.querySelector("form");

//email
const email = document.querySelector("#email-input");
const emailError = document.querySelector(".email.error");

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.id = "email-input";
  } else {
    showError(email, emailError, "email");
  }
});

//country
const country = document.querySelector("#country-input");
const countryError = document.querySelector(".country.error");

country.addEventListener("input", () => {
  if (country.validity.tooShort || country.validity.tooLong) {
    showError(country, countryError, "country", 2, 25);
  } else {
    countryError.textContent = "";
    countryError.id = "country-input";
  }
});

//postcode

const postcode = document.querySelector("#postal-input");
const postcodeError = document.querySelector(".postal.error");

postcode.addEventListener("input", () => {
  if (postcode.validity.tooShort || postcode.validity.tooLong) {
    showError(postcode, postcodeError, "postcode", 4, 15);
  } else {
    postcodeError.textContent = "";
    postcodeError.id = "postcode-input";
  }
});

//password

const password = document.querySelector("#password-input");
const passwordError = document.querySelector(".password.error");

password.addEventListener("input", () => {
  if (password.validity.tooShort || password.validity.tooLong) {
    showError(password, passwordError, "password", 8, 16);
  } else {
    passwordError.textContent = "";
    passwordError.id = "password-input";
  }
});
//password confirmation

const passwordConfirmation = document.querySelector("#password-confirm-input");
const passwordErrorConfirmation = document.querySelector(
  ".password-confirm.error"
);

passwordConfirmation.addEventListener("input", () => {
  if (
    passwordConfirmation.validity.tooShort ||
    passwordConfirmation.validity.tooLong ||
    passwordConfirmation.value !== password.value
  ) {
    showError(
      passwordConfirmation,
      passwordErrorConfirmation,
      "password confirmation",
      8,
      16
    );
  } else {
    passwordErrorConfirmation.textContent = "";
    passwordErrorConfirmation.id = "password-confirm-input";
  }
});

//add on submit event listener -> if not valid will display error messages and not submit

form.addEventListener("submit", (e) => {
  if (!email.validity.valid) {
    console.log("hello");
    showError(email, emailError, "email");
    e.preventDefault();
  } else if (!country.validity.valid) {
    showError(country, countryError, "country", 2, 25);
    e.preventDefault();
  } else if (!postcode.validity.valid) {
    showError(postcode, postcodeError, "postcode", 4, 15);
    e.preventDefault();
  } else if (!password.validity.valid) {
    showError(password, passwordError, "password", 8, 16);
    e.preventDefault();
  } else if (!passwordConfirmation.validity.valid) {
    showError(
      passwordConfirmation,
      passwordErrorConfirmation,
      "password confirmation",
      8,
      16
    );
    e.preventDefault();
  } else if (passwordConfirmation.value !== password.value) {
    showError(
      passwordConfirmation,
      passwordErrorConfirmation,
      "password confirmation"
    );
    e.preventDefault();
  }
});

function showError(input, inputError, name, min, max) {
  //check for vowels to assign correct article
  const vowels = "aeiou";
  let article = "a";
  if (vowels.includes(name[0])) {
    article = "an";
  }
  //make first letter upper for name for use at beginning of sentences
  let nameCap = name[0].toUpperCase() + name.slice(1);

  if (input.validity.valueMissing) {
    inputError.textContent = `Please enter ${article} ${name}`;
  } else if (input.validity.typeMismatch) {
    inputError.textContent = `Entered value needs to be a valid ${name}`;
  } else if (input.validity.tooShort || input.validity.tooLong) {
    inputError.textContent = `${nameCap} needs to be between ${min} and ${max} characters long`;
  } else if (input.value !== password.value) {
    inputError.textContent = "Does not match password";
  }

  inputError.id = "error-active";
}

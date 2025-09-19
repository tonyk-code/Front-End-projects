import { accounts } from "../data/account.js";

const loginBtn = document.querySelector('.login-submit');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorEmail = document.querySelector('.incorrect-email');
const errorPassword = document.querySelector('.incorrect-password');
const rememberMe = document.getElementById('rememeber-me');

let userId = JSON.parse(localStorage.getItem('id')) || null;

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Find the account with matching email
    const matchedAccount = accounts.find(account => account.email === emailValue);

    if (!matchedAccount) {
        errorEmail.innerText = "Invalid email address";
        errorPassword.innerText = '';
        return;
    }

    errorEmail.innerText = '';

    if (matchedAccount.password === passwordValue) {
        errorPassword.innerText = '';
        document.body.innerHTML = "Hello";  // or redirect/page update
        userId = matchedAccount.id;

        if(rememberMe.checked){
            localStorage.setItem('id' , JSON.stringify(userId));
        } else {
            localStorage.removeItem('id');
        }
        
    } else {
        errorPassword.innerText = "Incorrect password";
    }
});



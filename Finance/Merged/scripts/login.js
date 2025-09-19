import { accounts } from "../data/account.js";
import { dashBoard } from "../scripts/dashboard.js";
import { setUpHtml } from "../scripts/main.js";

export function login(){
    document.body.innerHTML = `
        <button class="back-icon">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="login-wrapper">
    
            <div class="login-box">
                <div class="login-header">
                    <img src="../image/house.png" alt="image" width="35" height="35">
                    <h2 class="login-welcome">Welcome Home</h2>
                    <p class="login-subtext">Please enter your details</p>
                </div>

                <form class="login-form">
                    <div class="login-field">
                        <input type="email" name="email" id="email" placeholder="Email" required />
                        <i class="fa-solid fa-envelope login-icon fa-xs"></i>
                    </div>
                    <p class="incorrect-email"></p>

                    <div class="login-field">
                        <input type="password" name="password" id="password" placeholder="Password" required />
                        <i class="eye-icon fa-solid fa-eye-slash fa-xs"></i>
                    </div>
                    <p class="incorrect-password"></p>

                    <div class="login-options">
                        <label class="login-remember">
                            <input type="checkbox" id="remember-me"/>
                            Remember for 30 days
                        </label>
                        <button type="button" class="login-forgot">Forgot password?</button>
                    </div>

                    <button type="submit" class="login-submit">Login</button>
                </form>
            </div>

            <div class="login-image-side">
            </div>
        </div>
    `


    if(document.body.classList.contains('dashboard-mode')){
        document.body.classList.remove('dashboard-mode');
    }

    else if(document.body.classList.contains('main-mode')){
        document.body.classList.remove('main-mode')
    }
    document.body.classList.add('login-mode');


    const loginBtn = document.querySelector('.login-submit');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorEmail = document.querySelector('.incorrect-email');
    const errorPassword = document.querySelector('.incorrect-password');
    const rememberMe = document.getElementById('rememeber-me');
    const backToDashboardBtn = document.querySelector('.back-icon');
    const eyeSlashIcon = document.querySelector('.eye-icon');

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
            setUpHtml(matchedAccount.id);// or redirect/page update
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

    backToDashboardBtn.addEventListener('click' , () => {
        dashBoard();
    })

    eyeSlashIcon.addEventListener('click' , () => {
        if(eyeSlashIcon.classList.contains('fa-eye-slash')){
            eyeSlashIcon.classList.remove('fa-eye-slash');
            eyeSlashIcon.classList.add('fa-eye');
            passwordInput.type ='text';
        }

        else{
            eyeSlashIcon.classList.remove('fa-eye');
            eyeSlashIcon.classList.add('fa-eye-slash');
            passwordInput.type = 'password';
        }
    })
}



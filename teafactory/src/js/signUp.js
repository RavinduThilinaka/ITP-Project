// signUp.js
export function setupValidation() {
    const Password1 = document.getElementById('pwd1');
    const Password2 = document.getElementById('pwd2');
    const form = document.getElementById('form');
    const password_Error1 = document.getElementById('pwdErr1');
    const password_Error2 = document.getElementById('pwdErr2');
    const message = document.getElementById('sms');

    form.addEventListener('submit', (e) => {
        let isValid = true;

        if (Password1.value.length <= 5) {
            e.preventDefault();
            password_Error1.innerHTML = "Password must be more than 6 characters";
            isValid = false;
        } else if (Password1.value.length >= 20) {
            e.preventDefault();
            password_Error1.innerHTML = "Password cannot be more than 20 characters";
            isValid = false;
        } else {
            password_Error1.innerHTML = "";
        }

        if (Password2.value.length <= 5) {
            e.preventDefault();
            password_Error2.innerHTML = "Password must be more than 6 characters";
            isValid = false;
        } else if (Password2.value.length >= 20) {
            e.preventDefault();
            password_Error2.innerHTML = "Password cannot be more than 20 characters";
            isValid = false;
        } else {
            password_Error2.innerHTML = "";
        }

        if (isValid) {
            checkPassword();
        }
    });

    function checkPassword() {
        const Password = Password1.value;
        const confirmPassword = Password2.value;

        if (Password.length !== 0) {
            if (Password === confirmPassword) {
                message.textContent = "Password Match";
                message.style.backgroundColor = "#3ae374";
                return true;
            } else {
                message.textContent = "Passwords don't match";
                message.style.backgroundColor = "#ff4d4d";
                return false;
            }
        } else {
            alert("Password can't be empty");
            message.textContent = "";
            return false;
        }
    }
}

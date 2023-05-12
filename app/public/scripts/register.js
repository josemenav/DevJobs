const registerButton = document.querySelector('.register');
  registerButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const name = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const repeatPassword = document.getElementById('registerRepeatPassword').value;
    const typeOfUser = document.getElementById('registerSelect').value;
    
    if(password != repeatPassword){
        alert('Please type the same password')
    }
    else{
        createUser(email, name, username, password, typeOfUser);
    }
});

function createUser(email, name, username, password, typeOfUser){

    typeOfUser = (typeOfUser == '1') ? 'Applicant' : 'Recruiter';

    const newUser = {
        email,
        name,
        username,
        password,
        typeOfUser
    }

    let xhr = new XMLHttpRequest();
    let endpoint = 'http://localhost:5000/users/';
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newUser));
    
    xhr.onload = function(){
        if(xhr.status == 400){
            alert(xhr.responseText);
        }
        else{
            alert('User Created sucessfully')
            sessionStorage.setItem('login', true);
            window.location.href = "http://localhost:5000/home";
        }
    };
}
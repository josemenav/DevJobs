const signInButton = document.querySelector('.sign-in');
  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    const emailOrUsername = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;
    login(emailOrUsername, password);
});

function login(user, password){
    let xhr = new XMLHttpRequest();
    let endpoint = 'http://localhost:5000/users/login/?user='+ user +'&password=' + password;
    xhr.open('GET', endpoint);
    xhr.send();
    
    xhr.onload = function(){
        if(xhr.status == 400){
            alert(xhr.responseText);
        }
        else{
            sessionStorage.setItem('login', xhr.response);
            const loginData = JSON.parse(sessionStorage.getItem('login'));
            //console.log(loginData)
            window.location.href = "http://localhost:5000/home";
        }
    };
}
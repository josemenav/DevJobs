userLogged = sessionStorage.getItem('login'); 
userObj = JSON.parse(userLogged);

addEventListener("DOMContentLoaded", () => {
    signOut.addEventListener('click', (event)=>{
        sessionStorage.removeItem('login'); 
    })
});

if(userLogged != null){
    const navBar = document.querySelector('.navbar-nav');
    const loginLink = document.querySelector('#login-nav-link');  
    loginLink.classList.add('display-none');
    myProfile = document.createElement('li'); 
    myProfile.classList.add('nav-item');
    if(userObj.typeOfUser == "Applicant"){
        link = document.createElement('a'); 
        link.classList.add('nav-link'); 
        link.href = '/aplicant'; 
        link.textContent = 'My profile';
        myProfile.appendChild(link); 
        navBar.appendChild(myProfile); 
    } else{
        link = document.createElement('a'); 
        link.classList.add('nav-link'); 
        link.href = '/recruiter'; 
        link.textContent = 'My profile';
        myProfile.appendChild(link); 
        navBar.appendChild(myProfile); 
    }

    closeSession = document.createElement('li'); 
    closeSession.classList.add('nav-item');
    signOut = document.createElement('a'); 
    signOut.classList.add('nav-link'); 
    signOut.href = '/sign_in'; 
    signOut.textContent = 'Sign out';
    closeSession.appendChild(signOut); 
    navBar.appendChild(closeSession); 
}

const url = 'http://localhost:5000/';
const jobs = 'jobs/';

const loginData = sessionStorage.getItem('login');
const loginObject = JSON.parse(loginData);
const idUser = loginObject._id;

if(sessionStorage.getItem("login")) {
document.getElementById("randomButton").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    getJobs();
});

let inputElement = document.querySelector('#input1');
let timer;

inputElement.addEventListener('input', function(event) {
  clearTimeout(timer);
  let currentValue = event.target.value;

  timer = setTimeout(function() {
    getJobs(currentValue);
  }, 1000);
});

function getJobs(title){
  fetch('http://localhost:5000/jobs', {method: 'GET'})
  .then(res => res.json())
  .then(data => {

    if(title){
        const regex = new RegExp(title, 'i'); 
        data = data.filter(element => regex.test(element.title));
    }
    data = data.filter(obj => !obj.applicants.includes(idUser));

      let htmlToAdd = ``;
      let cardCount = 0;

      for (let i = 0; i < data.length; i++) {
          if (cardCount % 4 === 0) {
            // Si el contador es par, abre un nuevo div class="row"
            htmlToAdd += `<div class="row">`;
          }
        
          htmlToAdd += `<div class="col-lg-3" style="padding-bottom: 25px;">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title"><b>${data[i].title}</b></h4>
                              <p class="card-text">${data[i].description}</p>
                              <p class="card-text"><b>Salary:</b> $${data[i].salary}</p>
                              <p class="card-text"><b>Shift:</b> ${data[i].shift}</p>
                              <p class="card-text"><b>Modality:</b> ${data[i].modality}</p>
                              <p class="card-text"><b>Company:</b> ${data[i].company}</p>
                              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#applyModal" onclick="applyJobById('${data[i]._id}')">Apply</button>
                            </div>
                          </div>
                        </div>`;
        
          cardCount++; // Incrementa el contador de tarjetas
        
          if (cardCount % 4 === 0 || i === data.length - 1) {
            // Si el contador es par o es la última iteración, cierra el div class="row"
            htmlToAdd += `</div>`;
          }
      }
        

      const cardsContainer = document.getElementById('jobCards');
      cardsContainer.innerHTML = htmlToAdd;

  }).catch(error => console.error('Error:', error));

  return 0;
}

function applyJobById(jobId){
    if(sessionStorage.getItem('login')){
        const url = `http://localhost:5000/jobs/jobById?id=${jobId}`;
  
        fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const applyButton = document.querySelector('#applyModal .modal-footer .btn-primary');
            const nameInput = document.querySelector('.name');
            const emailInput = document.querySelector('.email');
            const experienceSelect = document.querySelector('select[name="experience"]');
            const messageTextarea = document.querySelector('.message'); 
            
            applyButton.addEventListener('click', () => {
                const nameValue = nameInput.value;
                const emailValue = emailInput.value;
                const experienceValue = experienceSelect.value;
                const messageValue = messageTextarea.value;
                console.log(nameValue);
                console.log(emailValue);
                console.log(experienceValue);
                console.log(messageValue);
                const urlToUse = `http://localhost:5000/users/addJobApplicant/?userId=${userObj._id}&jobId=${jobId}`;
                fetch(urlToUse, { method: 'PUT' })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                })
                .then(responseData => {
                    console.log('Respuesta del servidor:', responseData.message);
                    getJobs();
                    window.location.reload();
                }).catch(error => console.error('Error: '+error))

                const applicationData = {}
                applicationData.email = emailValue; 
                applicationData.name = nameValue; 
                applicationData.experience = experienceValue; 
                applicationData.message = messageValue; 
                applicationData.userId = userObj._id; 
                applicationData.jobId = jobId; 

                inputElement.value = '';

                fetch(`http://localhost:5000/applications/createApplication`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(applicationData),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                })
                .then(responseData => {
                    console.log('Respuesta del servidor:', responseData.message);
                    getJobs();
                    // Aquí puedes realizar acciones con la respuesta del servidor, si es necesario
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
        }).catch(error => console.error('Error: '+error))
    }else{
        const applyButton = document.querySelector('#applyModal .modal-footer .btn-primary');
        applyButton.addEventListener('click', () => {
            alert('You must be logged in to apply for a job'); 
        })
    }
}
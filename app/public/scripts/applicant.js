var userLogged = sessionStorage.getItem('login'); 
var userObj = JSON.parse(userLogged);
const url = 'http://localhost:5000/';
const jobs = 'jobs/';

document.addEventListener('DOMContentLoaded', function() {
    getJobsByUser();
});

function getJobsByUser(){
  fetch('http://localhost:5000/jobs', {method: 'GET'})
  .then(res => res.json())
  .then(data => {

    const jobsByUser = data.filter((object) => {
      return object.applicants && object.applicants.includes(userObj._id);
    });

      let htmlToAdd = ``;
      let cardCount = 0;

      for (let i = 0; i < jobsByUser.length; i++) {
          if (cardCount % 4 === 0) {
            // Si el contador es par, abre un nuevo div class="row"
            htmlToAdd += `<div class="row">`;
          }
        
          htmlToAdd += `<div class="col-lg-3" style="padding-bottom: 25px;">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title"><b>${jobsByUser[i].title}</b></h4>
                              <p class="card-text">${jobsByUser[i].description}</p>
                              <p class="card-text"><b>Salary:</b> $${jobsByUser[i].salary}</p>
                              <p class="card-text"><b>Shift:</b> ${jobsByUser[i].shift}</p>
                              <p class="card-text"><b>Modality:</b> ${jobsByUser[i].modality}</p>
                              <p class="card-text"><b>Company:</b> ${jobsByUser[i].company}</p>
                              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editJobById('${jobsByUser[i]._id}')">Edit status</button>
                            </div>
                          </div>
                        </div>`;
        
          cardCount++; // Incrementa el contador de tarjetas
        
          if (cardCount % 4 === 0 || i === jobsByUser.length - 1) {
            // Si el contador es par o es la última iteración, cierra el div class="row"
            htmlToAdd += `</div>`;
          }
      }
        

      const cardsContainer = document.getElementById('jobCards');
      cardsContainer.innerHTML = htmlToAdd;

  }).catch(error => console.error('Error:', error));

  return 0;
}

function editJobById(jobId){
  const edityButton = document.querySelector('#editModal .modal-footer .btn-primary');
  edityButton.addEventListener('click', () => {
    const statusSelect = document.querySelector('select[name="status"]');
    const statusValue = statusSelect.value; 
    if(statusValue == 2){
      const urlToUse = `http://localhost:5000/jobs/jobById?id=${jobId}`;
      fetch(urlToUse, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          fetch(`http://localhost:5000/users/removeJobApplicant/?userId=${userObj._id}&jobId=${jobId}`, {method: 'PUT'})
          .then(response => {
            if (response.ok) {
              deleteApplication(jobId); 
            } else {
                throw new Error('Error en la solicitud');
            }
          })
        })
    }
  })
  
}

function deleteApplication(jobId) {
  fetch(`http://localhost:5000/applications/applicationById?userId=${userObj._id}&jobId=${jobId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data._id);
      return fetch(`http://localhost:5000/applications/deleteApplication/${data._id}`, { method: 'DELETE' });
    })
    .then(response => {
      if (response.ok) {
        console.log('Application deleted successfully.');
      } else {
        throw new Error('Error in the request.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    getJobsByUser(); 
    window.location.reload();
}

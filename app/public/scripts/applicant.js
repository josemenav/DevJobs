var userLogged = sessionStorage.getItem('login'); 
var userObj = JSON.parse(userLogged);
console.log(userObj._id); 
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
      console.log(data)
      console.log(jobsByUser)

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
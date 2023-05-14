var userLogged = sessionStorage.getItem('login'); 
var userObj = JSON.parse(userLogged);

const url = 'http://localhost:5000/';
const jobs = 'jobs/';
const createjobs = 'createJob';
const completejobs = 'completeJob';

document.addEventListener('DOMContentLoaded', function() {
    getJobsByUser();
});

// Display Jobs
function getJobsByUser(){
    fetch('http://localhost:5000/jobs/ongoingJobs', {method: 'GET'})
    .then(res => res.json())
    .then(data => {

        const jobsByUser = data.filter(object => object.author === userObj._id);
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
                                <button class="btn btn-success" onclick="completeJobById('${jobsByUser[i]._id}')">Complete</button>
                                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editJobById('${jobsByUser[i]._id}')">Edit</button>
                                <button class="btn btn-danger" onclick="deleteJobById('${jobsByUser[i]._id}')">Delete</button>
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

// Funcion al boton add job
function addNewJob() {
    // Obtener los valores de los campos de entrada
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descriptionInput").value;
    var salary = document.getElementById("salaryInput").value;
    var company = document.getElementById("inputCompany").value;
    var shiftSelect = document.getElementById("statusShiftNewJob");
    var modalitySelect = document.getElementById("statusModalityNewJob");

    var shiftIndex = shiftSelect.selectedIndex;
    var modalityIndex = modalitySelect.selectedIndex;

    var shift = shiftSelect.options[shiftIndex].text;
    var modality = modalitySelect.options[modalityIndex].text;

    var jobData = {}
    jobData.title = title;
    jobData.description = description;
    jobData.salary = salary;
    jobData.shift = shift;
    jobData.modality = modality;
    jobData.company = company;
    jobData.author = userObj._id;
    jobData.status = "On Going";

    fetch(url+jobs+createjobs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
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
        // Aquí puedes realizar acciones con la respuesta del servidor, si es necesario
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    // Regresar a sus valores vacios
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
    document.getElementById("salaryInput").value = "";
    shiftSelect.selectedIndex = 0;
    modalitySelect.selectedIndex = 0;
    document.getElementById("inputCompany").value = "";
};

// Funcion boton complete job
function completeJobById(id){

    var respuesta = confirm("¿Deseas completar este trabajo?");

    fetch(url+jobs+completejobs+'?id='+id, {method: 'PUT'})
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Manejar los datos recibidos
      console.log(data);
    })
    .catch(error => {
      // Manejar cualquier error ocurrido durante la solicitud
      console.error('Error:', error);
    });

    getJobsByUser();
};


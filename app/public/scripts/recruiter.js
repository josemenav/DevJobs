var userLogged = sessionStorage.getItem('login'); 
var userObj = JSON.parse(userLogged);


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

    console.log(jobData);

    // Regresar a sus valores vacios
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
    document.getElementById("salaryInput").value = "";
    shiftSelect.selectedIndex = 0;
    modalitySelect.selectedIndex = 0;
    document.getElementById("inputCompany").value = "";
}
  

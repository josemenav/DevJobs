const {Jobs, Users} = require('./dbSchemas');

async function createJob({ title, description, status, salary, shift, modality, company, author, applicants }){
    const Job = new Jobs({
        title,
        description,
        status,
        salary,
        shift,
        modality,
        company,
        author,
        applicants,
    })
    await Job.save()
    console.log('Usuario guardado')
}
const {Jobs, Users} = require('./dbSchemas');

async function createJob({ title, description, status, salary, shift, modality, company, author }){
    const Job = new Jobs({
        title,
        description,
        status,
        salary,
        shift,
        modality,
        company,
        author,
    })
    await Job.save()
    console.log('Usuario guardado')
}
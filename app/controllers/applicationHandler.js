const {Jobs, Users, Applications} = require('./dbSchemas');

async function createApplication({ email, name, experience, message, userId, jobId}){
    const Application = new Applications({
        email,
        name,
        experience,
        message,
        userId,
        jobId
    });
    await Application.save();
    return Application._id.toString();
}

exports.createApplication = createApplication;
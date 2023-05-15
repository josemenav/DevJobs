const {Jobs, Users, Applications} = require('./dbSchemas');

async function createApplication({ email, name, experience }){
    const Application = new Applications({
        email,
        name,
        experience,
        message,
    });
    await Application.save();
    return Application._id.toString();
}

exports.createApplication = createApplication;
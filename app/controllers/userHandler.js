const {Jobs, Users} = require('./dbSchemas');

async function createUser({ email, name, username, password, typeOfUser }){
    const User = new Users({
        email,
        name,
        username,
        password,
        typeOfUser,
    })
    await User.save()
    console.log('Usuario guardado')
}

exports.createUser = createUser;
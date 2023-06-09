const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['On Going', 'Canceled', 'Finished'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    shift: {
        type: String,
        enum: ['Day', 'Night', 'Part Time'],
        required: true
    },
    modality: {
        type: String,
        enum: ['Hybrid', 'Remote', 'In Office'],
        required: true
    },
    company: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    applicants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    typeOfUser: {
        type: String,
        enum: ['Recruiter', 'Applicant'],
        required: true
    },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
    }],
    postedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
    }],
});

const applicationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    experience: {
        type:String, 
        required: true
    },
    message: {
        type: String,
        required: false
    },    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Jobs = mongoose.model('Devjobs-Jobs', jobSchema);
const Users = mongoose.model('Devjobs-Users', userSchema);
const Applications = mongoose.model('Devjobs-Applications', applicationSchema);

module.exports = {
    Jobs: Jobs,
    Users: Users,
    Applications: Applications,
}
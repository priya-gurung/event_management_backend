const Event = require('../model/event.js')
const Eventlog = require('../model/eventLog.js')
const User = require('../model/user.js')
const {diffFields} = require('../utils/findDiff.js')

const FIELDS = ['title', 'description', 'users', 'timezone', 'startAt', 'endAt'];

async function checkUsersExist(userIds){
    const count = await User.countDocuments({_id: {$in: userIds}});
    if(count!==userIds.length){
        const error = new Error('One or more selected users do not exist');
        error.statusCode = 400;
        throw error;
    }
}

const getEvent = async(req, res)=>{
    const {userId} = req.query;
    const filter = userId? {users: userId} : {};
    const event = await Event.find(filter).populate('users', 'name timezone').sort({startAt: 1});
    res.json(event);
}

const getEventById = async(req, res)=>{
    const user_id = req.params.id;
    const event = await Event.findById(user_id).populate('users', 'name timezone');
    if(!event){
        res.status(404);
        throw new Error('Event not found');
    }
    res.json(event);
}

const createEvent = async(req, res)=>{
    const {title, description, users, timezone, startAt, endAt} = req.body;
    if(!Array.isArray(users) || users.length===0){
        res.status(400);
        throw new Error('Atleast one profile must be selected');
    }
    if(!timezone){
        res.status(400);
        throw new Error('Timezone is required');
    }
    if(new Date(endAt)< new Date(startAt)){
        res.status(400);
        throw new Error('End date/time cannot be before start date/time');
    }

    await checkUsersExist(users);

    const event = await Event.create({
        title,
        description,
        users,
        timezone,
        startAt,
        endAt,
    });

    const populated = await event.populate('users', 'name timezone');
    res.status(201).json(populated);
}

const updateEvent = async(req, res)=>{
    const existing = await Event.findById(req.params.id);
    if(!existing){
        res.status(400);
        throw new Error('Event not found');
    }

    const {title, description, users, timezone, startAt, endAt} = req.body;

    //if new date, then update it
    const nextStart = startAt!==undefined? new Date(startAt) : existing.startAt;
    const nextEnd = endAt!==undefined? new Date(endAt) : existing.endAt;
    if(nextEnd<nextStart){
        res.status(400);
        throw new Error('End date/time cannot be before start date/time');
    }

    if(users) await checkUsersExist(users);

    const before = existing.toObject();
    if (title !== undefined) existing.title = title;
    if (description !== undefined) existing.description = description;
    if (users !== undefined) existing.users = users;
    if (timezone !== undefined) existing.timezone = timezone;
    if (startAt !== undefined) existing.startAt = nextStart;
    if (endAt !== undefined) existing.endAt = nextEnd;

    await existing.save();

    const after = existing.toObject();
    const changes = diffFields(before, after, FIELDS);

    if(changes.length>0){
        await Eventlog.create({event: existing._id, changes});
    }

    const populated = await existing.populate('users', 'name timezone');
    res.json(populated);
};

const getEventLogs = async(req, res)=>{
    const logs = await Eventlog.find({event: req.params.id}).sort({createdAt:-1});
    res.json(logs);
};

module.exports = {getEvent, getEventById, createEvent, updateEvent, getEventLogs};
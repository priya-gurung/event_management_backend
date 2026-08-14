const User = require('../model/user.js')

const getUser = async(req, res)=>{
    const users = await User.find().sort({createdAt: 1});
    res.json(users);
};

const createUser = async(req, res)=>{
    const { name, timezone } = req.body;
    if(!name || !name.trim()){
        res.status(400);
        throw new Error('Profile name is required');
    }

    const trimmedName = name.trim();
    const existingUser = await User.findOne({
        name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
    });

    if (existingUser) {
        res.status(400);
        throw new Error('A user with this name already exists');
    }

    const user = await User.create({
        name: trimmedName,
        timezone: timezone || 'UTC',
    });

    res.status(200).json(user);
}

const updateTimezone = async(req, res)=>{
    const {timezone} = req.body;
    if(!timezone){
        res.status(400);
        throw new Error('Timezone is required');
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {timezone},
        {new: true, runValidators: true}
    )

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
};

module.exports = {getUser, createUser, updateTimezone};
const User = require("../models/user_to-do-list");
const { v4 } = require("uuid");

// Menambah data baru 
const addUser = async (data) => {
    try {
        const { username, email, password } = data;

        const newUser = new User({
            username,
            email,
            password,
        })

        const response = await newUser.save();
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Menambah activity baru
const addTaskList = async (task, oldData, date) => {
    try {
        const oldTask = oldData.taskList;
        const username = oldData.username;
        const response = await User.findOneAndUpdate({ username }, {
            taskList: [...oldTask, {
                id: v4(),
                task,
                checked: false,
                date
            }]
        }, { new: true });

        return response
    } catch (error) {
        console.log(error);
    }
}

// Mengedit checked 
const checkedTask = async (oldData, id) => {
    try {
        const username = oldData.username;
        const oldTask = oldData.taskList;
        const newTasks = oldTask.map(task => task.id == id ? { ...task, checked: !task.checked } : task);

        const response = await User.findOneAndUpdate({ username }, {
            taskList: [...newTasks]
        }, { new: true });

        return response
    } catch (error) {
        console.log(error);
    }
}

// Delete task
const deleteTask = async (oldData, id) => {
    try {
        const username = oldData.username;
        const oldTask = oldData.taskList;

        const newTask = oldTask.filter(task => task.id != id);
        const response = await User.findOneAndUpdate({ username }, {
            taskList: [...newTask]
        })

        return response;
    } catch (error) {
        console.log(error);
    }
}

// Mencari data user bedasarkan email 
const findUserByEamil = async (email) => {
    try {
        const respons = await User.findOne({ email });
        return respons
    } catch (error) {
        console.log(error);
    }
}

// Mencari data user berdasarkan username 
const findUserByUsername = async (username) => {
    try {
        const response = await User.findOne({ username });
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    findUserByUsername,
    findUserByEamil,
    addTaskList,
    checkedTask,
    deleteTask
}

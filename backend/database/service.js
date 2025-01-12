import { Users } from './users.model.js';

export async function initialize() {
    await Users.sync();

    const users = [
        { username: 'RaresVlad', ID: '005aadd6-6190-4fbf-ae85-5cd18d37d8c2', role: 'Admin' },
        { username: 'DariaBogdaneanu', ID: '386119c2-ebca-4b2c-a084-7a1b2d76d0b4', role: 'Admin' }
    ];

    for (const user of users) {
        const existingUser = await Users.findOne({ where: { username: user.username } });
        if (!existingUser) {
            await Users.create(user);
        }
    }
}

export async function getAllUsers() {
    const result = await Users.findAll();
    const users = result.map((item) => item.dataValues);
    return users;
}

export async function getUserByUsername(username) {
    const result = await Users.findOne({
        where: {
            username: username
        }
    });
    return result ? result.dataValues : null;
}

export async function createUser(newUser) {
    const result = await Users.create(newUser);
    return result.dataValues;
}

export async function updateUser(username, updatedUser) {
    const result = await Users.update(updatedUser, {
        where: {
            username: username
        }
    });
    if (result[0] === 0) return null;
    return await getUserByUsername(username);
}

export async function deleteUser(username) {
    const result = await Users.destroy({
        where: {
            username: username
        }
    });
    return result ? true : false;
}
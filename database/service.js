import {Users} from './users.model.js';
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
export async function initialize() {
    await Users.sync();
    await Users.create({
        username: 'RaresVlad',
        ID: '005aadd6-6190-4fbf-ae85-5cd18d37d8c2',
        role: 'Admin'
    })
    await Users.create({
        username: 'DariaBogdaneanu',
        ID: '386119c2-ebca-4b2c-a084-7a1b2d76d0b4',
        role: 'Admin'
    });
}

export async function getAllUsers() {
    const result = await Users.findAll()
    const users = result.map((item) => item.dataValues);
    return users;
}

export async function getUserByUsername(username) {
    // const result = await Users.findAll({
    //     where: {
    //         username: Username
    //     }
    // }}
    const result = await Users.findByPk(username);
    return result.dataValues;
}
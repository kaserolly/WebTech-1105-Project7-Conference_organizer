import express from 'express';
import {getAllUsers, getUserByUsername, initialize} from './database/service.js'
const app = express();

initialize()

app.get('/:username/users', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        console.log(user)
        if(!user) {
            res.status(404).json({error: 'Username not found.'});
            return;
        }
        res.status(200).json({user: {ID: user.ID}, role: {role: user.role}} );
    } catch (e) {
        res.status(500).json({error: e});
        console.error(e);
    }
});



app.listen(1337, () => {
    console.log('server started on http://localhost:1337')
});
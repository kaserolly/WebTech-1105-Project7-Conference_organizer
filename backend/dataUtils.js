import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'backend', 'database', 'data.json');

export const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify({ users: [], conferences: [], articles: [] }, null, 2));
    }
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
};

export const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const findById = (array, id) => {
    return array.find(item => item.id === parseInt(id));
};
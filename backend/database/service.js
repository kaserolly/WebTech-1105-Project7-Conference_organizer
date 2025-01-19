import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'data.json');

const initializeDataFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        const defaultData = { users: [], conferences: [], articles: [] };
        fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    }
};

const readData = () => {
    try {
        initializeDataFile();
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading data file: ${error.message}`);
        return { users: [], conferences: [], articles: [] }; // Fallback to default structure
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to data file: ${error.message}`);
    }
};

const findById = (array, id) => array.find(item => item.id === id);

const findIndexById = (array, id) => array.findIndex(item => item.id === id);

export const getAllUsers = async () => {
    const data = readData();
    return data.users;
};

export const getUserByUsername = async (username) => {
    const data = readData();
    return data.users.find(user => user.username === username);
};

export const createUser = async (userData) => {
    const data = readData();
    const newUser = { id: data.users.length + 1, ...userData };
    data.users.push(newUser);
    writeData(data);
    return newUser;
};

export const updateUser = async (id, userData) => {
    const data = readData();
    const index = findIndexById(data.users, Number(id));
    if (index !== -1) {
        data.users[index] = { ...data.users[index], ...userData };
        writeData(data);
        return data.users[index];
    }
    return null;
};

export const deleteUser = async (id) => {
    const data = readData();
    const index = findIndexById(data.users, Number(id));
    if (index !== -1) {
        const [deletedUser] = data.users.splice(index, 1);
        writeData(data);
        return deletedUser;
    }
    return null;
};

export const getAllConferences = async () => {
    const data = readData();
    return data.conferences;
};

export const createConference = async (conferenceData) => {
    const data = readData();
    const newConference = { id: data.conferences.length + 1, ...conferenceData };
    data.conferences.push(newConference);
    writeData(data);
    return newConference;
};

export const updateConference = async (id, conferenceData) => {
    const data = readData();
    const index = findIndexById(data.conferences, Number(id));
    if (index !== -1) {
        data.conferences[index] = { ...data.conferences[index], ...conferenceData };
        writeData(data);
        return data.conferences[index];
    }
    return null;
};

export const deleteConference = async (id) => {
    const data = readData();
    const index = findIndexById(data.conferences, Number(id));
    if (index !== -1) {
        const [deletedConference] = data.conferences.splice(index, 1);
        writeData(data);
        return deletedConference;
    }
    return null;
};

export const getAllArticles = async () => {
    const data = readData();
    return data.articles;
};

export const submitArticle = async (conferenceId, authorId, articleData) => {
    const data = readData();
    const conference = findById(data.conferences, conferenceId);
    if (!conference) throw new Error('Conference not found.');

    const author = findById(data.users, authorId);
    if (!author || author.role !== 'Author') throw new Error('Invalid author.');

    const reviewers = data.users.filter(user => user.role === 'Reviewer').slice(0, 2);
    if (reviewers.length < 2) throw new Error('Insufficient reviewers available.');

    const newArticle = {
        id: data.articles.length + 1,
        ...articleData,
        conferenceId,
        authorId,
        reviewers: reviewers.map(reviewer => reviewer.id),
        feedback: [],
        status: 'under_review',
        versions: [],
    };

    data.articles.push(newArticle);
    writeData(data);
    return newArticle;
};

export const resubmitArticle = async (articleId, authorId, updatedContent) => {
    const data = readData();
    const article = findById(data.articles, articleId);
    if (!article || article.authorId !== authorId) {
        throw new Error('Unauthorized or article not found.');
    }

    const currentVersion = { title: article.title, abstract: article.abstract, updatedAt: new Date().toISOString() };
    article.versions.push(currentVersion);

    Object.assign(article, updatedContent);
    article.status = 'resubmitted';
    article.feedback = [];
    writeData(data);

    return article;
};

export const reviewArticle = async (articleId, reviewerId, feedback, isApproved) => {
    const data = readData();
    const article = findById(data.articles, articleId);
    if (!article) throw new Error('Article not found.');

    if (!article.reviewers.includes(reviewerId)) throw new Error('Unauthorized reviewer.');

    article.feedback.push({ reviewerId, feedback, isApproved });
    article.status = isApproved ? 'approved' : 'revisions_required';

    writeData(data);
    return article;
};

export const createArticle = async (articleData) => {
    const data = readData();
    const newArticle = { id: data.articles.length + 1, ...articleData };
    data.articles.push(newArticle);
    writeData(data);
    return newArticle;
};

export const updateArticle = async (id, articleData) => {
    const data = readData();
    const index = findIndexById(data.articles, Number(id));
    if (index !== -1) {
        data.articles[index] = { ...data.articles[index], ...articleData };
        writeData(data);
        return data.articles[index];
    }
    return null;
};

export const deleteArticle = async (id) => {
    const data = readData();
    const index = findIndexById(data.articles, Number(id));
    if (index !== -1) {
        const [deletedArticle] = data.articles.splice(index, 1);
        writeData(data);
        return deletedArticle;
    }
    return null;
};

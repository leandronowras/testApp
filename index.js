const express = require('express');

const server = express();

// Middlewares globais
server.use(express.json());

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Metodo usado ${req.method} na url ${req.url}`);

    next();

    console.timeEnd('Request');
});

// Middleware local
function checkUserExist(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'User name is required' });
    }

    next();
}

function checkUserInArray(req, res, next) {
    //  Forma direta:
    // if(!users[req.params.index]) {
    //     return res.status(400).json({ error: 'User does not exist'})
    //  }
    // Forma usando uma variavel:
    const user = users[req.params.index];

    if (!users) {
        return res.status(400).json({ error: 'User does not exist' });
    }

    req.user = user; // adiciona a nova variavel "req.user" com o valor de user

    next();
}

const users = [];

server.get('/users', (req, res) => res.json(users));

server.get('/users/:index', checkUserInArray, (req, res) =>
    // Sem o middlewarer
    // const { index } = req.params

    // return res.json(users[index])
    // Com o middleware
    res.json(req.user)
);

server.post('/users', checkUserExist, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const index = req.params;

    users.splice(index, 1);

    return res.send();
});

server.listen(4000);

const express = require('express');
const server = express();


server.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


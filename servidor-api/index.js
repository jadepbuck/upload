const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const upload = require('./controllers/upload.js');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({ createParentPath: true }));

app.post('/upload', upload);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
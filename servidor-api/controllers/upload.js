function upload(req, res) {
    try {
        if (!req.files) {
            res.status(400).send({ erro: 'Nenhum arquivo foi encontrado.' });
        } else {
            const wait = new Date(new Date().getTime() + 2000);
            while (wait > new Date()) {  }
            const image = req.files.image;
            image.mv('./public/uploads/' + image.name);
            res.json({ path:`http://localhost:3001/uploads/${image.name}` });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send({ erro: 'Erro ao processar a requisição.' });
    }
}

module.exports = upload;
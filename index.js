const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

var reader = require('./file_manager/reader.js');
var counter_tags = require('./counter_tags/counter_tags.js');

var savePage = require('./client_mongodb/db_save.js');
var readPage = require('./client_mongodb/db_read.js');

const upload_html = require('./multer/upload_html.js');

var deletePage = require('./client_mongodb/db_delete.js');

app.post('/upload-html', upload_html.single('archive_html'), async (req, res) => {
  var result;

  if (req.file) {
    var tags = reader(req.file.path);

    if (tags != null) {
      result = counter_tags(tags);
      console.log(result);

      savePage(result).catch(console.dir);
    }

    return res.json({
      erro: false,
      msg: 'Arquivo enviado com sucesso.',
      data: result
    });

  }
});

app.get('/all-pages', async (req, res) => {
  console.log('\nFazendo a leitura dos dados...\n');
  var data = await readPage();

  if (data.length > 0 || data != null) {
    return res.json({
      erro: false,
      data: data
    })
  } else {
    return res.json({
      erro: true,
      data: "Erro, verifique sua conexão ou tente mais tarde."
    })
  }
});

app.delete('/documento/:id', async (req, res) => {
  try {
    const documentId = req.params.id;
    const deleted = await deletePage(documentId);

    if (deleted) {
      res.status(200).json({ message: 'Page deleted with success!' });
    } else {
      res.status(404).json({ message: 'Erro, Page not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting document.' });
  }
});

app.listen(4000, function () {
  console.log("Servidor rodando na porta 4000.");
});
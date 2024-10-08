const express = require('express');
const cors = require('cors');

const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
const connection = require('./db_config.js');
const upload = require('./multer');


app.post('/cadastrar', (request, response) => {
    console.log("Requisição recebida:", request.body);

    let params = [
        request.body.name,
        request.body.email,
        request.body.cpf_number,
        request.body.password
    ];

    let query = "INSERT INTO users(name, email, cpf_number, password) VALUES(?, ?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar:', err);
            return response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o usuário.",
                data: err
            });
        }
        
        response.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso!",
            data: results
        });
    });  
});

app.post('/login', (request, response) => {
    let params = [request.body.email];

    let query = "SELECT id,name,email,password,perfil FROM users WHERE email = ?";

    connection.query(query, params, (err, results) => {
        if (results.length > 0) {
            let senhaDigitada = request.body.password;
            let senhaBanco = results[0].password;

            if (senhaBanco === senhaDigitada) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua Senha!",
                    });
            }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email não cadastrado!",
                });
        }
    });
});

app.post('/usuario/reset-password', (request, response) => {
  const { email, newPassword } = request.body;

  if (!newPassword || newPassword.length < 6) {
      return response.status(400).json({
          success: false,
          message: "A nova senha deve ter pelo menos 6 caracteres."
      });
  }

  let query = 'UPDATE users SET password = ? WHERE email = ?';
  let params = [newPassword, email];

  connection.query(query, params, (err, results) => {
      if (err) {
          response.status(500).json({
              success: false,
              message: "Erro ao atualizar a senha.",
              data: err
          });
          return;
      }

      if (results.affectedRows > 0) {
          response.status(200).json({
              success: true,
              message: "Senha atualizada com sucesso!"
          });
      } else {
          response.status(404).json({
              success: false,
              message: "Usuário não encontrado."
          });
      }
  });
});

app.delete('/usuario/deletar/:id', (request, response) => {
  const userId = request.params.id;

  let query = 'DELETE FROM users WHERE id = ?';
  let params = [userId];

  connection.query(query, params, (err, results) => {
      if (err) {
          response.status(500).json({
              success: false,
              message: "Erro ao excluir a conta.",
              data: err
          });
          return;
      }

      if (results.affectedRows > 0) {
          response.status(200).json({
              success: true,
              message: "Conta excluída com sucesso!"
          });
      } else {
          response.status(404).json({
              success: false,
              message: "Usuário não encontrado."
          });
      }
  });
});

app.post('/produto/cadastrar', upload.single('file'), (request, response) => {
    let params = Array(
        request.body.title,
        request.body.price,
        request.file.filename
    )

    let query = "INSERT INTO products(title,price,image) VALUES(?,?,?)";

    connection.query(query,params, (err, results) => {
        if(results){
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
             })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso!",
                    data: err
            })
        }
    })
})

app.use('/uploads', express.static(__dirname + '\\public'));

app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM products";

    connection.query(query, (err,results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem Sucesso",
                data: results
            })
        }
    })
})

app.put('/produto/atualizar/:id', upload.single('file'), (request, response) => {
    const productId = request.params.id;
    const { title, price } = request.body;
    let params = [title, price, request.file ? request.file.filename : null, productId];

    let query = "UPDATE products SET title = ?, price = ?, image = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao atualizar o produto.",
                data: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Produto atualizado com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Produto não encontrado."
            });
        }
    });
});

app.delete('/produto/excluir/:id', (request, response) => {
    const productId = request.params.id;

    let query = "DELETE FROM products WHERE id = ?";
    
    connection.query(query, [productId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao excluir o produto.",
                data: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Produto excluído com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Produto não encontrado."
            });
        }
    });
});
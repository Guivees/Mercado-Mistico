# Mercado Místico

https://guivees.github.io/Mercado-Ultra-Mistico/
(provavelmente o site não estará funcionando no upload do github, pois ele depende de um banco de dados mysql2 para cumprir todas as funcionalidades)

O Mercado Místico é um projeto técnico com o objetivo de criar uma plataforma de mercado integrada com um banco de dados SQL.

# Configuração do Projeto
Para configurar e executar o servidor Node.js, utilizamos as seguintes dependências:

CORS: Para gerenciar requisições de diferentes origens.
dotenv: Para gerenciar variáveis de ambiente.
express: Para criar o servidor web.
mysql2: Para conectar com o banco de dados MySQL.
nodemon: Para reiniciar o servidor automaticamente durante o desenvolvimento.


# Instalação

Execute os seguintes comandos no Git Bash para instalar as dependências e configurar o projeto:

npm init -y
npm install express nodemon dotenv mysql2 cors

# Inicialização do Servidor

Para iniciar o servidor, use o comando:

npm start


# Testando a API

Após o servidor estar em execução, você pode testar as funcionalidades da API usando o Thunder Client ou qualquer outra ferramenta de teste de APIs.

# Cadastro de Usuário

Para cadastrar um novo usuário, envie uma requisição POST para:

http://localhost:3000/usuario/cadastrar

Com o seguinte corpo do JSON

{
  "name": "Pedro Eliah",
  "email": "PedroEliah@hotmail.com",
  "cpf_number": "92875528492",
  "password": "Pedrinholoucao"
}

# Exclusão de Usuário

Para deletar um usuário, envie uma requisição DELETE para:

http://localhost:3000/usuario/deletar/${userId}

Substitua ${userId} pelo ID do usuário que deseja excluir.

# Produtos 

Agora colocamos a função que cadastra os produtos, precisamos apenas de um nome, preço e imagem. Colocando as informações necessárias o produto aparece-rá no site e tambem será inserido no nosso banco de dados

#Edição de Produtos

Colocamos a funcionalidade de editar produtos para mudarmos oque gostariamos e já atualizar no banco de dados e no próprio site

# Exclusão de Produtos

Junto a Edição também adicionamos a funcionalidade de Exclusão dos mesmos, no banco de dados e no site.

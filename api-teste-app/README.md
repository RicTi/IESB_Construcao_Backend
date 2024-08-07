# API_TESTE_APP

    A API_TESTE_APP é um modelo simples de construção de software em arquitetura MVC e com validação de segurança utilizando JWT (JSON Web Token).
    Tem como objetivo realizar o cadastro de dados no banco por meio de usuário devidamente cadastrado e autenticado como usuário válido.

    Utilizamos nesse projeto o framework Express, mongoose, bcrypt, dotenv e JSON Web Token como dependências de PRODUÇÃO e nodemon como dependência de desenvolvimento.

###### PASSO 1 ######
    * O primeiro passo para a construção da api-teste-app será criar a pasta principal do projeto, criar e configurar os arquivos principais necessários(app.js, .env, git.ignore), instalar dentro da pasta principal todas as dependências e configurar arquivos como o Package.Json.
    Neste primeiro passo também deve ser criada a primeira rota de teste de conexão com a API dentro do arquivo app.js, afim de obter confirmação da correta configuração e funcionamento do programa.
    * Um detalhe muito importante e que define se vai ou não ocorrer o correto funcionamento do teste da primeira rota de registro de novo usuário criado é que preciso configurar um MIDDLEWARE para que a API leia dados do tipo JSON itilizando app.use(express.json()) no topo do código da aplicação, pois ele obedece uma hierarquia.

    Para a construção da api-teste-app:
        npm init -y para iniciar um novo projeto NODE e responder sim para todas as perguntas iniciadas na criação do projeto com -y;
        npm install express mongoose bcrypt dotenv jasonwebtoken para instalar as dependências de produção;
        npm install --save-dev nodemon para instalar a dependência de desenvolvimento NODEMON.

    BCRYPT:
        Cria a hash de senha, dando mais segurança para a aplicação;
        O bcrypt consegue pegar a senha original criada pelo usuário e criar uma hash, tornando a senha mais complexa a dificultando
        a possibilidade dela ser hackeada. Ele também realiza o processo reverso, que é a decodificação dessa mesma hash da senha.

    DOTENV:
        Necessário para a configuração do arquivo .env, que é utilizado para armazenar informações que necessitam de segurança, como 
        senhas, tokens, domínio do banco de dados, emails, cpf ou qualquer informação que necessitam de sigilo e confidencialidade; 
        neste caso os arquivos serão aplicados a variáveis de ambiente e somente essa variáveis é que serão passadas dentro do código 
        fonte ao passo de que as informações contidas dentro das variáveis de ambiente estão protegidas dentro do arquivo .env.

    EXPRESS:
        Framework que possibilita a criação da api com nodeJS.

    JSONWEBTOKEN:
        Utilizado para criar e manusear o token, dando a ele ou não uma validação.

    MONGOOSE:
        Pacote de banco de dados que faz a conexão com o banco Mongo DB.

    NODEMON:
        É um utilitário responsável por salvar e reiniciar o servidor altomaticamente a cada alteração.
        Será instalado na dependência de desenvolvimento utilizando o comando "npm install --save-dev nodemon", pois o nodemon será
        usado apenas para desenvolvimento da aplicação, não sendo necessário sua intalação na dependência de produção.


    CONFIGURAÇÃO DO ARQUIVO PACKAGE.JSON:
        Devemos criar o arquivo "start": "nodemon app.js", dentro do scripts e passar o caminho do arquivo principal da aplicação dentro
        da aba "main". Exemplo: "main": "app.js".
        Por último criamos o arquivo principal "app.js" dentro da pasta do projeto.

    APP.JS:
        Esse será o arquivo principal da aplicação; também pode ser chamado de "index.js".          

    .ENV:
        Criamos o arquivo .env dentro da pasta principal do projeto para que nele sejam salvos as variáveis de ambiente.

    GITIGNORE:
        Criamos esse arquivo afim de que possamos ignorar alguns arquivos afim de que não vá para o repositório do github.
        Neste projeto estamos ignorando os seguintes arquivos: 
            node_modules (que pode ser baixado através de linha de comando);
            .env (que contém as variáveis de ambiente).





###### PASSO 2 ######
## ATLAS MONGO DB

    * O segundo passo consistirá na configuração do banco de dados, bem como a criação de um banco no Atlas MongoDB, a criação de um usuário e senha para a liberação de acesso e a conexão definitiva ao banco. Após a conexão estabelecida, será criada a primeira rota de teste para registro de novo usuário com uma simples validação de alguns campos.
    * Um detalhe muito importante e que define se vai ou não ocorrer o correto funcionamento do teste da primeira rota de registro de novo usuário criado é que preciso configurar um MIDDLEWARE para que a API leia dados do tipo JSON itilizando app.use(express.json()) no topo do código da aplicação, pois ele obedece uma hierarquia.


    Database Access:
        ####> Para liberar o acesso temporário de algum usuário novo basta criar novo usuário e senha no campo Database Access, no campo de opções inferior, dentro do site do Atlas e ativar a opção de usuário temporário.

    Network Access:
        ####> Para liberar o acesso ao banco de dados é necessário também configurar o Network Access, onde posso adicionar um IP específico para manipular meu banco de dados ou permitir o acesso mais livre, onde de qualquer máquina é permitido realizar operações.







###### PASSO 3 ######
    * No passo 3 será necessário criar o modelo de SCHEMA a ser manipulado dentro do Atlas MongoDB, pois ele exige que esse modelo seja especificado antes.
    * O modelo(schema) será criado dentro da pasta models, na pasta pricipal do projeto.




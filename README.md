### **Funcionalidades**

Para executar, instale as dependências rodando "npm" ou "yarn", e em seguida, rode "npm start" ou "yarn start".

### **Funcionalidades**

Abaixo estão descritas as funcionalidades da aplicação.

### **1. Autenticação**

Permitir a criação de usuários e a autenticação de usuários criados. Esses usuários serão tanto os administradores da aplicação quanto os entregadores.

Os campos que os usuários devem possuir são:

- id (id do usuário);
- name (nome do usuário);
- image (imagem de perfil do usuário);
- email (email do usuário);
- password (senha do usuário);
- admin (booleano para definir se o usuário é ou não administrador);
- created_at;
- updated_at;

### 2. **Cadastro de veículos**

Você deve permitir que veículos sejam mantidos (cadastradas/atualizadas) na aplicação, estas serão rotas **autenticadas** onde apenas usuários autenticados, que **são admins,** podem acessa-la. Para isso, você deve criar uma tabela `cars` que possuirá os **seguintes campos:** 

- id (id do carro);
- name (nome do carro);
- brand (marca do carro);
- daily_value (valor da diária);
- created_at;
- updated_at;

Para essa gestão, você pode criar rotas para listagem/cadastro/atualização/remoção de carros;

### 3. **Cadastro de especificações**

Para realizar o cadastro de carros, é sugerido que você crie uma tabela separada que irá conter as especificações compartilhadas entre dois ou mais carros. Essa tabela terá uma relação *many to one* com a tabela *`cars`* onde uma mesma especificação poderá estar em mais de um veículo.

Ainda sobre a tabela de especificações, é interessante que você armazene **somente** campos obrigatórios como o tipo de combustível e câmbio. As demais informações (inclusive, você não precisa se prender somente aos seis elementos que estão no layout) deverão estar diretamente na tabela `cars` pois, são informações ligadas diretamente ao veículo. Caso você pense em um novo campo que possa ser compartilhado entre dois ou mais carros, é interessante incluir também nessa tabela.

A tabela de especificações possuirá os **seguintes campos:**

- spec_id (id da especificação);
- car_id (id do carro que terá a referência dessa espec.);
- name (nome da especificação);
- description (descrição da espec.);
- icon (nome do ícone a ser utilizado para exibir o card da especificação);
- created_at;
- updated_at.

### 4. **Aluguel de veículos**

Você deve permitir que os alugueis realizados e salvos no seu banco de dados da aplicação. Para isso, você deve criar uma tabela `rentals` que possuirá os **seguintes campos:** 

- car_id (id do carro alugado)
- client_id (id do usuário responsável pelo aluguel)
- start_date (data inicial do aluguel);
- end_date (data final do aluguel);
- created_at;
- updated_at;

### 5. **Listagem de veículos**

Para essa funcionalidade, você deve permitir a listagem de veículos de acordo acordo com sua disponibilidade, de modo que ao listar carros, você deve inserir a data inicial e a data final, e mostrar apenas os carros que estarão disponíveis no range dessa data.

Além disso, você deve ter alguns filtros na listagem, como por exemplo um filtro de nome (nome do veículo), valor (range de valor), filtro para o combustível (Gasolina, Elétrico, Álcool) e um filtro para transmissão (automático e manual).

# Nest Boilerplate 2025

Este é um boilerplate para projetos utilizando o framework [NestJS](https://nestjs.com/). Ele está em construção e será melhorado continuamente.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js eficientes e escaláveis.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento de dados.
- **Prisma**: ORM Node.js e TypeScript.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **JWT (RS256)**: Estratégia de autenticação baseada em tokens com assinatura assimétrica.

## Scripts de Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [OpenSSL](https://www.openssl.org/) (para geração das chaves)

### Passos para Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/nest-ddd-boilerplate-2025.git
    cd nest-ddd-boilerplate-2025
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o banco de dados PostgreSQL utilizando Docker:

    ```bash
    docker-compose up -d
    ```

4. Configure o Prisma:

    ```bash
    npx prisma generate
    ```

5. Execute as migrações do banco de dados:

    ```bash
    npx prisma migrate dev
    ```

6. Gere as chaves para o JWT (RS256):

    - **Gere a chave privada**:
      ```bash
      openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
      ```

    - **Gere a chave pública**:
      ```bash
      openssl rsa -pubout -in private.pem -out public.pem
      ```

    - **Converta as chaves para Base64**:
      ```bash
      # Converta a chave privada para Base64
      cat private.pem | base64 -w 0 > private-base64.txt

      # Converta a chave pública para Base64
      cat public.pem | base64 -w 0 > public-base64.txt
      ```

    - Copie o conteúdo dos arquivos `private-base64.txt` e `public-base64.txt` para o arquivo `.env`:

      ```env
      JWT_PRIVATE_KEY="(conteúdo do arquivo private-base64.txt)"
      JWT_PUBLIC_KEY="(conteúdo do arquivo public-base64.txt)"
      ```

7. Inicie a aplicação:

    ```bash
    npm run start:dev
    ```

## Scripts Disponíveis

- `npm run build`: Compila o projeto.
- `npm run start`: Inicia a aplicação.
- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run start:debug`: Inicia a aplicação em modo de depuração.
- `npm run start:prod`: Inicia a aplicação em modo de produção.
- `npm run lint`: Executa o ESLint para verificar problemas no código.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
- **prisma/**: Contém o esquema do Prisma e as migrações do banco de dados.
- **docker-compose.yml**: Configuração do Docker Compose para o PostgreSQL.
- **.env**: Arquivo de variáveis de ambiente.

## Estratégia de Autenticação com JWT (RS256)

Este projeto utiliza a estratégia de autenticação JWT com o algoritmo **RS256**. Para configurar o JWT, é necessário gerar uma chave privada e uma chave pública. Ambas as chaves devem ser convertidas para Base64 e configuradas no arquivo `.env` como `JWT_PRIVATE_KEY` e `JWT_PUBLIC_KEY`.

## Melhorias Futuras

Este boilerplate está em construção e será melhorado continuamente.
# [Missão de Aprendizado 02] CRUD em Memória

## Rodando o projeto

### Modo Produção

```bash
npm start
```

### Modo Desenvolvimento

```bash
npm run dev
```

## Endpoints

- `[GET] /`: `"Hello World"`
- `[GET] /oi`: `"Olá, mundo!`

### CRUD `items`

- `[GET] /items`: Read all (Ler tudo)

- `[GET] /items/:id`: Read by ID (Ler por ID)

- `[POST] /items`: Create (Criar)

  - **Body:**

    ```json
    {
    	"name": "Java",
    	"imageUrl": "https://salvatore.academy/devmon/1_java.png"
    }
    ```

- `[PUT] /items/:id`: Update (Atualizar)

  - **Body:**

    ```json
    {
    	"name": "Kotlin",
    	"imageUrl": "https://salvatore.academy/devmon/2_kotlin.png"
    }
    ```

- `[DELETE] /items/:id`: Delete (Remover)

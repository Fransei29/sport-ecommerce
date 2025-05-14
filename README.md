# 🛍️ Fullstack eCommerce App with Next.js, PostgreSQL, Prisma & Mercado Pago

## 🔗 Live Demo

👉 https://sport-ecommerce-58pi.vercel.app/

A complete eCommerce platform built from scratch with modern technologies. 
Includes user authentication, shopping cart, dynamic product management, and a payment integration with Mercado Pago.

Built with:
- Next.js (App Router)
- PostgreSQL (as the database)
- Prisma (as the ORM)
- Docker & Docker Compose (for environment setup)
- Seed data for testing
- MercadoPago integration for payments

## 🚀 Features

- 🔐 User authentication (register + login)
- 🛒 Shopping cart with local state
- 🛍️ Product listing and product detail pages
- 💳 Payment integration via Mercado Pago
- 🗃️ PostgreSQL database with Prisma ORM
- 🐳 Docker environment for local dev
- 🌐 Deployment on Vercel


### 🔄 How it works 

- We have a **DAO layer** (in `lib/dao/`) that talks directly to the database using Prisma.
- When we need to get data (like products, users, etc.), we first create a function in DAO, like `getAllProducts()`.
- That DAO function gets used in **server actions** or **route handlers**, depending on what we need.
- The frontend (React/Next.js pages and components) then calls those server functions and gets the data via props or async functions.
- The components just render what they get. Nothing fancy, straight to the point.

### 💳 Payments — Mercado Pago Integration

Esta app tiene integración con Mercado Pago para pagos.

#### ✅ ¿Cómo funciona el flujo de pago?

1. Cuando el usuario llega al checkout, se crea una preferencia de pago en `/api/payment`.
2. Esa preferencia contiene los productos del carrito y la info del usuario.
3. Mercado Pago redirige al usuario a una de las siguientes URLs según el resultado:
   - `success`: el pago fue aprobado.
   - `failure`: el pago falló.
   - `pending`: el pago quedó pendiente.

#### ⚙️ Variables de entorno necesarias

Asegurate de tener estas en tu archivo `.env.local`:

```env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN
MERCADOPAGO_BASE_URL=https://tu-url-publica.com

npx ngrok http 3000

Luego actualizá MERCADOPAGO_BASE_URL con la URL de ngrok 
(ej. https://45ff-190-120-124-251.ngrok-free.app)
```

### 🧠 Example flow

Let’s say we want to show all products:

1. DAO: We make `getAllProducts()` in `lib/dao/product.ts`
2. In a page or layout file (e.g. `app/products/page.tsx`), we call it with `await getAllProducts()`
3. We pass that to the component as props, like `<ProductList products={products} />`
4. Done. It renders them.

Same for users, carts, orders, etc. Always:
`DB → DAO → Server Action → Component → Props`

That’s it. Easy to extend and modify.

## Getting Started --

### 1. Clone the project and navigate into the folder

git clone https://github.com/your-user/your-repo.git
cd sport

### 2. Install dependencies

npm install

### 3. Start Docker containers

This will start both the PostgreSQL container and the Next.js app:
docker-compose up -d --build

### 4. Confirm containers are running

docker ps
You should see ecommerce_db (PostgreSQL) and sport_app (the app) running.

### Connecting to the PostgreSQL terminal (optional)

If you want to access the DataBase directly:
docker exec -it ecommerce_db psql -U ecommerce_user -d ecommerce_db

### Prisma Setup --

### 5. Apply database migrations

Make Sure you have the .env file done.

This sets up the database schema:
npx prisma migrate dev --name init

### 6 Run the seed script (populate database)

npx prisma db seed
### 7 Open Prisma Studio (visual DB interface)

npx prisma studio

### Running the Development Server

### Start the Next.js app locally:

npm run dev
Then visit http://localhost:3000 in your browser.

### Key Project Files --

app/page.tsx: Homepage of the app
prisma/schema.prisma: Database schema
prisma/seed.ts: Seed script to populate data

###  Payments

MercadoPago 
The flow for generating payment preferences is being developed

###  Useful Docs

Next.js https://nextjs.org/docs
Prisma https://www.prisma.io/docs
Docker Documentation
PostgreSQL https://www.postgresql.org/docs/

## 🚀 Deployment

This project is deployed using **Vercel**, which makes it easy to host fullstack Next.js applications.

### ✅ Steps followed for deployment:

1. **Created a Vercel account** and connected the GitHub repository.

2. **Configured environment variables** in the Vercel dashboard:
   - `DATABASE_URL` (PostgreSQL)
   - `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - `MERCADOPAGO_ACCESS_TOKEN`
   - `MERCADOPAGO_BASE_URL`

3. **Used Railway (or Supabase)** to host the PostgreSQL database externally, making it accessible to Vercel.

4. **Ensured the seed script ran locally** before deploying:

   npx prisma migrate deploy

   npx prisma db seed

Vercel builds the app automatically on every push to main, using:

npm run build

Production URL:
👉 https://sport-ecommerce-58pi.vercel.app

🧪 Test your deployment:
🛍️ Visit the store and check products

🧾 Create a user and log in

🛒 Add products to the cart

💳 Try going through the Mercado Pago flow (sandbox mode)

### Test

You can test this project by running 'npm test'
Using Jest

###  Contributing

If you're collaborating on this project, make sure Docker is running and follow all the steps above. Feel free to fork, pull request, and give feedback!

Made by Franco Seiler.

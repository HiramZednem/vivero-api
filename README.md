# Project Setup and Execution Instructions

## Requirements

- You need to have Docker installed
- You need to have Node.js version 22.1.0 or higher
- You need to have `nodemon` installed globally

## Steps

1. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

2. **Run Docker and start the containers:**

   ```bash
   docker-compose up -d
   ```

3. **Apply database migrations:**

   ```bash
   npx prisma migrate deploy
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

## Notes

- Ensure that the `.env` file is correctly configured with your database connection string.
- If you encounter any issues, check the logs for Docker and Node.js to troubleshoot.

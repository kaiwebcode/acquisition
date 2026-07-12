export default {
  // This is the main configuration file for Drizzle ORM.
  // It specifies the database connection and other settings.
  schema: './src/models/*.js', // Path to your schema files
  out: './drizzle', // Output directory for generated files
  dialect: 'postgresql', // Database dialect (e.g., 'postgresql', 'mysql', etc.)
  dbCredentials: {
    url: process.env.DATABASE_URL, // Use the DATABASE_URL from the .env file
  },
  // Additional settings can be added here as needed.
};

# Recipefy API Documentation

## Swagger/OpenAPI Documentation

This project includes interactive API documentation using Swagger UI.

### Accessing the Documentation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the Swagger UI in your browser:**
   ```
   http://localhost:3000/api-doc
   ```

### API Endpoints

The Swagger documentation includes all available endpoints organized by tags:

- **Recipes** - Create, read, update, and delete recipes
- **Users** - User profile management
- **Ingredients** - Browse and search ingredients
- **Auth** - Authentication endpoints

### Using the API

#### For Mobile App Development

The API can be consumed by your mobile app using the base URL:
- **Development:** `http://localhost:3000/api`
- **Production:** Update the URL in `src/lib/swagger.ts`

#### OpenAPI Specification

You can access the raw OpenAPI specification at:
```
http://localhost:3000/api/doc
```

This JSON specification can be imported into:
- Postman
- Insomnia
- Mobile app code generators
- API testing tools

### Authentication

Most endpoints require authentication. The API uses NextAuth for authentication with the following providers:
- Google OAuth

Include the session token in your requests when calling protected endpoints.

### Example API Calls

#### Get All Recipes
```bash
curl http://localhost:3000/api/recipes?skip=0&take=25
```

#### Create a Recipe (requires auth)
```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish",
    "cookTime": 20,
    "prepTime": 10,
    "servings": 4
  }'
```

#### Search Ingredients
```bash
curl http://localhost:3000/api/ingredients?query=tomato
```

### Updating Documentation

To add or update API documentation:

1. Add JSDoc comments with `@swagger` tags to your API route handlers in the `src/app/api` directory
2. Update the OpenAPI schemas in `src/lib/swagger.ts` if needed
3. The documentation will automatically update when you refresh the Swagger UI

### For Mobile Development

When integrating with your mobile app:

1. Use the OpenAPI spec to generate client code (if using tools like OpenAPI Generator)
2. Set the base URL to your backend server
3. Handle authentication tokens appropriately
4. Test endpoints using the Swagger UI before implementing in the mobile app

### Production Deployment

Before deploying to production:

1. Update the production server URL in `src/lib/swagger.ts`:
   ```typescript
   servers: [
     {
       url: 'https://your-production-url.com',
       description: 'Production server',
     },
   ]
   ```

2. Consider adding authentication to the `/api-doc` endpoint for security
3. Ensure all sensitive information is removed from error responses

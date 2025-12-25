import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Recipefy API',
        version: '1.0.0',
        description: 'API documentation for Recipefy - Recipe sharing and management platform',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
        {
          url: 'https://your-production-url.com',
          description: 'Production server',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Recipe: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              cookTime: { type: 'number' },
              prepTime: { type: 'number' },
              servings: { type: 'number' },
              difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
              isPublic: { type: 'boolean' },
              authorId: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              name: { type: 'string' },
              bio: { type: 'string' },
              image: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
          Error: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              details: { type: 'object' },
            },
          },
        },
      },
      tags: [
        {
          name: 'Recipes',
          description: 'Recipe management endpoints',
        },
        {
          name: 'Users',
          description: 'User management endpoints',
        },
        {
          name: 'Auth',
          description: 'Authentication endpoints',
        },
        {
          name: 'Ingredients',
          description: 'Ingredient management endpoints',
        },
      ],
    },
  });
  return spec;
};

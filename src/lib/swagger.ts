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
              content: { type: 'string', description: 'Recipe markup/HTML content with instructions' },
              thumbnailUrl: { type: 'string', nullable: true },
              authorId: { type: 'string' },
              visibility: { type: 'string', enum: ['PUBLIC', 'PRIVATE', 'CIRCLE'] },
              cookTime: { type: 'number', description: 'Cooking time in minutes' },
              prepTime: { type: 'number', description: 'Preparation time in minutes' },
              servings: { type: 'number' },
              calories: { type: 'number' },
              vegan: { type: 'boolean' },
              vegetarian: { type: 'boolean' },
              verifiedIngredients: { type: 'boolean' },
              shouldPublish: { type: 'boolean' },
              publishAt: { type: 'string', format: 'date-time', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              recipeIngredients: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ingredientId: { type: 'string' },
                    quantity: { type: 'number' },
                    unit: { type: 'string' },
                  },
                },
              },
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

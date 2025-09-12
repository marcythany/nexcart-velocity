# Environment Variables

This document describes the environment variables used in the Nexcart Velocity project.

## GraphQL Configuration

### NEXT_PUBLIC_GRAPHQL_URI

**Description**: The URI for the GraphQL API endpoint.

**Default Value**: `http://localhost:3000/api/graphql`

**Usage**: This environment variable is used by the Apollo Client to connect to the GraphQL API.

**Setup Instructions**:

1. Create a `.env.local` file in the project root (this file is gitignored)
2. Add the following line:

```bash
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:3000/api/graphql
```

### Development vs Production

**Development**:

```bash
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:3000/api/graphql
```

**Production** (example):

```bash
NEXT_PUBLIC_GRAPHQL_URI=https://your-production-api.com/graphql
```

### Configuration Details

The GraphQL URI is configured in `src/lib/apollo.ts`:

```typescript
const httpLink = createHttpLink({
	uri:
		process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:3000/api/graphql',
});
```

### Important Notes

- The `NEXT_PUBLIC_` prefix makes the variable available in the browser
- The default fallback points to the local Next.js API route at `/api/graphql`
- For production deployments, update this to point to your deployed GraphQL API
- The variable supports both HTTP and HTTPS protocols

### Testing the Configuration

To verify the GraphQL endpoint is working:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/api/graphql` in your browser
3. You should see the GraphQL Playground interface

### Troubleshooting

- **Connection Issues**: Ensure the URI is correct and the server is running
- **CORS Errors**: Make sure your GraphQL server allows requests from your domain
- **Authentication**: If your API requires authentication, ensure tokens are properly configured

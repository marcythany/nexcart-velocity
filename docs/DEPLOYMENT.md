# Deployment Guide

## Overview

Nexcart Velocity supports multiple deployment platforms with optimized configurations for performance, security, and scalability.

## Supported Platforms

### Vercel (Recommended)

#### Automatic Deployment

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Environment Variables**

   ```bash
   # Set environment variables in Vercel dashboard or CLI
   vercel env add NEXT_PUBLIC_GRAPHQL_URI
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   ```

3. **Build Configuration**
   ```json
   // vercel.json
   {
   	"buildCommand": "npm run build",
   	"outputDirectory": ".next",
   	"framework": "nextjs",
   	"regions": ["iad1"],
   	"functions": {
   		"src/pages/api/**/*.ts": {
   			"maxDuration": 30
   		}
   	}
   }
   ```

#### Performance Optimizations

- **Edge Functions**: Automatic deployment to Vercel's edge network
- **Image Optimization**: Built-in Next.js Image optimization
- **Caching**: Automatic caching headers for static assets
- **Analytics**: Built-in Web Vitals monitoring

### Netlify

#### Setup

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings**

   ```
   Build command: npm run build
   Publish directory: .next
   Node version: 18
   ```

3. **Environment Variables**

   ```
   NEXT_PUBLIC_GRAPHQL_URI=https://your-api.com/graphql
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://your-site.netlify.app
   ```

4. **Redirects & Headers**

   ```toml
   # _redirects
   /api/*  https://your-api.com/:splat  200

   # _headers
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
   ```

### Railway

#### Setup

1. **Create Project**

   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Initialize project
   railway init
   ```

2. **Environment Variables**

   ```bash
   railway variables set NEXT_PUBLIC_GRAPHQL_URI=https://your-api.com/graphql
   railway variables set NEXTAUTH_SECRET=your-secret
   ```

3. **Database Setup**

   ```bash
   # Add PostgreSQL database
   railway add postgresql

   # Get database URL
   railway variables get DATABASE_URL
   ```

### Self-Hosted

#### Docker Deployment

1. **Dockerfile**

   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   COPY package.json package-lock.json ./
   RUN npm ci --only=production

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   RUN npm run build

   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Docker Compose**

   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - '3000:3000'
       environment:
         - NEXT_PUBLIC_GRAPHQL_URI=https://your-api.com/graphql
       depends_on:
         - redis
         - db

     redis:
       image: redis:7-alpine
       ports:
         - '6379:6379'

     db:
       image: postgres:15-alpine
       environment:
         - POSTGRES_DB=nexcart
         - POSTGRES_USER=nexcart
         - POSTGRES_PASSWORD=password
       volumes:
         - db_data:/var/lib/postgresql/data

   volumes:
     db_data:
   ```

3. **nginx Configuration**

   ```nginx
   upstream nextjs_upstream {
       server app:3000;
   }

   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://nextjs_upstream;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # Cache static assets
       location /_next/static {
           proxy_pass http://nextjs_upstream;
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header Referrer-Policy "strict-origin-when-cross-origin" always;
   }
   ```

## Environment Variables

### Required Variables

```bash
# GraphQL API
NEXT_PUBLIC_GRAPHQL_URI=https://your-api.com/graphql

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nexcart

# Redis (optional)
REDIS_URL=redis://localhost:6379

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
MIXPANEL_TOKEN=your-mixpanel-token
```

### Optional Variables

```bash
# Development
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production

# Performance
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# Features
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true

# Security
NEXT_PUBLIC_CSP_REPORT_URI=https://your-domain.com/api/csp-report
```

## Performance Optimization

### Build Optimization

1. **Enable Turbopack**

   ```bash
   npm run build  # Uses Turbopack automatically
   ```

2. **Bundle Analysis**

   ```bash
   npm install --save-dev @next/bundle-analyzer
   npm run build:analyze
   ```

3. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains in `next.config.js`
   - Enable WebP/AVIF formats

### CDN Configuration

1. **Static Assets**

   ```javascript
   // next.config.js
   module.exports = {
   	assetPrefix:
   		process.env.NODE_ENV === 'production' ?
   			'https://cdn.your-domain.com'
   		:	'',
   };
   ```

2. **Image CDN**
   ```javascript
   // next.config.js
   module.exports = {
   	images: {
   		domains: ['cdn.your-domain.com'],
   		formats: ['image/webp', 'image/avif'],
   	},
   };
   ```

## Monitoring & Analytics

### Application Monitoring

1. **Sentry Setup**

   ```bash
   npm install @sentry/nextjs
   ```

2. **LogRocket**

   ```bash
   npm install logrocket
   ```

3. **DataDog**
   ```bash
   npm install dd-trace
   ```

### Performance Monitoring

1. **Web Vitals**
   - Automatically tracked in production
   - Data available in Vercel Analytics

2. **Core Web Vitals**
   - LCP, FID, CLS monitoring
   - Real user monitoring (RUM)

3. **Custom Metrics**
   ```javascript
   // lib/analytics.js
   export const trackEvent = (event, data) => {
   	if (typeof window !== 'undefined' && window.gtag) {
   		window.gtag('event', event, data);
   	}
   };
   ```

## Security Checklist

### Pre-deployment

- [ ] Remove all `console.log` statements
- [ ] Set secure headers (CSP, HSTS, etc.)
- [ ] Validate all environment variables
- [ ] Test authentication flows
- [ ] Verify HTTPS configuration
- [ ] Check database connections
- [ ] Test file upload limits
- [ ] Validate form validations
- [ ] Test error boundaries

### Production Checks

- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up monitoring alerts
- [ ] Test backup procedures
- [ ] Verify SSL certificates
- [ ] Check DNS configuration
- [ ] Test CDN integration
- [ ] Validate analytics setup

## Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clear cache
   rm -rf .next node_modules/.cache

   # Reinstall dependencies
   npm ci

   # Check Node version
   node --version
   ```

2. **Runtime Errors**

   ```bash
   # Check environment variables
   printenv | grep NEXT

   # Verify API connectivity
   curl https://your-api.com/graphql
   ```

3. **Performance Issues**

   ```bash
   # Enable bundle analyzer
   ANALYZE=true npm run build

   # Check Core Web Vitals
   # Use Lighthouse or WebPageTest
   ```

### Support

For deployment issues:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review deployment logs
3. Test locally with production environment variables
4. Use the deployment platform's support documentation

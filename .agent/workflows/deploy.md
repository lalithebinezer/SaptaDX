---
description: How to build and deploy the application to Firebase Hosting
---

1. Ensure you have the latest code from GitHub

   ```bash
   git pull origin main
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build the Next.js application
   ```bash
   npm run build
   ```

// turbo 4. Deploy the build to Firebase Hosting

```bash
firebase deploy --only hosting
```

5. Verify the deployment at [https://saptas-growth-777.web.app](https://saptas-growth-777.web.app)

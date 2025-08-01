import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import path from "path";
const app = express();

// Enable trust proxy for proper IP handling behind Replit's proxy
app.set('trust proxy', true);

// Add CORS headers for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Add explicit health endpoint BEFORE other routes
  app.get('/health', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.json({
      status: 'healthy',
      service: 'WebSitioPro',
      timestamp: new Date().toISOString(),
      port: 5000,
      external_url: `https://${process.env.REPLIT_DEV_DOMAIN}`,
      deployment_status: 'development'
    });
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });
  
app.get("/favicon.ico", (req, res) => res.status(204).end());
  // Setup based on environment
  if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist/public")));
  app.get("*", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "../dist/public", "index.html"));
  });
} else {
  await setupVite(app, server);
}

  // Force explicit external binding for Replit
  const port = parseInt(process.env.PORT || '5000');
  const host = '0.0.0.0';
  
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
    log(`WebSitioPro Make Agent ready at: https://${process.env.REPLIT_DEV_DOMAIN}`);
    log(`External health check: https://${process.env.REPLIT_DEV_DOMAIN}/health`);
    log(`Make webhook: https://${process.env.REPLIT_DEV_DOMAIN}/api/make/auto-create`);
    
    // Log server binding details for debugging
    const address = server.address();
    log(`Server bound to: ${JSON.stringify(address)}`);
  });
})();

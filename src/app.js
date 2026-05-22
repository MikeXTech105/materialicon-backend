const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

const corsOptions = require('./config/cors.config');
const swaggerSpec = require('./config/swagger.config');
const apiLimiter = require('./middlewares/rateLimiter.middleware');
const requestLogger = require('./middlewares/logger.middleware');
const sanitizeRequest = require('./middlewares/sanitize.middleware');
const notFound = require('./middlewares/notFound.middleware');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();

app.set('trust proxy', 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false
}));
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeRequest);
app.use(requestLogger);
app.use(apiLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'IconAPI Swagger Documentation'
}));

app.use('/storage', express.static(path.join(__dirname, '..', 'storage'), {
  immutable: true,
  maxAge: '1d'
}));

app.use('/api/v1', routes);
app.use('/api', routes);

app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

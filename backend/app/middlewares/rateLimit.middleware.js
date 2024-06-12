import { rateLimit } from 'express-rate-limit'

/**
Rate limiting é uma técnica usada para controlar o número de solicitações que um
cliente pode fazer em sua API dentro de um intervalo de tempo específico. Ajuda a prevenir
abuso, ataques de força bruta e consumo excessivo de recursos que poderiam
levar a situações de negação de serviço (DoS).
 */

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

module.exports = limiter;

import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
  log: ['query'],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get('/pools/count', async () => {
    const pools = await prisma.pool.count();

    return { count: pools };
  });

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);

    const generateUniqueId = new ShortUniqueId({ length: 6 });
    const uniqueCode = String(generateUniqueId()).toLocaleUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code: uniqueCode,
      },
    });

    return reply.status(201).send({ uniqueCode });
  });

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();

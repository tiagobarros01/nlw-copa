import Fastify from 'fastify';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get('/pools/count', () => ({count: 1232131}))

  await fastify.listen({ port: 3333 });
}

bootstrap();

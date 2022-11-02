import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Main = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Andrew',
      email: 'Andre@test.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/94117431?s=96&v=4'
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool',
      code: 'DEDS32',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-04T20:30:00.998Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  });
  await prisma.game.create({
    data: {
      date: '2022-11-05T20:30:00.998Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
};
Main();

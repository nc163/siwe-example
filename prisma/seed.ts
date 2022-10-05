// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// async function main() {
//   const alice = await prisma.user.create({
//     data: {
//       hospitalId: 1,
//       name: 'Alice',
//       email: 'alice@prisma.io',
//       phone: '0000',
//     },
//   })

//   console.log({ alice })
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

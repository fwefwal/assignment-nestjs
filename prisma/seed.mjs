import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

await prismaClient.tag.createMany({
  data: [
    {
      title: 'reactjs'
    },
    {
      title: 'angularjs'
    }
  ]
})

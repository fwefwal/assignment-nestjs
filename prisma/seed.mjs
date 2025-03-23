import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

async function seedTags() {
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
}

async function seedArticles() {
  await prismaClient.article.createMany({
    data: [
      {
        slug: 'test-article',
        title: 'Test Article',
        description: 'Test Article Description',
        body: 'Test Article Body',
      },
      {
        slug: 'test-article-2',
        title: 'Test Article 2',
        description: 'Test Article 2 Description',
        body: 'Test Article 2 Body',
      },
    ]
  })
}


async function main() {
  try {
    await seedTags()
  } catch (error) {
    console.error(error)
  }

  try {
    await seedArticles()
  } catch (error) {
    console.error(error)
  }
}

await main()

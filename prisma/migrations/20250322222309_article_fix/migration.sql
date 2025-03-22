-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "favorited" BOOLEAN NOT NULL DEFAULT false,
    "favoritesCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Article" ("body", "createdAt", "description", "favorited", "favoritesCount", "id", "slug", "title", "updatedAt") SELECT "body", "createdAt", "description", "favorited", "favoritesCount", "id", "slug", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

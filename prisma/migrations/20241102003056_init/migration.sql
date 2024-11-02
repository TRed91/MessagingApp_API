-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "about" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "message" (
    "messageId" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "receiverId" INTEGER,

    CONSTRAINT "message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "group" (
    "groupId" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "userGroup" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "userGroup_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

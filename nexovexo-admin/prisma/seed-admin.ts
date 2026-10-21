import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Creates/updates the admin login user in the shared database.
async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@nexovexo.com";
  const password = process.env.ADMIN_PASSWORD ?? "NexoVexo@2026";
  const name = process.env.ADMIN_NAME ?? "Founder";

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, name, password: hashed, role: "admin" },
  });
  console.log(`Admin user ready: ${email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

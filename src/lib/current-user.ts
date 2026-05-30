import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function getCurrentUser() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    redirect("/login");
  }

  return user;
}

"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();
  const name = String(formData.get("name") ?? "").trim();
  const ageValue = String(formData.get("age") ?? "").trim();
  const age = ageValue ? Number(ageValue) : null;

  if (!name) {
    return;
  }

  if (age !== null && (!Number.isInteger(age) || age < 1 || age > 120)) {
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, age },
  });

  revalidatePath("/profile");
  revalidatePath("/", "layout");
}

export async function changePassword(formData: FormData) {
  const user = await getCurrentUser();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (newPassword.length < 6) {
    return;
  }

  if (user.passwordHash) {
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.passwordHash,
    );

    if (!passwordMatches) {
      return;
    }
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      provider: user.provider ?? "credentials",
    },
  });

  revalidatePath("/profile/security");
  revalidatePath("/", "layout");
}

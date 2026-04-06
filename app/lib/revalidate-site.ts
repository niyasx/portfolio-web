import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateSiteContent() {
  revalidateTag("site-content", "max");
  revalidatePath("/");
}

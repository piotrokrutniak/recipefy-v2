import { getCurrentUser } from "@/app/api/users/current/route";
import { LinkButton } from "@/components/generic/LinkButton";
import { getTranslations } from "next-intl/server";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { FaList } from "react-icons/fa";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  const t = await getTranslations("admin.nav");

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto w-full px-3 py-8 gap-8">
      <aside className="w-56 flex-shrink-0 flex flex-col gap-2">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">
          Panel admina
        </p>
        <LinkButton
          href="/admin/ingredients"
          variant="ghost"
          className="justify-start gap-2"
        >
          <FaList className="w-4 h-4" />
          {t("ingredients")}
        </LinkButton>
      </aside>
      <main className="flex-1 flex flex-col gap-4">{children}</main>
    </div>
  );
}

import { redirect } from "@/i18n/server-navigation";

export default async function CircleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return redirect(`/your-circles/${params.id}`);
}

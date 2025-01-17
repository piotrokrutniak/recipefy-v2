import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import Image from "next/image";
import notFoundImage from "@/assets/images/sad-burger.png";
import { TextH3 } from "@/components/typography/TextH3";

export const NotFoundError = () => {
  return (
    <PageContentLayout className="flex gap-0 flex-col items-center justify-center">
      <Image src={notFoundImage} alt="Sad Burger" width={150} height={50} />
      <TextH3 className="text-center">Page not found.</TextH3>
    </PageContentLayout>
  );
};

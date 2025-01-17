import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import Image from "next/image";
import notFoundImage from "@/assets/images/sad-burger.png";
import { TextH3 } from "@/components/typography/TextH3";

export const UnauthorizedError = () => {
  return (
    <PageContentLayout className="flex gap-0 flex-col items-center justify-center">
      <Image src={notFoundImage} alt="Sad Burger" width={150} height={50} />
      <TextH3 className="text-center">
        You must be logged in to view this page.
      </TextH3>
    </PageContentLayout>
  );
};

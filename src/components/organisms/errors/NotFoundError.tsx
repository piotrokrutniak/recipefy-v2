import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import Image from "next/image";
import notFoundImage from "@/assets/images/undraw_page_not_found_re_e9o6.svg";
import { TextH3 } from "@/components/typography/TextH3";

export const NotFoundError = () => {
  return (
    <PageContentLayout className="flex flex-col items-center justify-center">
      <Image src={notFoundImage} alt="Not Found" width={300} height={300} />
      <TextH3>Page not found</TextH3>
    </PageContentLayout>
  );
};

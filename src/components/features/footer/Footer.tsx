import Link from "next/link";
import { TextSmall } from "@/components/typography/TextSmall";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          <div className="text-center md:text-right">
            <TextSmall className="text-gray-500">
              © {new Date().getFullYear()} Recipefy. All rights reserved.
            </TextSmall>
          </div>
        </div>
      </div>
    </footer>
  );
};

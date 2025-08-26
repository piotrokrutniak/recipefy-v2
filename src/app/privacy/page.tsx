import { TextH1 } from "@/components/typography/TextH1";
import { TextH2 } from "@/components/typography/TextH2";
import { TextH3 } from "@/components/typography/TextH3";
import { TextP } from "@/components/typography/TextP";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <TextH1 className="mb-8">Privacy Policy</TextH1>

        <div className="space-y-6">
          <section>
            <TextH2>1. Introduction</TextH2>
            <TextP>
              Recipefy ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our recipe
              sharing and discovery platform.
            </TextP>
            <TextP>Last updated: {new Date().toLocaleDateString()}</TextP>
          </section>

          <section>
            <TextH2>2. Information We Collect</TextH2>

            <TextH3>2.1 Personal Information</TextH3>
            <TextP>
              We may collect personal information that you voluntarily provide
              to us when you:
            </TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Create an account</li>
              <li>Share recipes and content</li>
              <li>Join cooking circles</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <TextP>
              This information may include your name, email address, profile
              picture, and any other information you choose to provide.
            </TextP>

            <TextH3>2.2 Usage Information</TextH3>
            <TextP>
              We automatically collect certain information about your use of our
              platform, including:
            </TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>IP address and device information</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the platform</li>
              <li>Search queries and preferences</li>
            </ul>
          </section>

          <section>
            <TextH2>3. How We Use Your Information</TextH2>
            <TextP>We use the information we collect to:</TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Process transactions and manage accounts</li>
              <li>Send you updates and notifications</li>
              <li>Improve our platform and develop new features</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <TextH2>4. Legal Basis for Processing (GDPR)</TextH2>
            <TextP>
              Under GDPR, we process your personal data based on the following
              legal grounds:
            </TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Consent:</strong> When you explicitly agree to our
                processing
              </li>
              <li>
                <strong>Contract:</strong> To fulfill our service obligations
              </li>
              <li>
                <strong>Legitimate Interest:</strong> To improve our services
                and ensure security
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable
                laws
              </li>
            </ul>
          </section>

          <section>
            <TextH2>5. Data Sharing and Disclosure</TextH2>
            <TextP>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section>
            <TextH2>6. Your Rights (GDPR)</TextH2>
            <TextP>Under GDPR, you have the following rights:</TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate or incomplete
                data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a structured
                format
              </li>
              <li>
                <strong>Restriction:</strong> Limit how we process your data
              </li>
              <li>
                <strong>Objection:</strong> Object to certain types of
                processing
              </li>
            </ul>
            <TextP>
              To exercise these rights, please contact us at
              privacy@recipefy.com
            </TextP>
          </section>

          <section>
            <TextH2>7. Data Retention</TextH2>
            <TextP>
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </TextP>
          </section>

          <section>
            <TextH2>8. Data Security</TextH2>
            <TextP>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </TextP>
          </section>

          <section>
            <TextH2>9. International Data Transfers</TextH2>
            <TextP>
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and implement appropriate
              safeguards.
            </TextP>
          </section>

          <section>
            <TextH2>10. Cookies and Tracking</TextH2>
            <TextP>
              We use cookies and similar technologies to enhance your
              experience. You can control cookie settings through your browser
              preferences.
            </TextP>
          </section>

          <section>
            <TextH2>11. Children's Privacy</TextH2>
            <TextP>
              Our services are not intended for children under 16. We do not
              knowingly collect personal information from children under 16.
            </TextP>
          </section>

          <section>
            <TextH2>12. Changes to This Policy</TextH2>
            <TextP>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </TextP>
          </section>

          <section>
            <TextH2>13. Contact Us</TextH2>
            <TextP>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
            </TextP>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <TextP className="font-medium">Recipefy</TextP>
              <TextP>Email: privacy@recipefy.com</TextP>
              <TextP>Address: [Your Business Address]</TextP>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

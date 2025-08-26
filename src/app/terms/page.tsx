import { TextH1 } from "@/components/typography/TextH1";
import { TextH2 } from "@/components/typography/TextH2";
import { TextH3 } from "@/components/typography/TextH3";
import { TextP } from "@/components/typography/TextP";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function TermsOfServicePage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <TextH1 className="mb-8">Terms of Service</TextH1>

        <div className="space-y-6">
          <section>
            <TextH2>1. Acceptance of Terms</TextH2>
            <TextP>
              By accessing and using Recipefy ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </TextP>
            <TextP>Last updated: {new Date().toLocaleDateString()}</TextP>
          </section>

          <section>
            <TextH2>2. Description of Service</TextH2>
            <TextP>
              Recipefy is a recipe sharing and discovery platform that allows
              users to create, share, and discover recipes, join cooking
              circles, and connect with other food enthusiasts.
            </TextP>
          </section>

          <section>
            <TextH2>3. User Accounts</TextH2>

            <TextH3>3.1 Account Creation</TextH3>
            <TextP>
              To access certain features of the Service, you must create an
              account. You agree to provide accurate, current, and complete
              information during registration and to update such information to
              keep it accurate, current, and complete.
            </TextP>

            <TextH3>3.2 Account Security</TextH3>
            <TextP>
              You are responsible for safeguarding the password and for all
              activities that occur under your account. You agree not to
              disclose your password to any third party and to take sole
              responsibility for any activities or actions under your account.
            </TextP>

            <TextH3>3.3 Account Termination</TextH3>
            <TextP>
              We reserve the right to terminate or suspend your account at any
              time for conduct that we believe violates these Terms of Service
              or is harmful to other users, us, or third parties.
            </TextP>
          </section>

          <section>
            <TextH2>4. User Content</TextH2>

            <TextH3>4.1 Content Ownership</TextH3>
            <TextP>
              You retain ownership of any content you submit, post, or display
              on or through the Service. By submitting content, you grant us a
              worldwide, non-exclusive, royalty-free license to use, reproduce,
              modify, and distribute such content.
            </TextP>

            <TextH3>4.2 Content Standards</TextH3>
            <TextP>You agree not to post content that:</TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Is unlawful, harmful, threatening, abusive, harassing,
                defamatory, or invasive of privacy
              </li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains false or misleading information</li>
              <li>Promotes illegal activities or harmful content</li>
              <li>Contains viruses or other harmful code</li>
            </ul>

            <TextH3>4.3 Recipe Accuracy</TextH3>
            <TextP>
              While we encourage accurate recipe sharing, we cannot guarantee
              the accuracy, completeness, or usefulness of any recipe content.
              Users should exercise caution and use their judgment when
              following recipes.
            </TextP>
          </section>

          <section>
            <TextH2>5. Privacy and Data Protection</TextH2>
            <TextP>
              Your privacy is important to us. Our collection and use of
              personal information is governed by our Privacy Policy, which is
              incorporated into these Terms of Service by reference.
            </TextP>
          </section>

          <section>
            <TextH2>6. Intellectual Property</TextH2>

            <TextH3>6.1 Service Ownership</TextH3>
            <TextP>
              The Service and its original content, features, and functionality
              are owned by Recipefy and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </TextP>

            <TextH3>6.2 User Content License</TextH3>
            <TextP>
              By posting content, you represent that you have the right to grant
              the license described above and that such content does not violate
              any third-party rights.
            </TextP>
          </section>

          <section>
            <TextH2>7. Prohibited Uses</TextH2>
            <TextP>You may not use the Service:</TextP>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                For any unlawful purpose or to solicit others to perform
                unlawful acts
              </li>
              <li>
                To violate any international, federal, provincial, or state
                regulations, rules, laws, or local ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or
                the intellectual property rights of others
              </li>
              <li>
                To harass, abuse, insult, harm, defame, slander, disparage,
                intimidate, or discriminate
              </li>
              <li>To submit false or misleading information</li>
              <li>
                To upload or transmit viruses or any other type of malicious
                code
              </li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            </ul>
          </section>

          <section>
            <TextH2>8. Disclaimers</TextH2>
            <TextP>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE
              MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIM ALL
              WARRANTIES, INCLUDING WITHOUT LIMITATION WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </TextP>
            <TextP>
              We do not warrant that the Service will be uninterrupted, secure,
              or error-free, or that defects will be corrected.
            </TextP>
          </section>

          <section>
            <TextH2>9. Limitation of Liability</TextH2>
            <TextP>
              IN NO EVENT SHALL RECIPEFY BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
              LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
              INTANGIBLE LOSSES.
            </TextP>
          </section>

          <section>
            <TextH2>10. Indemnification</TextH2>
            <TextP>
              You agree to defend, indemnify, and hold harmless Recipefy and its
              officers, directors, employees, and agents from and against any
              claims, damages, obligations, losses, liabilities, costs, or debt
              arising from your use of the Service.
            </TextP>
          </section>

          <section>
            <TextH2>11. Governing Law</TextH2>
            <TextP>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of [Your Jurisdiction], without regard to
              its conflict of law provisions.
            </TextP>
          </section>

          <section>
            <TextH2>12. Changes to Terms</TextH2>
            <TextP>
              We reserve the right to modify or replace these Terms of Service
              at any time. If a revision is material, we will provide at least
              30 days notice prior to any new terms taking effect.
            </TextP>
          </section>

          <section>
            <TextH2>13. Contact Information</TextH2>
            <TextP>
              If you have any questions about these Terms of Service, please
              contact us at:
            </TextP>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <TextP className="font-medium">Recipefy</TextP>
              <TextP>Email: legal@recipefy.com</TextP>
              <TextP>Address: [Your Business Address]</TextP>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

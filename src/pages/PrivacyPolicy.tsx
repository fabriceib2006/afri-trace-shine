import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Database, Eye, UserCheck, AlertCircle } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-column">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  1. Introduction
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                AfriTrace ("we", "our", or "us") is committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and use in accordance with Rwanda's Data Protection and Privacy Law (Law Nº 058/2021) and the African Union Convention on Cyber Security and Personal Data Protection (Malabo Convention).
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  2. Information We Collect
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Full name and email address (provided during account registration)</li>
                    <li>Account credentials (securely hashed passwords)</li>
                    <li>User role (citizen or administrator)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Feedback and Report Data</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Feedback submissions (title, category, description, location)</li>
                    <li>Timestamps of submissions and updates</li>
                    <li>Communication history with administrators</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>IP addresses and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Usage patterns and access logs</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  3. How We Use Your Information
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">
                We use your personal information for the following legitimate purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Account Management:</strong> To create and maintain your user account</li>
                <li><strong>Mineral Verification:</strong> To provide certificate verification services</li>
                <li><strong>Community Engagement:</strong> To process and respond to feedback reports</li>
                <li><strong>Platform Security:</strong> To protect against fraud and unauthorized access</li>
                <li><strong>Regulatory Compliance:</strong> To comply with Rwanda Mining Board (RMB) and REMA requirements</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and enhance platform functionality</li>
              </ul>
            </section>

            {/* Data Sharing and Disclosure */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  4. Data Sharing and Disclosure
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  We do not sell your personal information. We may share your data only in the following circumstances:
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.1 With Regulatory Authorities</h3>
                  <p className="text-foreground/80">
                    We may share information with the Rwanda Mining Board (RMB), Rwanda Environment Management Authority (REMA), and other governmental bodies as required by law or for regulatory compliance purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.2 With Service Providers</h3>
                  <p className="text-foreground/80">
                    We work with trusted service providers (e.g., cloud hosting, email services) who process data on our behalf under strict confidentiality agreements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.3 Legal Requirements</h3>
                  <p className="text-foreground/80">
                    We may disclose information when required by law, court order, or to protect our legal rights and safety.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  5. Data Security
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication with password hashing</li>
                <li>Row-Level Security (RLS) policies on database access</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Role-based access control for administrators</li>
                <li>Automated backup and disaster recovery procedures</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  6. Your Rights
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Under Rwanda's Data Protection Law, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
                <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Data Retention
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Mineral certification data is retained indefinitely for regulatory and transparency purposes. Inactive user accounts may be deleted after 3 years of inactivity, with prior notice.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                AfriTrace is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child, we will take steps to delete it promptly.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Your data is primarily stored and processed within Rwanda or within the African Union. If data is transferred internationally, we ensure appropriate safeguards are in place in accordance with the Malabo Convention and Rwanda's data protection regulations.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on our platform and updating the "Last Updated" date. Your continued use of AfriTrace after such changes constitutes acceptance of the revised policy.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Contact Information
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-foreground/80">
                <p><strong>Email:</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a></p>
                <p><strong>Phone:</strong> +250 788 700 484</p>
                <p><strong>Address:</strong> KN 4 Ave, Nyarugenge, Kigali, Rwanda</p>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

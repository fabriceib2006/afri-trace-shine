import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Scale, AlertTriangle, CheckCircle2, XCircle, Users } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-column">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Terms of Use
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  1. Acceptance of Terms
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                By accessing and using the AfriTrace platform ("Platform"), you agree to be bound by these Terms of Use and all applicable laws and regulations governing mineral traceability in Rwanda and Africa. If you do not agree with any of these terms, you are prohibited from using or accessing this Platform. This Platform is operated in compliance with the Rwanda Mining Law (Law N° 58/2018) and regulations set forth by the Rwanda Mining Board (RMB), Rwanda Environment Management Authority (REMA), and the International Conference on the Great Lakes Region (ICGLR) Regional Certification Mechanism.
              </p>
            </section>

            {/* Purpose and Scope */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  2. Purpose and Scope
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">
                AfriTrace provides the following services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Mineral Verification:</strong> Verification of mineral certificates and batch codes against official databases including REMA and ICGLR certification systems</li>
                <li><strong>Transparency Dashboard:</strong> Public access to environmental, social, and governance (ESG) data related to mining operations</li>
                <li><strong>Community Feedback:</strong> A secure channel for citizens to report concerns related to mining activities</li>
                <li><strong>Educational Resources:</strong> Information about responsible mining, mineral traceability, and environmental rights</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                This Platform is designed to support transparency and accountability in Rwanda's mineral supply chain in alignment with international due diligence standards.
              </p>
            </section>

            {/* User Accounts and Responsibilities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  3. User Accounts and Responsibilities
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Account Registration</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Users must create an account to access certain features, including feedback submission. You agree to provide accurate, current, and complete information during registration and to update this information as necessary. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.2 User Conduct</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>Submit false, misleading, or fraudulent information</li>
                    <li>Impersonate any person or entity</li>
                    <li>Use the Platform for illegal activities or to violate mining regulations</li>
                    <li>Attempt to gain unauthorized access to the Platform or its data</li>
                    <li>Interfere with or disrupt the Platform's operation</li>
                    <li>Upload malicious code, viruses, or harmful software</li>
                    <li>Harass, threaten, or defame other users or administrators</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Administrator Responsibilities</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Administrators with elevated privileges agree to use their access solely for legitimate regulatory and Platform management purposes. Administrators must maintain confidentiality of user information and comply with data protection laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Compliance with Mining Regulations */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  4. Compliance with Mining Regulations
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.1 Rwanda Mining Law Compliance</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    This Platform operates in accordance with Law N° 58/2018 governing mining and quarry operations in Rwanda. All mineral verification data is sourced from official government databases and is subject to the oversight of the Rwanda Mining Board.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.2 ICGLR Regional Certification</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    The Platform verifies compliance with the ICGLR Regional Certification Mechanism (RCM), which aims to ensure that minerals from the Great Lakes Region are not sourced from conflict-affected areas and comply with international standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.3 Environmental Compliance (REMA)</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Mining operations referenced on this Platform are subject to environmental regulations enforced by the Rwanda Environment Management Authority (REMA), including Environmental Impact Assessments (EIAs) and compliance with Law N° 48/2018 on environment.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.4 OECD Due Diligence Guidance</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    AfriTrace supports supply chain due diligence aligned with the OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas.
                  </p>
                </div>
              </div>
            </section>

            {/* Data and Intellectual Property */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Data Accuracy and Limitations
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  While we strive to provide accurate and up-to-date information, AfriTrace does not guarantee the completeness or accuracy of mineral verification data. Verification results are based on information provided by regulatory authorities. Users should independently verify critical information before making business or legal decisions.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      <strong>Disclaimer:</strong> Verification status on this Platform does not constitute legal advice or a guarantee of compliance. Users are responsible for conducting their own due diligence in accordance with applicable laws and regulations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                The Platform and its original content (excluding user-generated content) are the property of AfriTrace and are protected by Rwandan and international copyright, trademark, and other intellectual property laws. Mineral certification data and regulatory information remain the property of respective government authorities.
              </p>
            </section>

            {/* Prohibited Uses */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-destructive" />
                <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                  7. Prohibited Uses
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">
                You agree not to use the Platform for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Any unlawful purpose or to facilitate illegal mining activities</li>
                <li>Circumventing mineral traceability requirements or certification processes</li>
                <li>Trading in conflict minerals or minerals from non-certified sources</li>
                <li>Providing false verification information to conceal illegal activity</li>
                <li>Data scraping or automated extraction of Platform data without authorization</li>
                <li>Commercial resale of verification services without proper licensing</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                To the fullest extent permitted by law, AfriTrace shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform. Our liability is limited to the amount you paid to access the Platform (if any). This limitation applies even if AfriTrace has been advised of the possibility of such damages.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. Termination
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We reserve the right to suspend or terminate your account at our sole discretion if you violate these Terms of Use, engage in fraudulent activity, or misuse the Platform. Upon termination, your right to use the Platform will immediately cease. Provisions regarding intellectual property, liability limitations, and dispute resolution shall survive termination.
              </p>
            </section>

            {/* Governing Law and Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Governing Law and Dispute Resolution
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of Rwanda. Any disputes arising from or relating to these Terms or your use of the Platform shall be resolved through the following process:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
                  <li><strong>Negotiation:</strong> Parties agree to attempt resolution through good-faith negotiation</li>
                  <li><strong>Mediation:</strong> If negotiation fails, disputes will be submitted to mediation in Kigali, Rwanda</li>
                  <li><strong>Arbitration:</strong> Unresolved disputes shall be settled by arbitration under the Kigali International Arbitration Centre (KIAC) rules</li>
                  <li><strong>Jurisdiction:</strong> Courts of Rwanda shall have exclusive jurisdiction over any legal proceedings</li>
                </ol>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Modifications to Terms
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Platform. Material changes will be notified via email to registered users. Your continued use of the Platform after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. Contact Information
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                For questions regarding these Terms of Use or to report violations, please contact:
              </p>
              <div className="space-y-2 text-foreground/80">
                <p><strong>AfriTrace Support</strong></p>
                <p><strong>Email:</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a></p>
                <p><strong>Phone:</strong> +250 788 700 484</p>
                <p><strong>Address:</strong> KN 4 Ave, Nyarugenge, Kigali, Rwanda</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t pt-6">
              <p className="text-foreground/80 leading-relaxed italic">
                By using AfriTrace, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. You also acknowledge that you understand the regulatory framework governing mining operations in Rwanda and commit to using this Platform in compliance with all applicable laws and regulations.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;

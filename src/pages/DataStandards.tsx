import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, CheckCircle2, Globe, Shield, Database, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataStandards = () => {
  return (
    <div className="min-h-screen flex flex-column">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Data Standards
            </h1>
            <p className="text-xl text-muted-foreground">
              Ensuring data quality, interoperability, and compliance in mineral traceability
            </p>
          </div>

          <div className="grid gap-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle>Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  AfriTrace adheres to international data standards to ensure mineral traceability data is accurate, consistent, and interoperable across global supply chains. Our data standards align with frameworks established by the OECD, ICGLR, and the Responsible Minerals Initiative (RMI).
                </p>
              </CardContent>
            </Card>

            {/* Regulatory Framework */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Regulatory Framework</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">Rwanda Mining Law (Law N° 58/2018)</h3>
                    <p className="text-sm text-foreground/70">
                      Governs all mining operations in Rwanda, including licensing, environmental compliance, and export requirements. AfriTrace data fields align with RMB certification requirements.
                    </p>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">ICGLR Regional Certification Mechanism (RCM)</h3>
                    <p className="text-sm text-foreground/70">
                      International framework for certifying minerals from the Great Lakes Region. AfriTrace verification includes RCM compliance checks to ensure conflict-free sourcing.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4">
                    <h3 className="font-semibold text-foreground mb-2">OECD Due Diligence Guidance</h3>
                    <p className="text-sm text-foreground/70">
                      The global standard for responsible supply chains. AfriTrace data structure supports OECD 5-step framework implementation for downstream companies.
                    </p>
                  </div>

                  <div className="border-l-4 border-muted pl-4">
                    <h3 className="font-semibold text-foreground mb-2">EU Conflict Minerals Regulation</h3>
                    <p className="text-sm text-foreground/70">
                      Requires EU importers to exercise due diligence on 3TG minerals (tin, tantalum, tungsten, gold). AfriTrace provides data fields necessary for EU compliance reporting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Fields */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>Standard Data Fields</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold text-foreground">Field Name</th>
                        <th className="text-left p-3 font-semibold text-foreground">Data Type</th>
                        <th className="text-left p-3 font-semibold text-foreground">Description</th>
                        <th className="text-left p-3 font-semibold text-foreground">Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { field: "certificate_id", type: "String (UUID)", desc: "Unique identifier for each certificate", req: "Yes" },
                        { field: "batch_code", type: "String", desc: "Mining batch identification code (MCIS format)", req: "Yes" },
                        { field: "mineral_type", type: "Enum", desc: "Type of mineral (e.g., Coltan, Cassiterite, Gold)", req: "Yes" },
                        { field: "origin", type: "String", desc: "District or region of extraction", req: "Yes" },
                        { field: "mine_site", type: "String", desc: "Specific mine site name", req: "Yes" },
                        { field: "export_date", type: "ISO 8601 Date", desc: "Date of export or certification", req: "Yes" },
                        { field: "verified_by_rema", type: "Boolean", desc: "REMA environmental compliance status", req: "Yes" },
                        { field: "icglr_compliant", type: "Boolean", desc: "ICGLR RCM certification status", req: "Yes" },
                        { field: "certification_status", type: "Enum", desc: "Active, Expired, Revoked, Pending", req: "Yes" },
                        { field: "blockchain_hash", type: "String (Hash)", desc: "Immutable blockchain record (optional)", req: "No" },
                        { field: "weight", type: "Decimal", desc: "Weight in kilograms", req: "No" },
                        { field: "assay_results", type: "JSON", desc: "Laboratory testing results (mineral composition)", req: "No" },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted/30">
                          <td className="p-3 font-mono text-xs text-primary">{row.field}</td>
                          <td className="p-3 text-foreground/70">{row.type}</td>
                          <td className="p-3 text-foreground/70">{row.desc}</td>
                          <td className="p-3">
                            {row.req === "Yes" ? (
                              <span className="inline-flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                Yes
                              </span>
                            ) : (
                              <span className="text-foreground/50">Optional</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Data Quality */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <CardTitle>Data Quality Standards</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Accuracy</h3>
                    <p className="text-sm text-foreground/70">
                      All data sourced directly from Rwanda Mining Board and REMA databases. Third-party data undergoes validation before publication.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Completeness</h3>
                    <p className="text-sm text-foreground/70">
                      All required fields must be populated before certificate activation. Missing optional fields are clearly indicated.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Timeliness</h3>
                    <p className="text-sm text-foreground/70">
                      Certification data updated within 24 hours of RMB approval. Real-time sync with regulatory databases.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Consistency</h3>
                    <p className="text-sm text-foreground/70">
                      Standardized naming conventions, date formats (ISO 8601), and enum values ensure cross-platform compatibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interoperability */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>Interoperability & Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  AfriTrace data is designed for seamless integration with global supply chain systems:
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>JSON API:</strong> RESTful endpoints for programmatic access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>CSV/Excel Export:</strong> Bulk data downloads for offline analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>EDI Compatibility:</strong> Supports Electronic Data Interchange standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Blockchain Integration:</strong> Optional tamper-proof ledger recording</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>RMI Compatibility:</strong> Data structure aligns with RMI CMRT templates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Security & Privacy */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Data Security & Privacy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data Encryption</p>
                      <p className="text-sm text-foreground/70">All data encrypted at rest (AES-256) and in transit (TLS 1.3)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Access Control</p>
                      <p className="text-sm text-foreground/70">Role-based permissions (citizen, administrator) with RLS policies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Audit Logging</p>
                      <p className="text-sm text-foreground/70">All data modifications tracked with timestamps and user attribution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Privacy Compliance</p>
                      <p className="text-sm text-foreground/70">Adherence to Rwanda Data Protection Law and Malabo Convention</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Versioning */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Data Versioning & Change Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  AfriTrace maintains backward compatibility while evolving data standards:
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li><strong>Current Version:</strong> v1.0 (Released January 2025)</li>
                  <li><strong>Deprecation Policy:</strong> Minimum 6-month notice before removing data fields</li>
                  <li><strong>API Versioning:</strong> Explicit version headers in all API requests</li>
                  <li><strong>Migration Support:</strong> Automated data transformation tools provided for version upgrades</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions About Data Standards?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  For inquiries about data formats, integration support, or to suggest improvements to our standards:
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Email:</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> +250 788 700 484
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default DataStandards;

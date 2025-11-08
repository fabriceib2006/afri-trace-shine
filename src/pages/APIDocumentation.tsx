import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Code, Database, Key, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const APIDocumentation = () => {
  return (
    <div className="min-h-screen flex flex-column">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Access AfriTrace mineral verification data programmatically
            </p>
          </div>

          <div className="grid gap-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  The AfriTrace API provides programmatic access to mineral certification data, enabling businesses and developers to integrate traceability verification into their supply chain systems. Our API follows RESTful principles and returns JSON-formatted responses.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-mono text-foreground">
                    Base URL: <span className="text-primary">https://api.afritrace.rw/v1</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="h-6 w-6 text-primary" />
                  <CardTitle>Authentication</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  All API requests require authentication using an API key. Contact our team at fabriceib2005@gmail.com to obtain your API credentials.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.afritrace.rw/v1/certificates/verify`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Endpoints */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-primary" />
                  <CardTitle>API Endpoints</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verify Certificate */}
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    POST /certificates/verify
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Verify a mineral certificate or batch code against REMA and ICGLR databases.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Request Body:</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "certificate_code": "MCIS-2024-001",
  "batch_code": "optional"
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Response:</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "status": "verified",
  "mineral_type": "Coltan",
  "origin": "Rulindo District",
  "mine_site": "Gatsibo Mine",
  "export_date": "2024-09-15",
  "verified_by_rema": true,
  "icglr_compliant": true,
  "certification_status": "Active"
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* List Certificates */}
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    GET /certificates
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Retrieve a paginated list of verified mineral certificates.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Query Parameters:</p>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li><code className="bg-muted px-2 py-1 rounded">page</code> - Page number (default: 1)</li>
                        <li><code className="bg-muted px-2 py-1 rounded">limit</code> - Results per page (default: 20, max: 100)</li>
                        <li><code className="bg-muted px-2 py-1 rounded">mineral_type</code> - Filter by mineral type</li>
                        <li><code className="bg-muted px-2 py-1 rounded">origin</code> - Filter by district/origin</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Example Request:</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`GET /certificates?page=1&limit=10&mineral_type=Coltan`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Feedback */}
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    POST /feedback
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Submit community feedback or environmental concerns (requires user authentication).
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Request Body:</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "title": "Water contamination concern",
  "category": "environmental",
  "description": "Detailed description...",
  "location": "Rulindo District"
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate Limits */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Rate Limits & Best Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Rate Limits</p>
                      <p className="text-sm text-foreground/70">1000 requests per hour per API key</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Data Caching</p>
                      <p className="text-sm text-foreground/70">Cache responses for 15 minutes minimum</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Batch Requests</p>
                      <p className="text-sm text-foreground/70">Use bulk endpoints for multiple verifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Error Handling</p>
                      <p className="text-sm text-foreground/70">Implement exponential backoff for 429 errors</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Codes */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <CardTitle>Error Codes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { code: "200", desc: "Success - Request completed successfully" },
                    { code: "400", desc: "Bad Request - Invalid parameters or malformed request" },
                    { code: "401", desc: "Unauthorized - Invalid or missing API key" },
                    { code: "404", desc: "Not Found - Certificate or resource does not exist" },
                    { code: "429", desc: "Too Many Requests - Rate limit exceeded" },
                    { code: "500", desc: "Server Error - Contact support if persistent" },
                  ].map((error) => (
                    <div key={error.code} className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <code className="font-mono font-bold text-lg text-foreground">{error.code}</code>
                      <p className="text-sm text-foreground/80">{error.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  For API access requests, technical support, or to report issues, contact our developer team:
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

export default APIDocumentation;

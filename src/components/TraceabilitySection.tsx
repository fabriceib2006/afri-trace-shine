import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, MapPin, Calendar, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import traceabilityBg from "@/assets/traceability-bg.jpg";

const TraceabilitySection = () => {
  const [batchCode, setBatchCode] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchCode.trim()) {
      toast.error("Please enter a batch or certificate code");
      return;
    }
    setShowResults(true);
    toast.success("Verification complete!");
  };

  return (
    <section id="verify" className="py-20 relative">
      <div className="absolute inset-0 opacity-5">
        <img
          src={traceabilityBg}
          alt="Blockchain network"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Mineral Traceability
            </h2>
            <p className="text-lg text-muted-foreground">
              Verify the origin and certification of minerals with blockchain-backed transparency
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Verify Batch or Certificate</CardTitle>
              <CardDescription>
                Enter a batch code or certificate number to view complete traceability data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="flex gap-3">
                <Input
                  type="text"
                  placeholder="e.g., RWA-TIN-2024-001234"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-trust hover:bg-trust/90">
                  <Search className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Verification Results */}
          {showResults && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-trust/50 shadow-lg">
                <CardHeader className="bg-trust/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <CheckCircle className="h-6 w-6 text-trust" />
                        Verified Mineral
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Batch Code: {batchCode || "RWA-TIN-2024-001234"}
                      </CardDescription>
                    </div>
                    <Badge className="bg-trust text-trust-foreground">Verified</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-muted-foreground">
                            Origin
                          </div>
                          <div className="font-medium">Gatsibo District, Rwanda</div>
                          <div className="text-sm text-muted-foreground">
                            Kabarore Mining Cooperative
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-muted-foreground">
                            Export Date
                          </div>
                          <div className="font-medium">March 15, 2024</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-muted-foreground">
                            Certifications
                          </div>
                          <div className="space-y-1">
                            <Badge variant="outline" className="mr-2">ITSCI Certified</Badge>
                            <Badge variant="outline" className="mr-2">RCS Compliant</Badge>
                            <Badge variant="outline">Conflict-Free</Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-sm text-muted-foreground mb-2">
                          Mineral Type
                        </div>
                        <div className="font-medium">Cassiterite (Tin Ore)</div>
                        <div className="text-sm text-muted-foreground">Weight: 2,450 kg</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="text-sm text-muted-foreground">
                      <strong>Blockchain Verification:</strong> This record is immutably stored
                      on the blockchain. Hash: 0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TraceabilitySection;

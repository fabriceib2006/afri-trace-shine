import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, MapPin, Calendar, Award, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CertificateData {
  batch_code: string;
  mineral_type: string;
  origin: string;
  mine_site: string;
  export_date: string;
  certification_status: string;
  verified_by_rema: boolean;
  icglr_compliant: boolean;
  blockchain_hash: string;
}

const TraceabilitySection = () => {
  const [batchCode, setBatchCode] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchCode.trim()) {
      toast.error("Please enter a batch code");
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase
      .from('mineral_certificates')
      .select('*')
      .eq('batch_code', batchCode.trim())
      .maybeSingle();
    
    setLoading(false);
    
    if (error) {
      toast.error("Error verifying certificate");
      return;
    }
    
    if (!data) {
      toast.error("⚠️ Certificate not found or not verified by REMA");
      setShowResults(false);
      setCertificateData(null);
      return;
    }
    
    setCertificateData(data);
    setShowResults(true);
    
    if (data.verified_by_rema && data.icglr_compliant) {
      toast.success("✅ Certificate verified successfully!");
    } else {
      toast.warning("⚠️ Certificate found but may have compliance issues");
    }
  };

  return (
    <section id="verify" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('traceability.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('traceability.subtitle')}
            </p>
          </div>

          {/* Search Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('traceability.batchCode')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="flex gap-4">
                <Input
                  type="text"
                  placeholder="e.g., MCIS-2024-RW-001 or REMA-2024-TIN-045"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                  <Search className="mr-2 h-4 w-4" />
                  {loading ? t('traceability.verifying') : t('traceability.verify')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {showResults && certificateData && (
            <Card className={certificateData.verified_by_rema && certificateData.icglr_compliant ? "border-green-500" : "border-yellow-500"}>
              <CardHeader>
                <CardTitle className={`flex items-center ${certificateData.verified_by_rema && certificateData.icglr_compliant ? 'text-green-600' : 'text-yellow-600'}`}>
                  {certificateData.verified_by_rema && certificateData.icglr_compliant ? (
                    <CheckCircle className="mr-2 h-5 w-5" />
                  ) : (
                    <AlertCircle className="mr-2 h-5 w-5" />
                  )}
                  Verification Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Origin</p>
                      <p className="text-sm text-muted-foreground">{certificateData.origin}</p>
                      <p className="text-sm text-muted-foreground">Mine: {certificateData.mine_site}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Export Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(certificateData.export_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Certifications</p>
                      <p className="text-sm text-muted-foreground">
                        {certificateData.verified_by_rema ? '✓' : '✗'} REMA Verified
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {certificateData.icglr_compliant ? '✓' : '✗'} ICGLR Compliant
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Mineral Type</p>
                      <p className="text-sm text-muted-foreground">{certificateData.mineral_type}</p>
                      <p className="text-sm text-muted-foreground">Status: {certificateData.certification_status}</p>
                    </div>
                  </div>
                </div>
                
                {certificateData.blockchain_hash && (
                  <div className="pt-4 border-t">
                    <p className="font-semibold mb-2">Blockchain Verification</p>
                    <p className="text-xs text-muted-foreground font-mono break-all bg-muted p-2 rounded">
                      {certificateData.blockchain_hash}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default TraceabilitySection;

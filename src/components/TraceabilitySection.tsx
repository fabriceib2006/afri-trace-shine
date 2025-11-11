import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, MapPin, Calendar, Award, AlertCircle, Building2, Globe } from "lucide-react";
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
  blockchain_hash: string | null;
  regional_systems?: {
    REMA: boolean;
    ICGLR: boolean;
    COMESA: boolean;
    AU: boolean;
  };
  company_id?: string;
  companies?: {
    name: string;
    registration_number: string;
    certification_status: string;
  };
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
      .select(`
        *,
        companies (
          name,
          registration_number,
          certification_status
        )
      `)
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
    
    setCertificateData(data as unknown as CertificateData);
    setShowResults(true);
    
    if (data.verified_by_rema && data.icglr_compliant) {
      toast.success("✅ Certificate verified successfully!");
    } else {
      toast.warning("⚠️ Certificate found but may have compliance issues");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-500',
      expired: 'bg-red-500',
      suspended: 'bg-yellow-500'
    };
    return statusColors[status] || 'bg-gray-500';
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
              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
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
            <div className="space-y-6">
              {/* Company Information Card */}
              {certificateData.companies && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="mr-2 h-5 w-5" />
                      {t('traceability.companyInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('traceability.companyName')}:</span>
                      <span className="text-sm text-muted-foreground">{certificateData.companies.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('traceability.regNumber')}:</span>
                      <span className="text-sm text-muted-foreground">{certificateData.companies.registration_number}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('traceability.companyStatus')}:</span>
                      <Badge className={getStatusBadge(certificateData.companies.certification_status)}>
                        {certificateData.companies.certification_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Regional Compliance Card */}
              {certificateData.regional_systems && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      {t('traceability.regionalSystems')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t('traceability.remaVerified')}</span>
                        <span className={certificateData.regional_systems.REMA ? 'text-green-600' : 'text-red-600'}>
                          {certificateData.regional_systems.REMA ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t('traceability.icglrCompliant')}</span>
                        <span className={certificateData.regional_systems.ICGLR ? 'text-green-600' : 'text-red-600'}>
                          {certificateData.regional_systems.ICGLR ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t('traceability.comesaApproved')}</span>
                        <span className={certificateData.regional_systems.COMESA ? 'text-green-600' : 'text-red-600'}>
                          {certificateData.regional_systems.COMESA ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t('traceability.auCertified')}</span>
                        <span className={certificateData.regional_systems.AU ? 'text-green-600' : 'text-red-600'}>
                          {certificateData.regional_systems.AU ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Certificate Details Card */}
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TraceabilitySection;
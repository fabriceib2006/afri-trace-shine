-- Create companies table for tracking registered mining companies
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  mine_location_lat DECIMAL(10, 8),
  mine_location_lng DECIMAL(11, 8),
  certification_status TEXT NOT NULL DEFAULT 'active',
  certification_start_date DATE NOT NULL,
  certification_end_date DATE NOT NULL,
  regional_compliance JSONB DEFAULT '{"REMA": false, "ICGLR": false, "COMESA": false, "AU": false}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on companies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Anyone can view active companies"
ON public.companies
FOR SELECT
USING (is_active = true OR has_role(auth.uid(), 'administrator'::app_role));

CREATE POLICY "Admins can insert companies"
ON public.companies
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'administrator'::app_role));

CREATE POLICY "Admins can update companies"
ON public.companies
FOR UPDATE
USING (has_role(auth.uid(), 'administrator'::app_role));

CREATE POLICY "Admins can delete companies"
ON public.companies
FOR DELETE
USING (has_role(auth.uid(), 'administrator'::app_role));

-- Add company_id to mineral_certificates
ALTER TABLE public.mineral_certificates
ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

-- Add regional compliance tracking to mineral_certificates
ALTER TABLE public.mineral_certificates
ADD COLUMN regional_systems JSONB DEFAULT '{"REMA": true, "ICGLR": false, "COMESA": false, "AU": false}'::jsonb;

-- Create trigger for companies updated_at
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for company lookups
CREATE INDEX idx_companies_registration_number ON public.companies(registration_number);
CREATE INDEX idx_companies_certification_status ON public.companies(certification_status);
CREATE INDEX idx_mineral_certificates_company_id ON public.mineral_certificates(company_id);

-- Admins can manage all users (view, update, delete)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'administrator'::app_role));

CREATE POLICY "Admins can delete profiles"
ON public.profiles
FOR DELETE
USING (has_role(auth.uid(), 'administrator'::app_role));
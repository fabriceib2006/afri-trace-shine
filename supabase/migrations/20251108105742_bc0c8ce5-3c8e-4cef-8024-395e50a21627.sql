-- Create OTP codes table for email verification
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert OTP codes (needed for signup flow)
CREATE POLICY "Anyone can insert OTP codes"
  ON public.otp_codes FOR INSERT
  WITH CHECK (true);

-- Policy: Users can view their own OTP codes
CREATE POLICY "Users can view own OTP codes"
  ON public.otp_codes FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Policy: Users can update their own OTP codes
CREATE POLICY "Users can update own OTP codes"
  ON public.otp_codes FOR UPDATE
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create index for performance
CREATE INDEX idx_otp_codes_email ON public.otp_codes(email);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Function to cleanup expired OTP codes
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.otp_codes WHERE expires_at < now();
END;
$$;
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('citizen', 'administrator');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create mineral_certificates table
CREATE TABLE public.mineral_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_code TEXT UNIQUE NOT NULL,
  mineral_type TEXT NOT NULL,
  origin TEXT NOT NULL,
  mine_site TEXT NOT NULL,
  export_date DATE NOT NULL,
  certification_status TEXT NOT NULL,
  verified_by_rema BOOLEAN DEFAULT true,
  icglr_compliant BOOLEAN DEFAULT true,
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on mineral_certificates
ALTER TABLE public.mineral_certificates ENABLE ROW LEVEL SECURITY;

-- Create feedback_reports table
CREATE TABLE public.feedback_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_response TEXT,
  admin_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on feedback_reports
ALTER TABLE public.feedback_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'administrator'));

-- Mineral certificates policies (public read)
CREATE POLICY "Anyone can view certificates"
  ON public.mineral_certificates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert certificates"
  ON public.mineral_certificates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can update certificates"
  ON public.mineral_certificates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'administrator'));

-- Feedback reports policies
CREATE POLICY "Users can view own feedback"
  ON public.feedback_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback"
  ON public.feedback_reports FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Users can insert own feedback"
  ON public.feedback_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update feedback"
  ON public.feedback_reports FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'administrator'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Assign default role as citizen
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'citizen');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply update timestamp triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON public.mineral_certificates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON public.feedback_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample mineral certificates for demo
INSERT INTO public.mineral_certificates (batch_code, mineral_type, origin, mine_site, export_date, certification_status, verified_by_rema, icglr_compliant, blockchain_hash)
VALUES
  ('MCIS-2024-RW-001', 'Coltan', 'Rulindo District, Northern Province', 'Rutongo Mining Site', '2024-03-15', 'Certified', true, true, '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385'),
  ('REMA-2024-TIN-045', 'Tin (Cassiterite)', 'Gatsibo District, Eastern Province', 'Gakoro Mine', '2024-02-20', 'Certified', true, true, '0x8a1bfde2d1e68b8bg77bc5fbe8afade2d1e68b8bg77bc5fbe8d3d3fc8c22b02496'),
  ('MCIS-2023-RW-089', 'Tungsten (Wolframite)', 'Nyagatare District', 'Nemba Mining Site', '2023-12-10', 'Certified', true, true, '0x9b2cgef3e2f79c9ch88cd6gcf9bgbef3e2f79c9ch88cd6gcf9e4e4gd9d33c13507');

-- Create updated_at function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create cases table
CREATE TABLE public.cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'قيد المراجعة',
  status_type TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_followups table
CREATE TABLE public.case_followups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  file_url TEXT,
  file_name TEXT,
  notes TEXT,
  submitted_to_authority BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_followups ENABLE ROW LEVEL SECURITY;

-- RLS policies for cases
CREATE POLICY "Users can view their own cases" ON public.cases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own cases" ON public.cases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cases" ON public.cases FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for case_followups
CREATE POLICY "Users can view their own followups" ON public.case_followups FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own followups" ON public.case_followups FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for followup files
INSERT INTO storage.buckets (id, name, public) VALUES ('case-followups', 'case-followups', false);

-- Storage policies
CREATE POLICY "Users can upload followup files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'case-followups' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their own followup files" ON storage.objects FOR SELECT USING (bucket_id = 'case-followups' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create updated_at trigger
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON public.cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
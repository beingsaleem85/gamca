-- SQL Schema for Gamca Centre Supabase Integration
-- Run this in your Supabase SQL Editor (https://app.supabase.com)

CREATE TABLE IF NOT EXISTS public.medical_token_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Appointment Information
    examination_country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    destination_country VARCHAR(100) NOT NULL,
    appointment_type VARCHAR(50) NOT NULL,
    preferred_appointment_date DATE NOT NULL,
    
    -- Candidate Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    marital_status VARCHAR(50) NOT NULL,
    
    -- Passport Information
    passport_number VARCHAR(50) NOT NULL,
    passport_issue_date DATE NOT NULL,
    passport_issue_place VARCHAR(100) NOT NULL,
    passport_expiry_date DATE NOT NULL,
    
    -- Visa / Employment Information
    visa_type VARCHAR(100) NOT NULL,
    position_applied VARCHAR(100) NOT NULL,
    other_position VARCHAR(100),
    
    -- Contact Information
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    national_id VARCHAR(50) NOT NULL,
    additional_information TEXT,
    
    -- Verification & Status
    payment_screenshot_path TEXT,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL
);

-- Index for fast lookup by application_id and passport_number
CREATE INDEX IF NOT EXISTS idx_requests_application_id ON public.medical_token_requests(application_id);
CREATE INDEX IF NOT EXISTS idx_requests_passport_number ON public.medical_token_requests(passport_number);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.medical_token_requests(status);

-- Storage bucket for screenshots (Optional if using Supabase Storage)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-screenshots', 'payment-screenshots', true)
ON CONFLICT (id) DO NOTHING;

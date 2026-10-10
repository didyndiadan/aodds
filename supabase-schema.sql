-- ============================================================
-- ApexOdds SaaS - Supabase Accounting & User Database Schema
-- Paste this script into your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles & Subscription Tiers
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'free_user' CHECK (role IN ('free_user', 'pro_subscriber', 'owner_admin')),
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'syndicate')),
  bankroll NUMERIC NOT NULL DEFAULT 2500.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Accounting & Financial Transactions (Crypto & Bank Wire)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  tx_hash_or_reference TEXT,
  status TEXT NOT NULL DEFAULT 'SUCCEEDED' CHECK (status IN ('SUCCEEDED', 'PENDING', 'FAILED', 'REFUNDED')),
  affiliate_code TEXT,
  affiliate_commission NUMERIC DEFAULT 0.00,
  net_revenue NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Affiliates & Rev-Share Partners
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  commission_rate_percent NUMERIC NOT NULL DEFAULT 30,
  clicks INTEGER DEFAULT 0,
  signups INTEGER DEFAULT 0,
  active_paid_subscribers INTEGER DEFAULT 0,
  total_earned NUMERIC DEFAULT 0.00,
  unpaid_balance NUMERIC DEFAULT 0.00,
  payout_method TEXT DEFAULT 'Crypto USDT (TRC-20)',
  payout_address TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row-Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo and client logging (customize for production)
CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated or anon insert to profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access to transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Allow insert access to transactions" ON public.transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access to affiliates" ON public.affiliates FOR SELECT USING (true);

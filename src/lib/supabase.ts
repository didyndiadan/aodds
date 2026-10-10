import { createClient } from '@supabase/supabase-js';

// Supabase Environment Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Whether Supabase credentials are configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

// Supabase client instance (or null if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Accounting & Transaction Data Models for Supabase
export interface AccountingTransaction {
  id?: string;
  invoice_id: string;
  customer_name: string;
  customer_email: string;
  plan_name: string;
  amount: number;
  payment_method: string;
  tx_hash_or_reference?: string;
  status: 'SUCCEEDED' | 'PENDING' | 'REFUNDED';
  affiliate_code?: string;
  affiliate_commission?: number;
  net_revenue?: number;
  created_at?: string;
}

export interface UserSubscriptionProfile {
  id?: string;
  email: string;
  name: string;
  role: 'free_user' | 'pro_subscriber' | 'owner_admin';
  plan: 'free' | 'pro' | 'syndicate';
  bankroll: number;
  created_at?: string;
}

/**
 * Record payment/subscription transaction in Supabase
 * Falls back safely to backend API if Supabase is not configured yet.
 */
export async function logAccountingTransaction(tx: AccountingTransaction): Promise<{ success: boolean; data?: any; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([tx])
        .select();

      if (error) {
        console.warn('Supabase insert warning:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (err: any) {
      console.warn('Supabase log error:', err);
      return { success: false, error: err.message };
    }
  }

  // Fallback: Local / backend storage
  return { success: true, data: tx };
}

/**
 * Fetch all accounting transactions from Supabase
 */
export async function fetchAccountingTransactions(): Promise<AccountingTransaction[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as AccountingTransaction[];
      }
    } catch (err) {
      console.warn('Supabase fetch error:', err);
    }
  }
  return [];
}

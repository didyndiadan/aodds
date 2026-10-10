import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address');
      return;
    }
    if (mode === 'register' && !name) {
      setError('Please enter your full name');
      return;
    }

    if (mode === 'login') {
      login(email);
    } else {
      register(name, email);
    }
    onClose();
  };

  const handleQuickDemo = (demoType: 'pro' | 'admin') => {
    if (demoType === 'admin') {
      login('founder.admin@apexodds.io', 'owner_admin');
    } else {
      login('pro.trader@apexodds.io', 'pro_subscriber');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Lock className="h-3 w-3" />
            <span>Secure 256-Bit Authentication</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Welcome Back to ApexOdds' : 'Create Your Pro Account'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access real-time arbitrage feeds and active portfolio logs'
              : 'Start your 7-day free trial with uncapped positive EV scans'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* 1-Click Demo Buttons (Founder / Pro User testing) */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-slate-400 text-center">
            INSTANT 1-CLICK DEMO ACCESS
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('pro')}
              className="py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Pro Member</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 font-semibold text-amber-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Platform Owner</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-xs my-2">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[11px] font-mono text-slate-500 uppercase">Or Continue with Email</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Mitchell"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email.')}
                  className="text-emerald-400 hover:text-emerald-300 text-[11px]"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg mt-4 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Sign In to Terminal' : 'Start 7-Day Free Trial'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          By signing in you agree to our Terms of Service & Privacy Policy. No credit card required for 7-day trial.
        </p>
      </div>
    </div>
  );
};

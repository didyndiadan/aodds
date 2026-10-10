import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  User,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LiveSupportWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('Odds Feeds & Setup Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);
  const [replyReceived, setReplyReceived] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/support/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || user?.name || 'Visitor',
          email: email || user?.email || 'visitor@apexodds.io',
          subject,
          category: 'Odds Feeds',
          message,
        }),
      });

      const data = await res.json();
      if (data.ticket) {
        setSubmittedTicket(data.ticket);
        setMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Poll for ticket updates / owner reply
  useEffect(() => {
    if (!submittedTicket) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/support/tickets');
        const data = await res.json();
        const found = data.tickets?.find((t: any) => t.id === submittedTicket.id);
        if (found) {
          setSubmittedTicket(found);
          const ownerMsg = found.messages?.find((m: any) => m.sender === 'owner_admin');
          if (ownerMsg) {
            setReplyReceived(ownerMsg.text);
          }
        }
      } catch (err) {
        // ignore
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [submittedTicket]);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 rounded-full shadow-2xl flex items-center gap-2.5 font-bold text-xs transition-all duration-200 hover:scale-105 cursor-pointer ring-4 ring-emerald-500/20"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="hidden sm:inline">Live Founder Support</span>
          <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
        </button>
      )}

      {/* Expanded Support Window */}
      {isOpen && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl w-84 sm:w-96 shadow-2xl overflow-hidden flex flex-col text-white animate-fadeIn">
          {/* Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">ApexOdds Support Desk</h4>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Founder & Tech Team Online (Avg reply: &lt;5 min)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Conversation or Inquiry Form */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
            {submittedTicket ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>TICKET #{submittedTicket.id}</span>
                    <span className="text-emerald-400 font-bold uppercase">{submittedTicket.status}</span>
                  </div>
                  <div className="font-semibold text-white">{submittedTicket.subject}</div>
                </div>

                {/* Message Threads */}
                <div className="space-y-2.5">
                  {submittedTicket.messages?.map((msg: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                        msg.sender === 'customer'
                          ? 'bg-slate-800 text-slate-200 ml-auto'
                          : 'bg-emerald-950 border border-emerald-500/30 text-emerald-200 mr-auto'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-400 mb-0.5 font-bold">
                        {msg.senderName} · {msg.timestamp}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  ))}
                </div>

                {/* Follow up message input */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!message.trim()) return;
                    await fetch('/api/support/reply', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        ticketId: submittedTicket.id,
                        replyText: message,
                      }),
                    });
                    setMessage('');
                  }}
                  className="flex gap-2 pt-2 border-t border-slate-800"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type follow up message..."
                    className="flex-1 bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-slate-300 text-xs leading-relaxed">
                  Have questions about bookmaker coverage, account safety, or API access? Message the founder directly:
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Odds Feeds & Setup Inquiry">Odds Feeds & Supported Sportsbooks</option>
                    <option value="Anti-Limiting Protection Questions">Anti-Limiting Protection Questions</option>
                    <option value="Billing & Subscription Plans">Billing & Subscription Plans</option>
                    <option value="Custom Syndicate API Access">Custom Syndicate API Access</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything about our real-time feeds, payout guarantees, or setup..."
                    className="w-full bg-slate-900 border border-slate-800 text-xs p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'Sending to Support...' : 'Send Live Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

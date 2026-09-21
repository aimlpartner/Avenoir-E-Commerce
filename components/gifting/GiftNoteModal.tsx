'use client';

import React, { useState } from 'react';
import { X, Feather, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GiftNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  senderName: string;
  message: string;
  onSave: (recipient: string, sender: string, message: string) => void;
}

export default function GiftNoteModal({
  isOpen,
  onClose,
  recipientName: initialRecipient,
  senderName: initialSender,
  message: initialMessage,
  onSave
}: GiftNoteModalProps) {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [sender, setSender] = useState(initialSender);
  const [msg, setMsg] = useState(initialMessage);

  const handleSave = () => {
    onSave(recipient.trim(), sender.trim(), msg.trim());
    onClose();
  };

  const handleClear = () => {
    setRecipient('');
    setSender('');
    setMsg('');
    onSave('', '', '');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Feather size={20} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Complimentary Handwritten Gift Note
                  </h3>
                  <p className="text-xs text-slate-500">
                    Penned on heavyweight cotton rag paper, folded in a gold-embossed envelope with a raw beeswax seal.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body: Inputs + Live Parchment Preview */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    To (Recipient Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    From (Your Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thomas &amp; Claire"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Personalized Message
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {msg.length} / 250 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={250}
                  placeholder="Wishing you warmth, sweet mornings, and gentle joy in every spoonful..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition leading-relaxed resize-none"
                />
              </div>

              {/* Live Preview Card */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/90 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between mb-3 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-700" />
                    Live Stationery Card Preview
                  </span>
                  <span className="text-[10px] text-amber-800/70 font-medium">Wax Seal Enclosed</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs font-serif text-slate-800 space-y-2 relative">
                  <div className="text-xs font-bold text-emerald-950 uppercase tracking-widest text-center border-b border-slate-100 pb-2">
                    Maison Avenoir · Apiary Note
                  </div>

                  <p className="text-xs font-semibold text-slate-600 italic">
                    Dearest {recipient || '[Recipient Name]'},
                  </p>

                  <p className="text-sm italic leading-relaxed text-slate-800 min-h-[40px]">
                    &quot;{msg || 'Wishing you radiant health and sweet rituals from our New Jersey apiaries.'}&quot;
                  </p>

                  <p className="text-xs font-semibold text-right text-slate-700 italic pt-2">
                    Warmly, {sender || '[Your Name]'}
                  </p>

                  {/* Wax Seal Graphic Badge */}
                  <div className="absolute -bottom-2 -left-2 w-7 h-7 rounded-full bg-amber-600 text-amber-100 flex items-center justify-center font-bold text-[10px] shadow-sm border border-amber-700">
                    A
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-stone-50/70 flex items-center justify-between gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition cursor-pointer"
              >
                Clear Note
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check size={14} />
                  <span>Save Note to Box</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

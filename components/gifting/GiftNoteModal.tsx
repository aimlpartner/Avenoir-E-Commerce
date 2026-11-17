'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from '@/components/BrandLogo';

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
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            className="relative w-full max-w-xl bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400 block mb-0.5">
                  Personalization
                </span>
                <h3 className="font-serif text-xl font-normal text-stone-900">
                  Calligraphy Gift Note
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md text-stone-400 hover:text-stone-700 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body: Inputs + Live Parchment Preview */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-500 mb-1.5">
                    To (Recipient)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-500 mb-1.5">
                    From (Sender)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thomas"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-500">
                    Message
                  </label>
                  <span className="text-[10px] font-mono text-stone-400">
                    {msg.length} / 250
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={250}
                  placeholder="Wishing you warmth and gentle joy in every spoonful..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full p-3.5 rounded-md border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition leading-relaxed resize-none font-serif"
                />
              </div>

              {/* Stationery Card Preview */}
              <div className="p-4 rounded-md bg-stone-50 border border-stone-200/80">
                <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 block mb-3">
                  Card Preview
                </span>

                <div className="bg-white p-5 rounded-sm border border-[#FB5601]/30 font-serif text-stone-800 space-y-2.5">
                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest text-[#D64500] uppercase border-b border-stone-100 pb-2.5">
                    <BrandLogo variant="mark" className="w-5 h-5" />
                    <span>Singing Bee · Wildflower Honey</span>
                  </div>

                  <p className="text-xs text-stone-500 italic">
                    Dearest {recipient || '[Recipient Name]'},
                  </p>

                  <p className="text-xs sm:text-sm italic leading-relaxed text-stone-800 min-h-[36px]">
                    &ldquo;{msg || 'Wishing you radiant health and sweet rituals from our New Jersey apiaries.'}&rdquo;
                  </p>

                  <p className="text-xs text-right text-stone-500 italic pt-1">
                    Warmly, {sender || '[Your Name]'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
              <button
                onClick={handleClear}
                className="text-xs text-stone-400 hover:text-stone-700 transition cursor-pointer font-mono"
              >
                Clear Note
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-50 transition cursor-pointer font-mono"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-md bg-[#15231A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#1E3326] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={13} />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


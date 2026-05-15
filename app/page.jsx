'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [status, setStatus] = useState({ connected: false, qr: null, aiEnabled: true });
  const [role, setRole] = useState("You are a friendly, professional and helpful personal assistant.");
  const [language, setLanguage] = useState("Hinglish");
  const [loading, setLoading] = useState(false);

  const languages = ["Hindi", "English", "Hinglish", "Gujarati"];

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    const res = await fetch('/api/status');
    const data = await res.json();
    setStatus(data);
  };

  const saveSettings = async () => {
    setLoading(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, language })
    });
    setLoading(false);
    alert('✅ Settings Saved Successfully!');
  };

  const toggleAI = async () => {
    await fetch('/api/toggle-ai', { method: 'POST' });
    fetchStatus();
  };

  return (
    <div className="min-h-screen p-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">🤖 Personal AI Agent</h1>
          <p className="text-slate-400">Professional WhatsApp Assistant</p>
        </div>

        <div className="glass rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">STATUS</p>
              <p className={`text-3xl font-semibold ${status.connected ? 'text-emerald-400' : 'text-amber-400'}`}>
                {status.connected ? '🟢 Connected' : '🟡 Waiting for QR'}
              </p>
            </div>
            <button 
              onClick={toggleAI}
              className={`px-8 py-3 rounded-2xl text-lg font-medium ${status.aiEnabled ? 'bg-emerald-600' : 'bg-red-600'}`}
            >
              AI: {status.aiEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {!status.connected && status.qr && (
          <div className="glass rounded-3xl p-12 mb-8 text-center">
            <h3 className="text-2xl mb-6">Scan QR Code to Connect WhatsApp</h3>
            <img src={status.qr} className="mx-auto rounded-2xl shadow-2xl" width={280} />
            <p className="mt-6 text-slate-400">WhatsApp → Linked Devices → Link a Device</p>
          </div>
        )}

        <div className="glass rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-8">Agent Configuration</h2>
          <div className="space-y-8">
            <div>
              <label className="block text-sm text-slate-400 mb-3">ROLE / PERSONALITY</label>
              <textarea 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-40 bg-slate-900 border border-slate-700 rounded-2xl p-5 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-3">LANGUAGE</label>
              <div className="flex flex-wrap gap-3">
                {languages.map(l => (
                  <button 
                    key={l} 
                    onClick={() => setLanguage(l)}
                    className={`px-8 py-4 rounded-2xl transition-all ${language === l ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={saveSettings} 
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-lg font-semibold hover:brightness-110 transition"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

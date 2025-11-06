import React, { useMemo, useState } from 'react';
import { AppWindow, Plus, X, RefreshCw, Package } from 'lucide-react';

const mockApps = [
  { package: 'com.android.chrome', label: 'Chrome', version: '119.0.0', system: false },
  { package: 'com.whatsapp', label: 'WhatsApp', version: '2.24.3', system: false },
  { package: 'com.android.settings', label: 'Settings', version: '14', system: true },
];

export default function AppManager({ selectedSerial }) {
  const [apps, setApps] = useState(mockApps);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return apps.filter(a => a.label.toLowerCase().includes(q) || a.package.toLowerCase().includes(q));
  }, [apps, query]);

  const refresh = async () => {
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setApps(mockApps);
    } finally {
      setBusy(false);
    }
  };

  const uninstall = async (pkg) => {
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setApps((prev) => prev.filter((a) => a.package !== pkg));
    } finally {
      setBusy(false);
    }
  };

  const install = async () => {
    if (!selectedSerial) return;
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setApps((prev) => [
        { package: 'com.example.newapp', label: 'New App', version: '1.0.0', system: false },
        ...prev,
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AppWindow className="w-5 h-5 text-slate-700" />
          <h2 className="font-semibold text-slate-800">App Manager</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} disabled={busy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-60">
            <RefreshCw className={`w-4 h-4 ${busy ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button onClick={install} disabled={!selectedSerial || busy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60">
            <Plus className="w-4 h-4" /> Install APK
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="relative">
          <Package className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari app atau package..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 px-3">Label</th>
              <th className="py-2 px-3">Package</th>
              <th className="py-2 px-3">Version</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.package} className="border-t border-slate-200">
                <td className="py-2 px-3 text-slate-800">{a.label}</td>
                <td className="py-2 px-3 font-mono">{a.package}</td>
                <td className="py-2 px-3">{a.version}</td>
                <td className="py-2 px-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${a.system ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {a.system ? 'System' : 'User'}
                  </span>
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => uninstall(a.package)}
                    disabled={busy || a.system}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-60"
                  >
                    <X className="w-4 h-4" /> Uninstall
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">Tidak ada aplikasi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

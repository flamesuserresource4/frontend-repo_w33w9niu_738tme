import React, { useState } from 'react';
import { Power, RotateCw, Terminal } from 'lucide-react';

export default function RebootControls({ selectedSerial }) {
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState([]);

  const send = async (type) => {
    if (!selectedSerial) {
      setLog((l) => [...l, 'Pilih perangkat terlebih dahulu.']);
      return;
    }
    setBusy(true);
    try {
      // Intended backend call: POST /adb/reboot or /fastboot/reboot
      await new Promise((r) => setTimeout(r, 600));
      setLog((l) => [...l, `${type.toUpperCase()} reboot terkirim ke ${selectedSerial}`]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Power className="w-5 h-5 text-slate-700" />
        <h2 className="font-semibold text-slate-800">Reboot</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => send('adb')}
          disabled={busy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          <RotateCw className="w-4 h-4" /> ADB Reboot
        </button>
        <button
          onClick={() => send('fastboot')}
          disabled={busy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-60"
        >
          <RotateCw className="w-4 h-4" /> Fastboot Reboot
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-slate-700 mb-2">
          <Terminal className="w-4 h-4" />
          <span className="text-sm font-medium">Log</span>
        </div>
        <div className="h-28 overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-700">
          {log.length === 0 ? (
            <div className="text-slate-400">Belum ada aktivitas.</div>
          ) : (
            log.map((l, i) => <div key={i}>• {l}</div>)
          )}
        </div>
      </div>
    </div>
  );
}

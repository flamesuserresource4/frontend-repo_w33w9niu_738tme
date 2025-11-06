import React, { useState } from 'react';
import { RefreshCw, Smartphone } from 'lucide-react';

const mockDevices = [
  { serial: 'emulator-5554', model: 'Pixel 6 Pro', state: 'device', android: '14' },
  { serial: 'ABCD1234', model: 'OnePlus 9', state: 'device', android: '13' },
];

export default function DeviceList({ onSelect }) {
  const [devices, setDevices] = useState(mockDevices);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const refresh = async () => {
    setLoading(true);
    try {
      // Placeholder for backend call: GET /adb/devices
      await new Promise((r) => setTimeout(r, 500));
      setDevices(mockDevices);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (d) => {
    setSelected(d.serial);
    if (onSelect) onSelect(d.serial);
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-slate-700" />
          <h2 className="font-semibold text-slate-800">Perangkat Tersambung</h2>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Muat Ulang
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 px-2">Serial</th>
              <th className="py-2 px-2">Model</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Android</th>
              <th className="py-2 px-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.serial} className={`border-t border-slate-200 ${selected === d.serial ? 'bg-slate-50' : ''}`}>
                <td className="py-2 px-2 font-mono text-slate-800">{d.serial}</td>
                <td className="py-2 px-2">{d.model}</td>
                <td className="py-2 px-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    {d.state}
                  </span>
                </td>
                <td className="py-2 px-2">{d.android}</td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => handleSelect(d)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${selected === d.serial ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'}`}
                  >
                    Pilih
                  </button>
                </td>
              </tr>
            ))}
            {devices.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">Tidak ada perangkat. Pastikan ADB aktif.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

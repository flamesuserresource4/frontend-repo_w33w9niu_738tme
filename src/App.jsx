import React, { useState } from 'react';
import DeviceList from './components/DeviceList.jsx';
import RebootControls from './components/RebootControls.jsx';
import FileManager from './components/FileManager.jsx';
import AppManager from './components/AppManager.jsx';
import { Rocket } from 'lucide-react';

export default function App() {
  const [selectedSerial, setSelectedSerial] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-indigo-600" />
            <h1 className="text-lg font-semibold text-slate-800">ADB & Fastboot Toolkit</h1>
          </div>
          <div className="text-sm text-slate-600">
            {selectedSerial ? (
              <span>
                Perangkat dipilih: <span className="font-mono font-medium text-slate-800">{selectedSerial}</span>
              </span>
            ) : (
              <span>Pilih perangkat untuk memulai</span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <DeviceList onSelect={setSelectedSerial} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RebootControls selectedSerial={selectedSerial} />
          <FileManager selectedSerial={selectedSerial} />
        </div>

        <AppManager selectedSerial={selectedSerial} />
      </main>

      <footer className="py-8 text-center text-xs text-slate-500">
        Dibuat untuk memudahkan manajemen perangkat Android melalui ADB & Fastboot.
      </footer>
    </div>
  );
}

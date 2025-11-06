import React, { useState } from 'react';
import { FolderOpen, Upload, Download, Trash2, ArrowLeft } from 'lucide-react';

// This is a frontend-only mock. In a full build, these actions would call backend endpoints.
const mockFs = {
  '/sdcard': ['DCIM', 'Download', 'Movies', 'Music', 'Pictures'],
  '/sdcard/Download': ['APK', 'notes.txt', 'photo.jpg'],
};

export default function FileManager({ selectedSerial }) {
  const [path, setPath] = useState('/sdcard');
  const [entries, setEntries] = useState(mockFs['/sdcard']);

  const enter = (name) => {
    const newPath = path + '/' + name;
    if (mockFs[newPath]) {
      setPath(newPath);
      setEntries(mockFs[newPath]);
    }
  };

  const up = () => {
    if (path === '/sdcard') return;
    const parent = path.split('/').slice(0, -1).join('/') || '/';
    setPath(parent);
    setEntries(mockFs[parent] || []);
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-slate-700" />
          <h2 className="font-semibold text-slate-800">File Manager</h2>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60" disabled={!selectedSerial}>
            <Upload className="w-4 h-4" /> Upload
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" disabled={!selectedSerial}>
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-white border border-rose-300 text-rose-700 hover:bg-rose-50" disabled={!selectedSerial}>
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button onClick={up} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div className="rounded-md border border-slate-200 overflow-hidden">
        <ul className="divide-y divide-slate-200 text-sm">
          {entries?.map((name) => (
            <li key={name} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50">
              <span className="cursor-pointer text-slate-800" onClick={() => enter(name)}>{name}</span>
              <span className="text-slate-400">{name.includes('.') ? 'File' : 'Folder'}</span>
            </li>
          ))}
          {!entries || entries.length === 0 ? (
            <li className="px-3 py-6 text-center text-slate-500">Kosong</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

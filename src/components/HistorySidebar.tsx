import React, { useState } from "react";
import { X, Search, Trash2, Calendar, Layout, Copy, Check } from "lucide-react";
import { CopywritingHistoryItem } from "../types";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CopywritingHistoryItem[];
  onSelectItem: (item: CopywritingHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export default function HistorySidebar({
  isOpen,
  onClose,
  items,
  onSelectItem,
  onDeleteItem,
  onClearAll,
}: HistorySidebarProps) {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.platform.toLowerCase().includes(search.toLowerCase()) ||
    item.result.headline.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyShortExcerpt = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md transform bg-white shadow-2xl flex flex-col h-full border-l border-slate-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Arsip Naskah Copywriting</h2>
              <p className="text-xs text-slate-400">Kembalikan atau salin naskah yang pernah Anda buat sebelumnya</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari produk, platform, judul..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-white border border-slate-200 pl-9 pr-4 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-shadow"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 px-4 h-full flex flex-col items-center justify-center">
                <Layout className="h-10 w-10 text-slate-300 stroke-[1.5] mb-3" />
                <p className="text-sm font-medium text-slate-600">Arsip tidak ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">Buat copywriting baru di form utama untuk menyimpannya.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group relative rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-500 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                      {item.platform}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleCopyShortExcerpt(e, item.result.mainCopy, item.id)}
                        className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        title="Salin Naskah"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        className="rounded-lg p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.result.headline || item.productName}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 italic">
                      "{item.productDescription}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xxs text-slate-400 border-t border-slate-100 pt-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.timestamp).toLocaleString("id-ID", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {item.framework}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">Total: {items.length} naskah</span>
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span>Kosongkan Semua</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Eye, 
  FileText, 
  Settings, 
  Lightbulb,
  Edit2,
  CheckCircle,
  Instagram,
  Facebook,
  Video,
  Mail,
  Globe,
  Search,
  ChevronDown,
  Trash2,
  RotateCcw,
  Heading,
  ArrowLeft
} from "lucide-react";
import { CopywritingResponse } from "../types";
import { downloadFile, generateMarkdownContent } from "../utils";

interface ResultDisplayProps {
  productName: string;
  framework: string;
  platform: string;
  response: CopywritingResponse;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onBackToForm: () => void;
}

export default function ResultDisplay({
  productName,
  framework,
  platform,
  response,
  onSaveToHistory,
  isSaved,
  onBackToForm,
}: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<"naskah" | "visual" | "tips">("naskah");
  const [isCopied, setIsCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // In-app Editor States
  const [editableHeadline, setEditableHeadline] = useState(response.headline);
  const [editableMainCopy, setEditableMainCopy] = useState(response.mainCopy);
  const [editableCTA, setEditableCTA] = useState(response.callToActions[0]);
  const [isEditing, setIsEditing] = useState(false);

  // Synchronise if backend returns new response
  useEffect(() => {
    setEditableHeadline(response.headline);
    setEditableMainCopy(response.mainCopy);
    setEditableCTA(response.callToActions[0] || "");
    setIsEditing(false);
  }, [response]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const handleCopyAll = () => {
    const fullText = 
`=== HEADLINE ===
${editableHeadline}

=== BUKAAN (HOOK) ===
${response.hooks.map((h, i) => `${i+1}. "${h}"`).join("\n")}

=== NASKAH COPYWRITING (Formula: ${framework}) ===
${editableMainCopy}

=== CALL TO ACTION (CTA) ===
- ${editableCTA}
${response.callToActions.slice(1).map(c => `- ${c}`).join("\n")}

=== HASHTAGS & SEO ===
${response.tags.join(" ")}

=== TIPS OPTIMASI ===
${response.tips}`;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(null as any), 2000);
  };

  const handleDownloadTXT = () => {
    const content = 
`NASKAH COPYWRITING: ${productName.toUpperCase()}
Platform Target: ${platform}
Formula: ${framework}
Gaya Bahasa: Aktif & Menarik

[HUDUL / HEADLINE]
${editableHeadline}

[ALTERNATIF COLD HOOK]
${response.hooks.join("\n")}

[NASKAH UTAMA]
${editableMainCopy}

[CALL TO ACTION]
${response.callToActions.join("\n")}

[TAGS / SEO]
${response.tags.join(" ")}

[TIPS PENGEMBANGAN]
${response.tips}

--
Dibuat otomatis oleh TulisinAI Pro.`;

    downloadFile(content, `TulisinAI_${productName.replace(/\s+/g, "_")}.txt`, "text/plain");
  };

  const handleDownloadMarkdown = () => {
    const customizedResponse: CopywritingResponse = {
      ...response,
      headline: editableHeadline,
      mainCopy: editableMainCopy,
      callToActions: [editableCTA, ...response.callToActions.slice(1)]
    };
    const content = generateMarkdownContent(productName, platform, framework, customizedResponse);
    downloadFile(content, `TulisinAI_${productName.replace(/\s+/g, "_")}.md`, "text/markdown");
  };

  // Counting logic
  const wordCount = editableMainCopy.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editableMainCopy.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {response.isDemo && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 text-xs font-bold flex items-center gap-2 border-b border-amber-600/30">
          <span className="text-sm">⚠️</span>
          <span>
            <strong>MODE SIMULASI AKTIF:</strong> Naskah di bawah adalah contoh draf terstruktur. Daftarkan email lisensi premium Anda di panel kiri untuk mencetak tak terbatas lewat AI Gemini asli!
          </span>
        </div>
      )}
      {/* Upper banner info */}
      <div className="bg-slate-900 text-slate-200 px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-indigo-400">
            Formula {framework} Berhasil Diterapkan
          </span>
          <h2 className="text-sm font-semibold mt-1 ml-0.5 text-white flex items-center gap-1.5">
            Hasil Naskah: <span className="text-indigo-300 font-bold">{productName}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Back to Form Custom Action */}
          <button
            onClick={onBackToForm}
            className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Buat Baru / Edit Form</span>
          </button>

          {/* Bookmark / Save to database indicator */}
          <button
            onClick={onSaveToHistory}
            className={`flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isSaved
                ? "bg-slate-800 text-slate-300 border border-slate-750 cursor-default"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/10 active:scale-95"
            }`}
          >
            <CheckCircle className={`h-4 w-4 ${isSaved ? "text-emerald-500" : "text-white"}`} />
            <span>{isSaved ? "Tersimpan di Riwayat" : "Simpan Naskah"}</span>
          </button>
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex border-b border-slate-100 bg-slate-50/70 p-1">
        <button
          onClick={() => setActiveTab("naskah")}
          className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "naskah"
              ? "bg-white text-indigo-700 shadow-xs ring-1 ring-slate-100"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Edit & Salin Naskah</span>
        </button>

        <button
          onClick={() => setActiveTab("visual")}
          className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "visual"
              ? "bg-white text-indigo-700 shadow-xs ring-1 ring-slate-100"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Eye className="h-4 w-4" />
          <span>Pratinjau Simulasi Visual</span>
        </button>

        <button
          onClick={() => setActiveTab("tips")}
          className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "tips"
              ? "bg-white text-indigo-700 shadow-xs ring-1 ring-slate-100"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Lightbulb className="h-4 w-4" />
          <span>Saran Taktis Jualan</span>
        </button>
      </div>

      {/* TAB CONTENT: COPYWRITING TEXT AND DIRECT INLINE WRITER */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "naskah" && (
          <div className="space-y-6">
            
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-indigo-50/30 rounded-xl px-4 py-3 border border-indigo-100">
              <div className="flex items-center gap-4 text-xs font-medium text-indigo-800">
                <span className="flex items-center gap-1">
                  📊 Karakter: <strong className="font-bold">{charCount}</strong>
                </span>
                <span className="flex items-center gap-1">
                  📝 Kata: <strong className="font-bold">{wordCount}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 shadow-xxs transition-colors cursor-pointer"
                >
                  <Edit2 className="h-3.4 w-3.4" />
                  <span>{isEditing ? "Selesai Mengedit" : "Sunting Manual"}</span>
                </button>
              </div>
            </div>

            {/* Direct Editable Box */}
            <div className="space-y-5">
              
              {/* HEADLINE SECTION */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block">
                    👑 Headline Utama (Penarik Perhatian)
                  </span>
                  <button
                    onClick={() => handleCopyText(editableHeadline, "headline")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-500 p-1 rounded border border-slate-100 h-6 w-6 flex items-center justify-center cursor-pointer"
                    title="Salin Headline"
                  >
                    {copiedItem === "headline" ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableHeadline}
                    onChange={(e) => setEditableHeadline(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500"
                  />
                ) : (
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {editableHeadline}
                  </h3>
                )}
              </div>

              {/* MAIN COPY BODY SECTION */}
              <div className="rounded-xl border border-slate-100 p-4.5 bg-slate-50/10 relative group">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block">
                    🚀 Naskah Copywriting Utama ({framework})
                  </span>
                  <button
                    onClick={() => handleCopyText(editableMainCopy, "main")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-500 p-1.5 rounded-lg border border-slate-200 h-8 w-8 flex items-center justify-center cursor-pointer"
                    title="Salin Naskah Utama"
                  >
                    {copiedItem === "main" ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    rows={12}
                    value={editableMainCopy}
                    onChange={(e) => setEditableMainCopy(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-mono text-slate-800 outline-none focus:border-indigo-500 whitespace-pre-wrap leading-relaxed"
                  />
                ) : (
                  <div className="text-sm text-slate-755 leading-relaxed whitespace-pre-line prose max-w-none">
                    {editableMainCopy}
                  </div>
                )}
              </div>

              {/* ALTERNATIVE HOOKS AND CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 3 COLD HOOOKS ALTERNATIVES */}
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block">
                    ⚡ 3 Variasi Kalimat Hook Pembuka
                  </span>
                  <div className="space-y-2">
                    {response.hooks.map((hook, idx) => (
                      <div
                        key={idx}
                        className="group/item flex items-start gap-2 bg-white border border-slate-100 p-2.5 rounded-lg text-xs"
                      >
                        <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-slate-700 flex-1 leading-normal italic">"{hook}"</p>
                        <button
                          onClick={() => handleCopyText(hook, `hook-${idx}`)}
                          className="opacity-0 group-hover/item:opacity-100 hover:bg-slate-50 p-1 rounded text-slate-400 shrink-0 cursor-pointer"
                          title="Salin Hook ini"
                        >
                          {copiedItem === `hook-${idx}` ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 CALL TO ACTIONS AND SOCIAL PROOFS */}
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block">
                    🎯 Alternatif CTA (Call To Action)
                  </span>
                  <div className="space-y-2">
                    {/* Primary CTA matches active simulation */}
                    <div className="group/item flex items-start gap-2 bg-white border border-indigo-100 ring-1 ring-indigo-50 p-2.5 rounded-lg text-xs">
                      <span className="text-sm shrink-0">🟢</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableCTA}
                          onChange={(e) => setEditableCTA(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs text-slate-800 outline-none"
                        />
                      ) : (
                        <p className="text-slate-800 font-bold flex-1 leading-normal">"{editableCTA}"</p>
                      )}
                      {!isEditing && (
                        <button
                          onClick={() => handleCopyText(editableCTA, "primary-cta")}
                          className="opacity-0 group-hover/item:opacity-100 hover:bg-slate-50 p-1 rounded text-slate-400 shrink-0 cursor-pointer"
                        >
                          {copiedItem === "primary-cta" ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                    {/* Other alternatives */}
                    {response.callToActions.slice(1).map((cta, idx) => (
                      <div
                        key={idx}
                        className="group/item flex items-start gap-2 bg-white border border-slate-100 p-2.5 rounded-lg text-xs"
                      >
                        <span className="text-sm shrink-0">⚪</span>
                        <p className="text-slate-600 flex-1 leading-normal">"{cta}"</p>
                        <button
                          onClick={() => handleCopyText(cta, `cta-${idx}`)}
                          className="opacity-0 group-hover/item:opacity-100 hover:bg-slate-50 p-1 rounded text-slate-400 shrink-0 cursor-pointer"
                        >
                          {copiedItem === `cta-${idx}` ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* HASHTAGS BAG */}
              {response.tags?.length > 0 && (
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/20">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block mb-2">
                    🏷️ Hashtag & Kata Kunci Terkait
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-lg bg-indigo-50 border border-indigo-100/30 px-2.5 py-1 text-xs font-medium text-indigo-700"
                      >
                        {tag.startsWith("#") ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB CONTENT: LIVE DIGITAL AD SIMULATOR */}
        {activeTab === "visual" && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-xs text-slate-500 font-medium text-center">
              Berikut simulasi interaktif bagaimana tulisan Anda dibaca oleh calon pembeli di media sosial:
            </p>

            {/* 📸 1. INSTAGRAM POST SIMULATOR */}
            {platform === "Instagram Caption" && (
              <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden text-slate-800">
                {/* Profile row */}
                <div className="flex items-center justify-between p-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-[1.5px] flex items-center justify-center">
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-indigo-600 border border-white">
                        UA
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 leading-none block">Usaha_Anda_Official</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Sponsor & Promosi</span>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold tracking-tight">•••</span>
                </div>

                {/* Simulated Image Post */}
                <div className="aspect-square w-full bg-gradient-to-br from-indigo-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
                  <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/25">
                    <Instagram className="h-3.5 w-3.5 text-white/70" />
                  </div>
                  {/* Subtle vector background */}
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-xl" />
                  <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-violet-600/15 blur-xl" />

                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-400 mb-2 font-mono">
                    Premium Quality
                  </span>
                  <h4 className="text-sm font-extrabold text-white tracking-tight leading-snug max-w-xs drop-shadow-sm px-2">
                    {editableHeadline}
                  </h4>
                  <div className="mt-5 rounded-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-[10px] font-bold text-white px-4 py-1.5 shadow-md shadow-indigo-950/20 active:scale-95">
                    {editableCTA || "Hubungi Kami"}
                  </div>
                </div>

                {/* Social icons */}
                <div className="p-3.5 flex items-center gap-4 text-slate-600 border-b border-slate-50">
                  <svg className="h-5 w-5 stroke-2 hover:text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <svg className="h-5 w-5 stroke-2 hover:text-slate-900 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <svg className="h-5 w-5 stroke-2 hover:text-slate-900 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 10.742l5.293-5.293a1 1 0 011.414 1.414l-5.293 2.9a1 1 0 01-1.414-1.021z M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </div>

                {/* Caption texts */}
                <div className="p-3.5 text-xs space-y-1 bg-slate-50/50">
                  <p className="leading-relaxed">
                    <span className="font-extrabold mr-1 text-slate-900">usaha_anda_official</span>
                    <span className="text-slate-700 whitespace-pre-wrap">{editableMainCopy.slice(0, 160)}...</span>
                  </p>
                  <span className="text-[10px] text-indigo-600 block pt-1.5 font-semibold cursor-pointer">
                    selengkapnya...
                  </span>
                </div>
              </div>
            )}

            {/* 📸 2. FACEBOOK SPONSORED ADS SIMULATOR */}
            {platform === "Facebook Ads" && (
              <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden text-slate-800 text-xs">
                {/* Header Profile */}
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-indigo-700">
                      FA
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Nama Toko Online Anda</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        Bersponsor · 🌐
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold">•••</span>
                </div>

                {/* Ad text - copywriting */}
                <div className="px-3.5 pb-3 pt-1 text-slate-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto border-b border-slate-100 bg-slate-50/20">
                  {editableMainCopy}
                </div>

                {/* Ad Banner representation */}
                <div className="aspect-[4/3] bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-850 p-4 flex flex-col justify-end text-white select-none relative overflow-hidden text-center">
                  <div className="absolute top-2.5 right-2.5 bg-black/30 px-2 py-0.5 rounded text-[8px] tracking-wide text-white uppercase font-mono">
                    Facebook Ads
                  </div>
                  <h4 className="text-xs font-black tracking-tight drop-shadow mb-2 px-1">
                    {editableHeadline}
                  </h4>
                </div>

                {/* CTA click bar */}
                <div className="bg-slate-100 px-4 py-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="max-w-[70%]">
                    <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">urlmu.com/promosi</p>
                    <p className="font-extrabold text-slate-850 truncate mt-0.5">{editableHeadline}</p>
                  </div>
                  <button className="bg-white border border-slate-350 hover:bg-slate-50 font-bold py-1.5 px-3 rounded text-[10px] text-slate-800 uppercase shadow-xxs transition-colors cursor-pointer shrink-0">
                    Beli Sekarang
                  </button>
                </div>
              </div>
            )}

            {/* 📸 3. TIKTOK SMART OVERLAY SIMULATOR */}
            {platform === "TikTok Script" && (
              <div className="w-full max-w-xs aspect-[9/16] rounded-3xl border-6 border-slate-800 bg-black shadow-xl overflow-hidden text-white flex flex-col justify-between relative select-none">
                {/* Overlay battery status bar */}
                <div className="flex justify-between items-center px-6 py-3.5 text-[10px] font-semibold text-white/50 z-10">
                  <span>9:41</span>
                  <div className="h-3 w-5 bg-white/20 rounded-xxs" />
                </div>

                {/* Simulated center visual overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 flex flex-col items-center justify-center p-6 text-center">
                  <Video className="h-10 w-10 text-pink-500 animate-pulse stroke-[1.5] mb-4" />
                  <span className="text-[10px] font-bold tracking-widest text-[#25f4ee] uppercase">NURULAN VIRAL</span>
                  <h4 className="text-sm font-black text-white px-2 mt-2 leading-relaxed max-w-[200px]">
                    {editableHeadline}
                  </h4>
                  <span className="text-[9px] text-white/60 font-mono mt-1.5">🎬 Format Video Vertikal</span>
                </div>

                {/* Right side engagement buttons */}
                <div className="absolute right-3.5 bottom-28 flex flex-col items-center gap-4.5 z-10">
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-9 bg-rose-500 rounded-full flex items-center justify-center shadow">❤️</div>
                    <span className="text-[10px] text-white/80 font-bold mt-1">45.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-9 bg-slate-800 rounded-full flex items-center justify-center shadow">💬</div>
                    <span className="text-[10px] text-white/80 font-bold mt-1">1.8K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-9 bg-slate-800 rounded-full flex items-center justify-center shadow">🔗</div>
                    <span className="text-[10px] text-white/80 font-bold mt-1">Share</span>
                  </div>
                </div>

                {/* Script dialog overlay at bottom */}
                <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 space-y-2 z-10">
                  <div className="text-left text-[11px] leading-relaxed max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 space-y-1.5 text-white/90 bg-black/40 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[#fe2c55] font-bold">[NASKAH VIDEO]</span>
                    <p className="whitespace-pre-wrap">{editableMainCopy}</p>
                  </div>
                  <div>
                    <span className="text-xs font-black">@bisnis_online_kreatif</span>
                    <p className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
                      <span>Sound Original</span>
                      <span className="animate-spin">💿</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 📸 4. EMAIL NEWSLETTER MOCKUP */}
            {platform === "Email Newsletter" && (
              <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden text-slate-800 text-xs">
                {/* Browser menu bar */}
                <div className="bg-slate-100 px-4 py-2 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="text-[9px] text-slate-400 font-mono ml-3">E-mail Promosi Berkonversi</span>
                </div>

                {/* Email details */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 w-16 text-right">Dari:</span>
                    <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-semibold">Toko Anda &lt;halo@bisnisanda.com&gt;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 w-16 text-right">Untuk:</span>
                    <span className="text-slate-700">pelanggan_setia@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-200/50">
                    <span className="font-bold text-slate-500 w-16 text-right mt-0.5">Subjek:</span>
                    <span className="text-slate-900 font-extrabold flex-1 leading-relaxed">📧 {editableHeadline}</span>
                  </div>
                </div>

                {/* Email body naskah */}
                <div className="p-5 leading-relaxed text-slate-700 whitespace-pre-wrap max-h-56 overflow-y-auto space-y-4 bg-white">
                  <p className="text-xs text-slate-400 font-mono pb-2.5 border-b border-slate-100">Halo [Nama Pelanggan],</p>
                  {editableMainCopy}
                  
                  {/* Big CTA clickable button representation */}
                  <div className="pt-4 pb-2 text-center">
                    <div className="inline-block bg-indigo-600 font-bold text-white px-6 py-2.5 rounded-lg shadow cursor-pointer active:scale-97">
                      {editableCTA || "Klik di Sini Sekarang"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 📸 5. LANDING PAGE HERO */}
            {platform === "Landing Page Copy" && (
              <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-slate-850">
                {/* Web frame */}
                <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="bg-white px-3 py-0.5 rounded border border-slate-250 text-[9px] font-mono text-slate-400 w-48 text-center truncate">
                    https://bisnisanda.com/promo
                  </span>
                  <div className="h-4 w-4 bg-slate-200 rounded-xxs" />
                </div>

                {/* Landing page landing view style */}
                <div className="p-6 text-center bg-gradient-to-tr from-indigo-50/40 via-white to-violet-50/40 space-y-4.5 py-12">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-[10px] font-extrabold text-indigo-700 tracking-wider uppercase">
                    Penawaran Spesial Berbatas Waktu
                  </span>
                  
                  <h1 className="text-lg font-black tracking-tight text-slate-900 leading-snug px-3">
                    {editableHeadline}
                  </h1>

                  <div className="max-w-xs mx-auto text-xs text-slate-600 line-clamp-4 leading-relaxed whitespace-pre-line text-center">
                    {editableMainCopy}
                  </div>

                  <div className="flex flex-col items-center gap-3.5 pt-4">
                    <button className="bg-gradient-to-r from-indigo-600 to-indigo-500 font-bold px-6 py-3 rounded-xl text-white text-xs shadow-md shadow-indigo-100 hover:brightness-105 cursor-pointer">
                      {editableCTA || "Mulai Sekarang"}
                    </button>
                    <span className="text-[9px] text-slate-400 flex items-center gap-1 justify-center leading-none">
                      🔒 Transaksi 100% Aman & Bergaransi Resmi
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 📸 6. GOOGLE SEARCH ADS MOCKUP */}
            {platform === "Google Search Ad" && (
              <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-md space-y-3.5 text-xs text-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block border-b border-slate-100 pb-1.5">💻 Hasil Pencarian Google Ad</span>
                
                {/* Search Header URL */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-extrabold text-slate-900 bg-slate-100 border border-slate-250 px-1 py-0.2 rounded text-[9px]">
                      Sponsor
                    </span>
                    <span className="text-slate-500 hover:underline cursor-pointer truncate">https://www.tokokamu.com</span>
                  </div>
                  
                  {/* Ad Title Blue Links */}
                  <h3 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                    {editableHeadline.slice(0, 30)} | {framework} Formula Resmi | Peluncuran 2026
                  </h3>
                </div>

                {/* Ad Description */}
                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                  {editableMainCopy.length > 160 ? `${editableMainCopy.slice(0, 160)}...` : editableMainCopy}
                </p>

                {/* Call Out Links Extensions */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[10px] text-[#1a0dab] font-semibold">
                  <span className="hover:underline cursor-pointer">➜ Diskon Peluncuran</span>
                  <span className="hover:underline cursor-pointer">➜ Konsultasi Gratis</span>
                  <span className="hover:underline cursor-pointer">➜ Garansi Kepuasan</span>
                  <span className="hover:underline cursor-pointer">➜ Hubungi CS 24/7</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB CONTENT: STRATEGIC TIPS & PROMOTION RULES */}
        {activeTab === "tips" && (
          <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <span className="text-2xl mt-0.5">💡</span>
              <div>
                <h4 className="text-xs font-bold text-indigo-900">Mengapa formula {framework} ini bekerja?</h4>
                <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                  Formula {framework} dirancang khusus untuk memandu proses berpikir pembeli secara psikologis dari belum tahu produk hingga rela mengeluarkan uang. Gemini telah menyesuaikan penulisan agar cocok dengan target audiens Anda.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50/10 space-y-4">
              <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider block border-b border-slate-100 pb-2.5">
                Cara Taktis Menggunakan Naskah Ini:
              </span>
              <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed prose max-w-none">
                {response.tips}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-150 text-xs shadow-xxs">
                <span className="font-bold text-slate-900 block mb-1">📅 Jadwal Penayangan</span>
                <p className="text-slate-500 leading-relaxed">
                  Pasang iklan atau post pada jam aktif audiens (biasanya 11:30 - 13:00 WIB siang atau 19:30 - 21:00 WIB malam) untuk mendongkrak visibilitas.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-150 text-xs text-slate-800 shadow-xxs">
                <span className="font-bold text-slate-900 block mb-1">🧪 Uji Coba Cepat (A/B Testing)</span>
                <p className="text-slate-500 leading-relaxed">
                  Coba pasangkan 3 kalimat hook yang dihasilkan AI ini dengan gambar produk yang berbeda untuk mencari mana rasio klik tertinggi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS WITH GENERAL EXPORTS */}
      <div className="border-t border-slate-100 bg-slate-50 p-4.5 flex flex-wrap gap-2.5 items-center justify-between">
        <button
          onClick={handleCopyAll}
          className={`px-5 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isCopied
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/10"
              : "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 active:scale-97"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Salin Seluruh Naskah</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* TXT downloader */}
          <button
            onClick={handleDownloadTXT}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer active:scale-97"
            title="Download sebagai TXT"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Unduh TXT</span>
          </button>

          {/* Markdown downloader */}
          <button
            onClick={handleDownloadMarkdown}
            className="bg-white hover:bg-slate-50 text-slate-755 border border-slate-200 py-3 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer active:scale-97"
            title="Download sebagai Markdown"
          >
            <FileText className="h-4 w-4 text-slate-500" />
            <span>Unduh Markdown</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Instagram,
  Facebook,
  Video,
  Mail,
  Globe,
  Search,
  MessageSquare,
  Users
} from "lucide-react";
import { 
  TONE_OPTIONS, 
  FRAMEWORK_OPTIONS, 
  PLATFORM_OPTIONS 
} from "../types";
import { PRODUCT_PRESETS, PresetProduct } from "../utils";

interface CopywritingFormProps {
  onSubmit: (data: {
    productName: string;
    productDescription: string;
    targetAudience: string;
    toneOfVoice: string;
    framework: string;
    platform: string;
    extraInstructions: string;
  }) => void;
  isLoading: boolean;
}

export default function CopywritingForm({ onSubmit, isLoading }: CopywritingFormProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState(TONE_OPTIONS[0].value);
  const [framework, setFramework] = useState(FRAMEWORK_OPTIONS[0].value);
  const [platform, setPlatform] = useState(PLATFORM_OPTIONS[0].value);
  const [extraInstructions, setExtraInstructions] = useState("");

  const handleApplyPreset = (preset: PresetProduct) => {
    setProductName(preset.name);
    setProductDescription(preset.description);
    setTargetAudience(preset.targetAudience);
    setToneOfVoice(preset.toneOfVoice);
    setFramework(preset.framework);
    setPlatform(preset.platform);
    setExtraInstructions(preset.extraInstructions);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !productDescription.trim()) return;

    onSubmit({
      productName,
      productDescription,
      targetAudience,
      toneOfVoice,
      framework,
      platform,
      extraInstructions
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8 bg-white/40 backdrop-blur-md">
      {/* 🚀 Preset Picker */}
      <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-5">
        <label className="text-xs font-semibold text-indigo-800 tracking-wider uppercase block mb-3">
          💡 Uji Coba Cepat dengan Produk Sampel
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRODUCT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="rounded-xl border border-indigo-100 bg-white p-3 hover:border-indigo-500 hover:shadow-xs hover:bg-indigo-50/10 text-left transition-all cursor-pointer active:scale-97 text-xs flex flex-col justify-between min-h-[70px]"
            >
              <span className="font-semibold text-slate-800 line-clamp-1">{preset.name}</span>
              <span className="text-[10px] text-indigo-600 font-mono mt-1 flex items-center justify-between">
                <span>{preset.platform}</span>
                <span>→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 📌 SEKSI 1: Detil Produk & Target Penonton */}
      <div className="space-y-5 bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
        <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />
          <h3 className="font-semibold text-slate-900 text-sm">Langkah 1: Profil Produk & Target Pembeli</h3>
        </div>

        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-xs font-medium text-slate-700 mb-1">
              Nama Produk / Layanan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Contoh: Mukena Silk Al-Husna, Serum Jerawat Glow, Jasa Audit Pajak"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDescription" className="block text-xs font-medium text-slate-700 mb-1">
              Kelebihan & Manfaat Utama Produk <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="productDescription"
              required
              rows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Jelaskan apa keunggulan produk Anda, mengapa penonton harus membeli, dan pain points apa saja yang dipecahkan oleh produk Anda..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Target Audience */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="targetAudience" className="block text-xs font-medium text-slate-700">
                Spesifikasi Target Audiens <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <div className="group relative">
                <HelpCircle className="h-4 w-4 text-slate-300 cursor-help" />
                <span className="pointer-events-none absolute bottom-full right-0 mb-1 w-48 rounded bg-slate-800 p-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 leading-normal">
                  Merinci demografi, hobi, profesi, atau ketakutan utama pembeli membantu Gemini menulis lebih akurat.
                </span>
              </div>
            </div>
            <input
              type="text"
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Ibu bekerja usia 28-35 tahun, pemula yang bingung melunasi hutang"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* 📌 SEKSI 2: Penyaluran & Strategi Formula */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-500" />
          <h3 className="font-semibold text-slate-900 text-sm">Langkah 2: Saluran Media & Formula Persuasif</h3>
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-3 tracking-wide uppercase">
            Platform Media Target
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {PLATFORM_OPTIONS.map((opt) => {
              const isActive = platform === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPlatform(opt.value)}
                  className={`flex flex-col rounded-xl border p-4 text-left transition-all cursor-pointer active:scale-98 ${
                    isActive
                      ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {opt.value === "Instagram Caption" && <Instagram className="h-4 w-4" />}
                      {opt.value === "Facebook Ads" && <Facebook className="h-4 w-4" />}
                      {opt.value === "TikTok Script" && <Video className="h-4 w-4" />}
                      {opt.value === "Email Newsletter" && <Mail className="h-4 w-4" />}
                      {opt.value === "Landing Page Copy" && <Globe className="h-4 w-4" />}
                      {opt.value === "Google Search Ad" && <Search className="h-4 w-4" />}
                    </div>
                    <span className={`text-xs font-bold ${isActive ? "text-indigo-900" : "text-slate-800"}`}>
                      {opt.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {opt.placeholder}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Copywriting Formula Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-3 tracking-wide uppercase">
            Formula / Framework Copywriting
          </label>
          <div className="space-y-2">
            {FRAMEWORK_OPTIONS.map((opt) => {
              const isActive = framework === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFramework(opt.value)}
                  className={`w-full flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "border-violet-600 bg-violet-50/30 ring-1 ring-violet-600"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-center h-4 mt-0.5 mr-3">
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      isActive ? "border-violet-600 bg-violet-600" : "border-slate-300"
                    }`}>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1 leading-normal">
                      {opt.description}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-600/90 block mt-1.5">
                      💡 {opt.example}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone of Voice Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-3 tracking-wide uppercase">
            Tone of Voice (Gaya Bahasa Nyawa Naskah)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TONE_OPTIONS.map((opt) => {
              const isActive = toneOfVoice === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setToneOfVoice(opt.value)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "border-pink-600 bg-pink-50/20 ring-1 ring-pink-600"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <span className="text-xl mt-0.5">{opt.emoji}</span>
                  <div>
                    <span className={`text-xs font-bold block ${isActive ? "text-pink-900" : "text-slate-800"}`}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block leading-normal">{opt.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 📌 SEKSI 3: Kustomisasi / Instruksi Khusus */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-pink-500" />
          <h3 className="font-semibold text-slate-900 text-sm">Langkah 3: Opsi & Instruksi Khusus</h3>
        </div>

        <div>
          <label htmlFor="extraInstructions" className="block text-xs font-medium text-slate-700 mb-1">
            Persyaratan Tambahan <span className="text-slate-400 font-normal">(Misal: Info Garansi, Kode Diskon, dsb)</span>
          </label>
          <input
            type="text"
            id="extraInstructions"
            value={extraInstructions}
            onChange={(e) => setExtraInstructions(e.target.value)}
            placeholder="Contoh: Berikan diskon khusus 'GAJIANTULIS', sebutkan pengiriman gratis ke Jabodetabek"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 🔮 Tombol Submit */}
      <button
        type="submit"
        disabled={isLoading || !productName.trim() || !productDescription.trim()}
        className={`w-full py-4.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm tracking-wide shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all ${
          isLoading
            ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
            : !productName.trim() || !productDescription.trim()
            ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-200"
        }`}
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            <span>Mempersiapkan Emosi Pembeli...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span>Hasilkan Naskah Copywriting Terbaik</span>
          </>
        )}
      </button>
    </form>
  );
}

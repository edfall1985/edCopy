import React, { useState } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  ArrowLeft,
  Instagram,
  Facebook,
  Video,
  Mail,
  Globe,
  Search,
  MessageSquare,
  Users,
  Check,
  CheckCircle2,
  ChevronRight,
  Info
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
  const [currentStep, setCurrentStep] = useState(1);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState(TONE_OPTIONS[0].value);
  const [framework, setFramework] = useState(FRAMEWORK_OPTIONS[0].value);
  const [platform, setPlatform] = useState(PLATFORM_OPTIONS[0].value);
  const [extraInstructions, setExtraInstructions] = useState("");
  const [notification, setNotification] = useState("");

  const handleApplyPreset = (preset: PresetProduct) => {
    setProductName(preset.name);
    setProductDescription(preset.description);
    setTargetAudience(preset.targetAudience);
    setToneOfVoice(preset.toneOfVoice);
    setFramework(preset.framework);
    setPlatform(preset.platform);
    setExtraInstructions(preset.extraInstructions);
    
    // Set informative notification
    setNotification(`✓ Sampel "${preset.name}" berhasil dimuat ke formulir!`);
    setTimeout(() => setNotification(""), 4000);
  };

  const isStep1Valid = productName.trim().length > 0 && productDescription.trim().length > 0;

  const handleNextStep = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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

  // Find label names for summary representation
  const activePlatformOption = PLATFORM_OPTIONS.find(opt => opt.value === platform);
  const activeFrameworkOption = FRAMEWORK_OPTIONS.find(opt => opt.value === framework);
  const activeToneOption = TONE_OPTIONS.find(opt => opt.value === toneOfVoice);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/40 backdrop-blur-md">
      
      {/* 📊 INDIKATOR PROGRES TAHAP INTEGRATIF */}
      <div className="bg-white/80 border border-slate-100/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Step 1 Node */}
        <button 
          type="button" 
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-3 w-full sm:w-auto text-left hover:opacity-90 transition-all cursor-pointer"
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            currentStep === 1
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 ring-4 ring-indigo-50"
              : isStep1Valid
              ? "bg-emerald-500 text-white"
              : "bg-slate-200 text-slate-500"
          }`}>
            {isStep1Valid && currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-none">Langkah 1</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Profil & Produk</p>
          </div>
        </button>

        <div className="hidden sm:block h-px bg-slate-100 flex-1 mx-2" />

        {/* Step 2 Node */}
        <button 
          type="button" 
          onClick={() => isStep1Valid && setCurrentStep(2)}
          disabled={!isStep1Valid}
          className={`flex items-center gap-3 w-full sm:w-auto text-left transition-all ${
            !isStep1Valid ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
          }`}
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            currentStep === 2
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 ring-4 ring-indigo-50"
              : currentStep > 2
              ? "bg-emerald-500 text-white"
              : "bg-slate-200 text-slate-500"
          }`}>
            {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-none">Langkah 2</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Media & Formula</p>
          </div>
        </button>

        <div className="hidden sm:block h-px bg-slate-100 flex-1 mx-2" />

        {/* Step 3 Node */}
        <button 
          type="button" 
          onClick={() => isStep1Valid && setCurrentStep(3)}
          disabled={!isStep1Valid}
          className={`flex items-center gap-3 w-full sm:w-auto text-left transition-all ${
            !isStep1Valid ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
          }`}
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            currentStep === 3
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 ring-4 ring-indigo-50"
              : "bg-slate-200 text-slate-500"
          }`}>
            3
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-none">Langkah 3</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Review & Eksekusi</p>
          </div>
        </button>
      </div>

      {/* 🔔 NOTIFIKASI MEMILIH PRESET */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200/50 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* TAHAP 1: PROFIL & PRODUK SAMPEL */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Preset Picker */}
          <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-5">
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-[11px] font-bold text-indigo-800 tracking-wider uppercase block leading-none">
                💡 Uji Coba Cepat dengan Produk Sampel
              </label>
              <span className="text-[10px] text-slate-400">
                Pilih salah satu sampel di bawah untuk mengisi formulir secara instan & melihat alur otomatis.
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {PRODUCT_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="rounded-xl border border-indigo-100 bg-white p-3 hover:border-indigo-500 hover:shadow-xs hover:bg-indigo-50/10 text-left transition-all cursor-pointer active:scale-97 text-xs flex flex-col justify-between min-h-[72px]"
                >
                  <span className="font-semibold text-slate-800 line-clamp-1">{preset.name}</span>
                  <span className="text-[10px] text-indigo-600 font-semibold mt-1 flex items-center justify-between">
                    <span>{preset.platform}</span>
                    <span>→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Utama Profil Produk */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              <h3 className="font-bold text-slate-900 text-sm">Langkah 1: Profil Produk & Target Pembeli</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-xs font-semibold text-slate-700 mb-1">
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

              <div>
                <label htmlFor="productDescription" className="block text-xs font-semibold text-slate-700 mb-1">
                  Kelebihan & Manfaat Utama Produk <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="productDescription"
                  required
                  rows={4}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Jelaskan apa keunggulan produk Anda, mengapa penonton harus membeli, dan masalah apa saja yang dipecahkan oleh produk Anda..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="targetAudience" className="block text-xs font-semibold text-slate-700">
                    Spesifikasi Target Audiens <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <div className="group relative">
                    <HelpCircle className="h-4 w-4 text-slate-300 cursor-help" />
                    <span className="pointer-events-none absolute bottom-full right-0 mb-1 w-48 rounded bg-slate-800 p-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 leading-normal">
                      Merinci demografi atau ketakutan utama pembeli membantu AI menulis naskah yang membidik tepat sasaran.
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

          {/* Navigasi Step 1 */}
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!isStep1Valid}
              onClick={handleNextStep}
              className={`py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                isStep1Valid
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Langkah Selanjutnya (Media & Formula)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAHAP 2: SALURAN MEDIA & FORMULA PERSUASIF */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              <h3 className="font-bold text-slate-900 text-sm">Langkah 2: Saluran Media & Formula Persuasif</h3>
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
                          ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600 shadow-xs"
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
                        <span className={`text-xs font-bold leading-none ${isActive ? "text-indigo-900" : "text-slate-800"}`}>
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
                Gaya Bahasa (Tone of Voice)
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

          {/* Navigasi Step 2 */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="py-3 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Langkah Selanjutnya (Review)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAHAP 3: REVIEW & EKSEKUSI NASKAH */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Opsi instruksi tambahan */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-50 pb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-pink-500" />
              <h3 className="font-bold text-slate-900 text-sm">Langkah 3: Opsi & Instruksi Tambahan</h3>
            </div>

            <div>
              <label htmlFor="extraInstructions" className="block text-xs font-semibold text-slate-700 mb-1">
                Persyaratan Tambahan <span className="text-slate-400 font-normal">(Misal: Info Garansi, Kode Diskon, dsb)</span>
              </label>
              <input
                type="text"
                id="extraInstructions"
                value={extraInstructions}
                onChange={(e) => setExtraInstructions(e.target.value)}
                placeholder="Contoh: Berikan diskon khusus 'GAJIANTULIS', sebutkan pengiriman gratis ke Jabodetabek"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* 💎 KOTAK REVIEW STRATEGI (BENTO VERAWAN) */}
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            {/* Background subtle art */}
            <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 h-44 w-44 rounded-full bg-indigo-800/40 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-300 animate-pulse" />
              <h4 className="text-xs font-bold tracking-widest text-indigo-200 uppercase">
                Ringkasan Pengaturan Copywriting Anda
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-3.5 border border-white/5">
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1.5">Nama Produk</p>
                <p className="text-xs font-bold font-sans line-clamp-1">{productName}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3.5 border border-white/5">
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1.5">Target Platform</p>
                <p className="text-xs font-bold font-sans flex items-center gap-1.5">
                  <span>{activePlatformOption?.value || platform}</span>
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-3.5 border border-white/5">
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1.5">Formula Penulisan</p>
                <p className="text-xs font-bold font-sans line-clamp-1">{activeFrameworkOption?.label || framework}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3.5 border border-white/5">
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1.5">Gaya Bahasa / Tone</p>
                <p className="text-xs font-bold font-sans flex items-center gap-1.5">
                  <span>{activeToneOption?.emoji}</span>
                  <span>{activeToneOption?.label || toneOfVoice}</span>
                </p>
              </div>
            </div>

            {targetAudience.trim() && (
              <div className="mt-3.5 bg-white/10 rounded-xl p-3.5 border border-white/5 grid grid-cols-1">
                <div>
                  <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1.5">Target Audiens Khusus</p>
                  <p className="text-xs text-slate-100 font-medium italic line-clamp-2">"{targetAudience}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigasi Step 3 & Submit */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading || !isStep1Valid}
              className={`w-full py-4.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm tracking-wide shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all ${
                isLoading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-505 hover:to-violet-500 text-white shadow-indigo-100/60"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  <span>Mempersiapkan Emosi Pembeli...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Hasilkan Naskah Copywriting Terbaik ✨</span>
                </>
              )}
            </button>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali Edit Formula</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

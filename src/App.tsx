import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Brain, 
  AlertCircle, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  Key,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import Header from "./components/Header";
import CopywritingForm from "./components/CopywritingForm";
import ResultDisplay from "./components/ResultDisplay";
import HistorySidebar from "./components/HistorySidebar";
import { CopywritingResponse, CopywritingHistoryItem } from "./types";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // High level copywriting states
  const [response, setResponse] = useState<CopywritingResponse | null>(null);
  const [activeParams, setActiveParams] = useState<{
    productName: string;
    productDescription: string;
    targetAudience: string;
    toneOfVoice: string;
    framework: string;
    platform: string;
    extraInstructions?: string;
  } | null>(null);

  // Saved bookmark status
  const [isSaved, setIsSaved] = useState(false);

  // User Authentication & Licensing State
  const [userEmail, setUserEmail] = useState(() => {
    const saved = localStorage.getItem("tulisin_user_email");
    if (!saved) {
      localStorage.setItem("tulisin_user_email", "edfall1985@gmail.com");
      return "edfall1985@gmail.com";
    }
    return saved;
  });
  const [licenseStatus, setLicenseStatus] = useState<"Loading" | "Premium" | "Free">("Loading");
  const [licenseName, setLicenseName] = useState("");

  // Periodically verify the email against database in users.json
  useEffect(() => {
    if (!userEmail.trim()) {
      setLicenseStatus("Free");
      setLicenseName("");
      return;
    }

    setLicenseStatus("Loading");
    const checkUser = async () => {
      try {
        const res = await fetch("/api/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.isRegistered) {
            setLicenseStatus("Premium");
            setLicenseName(data.name);
          } else {
            setLicenseStatus("Free");
            setLicenseName("");
          }
        } else {
          setLicenseStatus("Free");
        }
      } catch (err) {
        console.error("Failed verifying license in background:", err);
        setLicenseStatus("Free");
      }
    };

    const delayDebounce = setTimeout(checkUser, 400);
    return () => clearTimeout(delayDebounce);
  }, [userEmail]);

  const handleEmailChange = (val: string) => {
    setUserEmail(val);
    localStorage.setItem("tulisin_user_email", val);
  };

  // History list from localStorage representation
  const [history, setHistory] = useState<CopywritingHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // On page mount, retrieve local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tulisin_copywriting_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed loading history:", err);
    }
  }, []);

  // API submit request handler
  const handleFormSubmit = async (formData: {
    productName: string;
    productDescription: string;
    targetAudience: string;
    toneOfVoice: string;
    framework: string;
    platform: string;
    extraInstructions: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setIsSaved(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userEmail: userEmail }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghubungi mesin kecerdasan buatan.");
      }

      const parsedJSON: CopywritingResponse = await res.json();
      setResponse(parsedJSON);
      setActiveParams(formData);

      // Auto-save generated result immediately so users never lose drafts
      const newItem: CopywritingHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        productName: formData.productName,
        productDescription: formData.productDescription,
        targetAudience: formData.targetAudience,
        toneOfVoice: formData.toneOfVoice,
        framework: formData.framework,
        platform: formData.platform,
        extraInstructions: formData.extraInstructions,
        result: parsedJSON,
      };

      const updatedHistory = [newItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("tulisin_copywriting_history", JSON.stringify(updatedHistory));
      setIsSaved(true);

    } catch (err: any) {
      console.error("Generations failed error:", err);
      setError(err.message || "Gagal memproses naskah copywriting.");
    } finally {
      setIsLoading(false);
    }
  };

  // Bookmark manually triggers history state updates
  const handleManualSave = () => {
    if (!response || !activeParams || isSaved) return;

    const newItem: CopywritingHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      productName: activeParams.productName,
      productDescription: activeParams.productDescription,
      targetAudience: activeParams.targetAudience,
      toneOfVoice: activeParams.toneOfVoice,
      framework: activeParams.framework,
      platform: activeParams.platform,
      extraInstructions: activeParams.extraInstructions,
      result: response,
    };

    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("tulisin_copywriting_history", JSON.stringify(updatedHistory));
    setIsSaved(true);
  };

  // Toggle selected historical archive into currently active form/results layout
  const handleSelectHistoryItem = (item: CopywritingHistoryItem) => {
    setResponse(item.result);
    setActiveParams({
      productName: item.productName,
      productDescription: item.productDescription,
      targetAudience: item.targetAudience,
      toneOfVoice: item.toneOfVoice,
      framework: item.framework,
      platform: item.platform,
      extraInstructions: item.extraInstructions,
    });
    setIsSaved(true);
    setIsHistoryOpen(false);
    // Smooth scroll to top of page on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((x) => x.id !== id);
    setHistory(updated);
    localStorage.setItem("tulisin_copywriting_history", JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua arsip riwayat copywriting?")) {
      setHistory([]);
      localStorage.removeItem("tulisin_copywriting_history");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">
      
      {/* 🧭 Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* 🚀 Main Page Grid Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Motivasi Pemilik UKM & Pebisnis */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden mb-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-600/10 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/20 px-3 py-1 text-xs font-semibold text-indigo-200">
                ⭐ AI Copywriter Bisnis Online #1 Indonesia
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Naikkan Omzet Penjualan dengan Sekali Klik!
              </h1>
              <p className="text-sm text-indigo-100/90 leading-relaxed">
                Buat postingan media sosial, naskah video TikTok, email promo, hingga landing page yang 
                membuat calon pembeli tak kuasa menahan godaan klik dan memborong produk Anda.
              </p>
            </div>
            
            <div className="flex gap-4 border-t border-indigo-500/20 pt-4 md:pt-0 md:border-0 shrink-0">
              <div className="text-center bg-white/5 py-2 px-3.5 rounded-xl border border-white/10">
                <span className="text-xs text-indigo-300 block">Diterapkan</span>
                <span className="text-lg font-extrabold text-white">5 Formula</span>
              </div>
              <div className="text-center bg-white/5 py-2 px-3.5 rounded-xl border border-white/10">
                <span className="text-xs text-indigo-300 block">Platform</span>
                <span className="text-lg font-extrabold text-white">6 Saluran</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form and results columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Inputs form */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-20 space-y-5">
              
              {/* 🔑 PANEL LISENSI & HAK AKSES */}
              <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-50/50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Key className="h-4.5 w-4.5 text-indigo-600" />
                    <h3 className="font-extrabold text-slate-900 text-xs tracking-wide uppercase">Lisensi & Hak Akses</h3>
                  </div>
                  <div>
                    {licenseStatus === "Loading" ? (
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xxs font-semibold text-slate-500 ring-1 ring-inset ring-slate-600/10">
                        Memeriksa...
                      </span>
                    ) : licenseStatus === "Premium" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xxs font-extrabold text-emerald-700 ring-1 ring-inset ring-emerald-600/25">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        PREMIUM AKTIF
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xxs font-extrabold text-amber-700 ring-1 ring-inset ring-amber-600/25">
                        MODE SIMULASI
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="userEmailInput" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    Email Pengguna Terdaftar:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="userEmailInput"
                      value={userEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Masukkan email lisensi Anda..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                    <div className="absolute left-3.5 top-2.5 text-slate-400">
                      <UserCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {licenseStatus === "Premium" ? (
                  <p className="text-[11px] text-emerald-800 leading-relaxed bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/40">
                    Selamat, <strong>{licenseName || "Mitra Koperasi"}</strong>! Akun Anda terverifikasi di database. Anda memiliki akses tidak terbatas ke mesin pencetak naskah bertenaga <strong>AI Gemini 3.5 Asli</strong>.
                  </p>
                ) : (
                  <div className="text-[11px] text-amber-800 bg-amber-50/50 p-3 rounded-xl border border-amber-100/40 space-y-1.5 leading-relaxed">
                    <p>
                      ⚠️ Email ini tidak terdaftar dalam lisensi Pro. Generator akan menyajikan <strong>Naskah Simulasi Promo</strong> berkualitas tinggi sesuai parameter produk Anda.
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      💡 <em>Ingin mencoba mode premium? Gunakan email Anda <strong>edfall1985@gmail.com</strong> untuk uji coba instan!</em>
                    </p>
                  </div>
                )}
              </div>

              <CopywritingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* RIGHT SIDE: Generating Status or Copywriting Result Displays */}
          <div className="lg:col-span-7 h-full">
            {isLoading ? (
              <div className="bg-white rounded-2xl border border-slate-150 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[450px]">
                <div className="relative mb-6">
                  {/* Outer breathing circle */}
                  <div className="h-16 w-16 rounded-full bg-indigo-50 border-2 border-indigo-500 animate-ping absolute inset-0 opacity-40" />
                  {/* Central brain symbol */}
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white relative">
                    <Brain className="h-7 w-7 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-850">Sedang Memformulasikan Kata-Kata Mematikan</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                  Kecerdasan buatan Gemini sedang menganalisis target perilaku pembeli produk Anda, menerapkan formula terbaik, dan menyusun kalimat pembuka yang melipatgandakan kepuasan konversi.
                </p>
                <div className="mt-6 flex gap-2 justify-center">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-100" />
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-200" />
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-300" />
                </div>
              </div>
            ) : error ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-slate-800 shadow-xs flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-900">Gagal Menghasilkan Copywriting</h4>
                  <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
                </div>
              </div>
            ) : response && activeParams ? (
              <ResultDisplay
                productName={activeParams.productName}
                framework={activeParams.framework}
                platform={activeParams.platform}
                response={response}
                onSaveToHistory={handleManualSave}
                isSaved={isSaved}
              />
            ) : (
              // Onboard Idle Display
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-xs space-y-8 min-h-[450px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">Panduan Praktis Naikkan Konversi Bisnis</h3>
                  </div>

                  {/* 3 Value Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-755 text-xs">
                      <div className="font-extrabold text-indigo-700 mb-1 flex items-center gap-1">
                        🎯 Tepat Sasaran
                      </div>
                      <p className="text-slate-500 leading-normal">
                        Rincian target pembeli dibaca oleh AI untuk menentukan panggilan psikologis yang membujuk minat belanja.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-755 text-xs">
                      <div className="font-extrabold text-violet-700 mb-1 flex items-center gap-1">
                        ✨ Struktur Premium
                      </div>
                      <p className="text-slate-500 leading-normal">
                        Naskah dibagi menjadi Headline, Hook, Body Copy, dan CTA terpisah agar mudah untuk Anda kombinasikan.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-755 text-xs">
                      <div className="font-extrabold text-pink-700 mb-1 flex items-center gap-1">
                        👁️ Simulasi Visual
                      </div>
                      <p className="text-slate-500 leading-normal">
                        Tinjau langsung tampilan feed IG, post Facebook, naskah video pendamping, atau layout web dalam satu tempat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Educational guide list of Copywriting Formulas */}
                <div className="space-y-3.5 bg-slate-50/50 p-5 rounded-2xl border border-slate-150">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-500" />
                    Memahami Formula Copywriting yang Ada:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-extrabold">AIDA:</span>
                      <span>Menarik perhatian (Attention) hingga terjadi pembayaran instan (Action).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-extrabold">PAS:</span>
                      <span>Menggali masalah terdalam calon klien (Problem) lalu membongkar kepuasan solusinya (Solve).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-extrabold">BAB:</span>
                      <span>Membandingkan situasi sebelum sengsara (Before) dengan kondisi impian (After) lewat jembatan produk.</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center bg-indigo-50 border border-indigo-100/40 py-4.5 px-4 rounded-xl text-xs text-indigo-805 font-medium">
                  🚀 Silakan isi formulir di sebelah kiri atau pilih salah satu sampel uji coba cepat di atas untuk menghasilkan uang dari tulisan Anda!
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 🔮 History Sidebar Slider */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onSelectItem={handleSelectHistoryItem}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}

export interface CopywritingResponse {
  headline: string;
  hooks: string[];
  mainCopy: string;
  callToActions: string[];
  tags: string[];
  tips: string;
<<<<<<< HEAD
=======
  isDemo?: boolean;
>>>>>>> 1113efc39ea21a25514ca16b9ad4c12b464f04be
}

export interface CopywritingHistoryItem {
  id: string;
  timestamp: string;
  productName: string;
  productDescription: string;
  targetAudience: string;
  toneOfVoice: string;
  framework: string;
  platform: string;
  extraInstructions?: string;
  result: CopywritingResponse;
}

export interface ToneOption {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

export interface FrameworkOption {
  value: string;
  label: string;
  description: string;
  example: string;
}

export interface PlatformOption {
  value: string;
  label: string;
  icon: string;
  placeholder: string;
}

export const TONE_OPTIONS: ToneOption[] = [
  { value: "Persuasif", label: "Persuasif & Hipnotik", emoji: "🔥", description: "Membujuk secara psikologis untuk segera bertindak." },
  { value: "Profesional", label: "Profesional & Kredibel", emoji: "💼", description: "Fokus pada fakta, data, edukasi, dan terpercaya." },
  { value: "Eksklusif", label: "Eksklusif & Premium", emoji: "💎", description: "Bahasanya berkelas, elegan, menonjolkan nilai prestise." },
  { value: "Kasual & Gaul", label: "Kasual & Santai", emoji: "🗣️", description: "Akrab seperti berbicara dengan teman sebaya." },
  { value: "Humor & Menghibur", label: "Kreatif & Humor", emoji: "🎭", description: "Diselingi candaan cerdas untuk meningkatkan shareability." },
  { value: "Fear Of Missing Out (FOMO)", label: "Mendesak & FOMO", emoji: "⏳", description: "Fokus pada kelangkaan, batas waktu, dan urgensi tinggi." },
  { value: "Emosional", label: "Emosional & Humanis", emoji: "❤️", description: "Menyentuh empati dan perasaan terdalam pembaca." }
];

export const FRAMEWORK_OPTIONS: FrameworkOption[] = [
  { 
    value: "AIDA", 
    label: "AIDA (Attention, Interest, Desire, Action)", 
    description: "Tarik perhatian, buat tertarik, pancing hasrat emosi, lalu panggil tindakan beli.",
    example: "Terbaik untuk iklan berbayar (FB/IG Ads) dan Landing Page promo langsung."
  },
  { 
    value: "PAS", 
    label: "PAS (Problem, Agitate, Solve)", 
    description: "Tunjukkan problem pembaca, aduk/perparah emosi masalah tersebut, lalu hadirkan produkmu sebagai solusi satu-satunya.",
    example: "Terbaik untuk produk kesehatan, edukasi, jasa, dan video TikTok/Reels."
  },
  { 
    value: "FAB", 
    label: "FAB (Features, Advantages, Benefits)", 
    description: "Jabarkan fitur produk, jelaskan keunggulannya, dan terjemahkan menjadi keuntungan melimpah bagi pembeli.",
    example: "Terbaik untuk gadget, software, elektronik, dan deskripsi produk e-commerce."
  },
  { 
    value: "BAB", 
    label: "BAB (Before, After, Bridge)", 
    description: "Gambarkan situasi sulit klien saat ini (Before), imajinasikan kondisi sukses impian mereka (After), lalu tawarkan produkmu sebagai jembatannya (Bridge).",
    example: "Terbaik untuk kosmetik, suplemen pelangsing, kursus online, dan personal branding."
  },
  { 
    value: "Storytelling", 
    label: "Storytelling (Naratif & Kisah Nyata)", 
    description: "Bercerita secara empati dari sudut pandang tokoh yang berjuang hingga sukses berkat bantuan produk.",
    example: "Terbaik untuk konten organik, email marketing, personal brand story, dan konten viral."
  }
];

export const PLATFORM_OPTIONS: PlatformOption[] = [
  { value: "Instagram Caption", label: "Instagram Caption", icon: "Instagram", placeholder: "Caption feed/carousel/reels kekinian, rapi dengan emoji." },
  { value: "Facebook Ads", label: "Facebook Ads", icon: "Facebook", placeholder: "Iklan Facebook terstruktur dengan headline memikat & body menarik." },
  { value: "TikTok Script", label: "TikTok Video Script", icon: "Video", placeholder: "Naskah video pendek 15-60 detik lengkap dengan hook visual & audio." },
  { value: "Email Newsletter", label: "Email Newsletter", icon: "Mail", placeholder: "Subject email menggoda dengan isi bersahabat & berkonversi tinggi." },
  { value: "Landing Page Copy", label: "Landing Page Copy", icon: "Globe", placeholder: "Teks hero section, sub-headline, list benefit, dan elemen penutup website." },
  { value: "Google Search Ad", label: "Google Search Ads", icon: "SearchInput", placeholder: "Judul 30 karakter, Deskripsi 90 karakter berdaya saing tinggi." }
];

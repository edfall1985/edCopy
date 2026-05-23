import { CopywritingResponse } from "./types";

export interface PresetProduct {
  name: string;
  description: string;
  targetAudience: string;
  toneOfVoice: string;
  framework: string;
  platform: string;
  extraInstructions: string;
}

export const PRODUCT_PRESETS: PresetProduct[] = [
  {
    name: "GlowRadiance Acne Serum",
    description: "Serum jerawat dengan Tea Tree Oil dan Salicylic Acid 2%. Menyembuhkan jerawat dalam 7 hari tanpa bikin kulit kering. Lolos uji dermatologi, BPOM halal.",
    targetAudience: "Remaja dan Dewasa Muda (18-35 tahun) yang bermasalah dengan kulit berjerawat dan bekas hitam kemerahan.",
    toneOfVoice: "Kasual & Gaul",
    framework: "PAS",
    platform: "TikTok Script",
    extraInstructions: "Tekankan bahwa serum ini aman untuk kulit sensitif dan ada garansi uang kembali jika jerawat tidak reda dalam 14 hari."
  },
  {
    name: "Mukena Silk Premium Al-Husna",
    description: "Mukena berbahan serat sutra organik Jepang. Dingin, sangat lembut, dan muat di tas pouch sekecil HP. Dilengkapi sajadah wajah dan kemasan kotak kado mewah.",
    targetAudience: "Wanita muslimah modern usia 25-50 tahun yang sering berpergian / travel dan butuh mukena praktis namun mewah.",
    toneOfVoice: "Eksklusif",
    framework: "AIDA",
    platform: "Instagram Caption",
    extraInstructions: "Berikan diskon peluncuran 15% untuk 100 pembeli pertama. Sertakan emoji estetik Islami."
  },
  {
    name: "E-Course Jago Jualan Shopee",
    description: "Video tutorial langkah-demi-langkah optimasi toko Shopee dari nol hingga tembus 100 order per hari. Diajarkan langsung oleh praktisi terverifikasi.",
    targetAudience: "Ibu rumah tangga, karyawan ingin resign, dan pemilik toko online pemula yang orderannya sepi atau ingin scale up.",
    toneOfVoice: "Persuasif",
    framework: "BAB",
    platform: "Facebook Ads",
    extraInstructions: "Tawarkan bonus eksklusif 5 template foto produk instan jika mendaftar hari ini sebelum jam 12 malam."
  },
  {
    name: "Katering Sehat Diet KetoFit",
    description: "Katering makanan sehat harian rendah karbohidrat dan tinggi protein berkualitas. Menu dihitung gizinya oleh nutrisionis professional. Ongkir gratis.",
    targetAudience: "Pekerja kantoran sibuk, usia 25-45 tahun di perkotaan yang ingin menurunkan berat badan tanpa ribet masak sendiri.",
    toneOfVoice: "Emosional",
    framework: "PAS",
    platform: "Email Newsletter",
    extraInstructions: "Soroti masalah waktu yang terbatas bagi pekerja kantoran untuk menyiapkan diet sehat."
  }
];

export function getSimulationTemplate(
  productName: string,
  productDescription: string,
  framework: string,
  platform: string,
  toneOfVoice: string
): CopywritingResponse {
  return {
    isDemo: true,
    headline: `🎁 [MODE SIMULASI DEMO] Solusi Hebat untuk Meningkatkan Penjualan ${productName || "Bisnis Anda"}!`,
    hooks: [
      `Ingin ${productName || "produk Anda"} dikenal luas? Ini rahasia persuasifnya!`,
      `Kelebihan utama ${productName || "bisnis ini"} terletak pada solusinya yang tepat sasaran.`,
      `Fakta mengejutkan: 90% pebisnis gagal menarik pembeli karena salah memilih Hook promosi!`
    ],
    mainCopy: `⚠️ MODE SIMULASI DEMO AKTIF
(Sandi/Lisensi Anda belum terdaftar di database Premium TulisinAI Pro)

Berikut adalah simulasi naskah copywriting profesional yang disusun menggunakan formula ${framework} dan disesuaikan untuk platform ${platform} dengan nada bahasa ${toneOfVoice}:

[ATTENTION - MENCOLOK PERHATIAN]
Bagi Anda yang sedang merintis atau mengelola "${productName || "sebuah brand online"}", Anda pasti tahu betapa sulitnya bersaing memperebutkan perhatian pembeli di era digital ini. 

[INTEREST - MEMBANGKITKAN MINAT]
Manfaat utama dari produk Anda dideskripsikan sebagai: 
"${productDescription || "Produk berkualitas tinggi berdaya saing luar biasa."}"
Setiap kalimat di atas memiliki potensi omzet melimpah jika dikemas ke dalam bahasa hipnotik yang menyentuh masalah dan hasrat emosional terdalam calon konsumen.

[DESIRE - MEMANCING HASRAT EMOSIONAL]
Formula ${framework} membantu menstrukturkan kelebihan tersebut menjadi langkah logis: menanamkan urgensi, mematahkan keraguan, dan memberikan alasan mutlak mengapa mereka harus memesan dari Anda hari ini juga, bukan dari kompetitor sebelah!

[ACTION - PANGGILAN BERTINDAK SEGERA]
Untuk membuka fitur kecerdasan buatan Gemini asli secara tak terbatas dalam menyusun ribuan variasi tulisan ciamik, silakan masukkan Sandi Lisensi yang terdaftar di database premium pada panel kiri!`,
    callToActions: [
      `🛒 [DEMO] Klik ke Admin untuk Aktivasi Premium`,
      `👉 Dapatkan Template Naskah Lengkap & Original`,
      `📞 Hubungi Tim Registrasi TulisinAI`
    ],
    tags: ["#TulisinAIDemo", "#SolusiCopywriting", "#BebasMencoba", "#ScaleUpBisnis"],
    tips: `💡 [TIPS PREMIUM] Lisensi Premium terdaftar akan memanggil API kecerdasan buatan Gemini 3.5 secara langsung, menghasilkan copywriting unik 100% bebas plagiasi, rapi dengan penempatan emoji otomatis secara cerdas.`
  };
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateMarkdownContent(
  productName: string,
  platform: string,
  framework: string,
  res: CopywritingResponse
): string {
  return `# NASKAH COPYWRITING: ${productName.toUpperCase()}
*Buatan TulisinAI Pro pada ${new Date().toLocaleDateString("id-ID")}*

---
## 🎯 Informasi Kampanye
- **Nama Produk**: ${productName}
- **Platform**: ${platform}
- **Formula**: ${framework}

---
## 👑 Headline Utama
> **${res.headline}**

---
## ⚡ Alternatif Pembuka (Hooks)
${res.hooks.map((hook, idx) => `${idx + 1}. "${hook}"`).join("\n")}

---
## 🚀 Naskah Copywriting Utama
${res.mainCopy}

---
## 🎯 Alternatif Call-to-Action (CTA)
${res.callToActions.map((cta, idx) => `- [ ] "${cta}"`).join("\n")}

---
## 🏷️ Hashtags / Kata Kunci SEO
${res.tags.join(" ")}

---
## 💡 Tips Strategis Optimasi Konten
${res.tips}

---
*Dibuat menggunakan TulisinAI - Asisten Copywriter Bisnis Anda.*`;
}

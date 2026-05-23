import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Check Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY can be configured via Settings > Secrets.");
  }

  // Initialize Gemini API client lazily/safely
  const getGeminiClient = (customApiKey?: string) => {
    const keyToUse = customApiKey || process.env.GEMINI_API_KEY;
    if (!keyToUse) {
      throw new Error("Kunci API Gemini (GEMINI_API_KEY) belum dikonfigurasi. Silakan hubungi admin atau masukkan Kunci API Anda sendiri di panel kiri.");
    }
    return new GoogleGenAI({
      apiKey: keyToUse,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // Check if password/license key is in users.json
  const checkPasswordAccess = async (password: string) => {
    try {
      const usersFilePath = path.join(process.cwd(), "users.json");
      if (!fs.existsSync(usersFilePath)) {
        return { isRegistered: false, name: "", status: "Free" };
      }
      const data = await fs.promises.readFile(usersFilePath, "utf-8");
      const users = JSON.parse(data);
      if (!password || !password.trim()) {
        return { isRegistered: false, name: "", status: "Free" };
      }
      const user = users.find((u: any) => u.password && u.password.trim() === password.trim());
      if (user) {
        return { isRegistered: true, name: user.name, status: user.status || "Premium" };
      }
    } catch (err) {
      console.error("Error reading users.json database:", err);
    }
    return { isRegistered: false, name: "", status: "Free" };
  };

  // Helper function to return simulated template
  const getSimulationTemplate = (
    productName: string,
    productDescription: string,
    framework: string,
    platform: string,
    toneOfVoice: string
  ) => {
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
  };

  // API endpoint checking registration
  app.post("/api/check-user", async (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.json({ isRegistered: false, status: "Free", name: "" });
    }
    const check = await checkPasswordAccess(password);
    res.json(check);
  });

  // API endpoint for copywriting generation
  app.post("/api/generate", async (req, res) => {
    try {
      const {
        productName,
        productDescription,
        targetAudience,
        toneOfVoice,
        framework,
        platform,
        extraInstructions,
        password,
        customApiKey
      } = req.body;

      if (!productName || !productDescription) {
        return res.status(400).json({ error: "Nama produk dan deskripsi wajib diisi." });
      }

      // Check access permission
      const access = await checkPasswordAccess(password || "");
      const hasCustomApiKey = customApiKey && typeof customApiKey === "string" && customApiKey.trim().length > 10;
      
      if (!access.isRegistered && !hasCustomApiKey) {
        // Return Simulation template as requested
        const demoResult = getSimulationTemplate(
          productName,
          productDescription,
          framework || "AIDA",
          platform || "Instagram Caption",
          toneOfVoice || "Persuasif"
        );
        return res.json(demoResult);
      }

      const ai = getGeminiClient(customApiKey);

      const systemInstruction = 
        `Anda adalah seorang Copywriter Elit dan Ahli Digital Marketing Indonesia dengan pengalaman lebih dari 10 tahun dalam menaikkan konversi penjualan bisnis online.\n` +
        `Tugas Anda adalah memformulasikan naskah copywriting yang persuasif, hipnotik (membujuk psikologi), dan berorientasi konversi tinggi sesuai platform dan formula copywriting yang dipilih.\n` +
        `Anda WAJIB memberikan respon dalam format JSON sesuai dengan skema yang didefinisikan secara presisi. Gunakan bahasa Indonesia yang natural, sesuai dengan gaya bahasa (Tone of Voice) yang diinginkan pelanggan, tidak kaku, dan memiliki 'Hook' yang kuat.`;

      const prompt = 
        `Buatlah naskah copywriting berkonversi tinggi untuk produk/layanan ini:\n\n` +
        `- **Nama Produk/Layanan**: ${productName}\n` +
        `- **Deskripsi/Kelebihan Produk**: ${productDescription}\n` +
        `- **Target Audiens Terperinci**: ${targetAudience || 'Pengguna Umum / Fleksibel'}\n` +
        `- **Tone of Voice (Gaya Bahasa)**: ${toneOfVoice || 'Persuasif & Menarik'}\n` +
        `- **Formula Copywriting**: ${framework || 'AIDA'}\n` +
        `- **Platform / Format Target**: ${platform || 'Instagram Caption'}\n` +
        `- **Catatan Khusus/Instruksi Tambahan**: Sebutkan kelebihan produk, berikan emoji yang sesuai dengan platform, dan ikuti instruksi ini: ${extraInstructions || 'Tidak ada'}\n\n` +
        `PENTING: Terapkan formula ${framework} dengan struktur penulisan yang sangat baik dan mudah dibaca (gunakan line-break dan bullet points). Sertakan Call To Action (CTA) paling memikat pada bagian utama juga.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.82,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { 
                type: Type.STRING, 
                description: "Judul utama atau headline mematikan pencuri perhatian audiens dalam 2 detik pertama." 
              },
              hooks: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "3 variasi kalimat pemicu (Hook) pembuka alternatif." 
              },
              mainCopy: { 
                type: Type.STRING, 
                description: "Isi naskah copywriting utama menerapkan formula pilihan (AIDA, PAS, atau FAB) dalam format Markdown rapi dan persuasif." 
              },
              callToActions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "3 alternatif tombol/kalimat Call-to-Action (CTA) berkonversi tinggi." 
              },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "Ide Hashtags populer dan kata kunci SEO digital marketing." 
              },
              tips: { 
                type: Type.STRING, 
                description: "Tips taktis agar naskah ini mendapat jangkauan organik terbaik di platform." 
              }
            },
            required: ["headline", "hooks", "mainCopy", "callToActions", "tags", "tips"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Gagal menerima respons teks dari model Gemini.");
      }

      const parsedData = JSON.parse(text.trim());
      // Return with unregistered flag set to false
      res.json({ ...parsedData, isDemo: false });

    } catch (error: any) {
      console.error("Error generating copywriting:", error);
      res.status(500).json({ 
        error: error.message || "Terjadi kesalahan internal ketika memproses naskah Copywriting Anda." 
      });
    }
  });

  // Serve static UI or load Vite dev server
  const isProduction = process.env.NODE_ENV === "production" || process.env.APP_ENV === "production";
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serves compiled files in dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Copysmith Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();


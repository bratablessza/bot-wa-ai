# 🤖 Wabot - WhatsApp Bot powered by Ollama & Deepseek-R1

Ini adalah bot WhatsApp yang menggunakan [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) untuk integrasi WhatsApp dan [`Ollama`](https://ollama.com/) + model AI `deepseek-r1` untuk menjawab pertanyaan user secara kocak dan cerdas 😎

## 🚀 Fitur

- Scan QR untuk login ke WhatsApp Web
- Balas otomatis chat yang dimulai dengan `taktak:`
- Menggunakan model lokal `deepseek-r1` via Ollama
- Respons AI bisa lucu, santai, dan informatif
- Catch error kocak biar ga stress pas ngoding

## 🧑‍💻 Setup

1. Clone repo ini:
   ```bash
   git clone https://github.com/bratablessza/bot-wa-ai
   cd wabot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan Ollama (pastikan sudah install dan model sudah di-pull):
   ```bash
   ollama run deepseek-r1
   ```

4. Jalankan bot:
   ```bash
   npm start
   ```

5. Scan QR di terminal

## 📦 Struktur Utama

```
index.js          # Main entry point bot
package.json      # Dependencies & script
.gitignore        # File yang diabaikan Git
```

## 💬 Cara Pakai

Kirim chat ke bot:
```
taktak: siapa presiden pertama indonesia?
```

Maka AI akan menjawab secara santai tapi tetap berbobot 😄

## 📌 Catatan

- Jangan lupa pastikan Ollama jalan di `http://localhost:11434`
- Cek file `.session/` kalau mau reset login

## 📜 License

MIT – bebas pakai asal jangan disalahgunakan 🚫

---

> Dibuat dengan 💥 oleh Taktak & AI-nya.
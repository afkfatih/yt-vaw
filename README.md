# YouTube'dan WAV İndirme Aracı

YouTube videolarından ses dosyalarını WAV formatında indirmenizi sağlayan basit bir web uygulaması.

## 🌐 Canlı Demo

Bu uygulama GitHub Pages üzerinde çalışmaktadır:
**https://afkfatih.github.io/yt-vaw/**

## ✨ Özellikler

- 🎵 YouTube videolarından ses indirme
- 📦 WAV formatı desteği
- 🖥️ Tamamen tarayıcı tabanlı (sunucu gerektirmez)
- 📱 Mobil uyumlu tasarım
- 🚀 GitHub Pages ile ücretsiz barındırma

## 🚀 GitHub Pages Kurulumu

Bu proje GitHub Pages ile çalışacak şekilde yapılandırılmıştır. Kendi kopyanızı oluşturmak için:

1. Bu repository'yi fork edin
2. Repository ayarlarına gidin (Settings)
3. Sol menüden "Pages" seçeneğine tıklayın
4. "Source" bölümünden "Deploy from a branch" seçin
5. Branch olarak "main" ve klasör olarak "/ (root)" seçin
6. "Save" butonuna tıklayın
7. Birkaç dakika içinde siteniz `https://[kullaniciadi].github.io/yt-vaw/` adresinde yayında olacaktır

## 📁 Dosya Yapısı

```
├── index.html          # Ana sayfa (GitHub Pages için)
├── .nojekyll          # Jekyll işleme devre dışı bırakma
├── app.py             # Flask sunucusu (opsiyonel, yerel test için)
├── templates/         # Flask şablonları
│   └── index.html
└── requirements.txt   # Python bağımlılıkları (Flask için)
```

## 💻 Yerel Geliştirme

### Statik Sürüm (GitHub Pages ile aynı)

Basit bir HTTP sunucusu başlatın:

```bash
python3 -m http.server 8080
```

Tarayıcınızda `http://localhost:8080` adresini açın.

### Flask Sunucusu ile (Opsiyonel)

Flask sunucusunu kullanmak isterseniz:

```bash
pip install -r requirements.txt
python app.py
```

Tarayıcınızda `http://localhost:5000` adresini açın.

## 🔧 Nasıl Çalışır?

Uygulama, sunucu gerektirmeden tamamen tarayıcıda çalışır:

1. Kullanıcı bir YouTube linki girer
2. Uygulama, harici bir API (yt-download.org) kullanarak video bilgilerini alır
3. API, WAV formatında indirme linkini döndürür
4. Kullanıcı dosyayı indirebilir

## ⚠️ Önemli Notlar

- Bu araç yalnızca eğitim amaçlıdır
- Telif haklarına saygı gösterin
- Yalnızca izin verdiğiniz içerikleri indirin
- Harici API kullanıldığı için rate limit olabilir

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

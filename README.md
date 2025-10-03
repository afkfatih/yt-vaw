# YouTube'dan WAV İndirici

Bu proje, YouTube videolarını WAV formatında ses dosyası olarak indirmenizi sağlayan bir Flask web uygulamasıdır.

## Özellikler

- YouTube videolarını WAV formatında indirme
- Modern ve kullanıcı dostu arayüz
- Bootstrap 5 ile responsive tasarım
- Hata yönetimi ve kullanıcı bildirimleri
- Güvenli dosya indirme sistemi

## Gereksinimler

- Python 3.6+
- Flask
- yt-dlp

## Kurulum

1. Projeyi klonlayın veya indirin:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
```

3. FFmpeg'in sisteminizde yüklü olduğundan emin olun:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# macOS (Homebrew)
brew install ffmpeg

# Windows
# https://ffmpeg.org/download.html adresinden indirin
```

## Kullanım

1. Uygulamayı başlatın:
```bash
python app.py
```

2. Tarayıcınızda `http://localhost:5000` adresine gidin

3. YouTube video linkini girin ve "İndir" butonuna tıklayın

4. İndirme işlemi tamamlandıktan sonra WAV dosyasını indirin

## Proje Yapısı

```
├── app.py              # Ana Flask uygulaması
├── requirements.txt    # Python bağımlılıkları
├── templates/          # HTML şablonları
│   └── index.html      # Ana sayfa şablonu
├── downloads/          # İndirilen dosyalar (otomatik oluşturulur)
└── README.md          # Bu dosya
```

## API Endpoints

- `GET /` - Ana sayfa
- `POST /` - YouTube linki gönderme
- `GET /downloads/<filename>` - Dosya indirme

## Teknik Detaylar

- **Framework**: Flask
- **Video İndirme**: yt-dlp
- **Ses Formatı**: WAV (192 kbps)
- **Frontend**: Bootstrap 5
- **Dosya Yönetimi**: UUID ile benzersiz dosya isimleri

## Güvenlik Notları

- Telif haklarına dikkat edin
- Sadece izin verilen içerikleri indirin
- İndirilen dosyalar geçicidir ve sunucuda saklanır

## Sorun Giderme

### FFmpeg Hatası
Eğer FFmpeg bulunamadı hatası alıyorsanız, FFmpeg'in sistem PATH'inde olduğundan emin olun.

### İndirme Hatası
- YouTube linkinin geçerli olduğundan emin olun
- İnternet bağlantınızı kontrol edin
- Video'nun özel olmadığından emin olun

## Lisans

Bu proje eğitim amaçlıdır. Kullanımından doğacak sorumluluklar kullanıcıya aittir.

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun
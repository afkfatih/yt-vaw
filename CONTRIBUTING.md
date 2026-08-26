# Katkıda Bulunma Rehberi

Bu projeye katkıda bulunmak istediğiniz için teşekkürler! 🎉

## 🚀 Hızlı Başlangıç

1. **Fork** edin bu repository'yi
2. **Clone** edin fork ettiğiniz repository'yi
3. **Branch** oluşturun (`git checkout -b feature/amazing-feature`)
4. **Commit** yapın (`git commit -m 'Add amazing feature'`)
5. **Push** edin (`git push origin feature/amazing-feature`)
6. **Pull Request** açın

## 📝 Katkı Türleri

### 🐛 Bug Düzeltmeleri
- Hata raporları için **Issues** kullanın
- Düzeltme yaparken test edin
- Açıklayıcı commit mesajları yazın

### ✨ Yeni Özellikler
- Önce **Issue** açın ve tartışın
- Kod yazmadan önce planınızı paylaşın
- Dokümantasyonu güncelleyin

### 📚 Dokümantasyon
- README.md güncellemeleri
- Kod yorumları
- Kullanım kılavuzları

## 🛠️ Geliştirme Ortamı

### Gereksinimler
- Modern web tarayıcısı
- Git
- GitHub hesabı

### Yerel Test

Service Worker `file://` üzerinde çalışmaz, bir HTTP sunucusu gerekir:

```bash
python -m http.server 8000
# http://localhost:8000
```

1. Farklı YouTube link formatlarını test edin
2. Geçersiz ve YouTube dışı linkleri test edin
3. Mobil cihazlarda test edin

## 📋 Kod Standartları

### JavaScript
- ES6+ kullanın
- Açıklayıcı değişken isimleri
- Fonksiyon yorumları

### HTML/CSS
- Semantic HTML
- Responsive tasarım
- Bootstrap 5.3 kullanın

## 🧪 Test Etme

### Test Senaryoları
- [ ] `watch?v=`, `youtu.be`, `shorts`, `embed`, `live`, `/v/` formatları
- [ ] Oynatma listesi linki (açıklayıcı hata vermeli)
- [ ] YouTube dışı alan adı (reddedilmeli)
- [ ] Geçersiz uzunlukta video kimliği (reddedilmeli)
- [ ] Çevrimdışı açılış (Service Worker + Bootstrap precache)
- [ ] Mobil cihazlarda çalışma

### Test Linkleri
```
Geçerli:   https://www.youtube.com/watch?v=dQw4w9WgXcQ
Kısa:      https://youtu.be/dQw4w9WgXcQ
Shorts:    https://www.youtube.com/shorts/dQw4w9WgXcQ
Liste:     https://www.youtube.com/playlist?list=PLxxxxxx
Reddedilir: https://kotu-site.example/?x=youtube.com
```

## 📝 Commit Mesajları

### Format
```
type(scope): description

Örnek:
feat(api): add new download API
fix(ui): resolve mobile layout issue
docs(readme): update installation guide
```

### Türler
- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon
- `style`: Kod formatı
- `refactor`: Kod yeniden düzenleme
- `test`: Test ekleme
- `chore`: Build/deploy işlemleri

## 🎯 Öncelikli Alanlar

### Yüksek Öncelik
- [ ] Hata mesajlarının netleştirilmesi
- [ ] Erişilebilirlik (klavye navigasyonu, odak yönetimi)

### Orta Öncelik
- [ ] Dark mode
- [ ] İngilizce dil desteği
- [ ] Ek yt-dlp seçenekleri (altyazı, bölüm, zaman aralığı)

### Düşük Öncelik
- [ ] Oynatma listesi için toplu komut üretimi
- [ ] Komut ön ayarlarının yerel olarak saklanması

> Not: Üçüncü parti dönüştürücü servisleri bilinçli olarak kaldırıldı; geri
> eklenmesi önerilmiyor. Gerekçe için CHANGELOG 2.0.0'a bakın.

## 🤝 Davranış Kuralları

### Beklentiler
- Saygılı ve yapıcı olun
- Farklı görüşlere açık olun
- Öğrenmeye istekli olun

### Kabul Edilmeyen Davranışlar
- Saldırgan dil
- Spam
- Kişisel saldırılar
- Telif hakkı ihlali

## 📞 İletişim

- **Issues**: Bug raporları ve özellik istekleri
- **Discussions**: Genel tartışmalar
- **Pull Requests**: Kod katkıları

## 🙏 Teşekkürler

Bu projeye katkıda bulunan herkese teşekkürler! 

---

**Not**: Bu proje eğitim amaçlıdır. Lütfen telif haklarına saygı gösterin ve sadece izin verilen içerikleri indirin.
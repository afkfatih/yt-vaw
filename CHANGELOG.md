# Changelog

Bu dosya projedeki önemli değişiklikleri belgeler.
Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standardına uygundur,
sürümleme [Semantic Versioning](https://semver.org/spec/v2.0.0.html) kullanır.

## [2.0.0] - 2026-08-27

Uygulama üçüncü parti dönüştürücü yönlendiricisi olmaktan çıkıp yt-dlp komut
üreticisine dönüştü.

### Security
- **DOM XSS giderildi.** Ayrıştırılan video kimliği `innerHTML` şablonuna
  gömülüyordu; `v=%3Cimg%20src%3Dx%20onerror%3D…%3E` biçimli bir link script
  çalıştırabiliyordu. Tüm sonuç arayüzü artık DOM API'leri ve `textContent` ile
  kuruluyor.
- **Link doğrulaması sıkılaştırıldı.** Eski kontrol `url.includes('youtube.com')`
  idi ve `https://kotu-site.example/?x=youtube.com` adresini kabul ediyordu. Artık
  hostname bir izin listesiyle karşılaştırılıyor, video kimliği 11 karakterlik
  base64url desenine uymak zorunda.
- Bootstrap CDN bağlantısına `integrity` (SRI) ve `crossorigin` eklendi.

### Removed
- Vevioz, Y2Mate ve YT-Download yönlendirmeleri kaldırıldı. Doğrulandı:
  `api.vevioz.com` 404 dönüyor, `y2mate.com` DNS'te yok, `yt-download.org` reklam
  engelleyici tespit sayfasına yönlendiriyor.

### Added
- WAV / MP3 / video+ses için kopyalanabilir yt-dlp komutları.
- Video küçük resmi önizlemesi.
- `shorts`, `embed`, `live`, `/v/` yolları ile `music.youtube.com` ve
  `m.youtube.com` alt alan adları için link desteği.
- Oynatma listesi linki girildiğinde açıklayıcı hata mesajı.

### Fixed
- `manifest.json` içindeki `start_url` `/` idi; proje sitesi
  `/youtube-downloader/` altında yayınlandığı için PWA kapsamı hatalıydı.
  `./` olarak düzeltildi, `scope` ve `id` eklendi.
- `404.html` içindeki "Ana sayfaya dön" bağlantısı kullanıcıyı
  `afkfatih.github.io` köküne atıyordu.
- Service Worker varlıklar için saf cache-first çalışıyordu; bir kez önbelleğe
  alınan dosya asla tazelenmiyordu. Stale-while-revalidate'e geçildi.
- Bootstrap CSS precache edilmediği için "çevrimdışı çalışır" iddiası sayfayı
  stilsiz açıyordu. Artık precache ediliyor.
- `cache.addAll` tek bir URL'de başarısız olunca tüm precache iptal oluyordu;
  girişler tek tek ekleniyor.
- `touchcancel` dinlenmediği için iptal edilen dokunuşta buton küçülmüş kalıyordu.
- `user-select: none` tüm `body` üzerindeydi; sayfadaki hiçbir metin
  seçilemiyordu. Yalnızca butonlarla sınırlandırıldı.
- `user-scalable=no` kaldırıldı (erişilebilirlik).
- README'deki `your-username` / `yt-wav-downloader` yer tutucuları gerçek repo
  adresleriyle değiştirildi; canlı demo bağlantısı ve tüm rozetler artık çalışıyor.

## [1.0.0] - 2025-07-25

### Added
- İlk sürüm: Bootstrap tabanlı tek sayfalık arayüz, PWA desteği,
  üçüncü parti dönüştürücülere yönlendirme, MIT lisansı, issue/PR template'leri.

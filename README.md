# YouTube → yt-dlp Komut Üretici

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://afkfatih.github.io/youtube-downloader/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Enabled-blue)](https://web.dev/progressive-web-apps/)

YouTube linkini alır, video kimliğini çözer ve sesi **WAV / MP3** olarak indirmen için
kendi makinende çalıştıracağın hazır [yt-dlp](https://github.com/yt-dlp/yt-dlp)
komutunu üretir. Tek dosyalık statik sayfa, sunucu yok, izleme yok.

**→ [afkfatih.github.io/youtube-downloader](https://afkfatih.github.io/youtube-downloader/)**

## Neden komut üretiyor, indirmiyor?

GitHub Pages statik bir sunucudur; sunucu tarafında kod çalıştıramaz. YouTube da
tarayıcıdan gelen isteklere CORS başlığı vermez. Yani bir tarayıcı sayfası tek başına
ses akışını çekip WAV'a dönüştüremez — bunu yapan siteler kendi arka uç sunucularını
kullanır.

Bu sayfanın önceki sürümü kullanıcıyı üçüncü parti dönüştürücülere yönlendiriyordu.
Bugün itibarıyla o üç servisin ikisi tamamen ölü (`api.vevioz.com` → 404,
`y2mate.com` → DNS kaydı yok), üçüncüsü ise reklam engelleyici tespiti yapan bir
yönlendirme sayfası döndürüyor. Bu yüzden hepsi kaldırıldı: aracı yerine doğrudan
komut veriliyor.

## Kullanım

1. YouTube linkini yapıştır
2. **Komutu oluştur**'a bas
3. İstediğin formatın komutunu kopyala, terminalinde çalıştır

Üretilen komutlar:

| Format | Komut |
|---|---|
| WAV (kayıpsız) | `yt-dlp -x --audio-format wav '<url>'` |
| MP3 (en yüksek kalite) | `yt-dlp -x --audio-format mp3 --audio-quality 0 '<url>'` |
| Video + ses | `yt-dlp -f "bv*+ba/b" '<url>'` |

Gereksinimler: `pip install -U yt-dlp` ve ses dönüştürme için `ffmpeg`.

### Desteklenen link formatları

- `youtube.com/watch?v=ID`
- `youtu.be/ID`
- `youtube.com/shorts/ID`
- `youtube.com/embed/ID`
- `youtube.com/live/ID`
- `youtube.com/v/ID`
- `music.youtube.com` ve `m.youtube.com` alt alan adları

Doğrulama yalnızca **hostname** üzerinden yapılır ve video kimliği 11 karakterlik
base64url deseniyle eşleşmek zorundadır.

## Teknik detaylar

| Konu | Durum |
|---|---|
| Bağımlılık | Yok. Tek `index.html`, saf JavaScript |
| UI | Bootstrap 5.3, CDN'den SRI (`integrity`) doğrulamalı |
| PWA | Service Worker; Bootstrap CSS dahil precache — çevrimdışı **stilli** açılır |
| Cache stratejisi | Gezinmelerde network-first, varlıklarda stale-while-revalidate |
| Veri | Hiçbir istek sunucuya gitmez; link tarayıcıda ayrıştırılır |

## Yerel çalıştırma

Service Worker `file://` üzerinde çalışmaz, bir HTTP sunucusu gerekir:

```bash
git clone https://github.com/afkfatih/youtube-downloader.git
cd youtube-downloader
python -m http.server 8000
# http://localhost:8000
```

## Yasal uyarı

Bu depo bir indirme aracı barındırmaz; yalnızca yt-dlp komut satırı üretir.
YouTube'un hizmet şartları, izin verilmeyen içeriklerin indirilmesini kısıtlar.
Yalnızca **size ait olan**, açık lisanslı veya hak sahibinin indirilmesine izin
verdiği içerikleri indirin. Sorumluluk kullanıcıya aittir.

## Lisans

[MIT](LICENSE)

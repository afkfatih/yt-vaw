from flask import Flask, render_template, request, send_from_directory, redirect, url_for, flash
import os
import yt_dlp
import uuid
import time
import glob

app = Flask(__name__)
app.secret_key = 'supersecretkey'
DOWNLOAD_FOLDER = 'downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form.get('url')
        if not url:
            flash('Lütfen bir YouTube linki girin.', 'danger')
            return redirect(url_for('index'))
        unique_id = str(uuid.uuid4())
        output_path = os.path.join(DOWNLOAD_FOLDER, f'{unique_id}.wav')
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_path,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'writethumbnail': False,
            'writeinfojson': False,
            'ignoreerrors': False,
            'no_check_certificate': True,
            'extractor_retries': 3,
            'fragment_retries': 3,
            'retries': 3,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                # First, extract info to validate the video
                info = ydl.extract_info(url, download=False)
                if not info:
                    flash('Video bilgileri alınamadı. Lütfen geçerli bir YouTube linki girin.', 'danger')
                    return redirect(url_for('index'))
                
                # Check if video is available
                if info.get('is_live', False):
                    flash('Canlı yayınlar indirilemez.', 'danger')
                    return redirect(url_for('index'))
                
                # Download the video
                ydl.download([url])
                
                # Check if file was created
                if not os.path.exists(output_path):
                    flash('Video indirilemedi. Video özel veya kısıtlı olabilir.', 'danger')
                    return redirect(url_for('index'))
                
            return render_template('index.html', download_link=url_for('download_file', filename=f'{unique_id}.wav'))
        except yt_dlp.DownloadError as e:
            if 'Video unavailable' in str(e) or 'Private video' in str(e):
                flash('Video özel veya mevcut değil. Lütfen herkese açık bir video linki kullanın.', 'danger')
            elif 'Sign in to confirm your age' in str(e):
                flash('Bu video yaş sınırı nedeniyle indirilemez.', 'danger')
            else:
                flash(f'Video indirilemedi: {str(e)}', 'danger')
            return redirect(url_for('index'))
        except Exception as e:
            flash(f'Beklenmeyen hata oluştu: {str(e)}', 'danger')
            return redirect(url_for('index'))
    return render_template('index.html', download_link=None)

@app.route('/downloads/<filename>')
def download_file(filename):
    # Clean up old files (older than 1 hour)
    cleanup_old_files()
    
    file_path = os.path.join(DOWNLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)
    else:
        flash('Dosya bulunamadı veya süresi dolmuş.', 'danger')
        return redirect(url_for('index'))

def cleanup_old_files():
    """Remove files older than 1 hour"""
    current_time = time.time()
    for file_path in glob.glob(os.path.join(DOWNLOAD_FOLDER, '*.wav')):
        if os.path.getmtime(file_path) < current_time - 3600:  # 1 hour
            try:
                os.remove(file_path)
            except OSError:
                pass  # File might be in use

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
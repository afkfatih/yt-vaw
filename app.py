from flask import Flask, render_template, request, send_from_directory, redirect, url_for, flash
import os
import yt_dlp
import uuid

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
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            return render_template('index.html', download_link=url_for('download_file', filename=f'{unique_id}.wav'))
        except Exception as e:
            flash(f'Hata oluştu: {e}', 'danger')
            return redirect(url_for('index'))
    return render_template('index.html', download_link=None)

@app.route('/downloads/<filename>')
def download_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
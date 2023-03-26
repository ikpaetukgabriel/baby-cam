from flask import Flask, render_template, Response, jsonify
import random
import cv2

app = Flask(__name__)

camera = cv2.VideoCapture(0)


def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    # yield (b'Content-Type: image/jpeg\r\n\r\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/stats')
def stats():
    return render_template('stats.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get_flag_data')
def get_flag_data():
    # Generate a random flag value ('sound' or 'no sound')
    soundflag = random.randint(0, 99)
    motionflag = random.randint(0, 99)

    # Return the flag value as a JSON response
    print('Sound value: ' + str(soundflag))
    print('Motion value: ' + str(motionflag))

    return jsonify({'sound': soundflag, 'motion': motionflag})


if __name__ == '__main__':
    app.run(debug=True)

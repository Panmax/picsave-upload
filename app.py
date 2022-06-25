import imghdr
import boto3
import os
import string
import secrets

import flask
from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return flask.render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload_pic():
    data = request.get_data()
    if not data:
        return 'no data', 400

    # bucket, object_name = pick_bucket()
    bucket = "picsave"
    object_name = get_object_name(8)
    path = '/tmp/' + object_name
    f = open(path, 'wb')
    f.write(data)
    f.close()
    object_name = upload_file(path, bucket, object_name)
    if not object_name:
        return 'not pic', 400
    return 'https://picsave.pics/' + object_name


def upload_file(file_name, bucket, object_name):
    what = imghdr.what(file_name)
    if not what:
        return ''
    object_name += '.' + what

    # Upload the file
    s3 = boto3.resource('s3',
                        endpoint_url=os.environ.get('ENDPOINT_URL'),
                        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))
    bucket = s3.Bucket(bucket)
    bucket.upload_file(file_name, object_name, ExtraArgs={"ContentType": "image/" + what})

    return object_name


def get_object_name(length):
    return ''.join(secrets.choice(string.ascii_uppercase + string.ascii_lowercase) for i in range(length))


if __name__ == '__main__':
    app.run()

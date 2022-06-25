## picsave-upload

又一个图床平台。

[https://picsave.pics/](https://picsave.pics/)

### How to run

```shell
docker run -d --restart=always \
-e AWS_ACCESS_KEY_ID='AWS_ACCESS_KEY_ID' \
-e AWS_SECRET_ACCESS_KEY='AWS_SECRET_ACCESS_KEY' \
-e ENDPOINT_URL='ENDPOINT_URL' \
-e BUCKET='BUCKET' \
-e APP_URL_PREFIX='https://picsave.pics/' \
-p 5000:5000 \
--name picsave-upload \
panmax/picsave-upload
```
## picsave-upload

又一个图床平台。

[https://upload.picsave.pics/](https://upload.picsave.pics/)

### How to run

```shell
docker run -d --restart=always \
-e AWS_ACCESS_KEY_ID='AWS_ACCESS_KEY_ID' \
-e AWS_SECRET_ACCESS_KEY='AWS_SECRET_ACCESS_KEY' \
-e ENDPOINT_URL='ENDPOINT_URL' \
-p 5000:5000 \
--name picsave-upload \
panmax/picsave-upload
```
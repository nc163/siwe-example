# 関連記事

https://docs.login.xyz/

https://8thlight.com/blog/emmanuel-byrd/2022/06/09/sign-in-with-ethereum.html

eip6361

# db：migrate

`npx prisma migrate dev --name init`

# db:erd

エラーだったらこれ実行らしい https://github.com/puppeteer/puppeteer/issues/5891

```
sudo apt-get update
sudo apt-get install -y --fix-missing gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

# mongo

## インストール

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### libssl1.1
    
```bash
echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list
sudo apt-get update
sudo apt-get install libssl1.1
```

## サービス実行

```bash
sudo systemctl start mongod
```

## サービス自動起動

```bash
sudo systemctl enable mongod
```
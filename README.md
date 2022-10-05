# 関連記事

https://docs.login.xyz/

https://8thlight.com/blog/emmanuel-byrd/2022/06/09/sign-in-with-ethereum.html

eip6361

# db migrate

`npx prisma migrate dev --name init`

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
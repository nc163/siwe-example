# Sign in with Ethereum

- [Sign in with Ethereum](#sign-in-with-ethereum)
  - [概要](#概要)
  - [結論](#結論)
  - [手順](#手順)
- [setup](#setup)
  - [install](#install)
  - [run](#run)
- [関連記事](#関連記事)

## 概要
- パスワード認証を置き換えるウォレットを使ったサインイン方法、Sign in with Ethereum (SIWE)
- 仕様はEIP4361で検討されている


## 結論

- 良い点
  - WebサイトやAPIアクセスなどのUX
  - 例えばお金を払った分だけAPIを叩ける、NFTを持ってる人だけAPIを叩ける、みたいな作りをすることができそう
  - ID/PASSWORDの漏洩などによるセキュリティリスクがない

- 気になる点

  - 既存のID/PASSWORD認証と比べて匿名性は向上していないと思う
  - セッションを使うのはしょうがないけど、ウォレットの公開鍵を渡してログインすること自体がちょっと気になる
  - 例えばmetamaskで署名した後、metamaskのアカウントを切り替えるとバックエンド側から見ると同一人物だということがわかる

## 手順

1. ユーザーがウォレットを使ってサインインする
2. サーバーへアクセスしてランダムなnance値を取得する
3. siweの署名と、秘密鍵で暗号化したデジタル署名を送信する
4. サーバーは受信した公開鍵で、署名を複合して、検証する

![Image: image](doc/sequence.png)

# setup

## install
```bash
npm i
```

## run
``` bash
npm run dev
```






# 関連記事

https://docs.login.xyz/

https://8thlight.com/blog/emmanuel-byrd/2022/06/09/sign-in-with-ethereum.html

[Sign-In with Ethereum Example - wagmi](https://wagmi.sh/examples/sign-in-with-ethereum)

https://eips.ethereum.org/EIPS/eip-4361


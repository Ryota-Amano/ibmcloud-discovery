# IBM Cloud discovery便利ツール

## 1. collectionにある文書を全削除
仕様については下記リンクにあるQiitaの記事をご覧ください。

https://qiita.com/RyotaAmano/private/aca416e99d47ea3de800

またプログラムの使用については**自己責任**でお願いいたします。

### 使用方法
1. プログラムのクローン
```
git clone https://github.com/Ryota-Amano/ibmcloud-discovery.git
```
2. node_moduleのインストール
```
cd ibmcloud-discovery
npm i
```
3. tsファイルのコンパイルと実行
```
npm run build
```

### 実行例
`npm start`もしくは`npm run build`でプログラムを実行

① Discoveryの資格情報を入力

② 削除前に本当に削除してもいいかの確認メッセージ
　削除する場合は `y` 

![git説明](https://user-images.githubusercontent.com/61644554/101235062-68a76900-3708-11eb-9b65-59c4f5053a0b.png)

`Remaining number of executions`　残りの削除実行回数を示している

`Result: delete:100,error:0`　一度に削除した結果を示している

`deleted: 100/100`　削除数とCollectionにあったドキュメントの数を示している

### scriptについて
* `npm start`

  tscによってコンパイル後のjavascriptファイルを実行する

* `npm run build`

  distフォルダの初期化、tsファイルのコンパイル、javascriptファイルの実行

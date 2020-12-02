# IBM Cloud discovery便利ツール

## 1. collectionにある文書を全削除
仕様については下記リンクにあるQiitaの記事をご覧ください。

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

### scriptについて
* `npm start`

  tscによってコンパイル後のjavascriptファイルを実行する

* `npm run build`

  distフォルダの初期化、tsファイルのコンパイル、javascriptファイルの実行

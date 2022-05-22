# 概要
fmww-library-jsはAPIを公開していないSaaSをスクレイピングします。  
このソフトウェアを使うことによって、プログラムからSaaS機能へアクセス可能になります。

## 動機
増えすぎた日常業務を自動化する。

# 使用例
## Excelで商品マスタをダウンロードする例
 ```Javascript
const { FmClient, ProductMaintenance } = require('fmww-library');

const client = new FmClient();
await client
    .open(process.env.FMWW_SIGN_IN_URL)
    .signIn({
        FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
        FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
        FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
        FMWW_PASSWORD          : process.env.FMWW_PASSWORD
    })
    .createAbility(ProductMaintenance);
await client.search({
    saveTo: process.cwd(),
    barcode: '0000000000000'
});
await client.quit();
```
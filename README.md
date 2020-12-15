# tepco-billing-screenshot
東京電力エナジーパートナー 電気料金・ご使用量の確認(https://www.kenshin.tepco.co.jp/Certification) のフォームを入力しスナップショットを保存します

## 使用方法

```
- name: Take screenshot
  uses: cgetc/tepco-billing-screenshot@v2
  with:
    officeCode: 事業所コード
    visitNumber1: お客さま番号1
    visitNumber2: お客さま番号2
    visitNumber3: お客さま番号3
    visitNumber4: お客さま番号4
    zipCode1: 郵便番号1
    zipCode2: 郵便番号2
    prefecture: 都道府県
    city: 市区町村
    address1: 住所1
    address2: 住所2
    addressBanch: 番地
    addressGou: 号
    apartment: 建物名
    addressTou: 棟
    addressRoomNm: 部屋番号
    options: 区分。 一般の家庭の場合は1。会社・店舗の場合は0
    firstName: 姓(カタカナ)optionsが1のときのみ必須。
    lastName: 名(カタカナ)optionsが1のときのみ必須。
    companyName: 会社名(カタカナ)。optionsが０のときのみ必須。
    departmentName: 部署名(カタカナ)optionsが０のときのみ必須。
    phoneNumber1: 電話番号1
    phoneNumber2: 電話番号3
    phoneNumber3: 電話番号3
```

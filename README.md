# tepco-billing-screenshot
東京電力エナジーパートナー 電気料金・ご使用量の確認ページのフォームを入力し、結果のスクリーンショットを保存します。

毎月1日18時にスクリーンショットを添付して、指定した宛先にメールを送信します。

## 使用方法

リポジトリをForkして、以下をSecretsに登録してください。

実際に入力する値は https://www.kenshin.tepco.co.jp/Certification を参考にしてください。

|項目名| 内容 | 備考 |
|:--:|:--:|:--:|
|OFFICE_CODE| 事業所コード | |
|VISIT_NUMBER1| お客さま番号1 | |
|VISIT_NUMBER2| お客さま番号2 | |
|VISIT_NUMBER3| お客さま番号3 | |
|VISIT_NUMBER4| お客さま番号4 | |
|ZIP_CODE1| 郵便番号1 | |
|ZIP_CODE2| 郵便番号2 | |
|PREFECTURE| 都道府県名 | 選択肢の項目名(数値の値ではない) |
|CITY| 市区町村名 | 選択肢の項目名(数値の値ではない) |
|ADDRESS1| 住所1 | 選択肢の項目名(数値の値ではない) |
|ADDRESS2| 住所2 | 選択肢の項目名(数値の値ではない) |
|ADDRESS_BANCHI| 番地 | |
|ADDRESS_GOU| 号 | |
|ADDRESS_ROOM_NM| 部屋番号 | |
|OPTIONS| 区分 | 一般の家庭の場合は1。会社・店舗の場合は0 |
|FIRST_NAME| 姓 | 姓を全角カタカナで入力。区分が1の場合のみ必須 |
|LAST_NAME| 名 | 名を全角カタカナで入力。区分が1の場合のみ必須 |
|COMPANY_NAME| 会社名 | 会社名を全角カタカナで入力。区分が0の場合のみ必須 |
|DEPARTMENT_NAME| 部署名 | 部署名を全角カタカナで入力。区分が0の場合のみ必須 |
|PHONE_NUMBER1| 電話番号1 | 事業所コードがわからない場合。※未対応|
|PHONE_NUMBER2| 電話番号2 | 事業所コードがわからない場合。※未対応|
|PHONE_NUMBER3| 電話番号3 | 事業所コードがわからない場合。※未対応|
|MAIL_HOST| メールのSMTPホスト | Gmailの場合はsmtp.gmail.com |
|MAIL_USERNAME| メールのSMTPアカウント | |
|MAIL_PASSWORD| メールのSMTPパスワード | Gmailで二段階認証を有効にしている場合は[App Password](https://support.google.com/mail/answer/185833?hl=ja)を入力 |
|MAIL_TO| メールの宛先 | |
|MAIL_FROM| メールの送信元 | |

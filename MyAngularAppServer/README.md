# MyAngularApp Web API

Bu API uygulaması, bir deniz firmasının lojistik fiyat teklifi için yazılmıştır.

## Teknolojiler ve Paketler
- .Net 8.0
- EntityFrameworkCore
- FluentValidation
- JwtBearer

## Başlarken

Uygulamayı klonladıktan sonra çalıştırmak için, MyAngularAppServer katmanında bulunan `appsettings.json` dosyası içindeki SQL connection cümleciğini değiştirmeniz gerekmektedir.

<p float="left">
  <img src="https://github.com/halilck01/MyAngularApp/assets/122792022/54ac261c-6429-40d4-a506-a2aee9b3c78a" width="400" />
  <img src="https://github.com/halilck01/MyAngularApp/assets/122792022/b77add6f-3b70-41fe-a66a-c70994442cd5" width="400" /> 
</p>

Sonrasında Package Manager Console'da `update-database` komutunu çalıştırmalısınız.

## Endpoints

- **Auth**
  - Giriş yapma (kullanıcı adı veya email ve şifre ile)
- **Definition**
  - Tanımlamaları görüntüleme (GetNames)
  - Yeni tanımlama ekleme (AddName)
  - Tanımlamaları güncelleme (UpdateName)
  - Tanımlamaları silme (DeleteName)
- **Shipment**
  - Fiyat teklifini görüntüleme (GetShipment)
  - Yeni fiyat teklifi ekleme (AddShipment)
  - Fiyat teklifini güncelleme (UpdateShipment)
  - Fiyat teklifini silme (DeleteShipment)

<p float="left">
  <img src="https://github.com/halilck01/MyAngularApp/assets/122792022/3b4a442c-71d9-4bff-9711-cbc0d0dc1163" width="400" />
</p>
MyAngularApp Web API
Bu API uygulaması bir deniz firmasının lojistik fiyat teklifi için yazılmıştır.

Teknolojiler ve paketler
.Net 8.0
EntitiyFrameworkCore
FluentValidation
JwtBearer

Başlarken
Uygulamayı klonladıktan sonra çalıştırmak için MyAngularAppServer katmanında bulunan appsettings.json dosyası içindeki sql connection cümleciğini değiştirmeniz gerekmektedir.

![MyAngularAppServer4](https://github.com/halilck01/MyAngularApp/assets/122792022/54ac261c-6429-40d4-a506-a2aee9b3c78a)
![MyAngularAppServer5](https://github.com/halilck01/MyAngularApp/assets/122792022/b77add6f-3b70-41fe-a66a-c70994442cd5)

Sonrasında Package Manager Console’da update-database komutunu çalıştırmalısınız.

Endpoints
Giriş (Auth), Tanımlamalar (Defination) ve Sipariş Teklifi (Shipment) için ayrı endpointler oluşturulmuştur. Sisteme kullanıcı adı veya email ve şifre ile giriş yapabilirsiniz (Auth). Sisteminize kaydettiğiniz tanımlamaları görüntüleyebilir (GetNames), yeni tanımlama ekleyebilir (AddName), tanımlamaları güncelleyebilir (UpdateName) ve tanımlamaları silebilirsiniz (DeleteName). Sisteminize kaydettiğiniz fiyat teklifini görüntüleyebilir (GetShipment), yeni fiyat teklifi ekleyebilir (AddShipment), güncelleyebilir (UpdateShipment) ve silebilirsiniz (DeleteShipment).

Endpointler Yeni döviz eklemek için, enpoint'de bulunan name alanına kendi belirlediğiniz ismi koymalı, attribute name alanını doldurabilmek için ise www.kur.doviz.com sitesine gitmeli ve dövizin kısa kodunu büyük harfler ile yazmalısınız.

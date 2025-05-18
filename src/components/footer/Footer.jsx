import React from "react";
import "./Footer.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Footer() {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  const showingText = () => {
    switch (showing) {
      case "privacy":
        return (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Gizlilik ve Güvenlik</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Biemtek e-ticaret sitelerinin gizlilik politikası aşağıda
              belirtilmiştir, <br /> <br /> www.nanocamkesmemakinesi.com’u
              ziyaret ederek aşağıdaki şartları ve kuralları uygulamayı kabul
              etmiş sayılmaktasınız. Sitemizde yer alan her türlü bilgi, içerik,
              ürün ve müşteri yorumları veya üyeler tarafından siteye eklenmiş
              olan içerikler de dahil, düzenlenmesi ve kısmen/tamamen kullanımı
              konusunda (bir sözleşme ile üçüncü şahıslara ait olanlar hariç)
              tüm fikri-sınai haklar ve mülkiyet hakları
              nanocamkesmemakinesi.com’a aittir. <br /> <br /> Müşteri
              tarafından sitede yayınlanmasına izin verilen tüm yazı, resim,
              video gibi içerikler sadece bilgilendirme amaçlıdır. Biemtek
              e-ticaret sitelerinin üyelik sırasında veya daha sonraki
              süreçlerde sizden bazı kişisel bilgiler talep edebilir, bu
              bilgilerin diğer üyelerin göremeyeceği ve ulaşamayacağı şekilde
              korunması ve güvenle saklanması için nanocamkesmemakinesi.com tüm
              önlemleri almaktadır, bilgi alınan tüm sayfalar SSL güvenlik
              sertifikası ile korunmaktadır. <br /> <br /> Tüm online kredi
              kartı işlemleri ve onayları tarafımızdan bağımsız olarak ilgili
              Banka ve benzeri Kart Kuruluşları‘nca online olarak aranızda
              gerçekleştirilmektedir, Biemtek e-ticaret siteleri PCI
              standartlarına her daim uyum sağlayarak gereken tüm güvenli ödeme
              standartlarını sağlamaktadır.
              <br /> <br /> Kayıtlı bilgiler yasal düzenlemelerin öngördüğü
              sorumluluklar çerçevesinde ilgili kuruluşlara açıklanabilir.
              Ayrıca üyelikleri ve/veya alışverişleri sırasında vermiş oldukları
              iletişim bilgileri (telefon, adres, e-mail vs) ve diğer kişisel
              bilgiler sitemize üyelik işlemlerinizin yapılması, güncellenmesi,
              muhtelif ürün/hizmetlerin nanocamkesmemakinesi.com ve iş ortakları
              ve tedarikçileri tarafından verilebilmesi/satımı, ürün/hizmet
              ücret-masrafı tahsilatları ve çeşitli tanıtım, reklam, promosyon,
              iletişim, satış ve çeşitli uygulamalar için süresiz olarak kayda
              alınabilir, Biemtek e-ticaret sitelerinde ve belirtilen kuruluşlar
              nezdinde saklanabilir, işlenebilir, gerekli görülen hal-yer ve
              zamanda paylaşılabilir ve kullanılabilir.
              <br /> <br /> İade durumunda müşterinin ürünler için fatura ibraz
              etmesi zorunludur. biemtek e-ticaret sitelerinden sadece Türkiye
              Cumhuriyeti sınırları içerisine gönderim yapılmaktadır.
              <br /> <br /> Sipariş ön bilgilendirme formu ve mesafeli satış
              sözleşmesi Biemtek e-ticaret sitelerinden yapılacak her alışveriş
              sırasında görülebilecek ve geçerli olacaktır. <br /> <br />{" "}
              Biemtek e-ticaret sitelerinden belirli dönemlerde müşteri izinleri
              alınmış ve segmente edilmiş hedef kitlelerine eposta, sms ve diğer
              yöntemler ile pazarlama ve bilgi mesajları gönderebilir, bu
              mesajları almak istemiyorsanız email içerisindeki üyelikten ayrıl
              linkine tıklayarak eposta listesinden çıkabilirsiniz. Gizlilik
              politikamız ile ilgili her türlü soru ve öneriniz için sitemizdeki
              iletişim bölümünden bize ulaşabilirsiniz.
            </Offcanvas.Body>
          </>
        );

      case "terms":
        return (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Kullanım Şartları</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Kullanıcı Sözleşmesi
              https://www.nanocamkesmemakinesi.com//kullanici-sozlesmesi Bu
              bölüm sitenin genel kullanım şartlarını, bununla ilgili genel
              kuralları ve yasal sorumlulukları içermektedir. <br /> <br />{" "}
              Lütfen, Yeni Nesil Batarya www.nanocamkesmemakinesi.com/'dan
              hizmet almadan önce aşağıda yazılı olanları dikkatli bir şekilde
              okuyunuz. <br /> <br /> Eğer bu sayfada belirtilen şartların
              herhangi biri sizin için uygun değilse lütfen
              www.nanocamkesmemakinesi.com/sitesini kullanmayınız.
              <br /> <br /> Siteyi kullanmanız ve kişisel bilgilerinizin yer
              alacağı formu doldurmanız bu sayfalarda yazılı şartları kabul
              ettiğiniz anlamına gelmektedir.
              <br /> <br /> www.nanocamkesmemakinesi.com aşağıda belirtilen
              genel ve özel koşulları dilediği zaman değiştirme hakkını saklı
              tutmaktadır. www.nanocamkesmemakinesi.com sitemizi ziyaret
              ettiğinizde bu sayfayı da tekrar ziyaret etmeniz değişebilecek
              üyelik ve kullanım şartlarını görmeniz bakımından önemlidir.
              <br /> <br /> 1. <br />
              Kullanım ve Güvenlik Kuralları www.nanocamkesmemakinesi.com
              herkese açık bir sitedir. Tüm üyeler için verilen hizmetler
              ücretsizdir. Aşağıdaki yazılı durumlarda, site yönetimi üyenin
              site kullanımını engelleyebilir ve aşağıdaki girişimlere karışan
              kişi veya kişiler hakkında kanuni haklarını saklı tutar: <br />{" "}
              <br /> a. <br /> Yanlış ve yanıltıcı bilgileri, genel ahlak
              kurallarına uygun olmayan ifadeleri içeren ve Türkiye Cumhuriyeti
              yasalarına uygun olmayan bilgilerin siteye kaydedilmesi durumunda.
              <br /> <br /> b. <br /> Sitede yer alan çalışmaların ve içeriğin
              kısmen veya tümüyle kopyalanarak farklı amaçlarla kullanılması
              veya kullanılmaya çalışılması durumunda.
              <br /> <br /> c. <br /> Üyelere verilen ya da kendi belirledikleri
              kullanıcı adı, şifre gibi bilgilerin, kullanım haklarının, üçüncü
              kişi ya da kuruluşlarla paylaşılması durumunda (Şifresinin başka
              kişiler tarafından kötü niyet ile kullanılmasından da) üye
              sorumludur. <br /> <br /> d. <br />
              www.nanocamkesmemakinesi.com üzerinde üyelere verilen indirim
              kuponları, satılamaz, internet üzerinden
              www.nanocamkesmemakinesi.com sistemleri haricinde takas edilemez,
              paylaşılamaz, devredilemez. Her alışverişinizde sadece bir indirim
              kuponu kullanabilirsiniz. <br /> <br /> 2. İçerik Kullanımı <br />{" "}
              a. <br />
              www.nanocamkesmemakinesi.com' da sunulan görsel, yazılı içerik
              kişisel kullanım içindir. www.nanocamkesmemakinesi.com'un
              içeriğinde yer alan bütün yazıların, grafiklerin, fotoğrafların,
              videoların, animasyonların seslerin her hakkı saklıdır. Aksi
              belirtilmedikçe ticari ya da kişisel amaçlarla izinsiz ve kaynak
              göstermeden kullanılamaz. Bu sitede yer alan herhangi bir unsuru
              diğer bir mecrada veya internet sitesinde yayınlamak veya
              www.nanocamkesmemakinesi.com' un izni olmadan link vermek
              yasaktır. <br /> <br /> b. <br /> Ayrıca bu sayfaların tasarımında
              ve veri tabanı oluşturulmasında kullanılan ve her hakkı
              www.nanocamkesmemakinesi.com' a ait olan yazılımın kopyalanması
              veya kullanılması yasaktır. <br /> <br /> c. <br />{" "}
              www.nanocamkesmemakinesi.com her çeşit eleştiriye açıktır.
              Sitemize iletilen tüm bu eleştiriler mülkiyetimizdedir ve
              pazarlama amacıyla kullanılabilir. <br /> <br /> 3. <br />
              Sorumluluklar <br /> <br /> a. <br /> www.nanocamkesmemakinesi.com
              sitemizi ziyaret eden kullanıcıların bilgileri (ziyaret süresi,
              zamanı, görüntülenen sayfalar) onlara daha iyi hizmet edebilmek
              amacı ile takip edilmektedir. Elde edilen bilgiler, gizlilik
              prensiplerine bağlı kalmak kaydıyla, içerik bölümümüzü
              zenginleştirmek ve iyileştirmek amacı ile kullanılabilmektedir.
              Ancak bu bilgiler hiçbir firma ya da üçüncü kişilerle
              paylaşılmamaktadır. <br /> <br /> b. <br />
              www.nanocamkesmemakinesi.com üyesi, kayıt işlemlerini
              tamamladıktan sonra işbu sözleşmede belirtilen şartlara uymak
              koşulu ile, elektronik posta adresini ve şifresini girerek
              www.nanocamkesmemakinesi.com sitesini kullanmaya başlayabilir.{" "}
              <br />
              <br /> c. <br />
              Üye, www.nanocamkesmemakinesi.com hizmetlerinden yararlanırken,
              Türk Ceza Kanunu, Türk Ticaret Kanunu, Fikir ve Sanat Eserleri
              Kanunu, Marka ve Patent Haklarının Korunması ile ilgili Kanun
              Hükmünde Kararnameler ve yasal düzenlemeler, Borçlar Yasası, diğer
              ilgili mevzuat hükümleri ile www.nanocamkesmemakinesi.com' un
              hizmetlerine ilişkin olarak yayımlayacağı her türlü duyuru ve
              bildirimlere uymayı kabul eder. <br /> <br /> Bu bildirimlere ve
              yasalara aykırı kullanım sebebiyle doğabilecek hukuki, cezai ve
              mali her türlü sorumluluk üyeye aittir. <br /> <br /> d. <br />{" "}
              İşbu sözleşmede belirtilen yükümlülüklere veya
              www.nanocamkesmemakinesi.com sitesinde bildirilen genel kurallara
              uymaması nedeniyle, www.nanocamkesmemakinesi.com tarafından geçici
              veya sürekli olarak üyenin www.nanocamkesmemakinesi.com' dan
              yararlanması engellenebilir veya üyeliğini iptal edilebilir.{" "}
              <br /> <br />
              e.www.nanocamkesmemakinesi.com ile yapılan mesajlaşmaların
              yedeğinin alınması şahısların sorumluluğundadır ve
              www.nanocamkesmemakinesi.com tarafından önerilmektedir. <br />{" "}
              <br />
              Mesajlaşmaların yedeklerinin alınmaması nedeniyle kaybolmasından,
              silinmesinden ve hasar görmesinden www.nanocamkesmemakinesi.com
              sorumlu tutulamaz. <br />
              <br /> f. <br /> Üye, www.nanocamkesmemakinesi.com' dan
              kopyalanmış veya yazıcı ile yazdırılmış hiçbir materyal üzerinden
              Telif Hakkı, Ticari Marka ve her türlü Fikir ve Sanat Eserleri
              Kanunu kapsamı notlarını silemez veya çıkartamaz. g. Üyeliği iptal
              etme ve hesap silme işlemi, müşterinin isteği üzerine
              www.nanocamkesmemakinesi.com tarafından yapılır. <br /> <br />{" "}
              Üyeliğini bitiren kullanıcının siteye giriş yetkisi iptal
              edilecektir. <br /> <br /> h. <br /> Üyenin kendisi tarafından
              sonlandırılan üye hesabına ait her türlü kaydı
              www.nanocamkesmemakinesi.com silip silmemekte serbesttir, üye
              silinen kayıtlarla ilgili herhangi bir hak veya tazminat talebinde
              bulunamaz. <br /> <br /> i. <br />
              www.nanocamkesmemakinesi.com kullanım şartları, gizlilik
              prensipleri ve geçerli yasal düzenlemelere bağlı kalmak kaydıyla,
              üyeliğinize bağlı olan bütün bilgileri kendi pazarlama
              faaliyetleri ile ilgili olarak kullanma hakkına sahiptir. <br />{" "}
              <br /> j. <br />
              Üyelerimize ait bilgilerin gizliliğini korumaya yönelik
              prensipleri öğrenmek için lütfen "Gizlilik ve Kullanım Şartları"
              sayfasını ziyaret ediniz. <br /> <br /> Üye, siteden faydalanmaya
              başlandığı andan itibaren bu sözleşmenin tüm hükümlerini kabul
              etmiş sayılacağını ve sözleşmenin kendisi hakkında hüküm ifade
              edeceğini kabul eder. <br /> <br /> ÜYE işbu sözleşme ile
              üstlenmiş olduğu yükümlülüklere aykırı hareketi nedeniyle
              www.nanocamkesmemakinesi.com'un uğrayacağı her türlü zararı aynen
              tazmin edecek olup, www.nanocamkesmemakinesi.com, Üyenin
              sözleşmeye aykırı davranışları nedeniyle kamu kurumlarına ve/veya
              üçüncü şahıslara ödemek zorunda kalabileceği her türlü tazminat
              ve/veya idari/adli para cezaları için üyeye aynen rücu hakkını
              haizdir. <br /> <br /> 4. <br /> nanocamkesmemakinesi.com' un Hak
              ve Yükümlülükleri a. www.nanocamkesmemakinesi.com, üyesinin
              sözleşme yer alan hizmetlerden, teknik arızalar dışında,
              yararlandırılacağını, üyenin paylaşıma açtığı kişisel bilgileri
              dışındaki bilgilerin hiç bir şekilde yasal zorunluluklar hariç
              üçüncü kişi ya da kuruluşlarla paylaşılmayacağını kabul ve taahhüt
              eder. <br /> <br /> Üyenin www.nanocamkesmemakinesi.com sitesinin
              çalışmasına engel olacak herhangi bir elektronik sabotaj,
              kazançlara müdahale amaçlı girişimler ve/veya saldırıya neden
              olduğunun tespit edilmesi veya Resmi makamlardan, üyeye yönelik
              suç duyurusu ya da resmi soruşturma talebi gelmesi halinde,
              www.nanocamkesmemakinesi.com ilgili üyenin bilgilerini açıklama
              hakkına sahiptir. <br /> <br /> b. <br />{" "}
              www.nanocamkesmemakinesi.com taahhüt ettiği hizmetlerin
              sürekliliğini sağlamak için, işbu sözleşmede herhangi bir
              bildirimde bulunmaksızın tek taraflı değişiklik yapabilir.
              www.nanocamkesmemakinesi.com' un herhangi bir gerekçe göstermeden,
              tek taraflı olarak verdiği hizmeti sürekli veya geçici olarak
              durdurmak, servisin içeriğini değiştirmek veya iptal etmek hakkı
              vardır. <br /> <br /> c. <br /> Üye, işbu üyelik ve kullanım
              koşullarını okuyup kabul ettikten sonra kendisine,
              www.nanocamkesmemakinesi.com' a ait olan her türlü ticarî
              elektronik iletilere, onay vermiş addolunacaktır. Bu kapsamda Üye,
              www.nanocamkesmemakinesi.com tarafından kendisine, kişi müdahalesi
              olmadan çalışan elektronik posta, kısa mesaj gibi otomatik arama
              sistemleri vasıtasıyla ya da başkaca diğer iletişim vasıtaları ile
              Üye' den ayrıca herhangi bir ön izin alınmaksızın bilgilendirme,
              pazarlama veya reklam amacıyla elektronik ileti
              gönderilebileceğini kabul etmiştir. <br /> <br /> Üye dilediği
              zaman, hiçbir gerekçe belirtmeksizin bu kullanım şartları
              kapsamındaki elektronik iletileri almaktan vazgeçebilecek olup;
              bunun için, www.nanocamkesmemakinesi.com' a çağrı veya iletide yer
              alan iletişim bilgilerini kullanarak, bu yöndeki talebi iletmesi
              yeterlidir. <br /> <br /> www.nanocamkesmemakinesi.com, talebin
              kolay bir yolla ve ücretsiz olarak iletilmesini sağlayacak olup;
              talebin alınmasını müteakip www.nanocamkesmemakinesi.com hızlı bir
              şekilde bu talebin gereğini yerine getirecektir. <br /> <br /> 5.
              Sözleşmenin Yürürlüğe Girmesi Üye kayıt işlemini tamamladığı andan
              itibaren işbu sözleşmede belirtilen şartları kabul etmiş ve iş bu
              sözleşme yürürlüğe girmiş kabul edilir. <br /> <br /> Sözleşme,
              üyeliğin sona ermesi ile veya işbu sözleşmede sayılan fesih
              hallerinden herhangi birinin gerçekleşmesi ile hiçbir uyarıya
              gerek kalmaksızın kendiliğinden hükümsüz hale gelecektir. <br />{" "}
              <br /> 6. <br />
              Yetkili Mahkeme ve Uyuşmazlıkların Çözümü Bu sözleşmenin
              uygulanmasından doğabilecek uyuşmazlıkların çözümünde İstanbul
              Mahkemeleri ve İcra Daireleri yetkili kılınmıştır.
              <br /> <br /> 7. Tebligat <br />
              Adresleri <br /> <br /> a. <br /> www.nanocamkesmemakinesi.com,
              üyelerinden peşinen posta adreslerini istememektedir. <br />{" "}
              <br /> Ancak üyenin www.nanocamkesmemakinesi.com' a bildirdiği
              eposta adresi, bu sözleşme ile ilgili olarak yapılacak her türlü
              bildirim için yasal adresin isteneceği e-posta olarak kabul
              edilecektir. <br /> <br /> b. <br /> Taraflar, mevcut
              e-postalarındaki değişiklikleri diğer tarafa 4 gün içinde
              bildirmedikçe, eski e-postalara yapılacak isteklerin geçerli
              olacağını ve kendilerine yapılmış sayılacağını kabul ederler.{" "}
              <br /> <br /> c. <br />
              www.nanocamkesmemakinesi.com'un üyenin kayıtlı eposta adresini
              kullanarak yapacağı her türlü bildirim e-postanın
              www.nanocamkesmemakinesi.com tarafından yollanmasını takiben 2 gün
              içinde üyeye ulaştığı kabul edilecektir. <br /> Üye, bu katılım
              sözleşmesinde yer alan maddelerin tümünü okuduğunu, anladığını,
              kabul ettiğini ve kendisiyle ilgili olarak verdiği bilgilerin
              doğruluğunu onayladığını beyan, kabul ve taahhüt eder.
            </Offcanvas.Body>
          </>
        );

      case "return":
        return (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>İade Politikası</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              İptal ve İade Şartları GENEL: <br /> <br /> 1. <br /> Kullanmakta
              olduğunuz web sitesi üzerinden elektronik ortamda sipariş
              verdiğiniz takdirde, size sunulan ön bilgilendirme formunu ve
              mesafeli satış sözleşmesini kabul etmiş sayılırsınız. <br />{" "}
              <br /> 2. <br /> Alıcılar, satın aldıkları ürünün satış ve teslimi
              ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun
              ve Mesafeli Sözleşmeler Yönetmeliği (RG:27.11.2014/29188)
              hükümleri ile yürürlükteki diğer yasalara tabidir.
              <br /> <br /> 3. <br /> Ürün sevkiyat masrafı olan kargo ücretleri
              alıcılar tarafından ödenecektir.
              <br /> <br /> 4. <br /> Satın alınan her bir ürün, 30 günlük yasal
              süreyi aşmamak kaydı ile alıcının gösterdiği adresteki kişi
              ve/veya kuruluşa teslim edilir. Bu süre içinde ürün teslim edilmez
              ise, Alıcılar sözleşmeyi sona erdirebilir.
              <br /> <br /> 5. <br /> Satın alınan ürün, eksiksiz ve siparişte
              belirtilen niteliklere uygun ve varsa garanti belgesi, kullanım
              kılavuzu gibi belgelerle teslim edilmek zorundadır. <br /> <br />{" "}
              6. <br /> Satın alınan ürünün satılmasının imkansızlaşması
              durumunda, satıcı bu durumu öğrendiğinden itibaren 3 gün içinde
              yazılı olarak alıcıya bu durumu bildirmek zorundadır. 14 gün
              içinde de toplam bedel Alıcı’ya iade edilmek zorundadır. <br />{" "}
              <br /> SATIN ALINAN ÜRÜN BEDELİ ÖDENMEZ İSE: <br /> 7. <br />{" "}
              Alıcı, satın aldığı ürün bedelini ödemez veya banka kayıtlarında
              iptal ederse, Satıcının ürünü teslim yükümlülüğü sona erer.
              <br /> <br /> KREDİ KARTININ YETKİSİZ
              <br /> <br />
              KULLANIMI İLE YAPILAN ALIŞVERİŞLER: <br /> 8. <br /> Ürün teslim
              edildikten sonra, alıcının ödeme yaptığı kredi kartının yetkisiz
              kişiler tarafından haksız olarak kullanıldığı tespit edilirse ve
              satılan ürün bedeli ilgili banka veya finans kuruluşu tarafından
              Satıcıya ödenmez ise, Alıcı, sözleşme konusu ürünü 3 gün
              içerisinde nakliye gideri satıcıya ait olacak şekilde satıcıya
              iade etmek zorundadır.
              <br /> <br />
              ÖNGÖRÜLEMEYEN SEBEPLERLE ÜRÜN SÜRESİNDE TESLİM EDİLEMEZ İSE:{" "}
              <br /> 9. <br />
              Satıcının öngöremeyeceği mücbir sebepler oluşursa ve ürün
              süresinde teslim edilemez ise, durum Alıcı’ya bildirilir. Alıcı,
              siparişin iptalini, ürünün benzeri ile değiştirilmesini veya engel
              ortadan kalkana dek teslimatın ertelenmesini talep edebilir. Alıcı
              siparişi iptal ederse; ödemeyi nakit ile yapmış ise iptalinden
              itibaren 14 gün içinde kendisine nakden bu ücret ödenir. Alıcı,
              ödemeyi kredi kartı ile yapmış ise ve iptal ederse, bu iptalden
              itibaren yine 14 gün içinde ürün bedeli bankaya iade edilir, ancak
              bankanın alıcının hesabına 2-3 hafta içerisinde aktarması
              olasıdır. <br /> <br /> ALICININ ÜRÜNÜ KONTROL ETME YÜKÜMLÜLÜĞÜ:{" "}
              <br /> 10. <br /> Alıcı, sözleşme konusu mal/hizmeti teslim
              almadan önce muayene edecek; ezik, kırık, ambalajı yırtılmış vb.
              hasarlı ve ayıplı mal/hizmeti kargo şirketinden teslim
              almayacaktır. Teslim alınan mal/hizmetin hasarsız ve sağlam olduğu
              kabul edilecektir. Alıcı , teslimden sonra mal/hizmeti özenle
              korunmak zorundadır. Cayma hakkı kullanılacaksa mal/hizmet
              kullanılmamalıdır. Ürünle faturada iade edilmelidir. <br /> <br />{" "}
              CAYMA HAKKI: <br /> 11. <br /> Alıcı satın aldığı ürünün kendisine
              veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren
              14 (on dört) gün içerisinde, satıcıya aşağıdaki iletişim bilgileri
              üzerinden bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk
              üstlenmeksizin ve kullanılmamış, ambalajı bozulmamış, bütün
              aksesuarları eksiksiz olan ürünler için hiçbir gerekçe
              göstermeksizin malı reddederek sözleşmeden cayma hakkını
              kullanabilir. <br /> <br /> SATICININ CAYMA HAKKI BİLDİRİMİ
              YAPILACAK İLETİŞİM BİLGİLERİ: <br /> Şirket:biemtek Adres :
              ömerağa mah inönü cad no 190 İzmit /Kocaeli E-Posta:
              biemtek41@gmail.com TEL : 5411000041 <br /> <br /> CAYMA HAKKININ
              SÜRESİ: <br /> 12. <br /> Alıcı, satın aldığı eğer bir hizmet ise,
              bu 14 günlük süre sözleşmenin imzalandığı tarihten itibaren
              başlar. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı
              ile hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı
              kullanılamaz. Alıcıya Cayma hakkına ilişkin bildirim Mesafeli
              Sözleşmelerde ve İptal Koşullarında sunulmuş olup, Alıcı cayma
              koşullarını bilerek sipariş vermektedir. 13. Cayma hakkının
              kullanımından kaynaklanan masraflar satıcıya aittir. 14. Cayma
              hakkının kullanılması için 14 (on dört) günlük süre içinde
              satıcıya iadeli taahhütlü posta, faks, e-posta veya satıcı
              tarafından bildirilen yöntem ile yazılı veya ilgili yöntemle
              bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen "Cayma
              Hakkı Kullanılamayacak Ürünler" hükümleri çerçevesinde
              kullanılmamış olması şarttır. <br /> <br /> CAYMA HAKKININ
              KULLANIMI: <br /> 15. <br />
              3.Kişiye veya alıcıya teslim edilen ürünün faturası, (İade edilmek
              istenen ürünün faturası kurumsal ise, iade ederken kurumun
              düzenlemiş olduğu iade faturası ile gönderilmesi gerekmektedir.
              Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI
              kesilmediği takdirde tamamlanamayacaktır.) <br /> <br /> 16.{" "}
              <br /> İade formu, İade edilecek ürünlerin kutusu, ambalajı, varsa
              standart aksesuarları ile eksiksiz ve hasarsız olarak teslim
              edilmesi gerekmektedir.
              <br /> <br /> İADE KOŞULLARI: <br /> 17. <br /> Satıcı, cayma
              bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre
              içerisinde toplam bedeli ve alıcıyı borç altına sokan belgeleri
              ALICI’ ya iade etmek ve 20 günlük süre içerisinde malı iade
              almakla yükümlüdür. 18. Alıcının kusurundan kaynaklanan bir
              nedenle malın değerinde bir azalma olursa veya iade
              imkânsızlaşırsa alıcı kusuru oranında satıcının zararlarını tazmin
              etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya
              ürünün usulüne uygun kullanılması sebebiyle meydana gelen
              değişiklik ve bozulmalardan alıcı sorumlu değildir. <br /> 19.{" "}
              <br /> Cayma hakkının kullanılması nedeniyle satıcı tarafından
              düzenlenen kampanya limit tutarının altına düşülmesi halinde
              kampanya kapsamında faydalanılan indirim miktarı iptal edilir.{" "}
              <br /> <br /> CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER: <br /> 20.{" "}
              <br /> Alıcının isteği veya açıkça kişisel ihtiyaçları
              doğrultusunda hazırlanan ve geri gönderilmeye müsait olmayan, iç
              giyim alt parçaları, mayo ve bikini altları, makyaj malzemeleri,
              tek kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son
              kullanma tarihi geçme ihtimali olan mallar, alıcıya teslim
              edilmesinin ardından alıcı tarafından ambalajı açıldığı takdirde
              iade edilmesi sağlık ve hijyen açısından uygun olmayan ürünler,
              teslim edildikten sonra başka ürünlerle karışan ve doğası gereği
              ayrıştırılması mümkün olmayan ürünler, Abonelik sözleşmesi
              kapsamında sağlananlar dışında, gazete ve dergi gibi süreli
              yayınlara ilişkin mallar, Elektronik ortamda anında ifa edilen
              hizmetler veya tüketiciye anında teslim edilen gayri maddi mallar,
              ile ses veya görüntü kayıtlarının, kitap, dijital içerik, yazılım
              programlarının, veri kaydedebilme ve veri depolama cihazlarının,
              bilgisayar sarf malzemelerinin, ambalajının alıcı tarafından
              açılmış olması halinde iadesi Yönetmelik gereği mümkün değildir.
              Ayrıca cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile
              ifasına başlanan hizmetlere ilişkin cayma hakkının kullanılması da
              yönetmelik gereği mümkün değildir. <br /> 21. <br /> Kozmetik ve
              kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap,
              kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve kasetler ile
              kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.) iade
              edilebilmesi için ambalajlarının açılmamış, denenmemiş, bozulmamış
              ve kullanılmamış olmaları gerekir. <br /> 22. <br /> Aşağıdaki
              mesafeli sözleşmeler yönetmeliği gereğince; cayma hakkının
              kullanılmayacak ürünler, - Tüketicinin istekleri veya kişisel
              ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler.
              - Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların
              teslimine ilişkin sözleşmeler. - Tesliminden sonra ambalaj, bant,
              mühür, paket gibi koruyucu unsurları açılmış olan mallardan;
              iadesi sağlık ve hijyen açısından uygun olmayanların teslimine
              ilişkin sözleşmeler. - Tesliminden sonra başka ürünlerle karışan
              ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin
              sözleşmeler. - Malın tesliminden sonra ambalaj, bant, mühür, paket
              gibi koruyucu unsurları açılmış olması halinde maddi ortamda
              sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine
              ilişkin sözleşmeler. - Malın tesliminden sonra ambalaj, bant,
              mühür, paket gibi koruyucu unsurları açılmış olması ve
              kullanılmamış olması gerekmektedir. Bataryalar tek kullanımlık
              ürünler olduğundan kullanılmış olan bataryalar iade
              edilememektedir. - Belirli bir tarihte veya dönemde yapılması
              gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek
              tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın
              değerlendirilmesine ilişkin sözleşmeler. - Elektronik ortamda
              anında ifa edilen hizmetler veya tüketiciye anında teslim edilen
              gayri maddi mallara ilişkin sözleşmeler. TEMERRÜT HALİ VE HUKUKİ
              SONUÇLARI 23. Alıcı, ödeme işlemlerini kredi kartı ile yaptığı
              durumda temerrüde düştüğü takdirde, kart sahibi banka ile
              arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve
              bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder. Bu
              durumda ilgili banka hukuki yollara başvurabilir; doğacak
              masrafları ve vekâlet ücretini Alıcıdan talep edebilir ve her
              koşulda alıcının borcundan dolayı temerrüde düşmesi halinde,
              Alıcı, borcun gecikmeli ifasından dolayı satıcının uğradığı zarar
              ve ziyanını ödeyeceğini kabul eder. <br /> <br /> ÖDEME VE
              TESLİMAT <br /> 24. <br /> Banka Havalesi veya EFT (Elektronik Fon
              Transferi) yaparak, ....................................., bankası
              hesaplarımızdan (TL) herhangi birine yapabilirsiniz. 25. Sitemiz
              üzerinden kredi kartlarınız ile, Her türlü kredi kartınıza online
              tek ödeme ya da online taksit imkânlarından yararlanabilirsiniz.
              Online ödemelerinizde siparişiniz sonunda kredi kartınızdan tutar
              çekim işlemi gerçekleşecektir.
            </Offcanvas.Body>
          </>
        );
      case "membership":
        return (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Bayilik Sözleşmesi</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              BİEMTEK BİLİŞİM BAYİLİK SÖZLEŞMESİ
              <br /> <br /> 1. SÖZLEŞMENİN KONUSU <br /> <br />
              MADDE 1)
              <br /> <br /> Sözleşmenin imza tarihinden itibaren BAYİ’ nin kendi
              adına ve sözleşme hükümlerine göre BİEMTEK BİLİŞİM' den satın
              alacağı ürün ve hizmetlerin satımını oluşturmaktadır. BAYİ,
              www.rovabilisim.com adresindeki ürün ve hizmetlerin BİEMTEK
              BİLİŞİM tarafından onaylanan sistem çerçevesinde satılmasının,
              montajının yapılmasının, teknik destek ve servis hizmetlerinin
              gerçekleştirilmesini kabul ve taahhüt eder. Bayi sattığı ürünün
              faturalandırmasını kendi adına gerçekleştirir. İşbu sözleşme,
              bayilik sözleşmesi olup sözleşmenin tamamı, bir kısmı veya
              herhangi bir hükmü BAYİ’ ye acentelik, komisyonculuk, tellallık,
              simsarlık, vekillik veya ortaklık hakkı tanımaz.
              <br /> <br /> MADDE 2) <br /> <br />
              BAYİ, www.rovabilisim.com adresindeki ürünleri bulunduğu ilde işbu
              sözleşme hükümlerine bağlı kalarak satması için
              yetkilendirilmiştir. Bölgesi dışında veya internetten yapacağı
              satışlarda BİEMTEK BİLİŞİM' in yazılı izni olması zorunludur. ROVA
              BİLİŞİM, bayinin bölgesi içerisinde satış yapma hakkına sahiptir.
              Bu durumda BAYİ herhangi bir hak veya alacak talep edemez.
              <br /> <br /> MADDE 3)
              <br /> <br /> BAYİ’ nin bulunduğu bölge içerisinde alt bayilikler
              verme hakkı olmakla birlikte BİEMTEK BİLİŞİM' in, BAYİ ve alt
              bayilikler arasındaki ilişkiden kaynaklanan herhangi bir
              sorumluluğu doğmayacaktır.
              <br /> <br /> 2. TANITIM VE SATIŞ GELİŞTİRME FAALİYETLERİ VE
              UYGULAMANIN DENETLENMESİ
              <br /> <br /> MADDE 4)
              <br /> <br /> BAYİ, Ürünleri BİEMTEK BİLİŞİM' ce belirlenmiş
              ambalaj ve sunuş şekline uygun olarak satmakla yükümlüdür. BAYİ,
              BİEMTEK BİLİŞİM' in yazılı iznini almaksızın Ürün için BİEMTEK
              BİLİŞİM' in unvanını, işletme adını, Marka, logo ve sair tanıtım
              işaretlerini içeren poşet, kağıt ve sair ambalaj malzemesi
              bastıramaz ve kullanamaz. BİEMTEK BİLİŞİM' in izni ile üretilecek
              ve kullanılacak bu tür malzemeler BİEMTEK BİLİŞİM' in bildireceği
              esaslar çerçevesinde her türlü gideri BAYİ’ e ait olmak üzere imal
              edilir ve/veya ettirilir. Bu hüküm, BAYİ' nin işyerleri, depoları
              içinde ve/veya dışında yer alacak her türlü tanıtım levha ve
              panoları için de aynen geçerlidir.
              <br /> <br /> MADDE 5)
              <br /> <br /> BAYİ, pazarlama ve sair konularda BİEMTEK BİLİŞİM
              ihtiyaç duyulabilecek her türlü bilgiyi temin etmeyi ve ŞİRKET ile
              işbirliği yapmayı kabul ve taahhüt eder.
              <br /> <br /> MADDE 6)
              <br /> <br /> Ürünün tanıtımı, reklamları ve satış geliştirme
              faaliyetleri ŞİRKET tarafından belirlenecek şartlarda yapılır.
              BAYİ, BİEMTEK BİLİŞİM’ in yazılı izni olmadıkça Ürün ile ilgili
              olarak, yazılı veya sözlü hiç bir tanıtım ve reklam faaliyetinde
              bulunamaz, kendi adına veya üçüncü kişiler adına reklam, ilan,
              afiş yayınlayamaz, dağıtamaz, asamaz. BİEMTEK BİLİŞİM’ in talebi
              doğrultusunda, BAYİ, depo ve araçlarının üstüne ŞİRKET tarafından
              belirlenecek tanıtım işaretlerini koymayı, değiştirmeyi ve
              kaldırmayı kabul etmiştir. <br /> <br /> 3. ÜRÜN'ÜN VE MARKASI'NIN
              KORUNMASI - HAKSIZ REKABETİN ÖNLENMESİ MADDE
              <br /> <br /> 7)
              <br /> <br /> BAYİ, BİEMTEK BİLİŞİM’ in yazılı iznini almaksızın,
              Ürün'ün Markaları ve sair ŞİRKET tanıtım işaretlerini hiç bir
              şekilde kullanamaz. BAYİ, Ürün'ün ve ROVA BİLİŞİM’ in Marka ve
              sair tanıtım işaretlerini, üçüncü kişilere kullandıramaz, taklit
              edemez, aynı veya benzerlerini üretemez/ürettiremez. BAYİ, BİEMTEK
              BİLİŞİM’ in unvanı veya logosunu kendi antetli kağıtlarında veya
              duyurularında kullanamaz. <br /> <br /> MADDE 8)
              <br /> <br /> BAYİ, Markaların şöhretini ve BİEMTEK BİLİŞİM’ in
              ticari itibarını koruyup güçlendirecek tarzda hareket etmek ve
              BİEMTEK BİLİŞİM’ in Markalarına ve ticari itibarına zarar vermesi
              muhtemel davranışlardan ve ticari ahlaka uygun olmayan
              faaliyetlerden kaçınmakla yükümlüdür.
              <br /> <br /> MADDE 9)
              <br /> <br /> BAYİ, üçüncü kişilerin Ürün'ü ve/veya Markaları ya
              da BİEMTEK BİLİŞİM’ in diğer marka ve sair tanıtım işaretlerini
              taklit ettiklerini veya diğer bir surette tecavüzde bulunduklarını
              ya da haksız olarak kullandıklarını öğrendiği takdirde, durumu
              derhal BİEMTEK BİLİŞİM’ e bildirmek, ROVA BİLİŞİM’ in bu konuda
              vereceği talimata göre hareket etmek ve markaya tecavüzün/haksız
              rekabetin önlenmesi için gerekli her türlü işbirliği-yardımı
              yapmakla yükümlüdür. <br /> <br /> 4. TARAFLARIN HAK VE
              YÜKÜMLÜLÜKLERİ
              <br /> <br /> MADDE 10)
              <br /> <br /> Taraflar sözleşmede yer alan tüm hak ve
              yükümlülüklere ilişkin sorumluluklarını yerine getirmelidirler.
              <br /> <br /> a. BAYİ, BİEMTEK BİLİŞİM' i yükümlülük altına
              sokabilecek ve bağlayacak herhangi bir yetkiye sahip olmadığından
              BİEMTEK BİLİŞİM adına hiçbir surette üçüncü şahıslarla sözlü ya da
              yazılı akit yapamaz.
              <br /> <br /> b. BAYİ, BİEMTEK BİLİŞİM' in kullandığı marka,
              amblem ve ticari isimleri, bu sözleşme kapsamı dışında BİEMTEK
              BİLİŞİM' in yazılı izni olmadan kullanamaz.
              <br /> <br /> c. BAYİ’ nin bulunduğu bölgede reklam yapma yetkisi
              olup finansman ve reklamlardan doğacak her türlü sorumluluk BAYİ’
              ye aittir.
              <br /> <br /> d. BAYİ montaj aşamasında veya montaj sonrasında
              oluşan hasarlardan BİEMTEK BİLİŞİM' i sorumlu tutamaz.
              <br /> <br /> e. BİEMTEK BİLİŞİM herhangi bir gerekçe göstermeden
              bayilik sözleşmesini iptal etme hakkına sahiptir. <br /> <br /> f.
              BAYİ, BİEMTEK BİLİŞİM' den satın almış olduğu ürünlerde iade hakkı
              bulunmamaktadır. İade talep etmesi durumunda gelen ve giden kargo
              ücretini ödemeyi kabul eder. İşbu sözleşme, taraflarca tüm
              maddelerine uyulmak şartıyla tanzim edilip internet üzerinden
              okunup kabul edilerek yürürlüğe girmiştir.
            </Offcanvas.Body>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <div className="footer-main">
      <div className="footer-content">
        <div className="footer-item">
          <h3>Biemtek Bilişim</h3>
          <span>Adres: Ömerağa mah. inönü cad. no: 190 / Kocaeli İzmit</span>
          <span>Telefon: +90 543 100 00 41</span>
          <span>E-Posta: biemtekisletme@gmail.com</span>
        </div>
        <div className="footer-item">
          <h3>Hızlı Erişim</h3>
          <span
            onClick={() => handleNavigate("/")}
            style={{ cursor: "pointer" }}
          >
            Ürünler
          </span>
          <span
            onClick={() => {
              setShowing("privacy");
              handleShow();
            }}
          >
            Gizlilik ve Güvenlik Politikası
          </span>
          <span
            onClick={() => {
              setShowing("terms");
              handleShow();
            }}
          >
            Kullanım Şartları
          </span>
          <span
            onClick={() => {
              setShowing("return");
              handleShow();
            }}
          >
            İade Politikası
          </span>
          <span
            onClick={() => {
              setShowing("membership");
              handleShow();
            }}
          >
            Bayilik Sözleşmesi
          </span>
        </div>
        <div className="footer-item">
          <h3>Üyelik/Hesabım</h3>
          <span
            onClick={() => {
              handleNavigate("/kullanıcı-girişi");
            }}
          >
            Üye Ol
          </span>
          <span
            onClick={() => {
              handleNavigate("/kullanıcı-girişi");
            }}
          >
            Giriş Yap
          </span>
          <span
            onClick={() => {
              handleNavigate("/bayi-girişi");
            }}
          >
            Bayimiz Olun
          </span>
          <span
            onClick={() => {
              handleNavigate("/bayi-girişi");
            }}
          >
            Bayi Girişi
          </span>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} className="w-100">
        {showingText()}
      </Offcanvas>
    </div>
  );
}

export default Footer;

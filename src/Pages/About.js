import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";

function About() {
    return (
        <div>
            <Box sx={{
                width: '100%',
                backgroundImage: theme => theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 30%), transparent)'
                    : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 60%), transparent)',
            }}>

                <Container sx={{ paddingBottom: '10%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '12%' }}>
                        <Typography sx={{ fontSize: "40px" }} gutterBottom>
                            IRR Nedir ve Nasıl Hesaplanır?
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center',

                    }}>

                        <Typography>
                            <h2>IRR Anlamı</h2>

                            IRR, iç getiri oranı anlamına gelir. Harici faktörleri hariç tutarak bir proje veya yatırımdaki getiri oranınızı ölçer.
                            Muhasebe getiri oranına (ARR) benzer şekilde yatırımların karlılığını tahmin etmek için kullanılabilir .
                            Genellikle, yüksek bir IRR, düşük bir IRR'den daha iyidir, çünkü potansiyel bir projenin veya yatırımın işinize değer katma olasılığının yüksek olduğunu gösterir.
                            Potansiyel projeleri sıralamak için IRR kullanıyorsanız, en yüksek IRR'ye sahip yatırım muhtemelen ilk yapılması gereken yatırımdır
                            (her projenin yatırım maliyetinin eşit olduğu varsayılarak).

                            <h2>IRR Nasıl Hesaplanır?</h2>
                            IRR nasıl hesaplanır
                            IRR'nin nasıl hesaplanacağını anlamak zor olabilir, çünkü IRR formülü diğer birçok finansal metrikten biraz daha karmaşıktır. İşte hesaplamalarınızda kullanabileceğiniz IRR formülü:
                            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '2%', paddingBottom: '2%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#a1a4ab', padding: 2, borderRadius: 10, width: '50%' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}> 0 = NPV = t ∑ t=1 Ct/ ​(1+ IRR ) t​​ − C0</Typography>
                                </Box>
                            </Box>
                            <Typography>
                                Ct = t dönemindeki net nakit girişi
                            </Typography>

                            <Typography>
                                C0 = İlk yatırım maliyeti
                            </Typography>
                            <Typography>
                                IRR = Dahili getiri oranı
                            </Typography>
                            <Typography>
                                t = Zaman periyotlarının sayısı
                            </Typography>

                            <h2>IRR Nasıl Kullanılır?</h2>
                            IRR yöntemi, işletmeler tarafından hangi projenin veya yatırımın fonlanmaya değer olduğunu belirlemek için sıklıkla kullanılır. Örneğin, yeni bir ekipman satın almak mı yoksa yeni bir ürün serisine yatırım yapmak mı istediğinizi anlamaya çalışıyorsanız, IRR sağlıklı bir getiri oranı sağlama olasılığı en yüksek olan seçeneği anlamanıza yardımcı olabilir. Gerçek getiri oranının tahmini IRR'den önemli ölçüde farklı olması muhtemel olsa da, rakip seçeneklerden çok daha yüksek IRR'ye sahip projelerin daha iyi değer sunma olasılığı yüksektir.

                            IRR yönteminin özellikle yararlı olduğu birkaç farklı senaryo vardır. Mevcut operasyonları genişletmenin karlılığını yeni operasyonlar kurmakla karşılaştırıyorsanız, şirketiniz hangisinin daha karlı seçenek olduğuna karar vermek için IRR hesaplama formülünü kullanabilir. Ayrıca, IRR hisse senedi geri alım programını düşünen şirketler için yararlı olabilir; şirketin hisse senedi diğer potansiyel projelerden daha düşük bir IRR'ye sahipse, hisse senedi geri alımı en iyi fikir olmayabilir.



                            <h2>IRR'nin Sınırlamaları</h2>
                            IRR, gelecekteki projelerin veya yatırımların karlılığını tahmin etmek için mükemmel bir araç olsa da, tek başına kullanıldığında biraz yanıltıcı olabilir.

                            Düşük IRR'ye sahip projeler yüksek NPV'ye sahip olabilir, bu da getiri oranı diğer projelerden daha yavaş olsa da yatırımın kendisinin işletmeniz için önemli bir değer üretme olasılığının yüksek olduğunu gösterir. Aynı şekilde, IRR farklı uzunluklardaki projeleri değerlendirmek için en iyi araç olmayabilir.

                            Ayrıca, IRR bir yatırımla ilişkili pozitif nakit akışlarının projenin getiri oranında yeniden yatırılacağını varsayar. Bu durum böyle olmayabilir ve sonuç olarak IRR yöntemi bir projenin maliyeti ve karlılığının en doğru yansıması olmayabilir.

                            Genel olarak, IRR hesaplama formülü değerli bir ölçüttür, ancak nihai kararınızı verirken buna çok fazla önem vermemeniz önemlidir. Bu sorunları düzelten ve projeleri değerlendirmek için IRR formülünü kullanmayı düşünüyorsanız araştırmaya değer olabilecek değiştirilmiş iç getiri oranı (MIRR) adı verilen başka bir formül daha vardır.

                           
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default About

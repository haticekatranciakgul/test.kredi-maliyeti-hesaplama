import React from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '20px', // Varsayılan font boyutu (xs)
            '@media (min-width:600px)': {
                fontSize: '20px', // sm için font boyutu
            },
            '@media (min-width:960px)': {
                fontSize: '23px', // md için font boyutu
            },
            '@media (min-width:1280px)': {
                fontSize: '25px', // lg için font boyutu
            },
            fontWeight: 'bold' 
        },
        h2: {
            fontSize: '18px', // Varsayılan font boyutu (xs)
            '@media (min-width:600px)': {
                fontSize: '18px', // sm için font boyutu
            },
            '@media (min-width:960px)': {
                fontSize: '20px', // md için font boyutu
            },
            '@media (min-width:1280px)': {
                fontSize: '23px', // lg için font boyutu
            },
            fontWeight: 'bold' 
        },
       
        h4: {
            fontSize: '14px', // Varsayılan font boyutu (xs)
            '@media (min-width:600px)': {
                fontSize: '14px', // sm için font boyutu
            },
            '@media (min-width:960px)': {
                fontSize: '16px', // md için font boyutu
            },
            '@media (min-width:1280px)': {
                fontSize: '18px', // lg için font boyutu
            },
        },
    },
});

function About() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" gutterBottom>
                    IRR Nedir ve Nasıl Hesaplanır?
                </Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{
                flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',
                 alignItems: 'center'
            }}>

                <Typography variant="h2" >IRR Anlamı </Typography>
                <Typography variant="h4" sx={{
                    textIndent: '2em', // İlk satır için boşluk
                }}><br/>
                    IRR, iç getiri oranı anlamına gelir. Harici faktörleri hariç tutarak bir proje veya yatırımdaki getiri oranınızı ölçer.
                    Muhasebe getiri oranına (ARR) benzer şekilde yatırımların karlılığını tahmin etmek için kullanılabilir .
                    Genellikle, yüksek bir IRR, düşük bir IRR'den daha iyidir, çünkü potansiyel bir projenin veya yatırımın işinize değer katma olasılığının yüksek olduğunu gösterir.
                    Potansiyel projeleri sıralamak için IRR kullanıyorsanız, en yüksek IRR'ye sahip yatırım muhtemelen ilk yapılması gereken yatırımdır
                    (her projenin yatırım maliyetinin eşit olduğu varsayılarak).
                </Typography><br/>
                <Typography Typography variant="h2">IRR Nasıl Hesaplanır?</Typography><br/>

                <Typography Typography variant="h4" sx={{
                    textIndent: '2em', // İlk satır için boşluk
                }}>  IRR'nin nasıl hesaplanacağını anlamak zor olabilir, çünkü IRR formülü diğer birçok finansal metrikten biraz daha karmaşıktır. İşte hesaplamalarınızda kullanabileceğiniz IRR formülü:
                </Typography><br/>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '2%', paddingBottom: '2%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', padding: 2, borderRadius: 10, 
                    flexGrow: 1, p: 5,  marginTop: '5%',
                    boxShadow: '1px 1px 185px -23px rgba(244, 244, 244, 0.3)',
                    webkitBoxShadow: '1px 1px 185px -23px rgba(251, 251, 251, 0.43)',
                    mozBoxShadow: '1px 1px 185px -23px rgba(164, 132, 132, 0.43)', alignItems: 'center',
                        
                    }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h4"> 0 = NPV = t ∑ t=1 Ct/ ​(1+ IRR ) t​​ − C0</Typography>
                    </Box>
                </Box><br/>
                <Typography variant="h4">
                    Ct = t dönemindeki net nakit girişi
                </Typography>

                <Typography variant="h4">
                    C0 = İlk yatırım maliyeti
                </Typography>
                <Typography variant="h4">
                    IRR = Dahili getiri oranı
                </Typography>
                <Typography variant="h4">
                    t = Zaman periyotlarının sayısı
                </Typography><br/>


                <Typography  variant="h2">IRR Nasıl Kullanılır?</Typography><br/>


                <Typography variant="h4"  sx={{
                    textIndent: '2em', // İlk satır için boşluk
                }}>

                    IRR yöntemi, işletmeler tarafından hangi projenin veya yatırımın fonlanmaya değer olduğunu belirlemek için sıklıkla kullanılır. Örneğin, yeni bir ekipman satın almak mı yoksa yeni bir ürün serisine yatırım yapmak mı istediğinizi anlamaya çalışıyorsanız, IRR sağlıklı bir getiri oranı sağlama olasılığı en yüksek olan seçeneği anlamanıza yardımcı olabilir. Gerçek getiri oranının tahmini IRR'den önemli ölçüde farklı olması muhtemel olsa da, rakip seçeneklerden çok daha yüksek IRR'ye sahip projelerin daha iyi değer sunma olasılığı yüksektir.

                    IRR yönteminin özellikle yararlı olduğu birkaç farklı senaryo vardır. Mevcut operasyonları genişletmenin karlılığını yeni operasyonlar kurmakla karşılaştırıyorsanız, şirketiniz hangisinin daha karlı seçenek olduğuna karar vermek için IRR hesaplama formülünü kullanabilir. Ayrıca, IRR hisse senedi geri alım programını düşünen şirketler için yararlı olabilir; şirketin hisse senedi diğer potansiyel projelerden daha düşük bir IRR'ye sahipse, hisse senedi geri alımı en iyi fikir olmayabilir.
                </Typography><br/>
                <Typography  variant="h2">IRR'nin Sınırlamaları</Typography><br/>
                <Typography  variant="h4" sx={{
                    textIndent: '2em', // İlk satır için boşluk
                }}>

                    IRR, gelecekteki projelerin veya yatırımların karlılığını tahmin etmek için mükemmel bir araç olsa da, tek başına kullanıldığında biraz yanıltıcı olabilir.

                    Düşük IRR'ye sahip projeler yüksek NPV'ye sahip olabilir, bu da getiri oranı diğer projelerden daha yavaş olsa da yatırımın kendisinin işletmeniz için önemli bir değer üretme olasılığının yüksek olduğunu gösterir. Aynı şekilde, IRR farklı uzunluklardaki projeleri değerlendirmek için en iyi araç olmayabilir.

                    Ayrıca, IRR bir yatırımla ilişkili pozitif nakit akışlarının projenin getiri oranında yeniden yatırılacağını varsayar. Bu durum böyle olmayabilir ve sonuç olarak IRR yöntemi bir projenin maliyeti ve karlılığının en doğru yansıması olmayabilir.

                    Genel olarak, IRR hesaplama formülü değerli bir ölçüttür, ancak nihai kararınızı verirken buna çok fazla önem vermemeniz önemlidir. Bu sorunları düzelten ve projeleri değerlendirmek için IRR formülünü kullanmayı düşünüyorsanız araştırmaya değer olabilecek değiştirilmiş iç getiri oranı (MIRR) adı verilen başka bir formül daha vardır.

                </Typography>

            </Box>
        </ThemeProvider>

    )
}

export default About
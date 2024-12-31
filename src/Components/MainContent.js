import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";

function MainContent() {
    return (
        <Box sx={{
            width: '100%',
            backgroundImage: theme => theme.palette.mode === 'dark'
                ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 30%), transparent)'
                : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 60%), transparent)',
        }}>

            <Container sx={{paddingBottom: '10%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '12%' }} id="main-content">
                    <Typography sx={{ fontSize: "40px" }} gutterBottom>
                        IRR Nedir ve Nasıl Hesaplanır?
                    </Typography>
                </Box>
                <Divider></Divider>
                <Box sx={{
                    display: 'flex', justifyContent: 'center',

                }}>

                    <Typography>
                        <h2>IRR anlamı</h2>

                        IRR, iç getiri oranı anlamına gelir. Harici faktörleri hariç tutarak bir proje veya yatırımdaki getiri oranınızı ölçer.
                        Muhasebe getiri oranına (ARR) benzer şekilde yatırımların karlılığını tahmin etmek için kullanılabilir .
                        Genellikle, yüksek bir IRR, düşük bir IRR'den daha iyidir, çünkü potansiyel bir projenin veya yatırımın işinize değer katma olasılığının yüksek olduğunu gösterir.
                        Potansiyel projeleri sıralamak için IRR kullanıyorsanız, en yüksek IRR'ye sahip yatırım muhtemelen ilk yapılması gereken yatırımdır
                        (her projenin yatırım maliyetinin eşit olduğu varsayılarak).

                        <h2>IRR nasıl hesaplanır?</h2>
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

                        <h2>İç verim oranı nedir?</h2>
                        Farklı yatırım seçeneklerini kârlılıklarına göre değerlendirmede kullanılan oldukça önemli bir finansal kavramdır. İç verim oranı aynı zamanda yatırımın hangi oranda katma değer yaratacağını da ifade etmektedir. İç getiri oranı, iç kârlılık oranı ve yatırımın marjinal verimliliği gibi farklı adlarlarla da anılmaktadır.
                        <h2> İç verim oranı nasıl hesaplanır?</h2>

                        İç verim oranı, bir nakit akışının net bugünkü değerini sıfıra eşitleyen, diğer bir deyişle gelecekteki nakit giriş ve çıkışlarının bugünkü değerini bugünkü yatırım maliyetine eşitleyen iskonto oranı olarak tanımlanır.

                        Yatırımdan sağlanan yıllık net nakit akımlarının sabit olması durumunda iç verim oranının hesaplanması oldukça kolaydır. Ancak yatırımlardan sağlanan dönemsel net nakit akımları genelde birbirinden farklıdır. Bu durumda iç verim oranı, deneme-yanılma ve enterpolasyon metodunun birlikte kullanılması ile bulunur. Hesaplamada negatif ve pozitif net bugünkü değer sonucu veren iki iskonto oranı bulunur. Bu iki değer arasında enterpolasyon yapılarak iç verim oranı tespit edilir.
                        <h2>Yatırım kararlarında iç verim oranı nasıl değerlendirilir?</h2>

                        Alternatif yatırımlar arasında yapılan seçimlerde iç verim oranı en büyük olan projeye öncelik verilir. Eğer ilgili yatırımın finansmanı tamamen borç kullanılarak sağlanacaksa, iç verim oranı ödenebilecek en yüksek faiz oranını göstermektedir.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default MainContent

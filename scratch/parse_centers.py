import json
import re

raw_text = """
Accubaq Diagnostic
Pakistan
Karachi
Showroom # 1,2,3,4 Al Madina Tower, Plot 15-A PECHS
Block 6 Main Shahrah e Faisal
+922134325156
accubaqdiagnostic@gmail.com
https://www.accubaq.com
3
Adeena Diagnostic Center
Pakistan
Peshawar
Noor Plaza Arbab Road Stop University Road Peshawar
Noor Plaza Arbab Road Stop University Road Peshawar
+92915700563
info@adc.org.pk
http://adc.org.pk/
3
Advanced Medical Diagnostic Center
Pakistan
Lahore
9-B, College Block, Allama Iqbal Town, Lahore – Pakistan
—
0092 306 1104524
advancedmedicaldiagnosticcentre@yahoo.com
—
3
Working Hours
Al Falaq Diagnostic Centre
Pakistan
Gujranwala
10-DC Road, Gujranwala – Pakistan
—
+0553254671
info@alfalaqdiagnostic.com
—
4
AL Haram Diagnostics
Pakistan
Chakdara
Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
University Road Chakdara
+92348609494
info@ahd.com.pk
https://www.ahd.com.pk/
5
Working Hours
Al Mashreq Medical Centre
Pakistan
Multan
Khanewal Road, Opposite Govt. Technical College
Near Noor Centre Daewoo Terminal, Multan
+923021098987
almashreqmc@gmail.com
—
3
Working Hours
Al Rashid Diagnostic Center
Pakistan
Rawalpindi
Plot #946 , D Block , Satellite town
Rawalpindi
+923134547007
alrashiddiagnostic@gmail.com
https://www.alrashiddiagnostics.pk/
3
Working Hours
AL Safa Medical Center
Pakistan
Lahore
74- R1 Johar Town, Lahore
—
+924235454855
alsafamedical.info@gmail.com
—
3
Working Hours
AL-AMEER DIAGNOSTIC CENTRE
Pakistan
Peshawar
GT ROAD, PESHAWAR
—
+92912261175
alameerdiagnostic@gmail.com
—
3
Alaq Medical & Diagnostic Centre
Pakistan
Gujranwala
MAIN SIALKOT ROAD, OPP. NEED STORE & CHRISTIAN GRAVEYARD GUJRANWALA-PAKISTAN
—
+92553251447
alaqmd7@gmail.com
—
4
Al-Barkaat Diagnostic Center
Pakistan
Multan
236-A , General Bus Stand Road, S.R.A Colony, Multan – Pakistan
—
0092616778338
al_barkaat@hotmail.com
—
3
Al-Hilal Medical Diagnostic Center
Pakistan
Karachi
Banglow # D-9, PECHS Block 6 Near Hotel Faran (Nursery) Shahrah-e-Faisal – Karachi - Pakistan
—
9221345373312
alhilalmedicalcenter@yahoo.com
—
3
Al-Khair Medical Center
Pakistan
Peshawar
FIRST FLOOR KHAIR MUHAMMAD PLAZA OPPOSITE STATE BANK, 8-A SADAR ROAD PESHAWAR - PAKISTAN
—
+92915260222
akmc01@gmail.com
—
3
Allied Diagnostic Centre
Pakistan
Rawalpindi
D-845 Fifth Road, Satellite Town, Rawalpindi – Pakistan.
—
+92 51 8897497
info@allieddiagnostic.net
—
3
Al-Raed Medical Diagnostic Center
Pakistan
Karachi
H.No. 17-D, Block 6, P.E.C.H.S, Shahrah-e-Faisal, Karachi – Pakistan.
—
9221343804808
alraeddiagnostic@gmail.com
—
3
AL-RAYA HEALTH SERVICES
Pakistan
Karachi
Halima Heights Plot # 1-10/5 Block # 3 Shaheed-e-Millat, Road CHS (MCHS) P.E.C.H.S KARACHI
—
+923390002614
alrayakhi@gmail.com
—
3
AL-Zaeem Medical Center
Pakistan
Karachi
Icon Tower, Ground Floor, Plot # 84C, 24th Commercial Street, Phase 2 Extension DHA, Karachi – Pakistan
—
9221353803212
alzaeemmedical@gmail.com
—
4
Amal Medical Center
Pakistan
Peshawar
Opp Hujra Achini payan , Ring Road, Peshawar
—
+0915812233
anaabdiagnostics@gmail.com
https://amalpesh.pk/
3
Working Hours
Amna Diagnostic Center
Pakistan
Chakdara
Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
Haji Majeed Ullah Khan Trade Center Darbar Main University Road Chakdara District Dir Lower
+923324191981
amnadiagnostickhy@gmail.com
—
0
Working Hours
Anwar Clinical Laboratory
Pakistan
Chakdara
Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
—
+92946724848
aclchakdara@gmail.com
—
2
Working Hours
APEX DIAGNOSTIC CENTER
Pakistan
Peshawar
Pishatakhara Payan, Sufaid Dheri, Peshawar City Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, 25000, Pakistan
—
+923073443446
apexdiagnosticcenter01@gmail.com
http://apexdiagnosticscenter.com/
3
Aqsa Lab and Diagnostics
Pakistan
Gujranwala
Main By Pass Road Opposite Garden Town, Gujranwala
—
+92553894141
wafid.aqsa@gmail.com
—
0
Working Hours
Arsh Diagnostic Centre
Pakistan
Gujranwala
Gujranwala Sialkot Bypass, Pepli Chowk, Kangni Wala Main Road, Opp. Sanitary Market, Gujranwala – Pakistan
—
+92554551413
arshdiagnostic@hotmail.com
—
3
Asslaam Diagnostic Centre
Pakistan
Lahore
Building # 94, College Block, Main Wahdat Road, Allama Iqbal Town, Lahore.
Building # 94, College Block, Main Wahdat Road, Allama Iqbal Town, Lahore.
+923209891241
asslaamdiagnostic@gmail.com
https://www.asslaamdiagnostic.net.pk
3
Atlantic Medical Center
Pakistan
Lahore
24-2-c-1, Quaid Azam Town, College road
—
+923215985
atlanticmedicalpk@gmail.com
—
3
Working Hours
Atlas Medical Center
Pakistan
Peshawar
Tehkal University Road, Peshawar
—
+92915703142
atlaspeshawar@gmail.com
—
3
Working Hours
Bahrain Diagnostic Centre
Pakistan
Peshawar
Dubai Tower, Gul Abad Chowk, Main Dalazak Road, Peshawar.
Dubai Tower, Gul Abad Chowk, Main Dalazak Road, Peshawar.
+0913061762
bahraindiagnostic@gmail.com
http://www.bahraindiagnostic.net
3
Berq Diagnostic Center
Pakistan
Peshawar
Khyber Road, Defence Flats, Defence Colony, Peshawar Cantonment, Peshawar City Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, 25000, Pakistan
-Khyber Heights, Opposite Police Public School, University Road, Peshawar.
+0913065484
berqdiagnosticcenter01@gmail.com
http://berqdiagnostic.com
3
Bestway Medical Clinic
Pakistan
Lahore
77-G-2, Phase II, Main Boulevard, Johar Town, Lahore – Pakistan.
—
9242353110777
bestwaymedicalclinic@gmail.com
—
4
Bismillah Diagnostic Centre
Pakistan
Rawalpindi
Main Peshawar Road Near Riwaj Marriage Hall Rawalpindi – Pakistan.
—
+92515472193
bismillahdiagnostics@yahoo.com
—
3
Canal View Diagnostic Center
Pakistan
Lahore
4 A/1 Noon Avenue Old Muslim Town, Lahore - PAKISTAN
—
+924235863341
cvdc.626@gmail.com
—
4
Working Hours
CARE PRO DIAGNOSTIC CENTRE
Pakistan
Gujranwala
BHATTI HOSPITAL MUNEER CHOWK GUJRANWALA
BHATTI HOSPITAL MUNEER CHOWK GUJRANWALA
+2923004722882
careprodiagnosticcentre@yahoo.com
—
3
Working Hours
Caring and Curing Center
Pakistan
Peshawar
Cantonment Complex Plaza Fakhr e Alam Road Saddar Peshawar Cantt Pakistan.
Phone # +92-915286230-31 Fax# +92-915286229
+9291286230
ccinaam@hotmail.com
—
3
Citi Care Diagnostic Centre
Pakistan
Gujranwala
28 – DC Road, Lalazar Colony, Gujranwala – Pakistan
—
+92553732800
citicarediagnostic@gmail.com
—
3
Crystal Diagnostic Center
Pakistan
Peshawar
Peshawar Ring Road, Haider Colony, Peshawar City Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, 25210, Pakistan
Muqarab Khan Market, Ring Road, Hayatabad, Peshawar
+0913061764
crystaldiagnostic111@gmail.com
http://www.crystaldiagnosticcenter.com.pk
3
ELITE MEDICAL CENTER
Pakistan
Chakdara
MAIN DIR CHAKDARA ROAD
—
+923485713501
elitemedicalcentre7@gmail.com
—
2
Working Hours
Emerald Diagnostics Center
Pakistan
Islamabad
Plot # 60 I&T Center, G-8/1 Islamabad
—
+92512289280
emeralddiagnosticspak@gmail.com
—
3
Working Hours
Epic Medical Clinic
Pakistan
Bahawalpur
Chishti Mall, Aziz Bhatti Shaheed Road, Model Town A, Bahawalpur.
—
+923068888040
Epicmedicalclinicbwp@gmail.com
—
1
Working Hours
Eshal Diagnostic Center
Pakistan
Peshawar
Hayatabad, Achini Payan, Peshawar City Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, 25120, Pakistan
SS Plaza Achini Chowk Ring Road , Peshawar
+92913066766
info@edc.org.pk
http://www.edc.org.pk
3
Everest Diagnostic Center
Pakistan
Lahore
44 L Johar Town
—
+924237870006
everestdiagnosticcenter@gmail.com
—
3
Working Hours
Express Medical Center
Pakistan
Peshawar
Patang chowk ring road
—
+923255755554
expressmedcent@gmail.com
http://www.expresscent.com
2
Express Medical Centre
Pakistan
Rawalpindi
Mian Shah Allah Ditta Road Dhook Dalal
Rawal Town Opp PSO pump Rawalpindi
+92515174794
ExpressMedicalCentre@gmail.com
http://expressmedicalcenterpk.com
2
Working Hours
EZCare Medical Center
Pakistan
Gujranwala
Kashmir Road, Allah Baksh Colony
Gujranwala
+92554557475
Ezcaremedicalcenter@gmail.com
http://Ezcaremedicalcenter@gmail.com
3
Working Hours
Fatima Diagnostic Center
Pakistan
Lahore
Plot#7, D-Block
Faisal Town, Lahore
+923226377103
fatimadiagnostic58@gmail.com
https://www.fatimadiagnostics.pk/
2
Fatima Diagnostic Centre
Pakistan
Multan
1050-C, Khanewal Road, Near Chowk Rasheedabad, Multan – Pakistan
—
+0616355230
info@fatimadiagnostic.com
—
2
Federal Diagnostic Centre
Pakistan
Rawalpindi
Property No. E-61/5, Block E
Satellite Town, Rawalpindi
+92518442592
info@federaldiagnostic.com
—
3
Frontier Diagnostic Center
Pakistan
Peshawar
Frontier Diagnostic Center 163-164,Tambowan Chowk, University Road Peshawar.
—
0092915700229
nfdcpeshawar@yahoo.com
—
4
Galaxy Medical & Diagnostic Center
Pakistan
Sialkot
Wazirabad Road Noul Morr Near Rajco Industries
—
+920523574270
gmdc35@gmail.com
https://galaxydiag.pk/
3
Working Hours
GCC Diagnostic Centre
Pakistan
Islamabad
Building No. 1-A & 1-B, Street # 6, G-10/3,
Ibn e Sena Road, Islamabad, Pakistan.
+92512352912
gccislamabad@gmail.com
—
3
Gillani Medcare Center
Pakistan
Peshawar
Near Gillani plaza
Ring Road Peshawar
+92912620337
Gillanimedcarecenter@gmail.com
http://www.gillanimedcare.com
0
Working Hours
Global Medical Center
Pakistan
Rawalpindi
Plot No. B-730, Al-Rahim Arcade, Satellite Town, Rawalpindi
—
0092518312883
admin@globalmedicalcenter.pk
—
4
GMC Diagnostic Center
Pakistan
Multan
GMC Diagnostic Center, Opposite Al Madiv Center
Qazzafi Chowk
+923070702550
harisfaheem@gmail.com
https://www.gmcdiagnostics.pk/
3
Working Hours
GULF DIAGNOSTIC CENTER
Pakistan
Peshawar
RING ROAD NEAR KUMHO ADA, PESHAWAR
RING ROAD NEAR KUMHO ADA, PESHAWAR
+3339217928
gulfdiagnosticcenter@gmail.com
—
4
Working Hours
Gulf Medical Centre
Pakistan
Rawalpindi
Service Road West Shakrial Rawalpindi
Service Road West Shakrial Rawalpindi
+92518313601
gulfmedical0202@gmail.com
—
3
Health Care Diagnostic Center
Pakistan
Gujranwala
MAIN SIALKOT BYPASS ROAD, OPP. ROYAL GARDEN HOTEL GUJRANWALA-PAKISTAN
—
+92553893940
hcdc_2003@hotmail.com
—
4
Health Inn Medical Center
Pakistan
Peshawar
Ghari Qamar Din Chowk
Ring Road
+92912321144
healthinn.pakistan@gmail.com
http://www.healthinnpakistan.com.pk
4
Working Hours
Health Vista Diagnostics
Pakistan
Multan
Business Center, Ground Floor
MA Jinnah Road, Off Main Khanewal Road
+92616561112
healthvistadiagnostics.multan@gmail.com
—
2
Working Hours
Health zone Medical Centre
Pakistan
Multan
Health zone Medical Centre,Near Multan Public School (MPS) Road
Multan
+92616306126
HealthZoneMedicalcentre@gmail.com
—
3
HI-LITE DIAGNOSTIC CENTER
Pakistan
Karachi
13th COMMERCIAL STREET, PHASE II, DHA EXTENSION,KARACHI
—
+923391115483
hilitediagnostic@gmail.com
—
3
Hope Lab & Diagnostic Centre
Pakistan
Multan
Chowk Kumharanwala, Multan City Tehsil, Multan District, Multan Division, Punjab, 60000, Pakistan
—
+923174565949
umrfarooq786@yahoo.com
—
2
Horizon Medical Laboratory
Pakistan
Multan
# 335/ XXII, Khanewal Road, Multan – Pakistan.
—
0092616775160
admin@horizonmc.pk
—
3
Hum Medical & Diagnostic Center
Pakistan
Lahore
Johar Town, Rasoolpur, Lahore City Tehsil, Lahore District, Lahore Division, Punjab, 54782, Pakistan
—
+923333557700
hummedical@gmail.com
https://hummedicalanddiagnosticcenter.com
3
IBN E SENA LABORATORY
Pakistan
Islamabad
PAK PAVILION PLAZA NEAR UBL FAZAL E HAQ ROAD BLUE AREA ISLAMAB
PAK PAVILION PLAZA NEAR UBL FAZAL E HAQ ROAD BLUE AREA ISLAMAB
+92512101600
najamulkhaleej@gmail.com
—
3
Working Hours
IMC Diagnostic Center
Pakistan
Lahore
8-A Johar Town
Lahore
+924235176046
imcdc8a@gmail.com
—
3
Working Hours
Inaam Medical Centre
Pakistan
Peshawar
Near Gilani Mart, Ring Road Peshawar
—
+92912584100
inaammedcent@gmail.com
https://www.inaamc.pk
3
Working Hours
Infinity Diagnostic Center
Pakistan
Lahore
81-R/1 Johar Town, Lahore
—
+924235956010
idc.lhr2021@gmail.com
https://infinitydc.pk/
3
Iqra Medical Complex
Pakistan
Lahore
5-A Johar Town Lahore 54770 PAKISTAN
—
+924235173800
iqraamedicalcomplex@hotmail.com
—
3
Kamishka Medical Centre
Pakistan
Karachi
House D-95
KDA Scheme No. 1, Tipu Sultan Road, Karachi, Pakistan
+923335555519
kamishkamedicalcentre02@gmail.com
—
3
Khaleej Diagnostic Centre
Pakistan
Rawalpindi
284/2, Raja Akram Road Near Race Course Road. Rawalpindi Cantt - PAKISTAN
—
+92515124978
kdcrawalpindi@gmail.com
—
3
KHAN LABS & DIAGNOSTIC CENTER
Pakistan
Karachi
Plot#04, Block# 03, Sumaya Arcade,
Shaheed-e-Millet Road
+922134915678
khanlabsdiagnosticcenter@gmail.com
https://khanlabs.live/
2
Khoulod Diagnostic Center
Pakistan
Peshawar
1st Floor Al-Kout Tower Opp. Proton Peshawar Motors Near Sarhad University Ring Road Peshawar
—
+0915230479
khouludpeshawar@gmail.com
—
4
KPK Diagnostic Center
Pakistan
Peshawar
Pishtakhara Chowk, ring Road
Peshawar
+923445653671
kpkdc24@gmail.com
—
4
Working Hours
Kuwait Diagnostic Centre
Pakistan
Peshawar
Madni Plaza, Opp Hyper Mall, Ring Road, Hayatabad,Peshawar.
Madni Plaza, Opp Hyper Mall, Ring Road, Hayatabad,Peshawar.
+923075516432
kuwaitdiagnosticcentre@gmail.com
https://www.kuwaitdiagnosticcentre.net
3
Mahnoor Diagnostic Centre
Pakistan
Rawalpindi
378-Saidpur Road, Satellite Town, Rawalpindi
378-Saidpur Road, Satellite Town, Rawalpindi
+92 51 8434029
support@mdc.net.pk
http://www.mdc.net.pk
3
Marcopolo Medical Center
Pakistan
Faisalabad
Samundari Road, Faisalabad City Tehsil, Faisalabad District, Faisalabad Division, Punjab, 38000, Pakistan
—
+921415634897
fsd.marcopolo@gmail.com
—
5
Working Hours
Marhaba Medical Diagnostic Center
Pakistan
Rawalpindi
E-50, E Block, Nearby Haidri Chowk
Satellite Town
+92518482622
marhaba.medicaldiagnosticcenter@gmail.com
—
3
Marwa Diagnostic Center
Pakistan
Islamabad
Plot No. 19 Street No. 39 I & T Center G/10-4 Islamabad.
Plot No. 19 Street No. 39 I & T Center G/10-4 Islamabad.
+92516141233
info@mdc.org.pk
http://www.mdc.org.pk
3
Maryam Diagnostic Center
Pakistan
Peshawar
Haji Meer Afzal Plaza, Shinwari Town, Near MMC Hospital, Dalazak Chowk, Ring Road Peshawar.
Haji Meer Afzal Plaza, Shinwari Town, Near MMC Hospital, Dalazak Chowk, Ring Road Peshawar.
+091-2582795
maryamdiagnosticcenter@hotmail.com
http://www.maryamdiagnostic.com.pk
3
Medcare Diagnostics
Pakistan
Lahore
27/2 BLOCK A, VALANCIA TOWN
LAHORE
+923006669012
saqibhabibjillani@gmail.com
http://www.medcarediagnostics.com.pk
3
Medical Diagnostic Center
Pakistan
Peshawar
Jibran Adeel Plaza, Bilal Town, Near Wapda Office, G.T Road Peshawar City, Pakistan.
Phone# +92912262213 Fax# +92912262214
+92912262213
mdcpesh@gmail.com
—
3
Medical Diagnostic Clinic
Pakistan
Karachi
Bungalow No. 9-B, P.E.C.H.S (Nursery) Block No. 6 Near Hotel Faran Shahrah e Faisal Karachi – Pakistan
—
+922134389130
mdckhi99@gmail.com
—
4
MediZen Health Services
Pakistan
Karachi
Show 5 Parsa Tower 31-A-1 Block 6 PECSH
Sharah-e-Faisal Karachi
+92196334936
info@medizen.pk
http://www.medizen.pk
3
Misbah Diagnostic Center
Pakistan
Gujranwala
Zia Plaza,Opposite GTS Bus Stand, GT Road, Gujranwala.
Zia Plaza,Opposite GTS Bus Stand, GT Road, Gujranwala.
+9255 32 52 100
admin@misbahdiagnostic.net.pk
http://www.misbahdiagnostic.net.pk
3
MJR Diagnostic Center
Pakistan
Karachi
Plot 32, Sector 19, One Trade Center
Main Korangi Road, Near Singer Chowrangi, Karachi
+922135121966
mjrdiagnosticcenter@gmail.com
http://www.mjrdiagnosticcenter.com.pk
2
Working Hours
MS Diagnostic Services
Pakistan
Peshawar
Sardargarhi, Chamkani Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, Pakistan
Jehan Trade Center, Main GT Road, Chughul Pura, BRT Station No.3,
+92912262240
info@msds.org.pk
https://msds.org.pk/
3
Multan Diagnostic Center
Pakistan
Multan
4-Ahmad Park Khanewal Road, Near Hamza CNG, Multan - Pakistan,Multan,Pakistan-0092 61 45
—
0092614555007
mdc_multan@hotmail.com
—
3
Muscat Diagnostic Center
Pakistan
Islamabad
Plot no.20, Faqeer appi road, Timber Market, I-11/2, Islamabad.
Plot no.20, Faqeer appi road, Timber Market, I-11/2, Islamabad.
+915224541061
muscatdiagnosticcenter@gmail.com
https://www.muscatdiagnosticcenter.com
3
Mutahidah Diagnostic Center
Pakistan
Peshawar
1st Floor, Al-Kout Tower, Opp. Proton Peshawar Motors, Near Sarhad University Ring Road, Peshawar
Near Sarhad University Ring Road, Peshawar
+0913071419
mutahidahpeshawar@gmail.com
—
4
Najum ul khaleej Diagnostic center
Pakistan
Islamabad
Bloom Vales Plaza Plot # 23 D Block ,Soan Gardens (main Road)
Soan Gardens , Islmabad
+92512101600
najamulkhaleej@gmail.com
—
3
National Diagnostic Centre
Pakistan
Lahore
House 409, Block G-4 Ma, Johar Town, Lahore – Pakistan
—
+04235467664
info@nationaldiagnostics.net
—
3
NEXUS DIAGNOSTICS
Pakistan
Faisalabad
P-561/B,PEOPLES COLONY
SATIANA ROAD,FAISALABAD
+92415245691
nexusdiagnostics@yahoo.com
http://nexusdiagnostics@yahoo.com
5
NM diagnostic center
Pakistan
Gujranwala
Main G.T road, near civic center shaheenabad
—
+92553257400
haiderchatha@hotmail.com
http://nmdiagnostics.net
3
North Star Medical Diagnostics
Pakistan
Lahore
13 L Model Town, Lahore, Pakistan
—
+924235161300
northstar.diagnostics@gmail.com
https://www.northstarmd.pk/
3
Working Hours
Nova Diagnostic Centre
Pakistan
Sialkot
Sultan Plaza, Khadim Ali Road, Sialkot.
Sultan Plaza, Khadim Ali Road, Sialkot.
+92523577555
info@novadiagnosticcenter.com
http://www.novadiagnosticcenter.com
3
Oasis Diagnostic Center
Pakistan
Chakdara
Nowshera-Chitral Road, Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
Main GT Road Opposite Abeer Saeed Hospital, Chakdara
+92945761066
info@odc.org.pk
https://www.odc.org.pk/
2
Oman Diagnostic Centre
Pakistan
Chakdara
Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
Near Agriculture Bank, Chakdara, Lower Dir, KPK
+923330966626
omandiagnostic@gmail.com
http://www.omandiagnostic.com.pk
0
Working Hours
OnTime Diagnostics
Pakistan
Rawalpindi
2A Sector 2 IJP Service Road
Rawalpindi
+92514807574
OnTimeDiagnostics@gmail.com
http://www.Ontimediagnosticspk.com
4
Working Hours
Opal Diagnostic Centre
Pakistan
Lahore
Suzuki Master Motor Engineers, 4-A Johar Town, Maulana Shaukat Ali Road, Johar Town, Faisal Town, Lahore, Model Town Tehsil, Lahore District, Lahore Division, Punjab, 55800, Pakistan
Lahore
+924235176050
Opaldiagnosticcenter@gmail.com
—
2
Working Hours
Pacific Diagnostic Centre
Pakistan
Gujranwala
Main Sialkot bypass road , opposite Garden Town , Gujranwala
—
+92553893611
pacificdiag@gmail.com
https://pacificdiagnostics.pk/
3
Working Hours
Paragon Medical Centre
Pakistan
Multan
Opposite Minar Marquee Near Nagina chowk M.A Jinnah Road, Multan
—
+92321490011
paragonmedicalmultan@gmail.com
—
3
Working Hours
Paramount Medical Clinic
Pakistan
Lahore
74/5 Usman Block, Garden Town, Lahore – Pakistan.
—
9242358612727
paramountmedical74@gmail.com
—
3
Pearl Diagnostic Center
Pakistan
Chakdara
Nowshera-Chitral Road, Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
—
+92945761363
pearldiagnosticcenter24@gmail.com
http://www.pearlcenter.com
0
Working Hours
Premier Diagnostics
Pakistan
Islamabad
Rais and Shoaib Center, Main Expressway, Service Road East, Khanna
—
+92516133889
premierdiagnostics.islamabad@gmail.com
http://www.premierdiagnostics.pk
3
Working Hours
Prime Diagnostic Centre
Pakistan
Multan
House no. 30, Block-x,
near Madni Park, Kekar stop
+92614557443
md@primediagnostic.net
http://www.primediagnostic.et
2
Primecare Diagnostics
Pakistan
Chakdara
Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
Gul Mukam University Road Chakdara
+92348609494
info@pcd.org.pk
https://www.pcd.org.pk/
5
Working Hours
PULSE DIAGNOSTIC CENTRE
Pakistan
Rawalpindi
F No 28-B, Kashmir Gate Plaza, Opp RGH, Murre Road Rawalindi
F No 28-B, Kashmir Gate Plaza, Opp RGH, Murre Road Rawalindi
+923013960496
pulsediagnosticcentre@yahoo.com
—
3
Working Hours
Quality Medical Centre
Pakistan
Peshawar
Cantonment Building Fakhar-E-Alam Road, Peshawar Cantt. Peshawar
—
+92915277007
qualitypesh@gmail.com
—
3
Quest Medical Centre
Pakistan
Lahore
13-13 A Aibak Block, Garden Town, Lahore – Pakistan
—
+924235941996
questmedica44@gmail.com
—
3
Rafay Diagnostic Centre
Pakistan
Islamabad
Umar Masjid, Street 32, G-10/1, G-10, Islamabad, Zone 1, Islamabad Capital Territory, 44000, Pakistan
Qatar Arcade, P. No. 69, Shop No. 3, G-10/1, Islamabad.
+923091333534
rafaydiagnostic@gmail.com
http://rafaydiagnosticcentre.net.pk
3
RediMed Medical Center
Pakistan
Islamabad
75, I & T Center, G-8/1, Islamabad
—
+923255755554
gcc.redimed@gmail.co
—
3
Working Hours
Reliance Medical Lab
Pakistan
Rawalpindi
D-975, D-Block, Satellite Town, Rawalpindi – Pakistan.
—
+92518312881
admin@reliancemc.pk
—
3
Ridan diagnostic centre
Pakistan
Lahore
16N MA Johar Town
Lahore
+924235137267
aqtkhans@gmail.com
—
3
Royal Diagnostic Centre
Pakistan
Gujranwala
H.No. 202, Sui Gas Road, Near Regional Sui Gas Office, Gujranwala – Pakistan
—
+92553891500
info@royaldiagnostic.com
—
3
RR Diagnostics
Pakistan
Islamabad
Plot No 80-,Street No 54,I&T center G-9/4,Islamabad
—
+92512808416
rrdiagnosticpk@gmail.com
https://rrdc.pk/
3
Working Hours
Safa Diagnostic Center
Pakistan
Islamabad
Plot no.16, Faqir aipee road, Sector I-11/2, Islamabad
Plot no.16, Faqir aipee road, Sector I-11/2, Islamabad
+923037762161
safadiagnostic.isb@gmail.com
http://www.safadiagnosticcenter.com
3
Sahil Medical Center
Pakistan
Karachi
82-C, 13th Commercial Street, Phase II, Extension DHA, Karachi - Pakistan
—
+922135313957
sahilmedicalkhi@gmail.com
—
4
Sapphire Medical & Diagnostic Centre
Pakistan
Rawalpindi
Block F- 851, 6th Road Satellite Town, Rawalpindi- Pakistan
—
+92514848811
sapphiremc52@gmail.com
—
3
Sawaira Healthcare Services
Pakistan
Chakdara
Nowshera-Chitral Road, Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 23050, Pakistan
Pull Chowki Opposite FC Fort Chakdara
+923325452344
info@shs.org.pk
https://www.shs.org.pk/
5
Working Hours
Shabraj Medical Centre
Pakistan
Karachi
44R, PECHS Block 6, Jamshed Town, Gulshan District, Karachi Division, Sindh, 75100, Pakistan
—
+922134552025
shabrajmedicalcentre@gmail.com
http://shabrajmedicalcentre.com
3
Shifa International
Pakistan
Islamabad
Sector H-8/4 Islamabad PAKISTAN
—
+92518463053
shifa.gcc@gmail.com
—
3
Skill Diagnostic Center
Pakistan
Peshawar
Near Hujra Ring Road Peshawar
—
+0912322555
Skilldiagnostics1@gmail.com
http://www.skilldiagnostic.com
3
STAR DIAGNOSTIC CENTER
Pakistan
Peshawar
1354-B Saddar Road, Peshawar
Pakistan
+92917257007
stardiagnosticpk@gmail.com
https://stardiagnosticpk.com/
3
SULTAN DIAGNOSTIC CENTRE
Pakistan
Multan
The Heaven B-1 MA, Jinnah Road Multan
The Heaven B-1 MA, Jinnah Road, Multan
+92612162222
sultandiagnosticcentre@gmail.com
—
2
Working Hours
Sultana Diagnostic Centre
Pakistan
Rawalpindi
Office No. 2, Elite Plaza 454/A, Bakery Road, Saddar, Rawalpindi
Office No. 2, Elite Plaza 454/A, Bakery Road, Saddar, Rawalpindi
+923331629571
sultanadiagnosticcentre@gmail.com
http://www.sultanadiagnostic.com.pk
3
SUNRISE MEDICAL CENTER
Pakistan
Faisalabad
P-35, X Block Susan Road,
Faisalabad
+92418503030
sunrisemedicalcenter78@gmail.com
http://sunrisemedicalcenter78@gmail.com
3
Swift Healthcare Services
Pakistan
Islamabad
Plot No. 59, I&T Center, Sector G-8/1, Islamabad.
-
+923285276021
swifthealthcareservices1@gmail.com
http://swifthealthcarecentre.com
3
Taj Medical Center
Pakistan
Karachi
Bungalow # 14-E,Block 6, P.E.C.H.S, KFC LANE Off Main Shara-e-Faisal, Near protector of Immigrant Office Karachi, Pakistan
—
0092-21-34300075
tmc_khi@yahoo.com
—
3
Taj Medical Health Services
Pakistan
Karachi
Fortune Tower, Plot No. 43/1-A, P.E.C.H.S, Block-6, Razi Road, Main Shahrah-e-Faisal, Karachi East
—
+922134325157
tajmedcenter@gmail.com
https://tajhealthservices.com
3
Taj Medical Travellers Clinic
Pakistan
Lahore
Building # 25 Civic Centre, Behind Sunday Bazar, Near LDA office, Main Johar Town Boulevard, Lahore – Pakistan
—
+924235401681
tmtc01@yahoo.com
—
3
Taqwa Medical Center
Pakistan
Rawalpindi
Jawad Plaza, Opposite IJP Metro Station, IJP Road, Rawalpindi – Pakistan
—
+92514856682
taqwamedcentre@gmail.com
—
3
Tashfeen Medical Center
Pakistan
Chakdara
Nowshera-Chitral Road, Chakdara, Adenzai Tehsil, Lower Dir District, Malakand Division, Khyber Pakhtunkhwa, 18800, Pakistan
Chakdara
+92945703608
tashfeenmedical23@gmail.com
http://www.tmcenter.com
0
Working Hours
Temar Diagnostic Centre
Pakistan
Rawalpindi
Building 1, Adjacent to Rawalpindi Institute of Cardiology, Rawal Road, Rawalpindi
—
+92515592323
temardiagnosticcenter@gmail.com
http://www.temardiagnosticcentre.pk
3
Urgent Diagnostic Services
Pakistan
Rawalpindi
101-A, Main 6th Road, Satellite Town, Muree Road. Near Alladin Fun House Rawalpindi - PAKISTAN
—
+92514933351
umdc@hotmail.com
—
3
Valley Care Medical Diagnostics
Pakistan
Islamabad
Faqir Apee Roadm Plot no 28, 1-11/3 Islamabad
—
+92514863929
valleycareisl@gmail.com
—
3
Working Hours
Venus Diagnostic Center
Pakistan
Peshawar
GT Road Peshawar
—
+92912262166
venusdiagnostic2024@gmail.com
http://www.venusdiagnostic.com
3
Venus Medical Services
Pakistan
Faisalabad
Ashrafabad, Hajiabad, Main Sheikhupura Road
Faisalabad
+923179998720
VenusMedicalServices@gmail.com
—
3
Working Hours
VICTORIA DIAGNOSTIC CENTRE
Pakistan
Bahawalpur
Ghaznavi Road, Bahawalpur City Tehsil, Bahawalpur District, Bahawalpur Division, Punjab, 06319, Pakistan
—
+92622201334
info@victoriadiagnostic.com
http://www.victoriadiagnostic.com
2
Wafi Medical Clinic
Pakistan
Lahore
70 C, Main Wahdat Road, Muslim Town, Lahore – Pakistan
—
+924235914481
wafimedica@gmail.com
—
4
Walk-In Medical Center
Pakistan
Peshawar
Peshawar City Tehsil, Peshawar District, Peshawar Division, Khyber Pakhtunkhwa, 25210, Pakistan
—
+92912586200
Walkinmedicalcenter2@gmail.com
http://www.walk-inmed.com
2
Working Hours
Well Being Diagnostic Center
Pakistan
Multan
Ground Floor, Noor Center, Near Daewoo Terminal Khanewal Road, Multan – Pakistan
—
+926167732212
wellbeingdcmultan@gmail.com
—
4
Zyva Diagnostic
Pakistan
Karachi
SHOWROOM#1,2,3 PLOT#44-A SURVEY#35-P/1 GROUND FLOOR
BLOCK 6 PECHS MAIN SHAHRAH-E-FAISAL
+922143475160
zyvadiagnostic@gmail.com
https://www.zyvadiagnostic.com
3
"""

# Process entries
lines = [l.strip() for l in raw_text.split('\n') if l.strip()]
centers = []

i = 0
idx = 1
while i < len(lines):
    line = lines[i]
    if line.startswith("---") or "Medical center name" in line or "Country" in line or "Working Hours" == line:
        i += 1
        continue
    
    # Each entry starts with name, then Pakistan, then City
    name = line
    if i + 2 < len(lines) and lines[i+1] == "Pakistan":
        country = lines[i+1]
        city = lines[i+2]
        i += 3
        
        addr1 = ""
        addr2 = ""
        phone = ""
        email = ""
        website = ""
        
        # Read fields up to rating line (which is a single digit or rating number)
        fields = []
        while i < len(lines):
            curr = lines[i]
            if curr.startswith("---") or curr == "Working Hours" or "Medical center name" in curr:
                i += 1
                continue
            # Check if this line is the rating number (0-5) or next center start
            if re.match(r'^\d+$', curr) and len(curr) <= 2:
                # Rating number found, consume and break
                i += 1
                break
            # Check if next line is "Pakistan" -> means curr is next center name!
            if i + 1 < len(lines) and lines[i+1] == "Pakistan":
                break
            fields.append(curr)
            i += 1
            
        if len(fields) >= 1:
            addr1 = fields[0] if fields[0] != "—" else ""
        if len(fields) >= 2:
            addr2 = fields[1] if fields[1] != "—" else ""
        if len(fields) >= 3:
            phone = fields[2] if fields[2] != "—" else ""
        if len(fields) >= 4:
            email = fields[3] if fields[3] != "—" else ""
        if len(fields) >= 5:
            website = fields[4] if fields[4] != "—" else ""

        # Slugify name
        slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
        
        centers.append({
            "id": f"mc-{idx:03d}",
            "name": name,
            "slug": slug,
            "country": country,
            "city": city,
            "addressLine1": addr1,
            "addressLine2": addr2,
            "phone": phone,
            "email": email,
            "website": website,
            "source": "Wafid Official Directory"
        })
        idx += 1
    else:
        i += 1

with open("src/data/medical-centers.json", "w", encoding="utf-8") as f:
    json.dump(centers, f, indent=2, ensure_ascii=False)

print(f"Successfully processed {len(centers)} medical centers!")

export type Lang = 'en' | 'hi' | 'gu';

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'hi', label: 'हिन्दी', nativeLabel: 'हिं' },
  { code: 'gu', label: 'ગુજરાતી', nativeLabel: 'ગુજ' },
];

type Dictionary = Record<string, Record<Lang, string>>;

export const translations: Dictionary = {
  'brand.tagline': {
    en: "Purity's Promise",
    hi: 'शुद्धता का वादा',
    gu: 'શુદ્ધતાનું વચન',
  },

  // Promo bar
  'promo.delivery': { en: 'Free Delivery Across India', hi: 'पूरे भारत में मुफ्त डिलीवरी', gu: 'સમગ્ર ભારતમાં મફત ડિલિવરી' },
  'promo.labTested': { en: 'NABL Lab-Tested Batches', hi: 'NABL लैब-परीक्षित बैच', gu: 'NABL લેબ-ટેસ્ટેડ બેચ' },
  'promo.cod': { en: 'Cash on Delivery Available', hi: 'कैश ऑन डिलीवरी उपलब्ध', gu: 'કેશ ઓન ડિલિવરી ઉપલબ્ધ' },
  'promo.vadodara': { en: 'Proudly Based in Vadodara', hi: 'गर्व से वडोदरा से', gu: 'ગર્વથી વડોદરાથી' },

  // Category pill nav
  'pillnav.all': { en: 'All Products', hi: 'सभी उत्पाद', gu: 'બધા ઉત્પાદનો' },

  // Navbar
  'nav.shop': { en: 'Shop', hi: 'खरीदें', gu: 'ખરીદો' },
  'nav.howItWorks': { en: 'How It Works', hi: 'यह कैसे काम करता है', gu: 'તે કેવી રીતે કામ કરે છે' },
  'nav.farmers': { en: 'Farmers', hi: 'किसान', gu: 'ખેડૂતો' },
  'nav.whyBharosa': { en: 'Why Bharosa', hi: 'भरोसा क्यों', gu: 'ભરોસા શા માટે' },
  'nav.searchPlaceholder': {
    en: 'Search verified spices, ghee, honey...',
    hi: 'सत्यापित मसाले, घी, शहद खोजें...',
    gu: 'ચકાસાયેલ મસાલા, ઘી, મધ શોધો...',
  },
  'nav.searchPlaceholderMobile': {
    en: 'Search verified organic items...',
    hi: 'सत्यापित जैविक वस्तुएं खोजें...',
    gu: 'ચકાસાયેલ ઓર્ગેનિક વસ્તુઓ શોધો...',
  },
  'nav.verifyBatch': { en: 'Verify Batch', hi: 'बैच सत्यापित करें', gu: 'બેચ ચકાસો' },
  'nav.verifyBatchFull': {
    en: 'Verify Batch Lab Certificate',
    hi: 'बैच लैब प्रमाणपत्र सत्यापित करें',
    gu: 'બેચ લેબ પ્રમાણપત્ર ચકાસો',
  },
  'nav.sellWithUs': { en: 'Sell With Us', hi: 'हमारे साथ बेचें', gu: 'અમારી સાથે વેચો' },
  'nav.becomeSeller': {
    en: 'Become a Verified Seller',
    hi: 'सत्यापित विक्रेता बनें',
    gu: 'ચકાસાયેલ વિક્રેતા બનો',
  },
  'nav.admin': { en: 'Admin', hi: 'एडमिन', gu: 'એડમિન' },
  'nav.myPanel': { en: 'My Panel', hi: 'मेरा पैनल', gu: 'મારી પેનલ' },
  'nav.adminDashboard': { en: 'Admin Dashboard', hi: 'एडमिन डैशबोर्ड', gu: 'એડમિન ડેશબોર્ડ' },
  'nav.myVendorPanel': { en: 'My Vendor Panel', hi: 'मेरा विक्रेता पैनल', gu: 'મારી વિક્રેતા પેનલ' },
  'nav.signIn': { en: 'Sign In', hi: 'साइन इन करें', gu: 'સાઇન ઇન કરો' },
  'nav.signOut': { en: 'Sign Out', hi: 'साइन आउट करें', gu: 'સાઇન આઉટ કરો' },
  'nav.language': { en: 'Language', hi: 'भाषा', gu: 'ભાષા' },

  // Hero
  'hero.titleLine1': { en: 'Fresh organic goodness,', hi: 'ताज़ा जैविक अच्छाई,', gu: 'તાજી ઓર્ગેનિક ગુણવત્તા,' },
  'hero.titleLine2': { en: 'verified for you.', hi: 'आपके लिए सत्यापित।', gu: 'તમારા માટે ચકાસાયેલ.' },
  'hero.subhead': {
    en: 'Buy NABL Lab-Tested A2 Ghee, Cold-Pressed Oils, Raw Honey & Spices — Direct From Indian Farmers',
    hi: 'NABL लैब-परीक्षित A2 घी, कोल्ड-प्रेस्ड तेल, कच्चा शहद एवं मसाले खरीदें — सीधे भारतीय किसानों से',
    gu: 'NABL લેબ-ટેસ્ટેડ A2 ઘી, કોલ્ડ-પ્રેસ્ડ તેલ, કાચું મધ અને મસાલા ખરીદો — સીધા ભારતીય ખેડૂતો પાસેથી',
  },
  'hero.paragraph': {
    en: 'Every spice, oil, ghee, and grain undergoes independent lab testing for 230+ chemical pesticides before reaching your kitchen — sourced directly from local Indian organic farmers.',
    hi: 'हर मसाला, तेल, घी एवं अनाज आपकी रसोई तक पहुँचने से पहले 230+ रासायनिक कीटनाशकों के लिए स्वतंत्र लैब परीक्षण से गुज़रता है — सीधे स्थानीय भारतीय जैविक किसानों से प्राप्त।',
    gu: 'દરેક મસાલો, તેલ, ઘી અને અનાજ તમારા રસોડા સુધી પહોંચતા પહેલા 230+ રાસાયણિક જંતુનાશકો માટે સ્વતંત્ર લેબ પરીક્ષણમાંથી પસાર થાય છે — સીધા સ્થાનિક ભારતીય ઓર્ગેનિક ખેડૂતો પાસેથી.',
  },
  'hero.ctaShop': { en: 'Shop Verified Organic', hi: 'सत्यापित जैविक खरीदें', gu: 'ચકાસાયેલ ઓર્ગેનિક ખરીદો' },
  'hero.ctaVerify': { en: 'Verify Lab Report', hi: 'लैब रिपोर्ट सत्यापित करें', gu: 'લેબ રિપોર્ટ ચકાસો' },
  'hero.trustZeroChemical': { en: '100% Zero Chemical', hi: '100% रसायन मुक्त', gu: '100% કેમિકલ મુક્ત' },
  'hero.trustFairPrice': { en: 'Fair Price to Farmers', hi: 'किसानों को उचित मूल्य', gu: 'ખેડૂતોને વાજબી ભાવ' },
  'hero.trustQrTrace': { en: 'QR Farm Traceability', hi: 'क्यूआर फार्म ट्रेसेबिलिटी', gu: 'ક્યુઆર ફાર્મ ટ્રેસેબિલિટી' },
  'hero.featuredBatch': { en: 'Featured Farm Batch', hi: 'विशेष फार्म बैच', gu: 'વિશેષ ફાર્મ બેચ' },
  'hero.labCert': { en: 'Lab Certificate:', hi: 'लैब प्रमाणपत्र:', gu: 'લેબ પ્રમાણપત્ર:' },
  'hero.inspect': { en: 'Inspect', hi: 'जांचें', gu: 'તપાસો' },
  'hero.farmersCount': { en: '500+ organic farmers', hi: '500+ जैविक किसान', gu: '500+ ઓર્ગેનિક ખેડૂતો' },
  'hero.farmersVerified': { en: 'verified and partnered', hi: 'सत्यापित एवं साझेदार', gu: 'ચકાસાયેલ અને ભાગીદાર' },

  // Trust process
  'trust.eyebrow': { en: 'Our Standard', hi: 'हमारा मानक', gu: 'અમારું ધોરણ' },
  'trust.title': { en: 'How Bharosa Works', hi: 'भरोसा कैसे काम करता है', gu: 'ભરોસા કેવી રીતે કામ કરે છે' },
  'trust.desc': {
    en: 'We check every farmer, test every batch in accredited labs, and seal approved products with QR-traceable purity guarantees.',
    hi: 'हम हर किसान की जांच करते हैं, मान्यता प्राप्त लैब में हर बैच का परीक्षण करते हैं, एवं स्वीकृत उत्पादों पर क्यूआर-ट्रेसेबल शुद्धता गारंटी की मुहर लगाते हैं।',
    gu: 'અમે દરેક ખેડૂતની ચકાસણી કરીએ છીએ, માન્યતા પ્રાપ્ત લેબમાં દરેક બેચનું પરીક્ષણ કરીએ છીએ, અને મંજૂર ઉત્પાદનો પર ક્યુઆર-ટ્રેસેબલ શુદ્ધતા ગેરંટીની સીલ લગાવીએ છીએ.',
  },
  'trust.protocol': { en: 'Rigorous protocol', hi: 'कठोर प्रोटोकॉल', gu: 'કડક પ્રોટોકોલ' },
  'trust.bannerTitle': {
    en: 'Want to see real batch lab results?',
    hi: 'असली बैच लैब परिणाम देखना चाहते हैं?',
    gu: 'ખરેખરા બેચ લેબ પરિણામો જોવા છે?',
  },
  'trust.bannerDesc': {
    en: 'Enter any product batch code to inspect pesticide, heavy metal, and purity scores in real time.',
    hi: 'कीटनाशक, भारी धातु एवं शुद्धता स्कोर को वास्तविक समय में देखने के लिए कोई भी उत्पाद बैच कोड दर्ज करें।',
    gu: 'જંતુનાશક, ભારે ધાતુ અને શુદ્ધતા સ્કોર રીઅલ-ટાઇમમાં જોવા માટે કોઈપણ ઉત્પાદન બેચ કોડ દાખલ કરો.',
  },
  'trust.launchVerifier': {
    en: 'Launch Batch Verifier',
    hi: 'बैच सत्यापनकर्ता लॉन्च करें',
    gu: 'બેચ ચકાસણી શરૂ કરો',
  },

  // Categories
  'categories.eyebrow': { en: 'Curated Collections', hi: 'चयनित संग्रह', gu: 'ક્યુરેટેડ કલેક્શન' },
  'categories.title': { en: 'Shop by Category', hi: 'श्रेणी अनुसार खरीदें', gu: 'કેટેગરી પ્રમાણે ખરીદો' },
  'categories.desc': {
    en: 'Every category carries the Bharosa Verified Seal — each batch is tested for 230+ chemical residues before packaging.',
    hi: 'हर श्रेणी भरोसा सत्यापित सील धारण करती है — प्रत्येक बैच पैकेजिंग से पहले 230+ रासायनिक अवशेषों के लिए परीक्षित होता है।',
    gu: 'દરેક કેટેગરી ભરોસા ચકાસાયેલ સીલ ધરાવે છે — દરેક બેચ પેકેજિંગ પહેલાં 230+ રાસાયણિક અવશેષો માટે પરીક્ષણ કરવામાં આવે છે.',
  },
  'categories.explore': { en: 'Explore', hi: 'देखें', gu: 'જુઓ' },

  // Vendors section
  'vendors.eyebrow': { en: 'Direct Producer Marketplace', hi: 'प्रत्यक्ष उत्पादक बाज़ार', gu: 'સીધું ઉત્પાદક બજાર' },
  'vendors.title': {
    en: 'Our Verified Farmers & Artisans',
    hi: 'हमारे सत्यापित किसान एवं कारीगर',
    gu: 'અમારા ચકાસાયેલ ખેડૂતો અને કારીગરો',
  },
  'vendors.desc': {
    en: 'Meet the real families behind your daily food. Every seller passes on-site farm inspections and holds verified organic credentials.',
    hi: 'अपने रोज़ाना के भोजन के पीछे के असली परिवारों से मिलें। हर विक्रेता ऑन-साइट फार्म निरीक्षण से गुज़रता है एवं सत्यापित जैविक प्रमाणपत्र रखता है।',
    gu: 'તમારા રોજિંદા ખોરાક પાછળના સાચા પરિવારોને મળો. દરેક વિક્રેતા ઓન-સાઇટ ફાર્મ નિરીક્ષણમાંથી પસાર થાય છે અને ચકાસાયેલ ઓર્ગેનિક પ્રમાણપત્રો ધરાવે છે.',
  },
  'vendors.specialty': { en: 'Specialty', hi: 'विशेषता', gu: 'વિશેષતા' },
  'vendors.quickView': { en: 'Quick View', hi: 'त्वरित दृश्य', gu: 'ઝડપી દૃશ્ય' },
  'vendors.viewProfile': { en: 'View Full Profile', hi: 'पूरी प्रोफ़ाइल देखें', gu: 'સંપૂર્ણ પ્રોફાઇલ જુઓ' },

  // Why Bharosa
  'why.eyebrow': { en: 'The Bharosa Standard', hi: 'भरोसा मानक', gu: 'ભરોસા ધોરણ' },
  'why.title': { en: 'Why Choose Bharosa Shop?', hi: 'भरोसा शॉप क्यों चुनें?', gu: 'ભરોસા શોપ કેમ પસંદ કરો?' },
  'why.quote': {
    en: 'We bridge authentic Indian farming traditions with modern laboratory verification so your family enjoys the best organic products and pure nourishment.',
    hi: 'हम प्रामाणिक भारतीय कृषि परंपराओं को आधुनिक प्रयोगशाला सत्यापन से जोड़ते हैं ताकि आपका परिवार सर्वोत्तम जैविक उत्पादों एवं शुद्ध पोषण का आनंद ले सके।',
    gu: 'અમે અધિકૃત ભારતીય ખેતી પરંપરાઓને આધુનિક પ્રયોગશાળા ચકાસણી સાથે જોડીએ છીએ જેથી તમારો પરિવાર શ્રેષ્ઠ ઓર્ગેનિક ઉત્પાદનો અને શુદ્ધ પોષણનો આનંદ માણી શકે.',
  },

  // Vendor callout
  'vendorCallout.eyebrow': {
    en: 'Producer Partnership Network',
    hi: 'उत्पादक साझेदारी नेटवर्क',
    gu: 'ઉત્પાદક ભાગીદારી નેટવર્ક',
  },
  'vendorCallout.title': {
    en: 'Sell Your Organic Products on Bharosa Shop',
    hi: 'भरोसा शॉप पर अपने जैविक उत्पाद बेचें',
    gu: 'ભરોસા શોપ પર તમારા ઓર્ગેનિક ઉત્પાદનો વેચો',
  },
  'vendorCallout.desc': {
    en: "Join 500+ verified organic farmers already selling on India's most trusted lab-verified marketplace. We handle lab testing logistics and marketing while you get direct access to 45,000+ conscious households.",
    hi: 'भारत के सबसे भरोसेमंद लैब-सत्यापित बाज़ार पर पहले से बेच रहे 500+ सत्यापित जैविक किसानों से जुड़ें। हम लैब परीक्षण एवं मार्केटिंग संभालते हैं जबकि आपको 45,000+ जागरूक परिवारों तक सीधी पहुंच मिलती है।',
    gu: 'ભારતના સૌથી વિશ્વસનીય લેબ-ચકાસાયેલ બજાર પર પહેલેથી વેચાણ કરી રહેલા 500+ ચકાસાયેલ ઓર્ગેનિક ખેડૂતો સાથે જોડાઓ. અમે લેબ ટેસ્ટિંગ અને માર્કેટિંગ સંભાળીએ છીએ જ્યારે તમને 45,000+ જાગૃત પરિવારો સુધી સીધી પહોંચ મળે છે.',
  },
  'vendorCallout.benefit1': {
    en: '0% Listing Commission (First 90 Days)',
    hi: '0% लिस्टिंग कमीशन (पहले 90 दिन)',
    gu: '0% લિસ્ટિંગ કમિશન (પ્રથમ 90 દિવસ)',
  },
  'vendorCallout.benefit2': {
    en: 'Free NABL Lab Testing Assistance',
    hi: 'मुफ्त NABL लैब परीक्षण सहायता',
    gu: 'મફત NABL લેબ ટેસ્ટિંગ સહાય',
  },
  'vendorCallout.benefit3': {
    en: 'Direct Bi-weekly Bank Payouts',
    hi: 'प्रत्यक्ष पाक्षिक बैंक भुगतान',
    gu: 'સીધી પખવાડિક બેંક ચુકવણી',
  },
  'vendorCallout.benefit4': {
    en: 'Bharosa Organic Verified Stamp',
    hi: 'भरोसा जैविक सत्यापित मुहर',
    gu: 'ભરોસા ઓર્ગેનિક ચકાસાયેલ સ્ટેમ્પ',
  },
  'vendorCallout.cta': { en: 'Become a Verified Seller', hi: 'सत्यापित विक्रेता बनें', gu: 'ચકાસાયેલ વિક્રેતા બનો' },
  'vendorCallout.footnote': {
    en: 'Over 500+ organic farmers onboarded across 12 states.',
    hi: '12 राज्यों में 500+ से अधिक जैविक किसान जुड़ चुके हैं।',
    gu: '12 રાજ્યોમાં 500+ થી વધુ ઓર્ગેનિક ખેડૂતો જોડાયેલા છે.',
  },

  // FAQ
  'faq.eyebrow': { en: 'Common Questions', hi: 'सामान्य प्रश्न', gu: 'સામાન્ય પ્રશ્નો' },
  'faq.title': { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न', gu: 'વારંવાર પૂછાતા પ્રશ્નો' },
  'faq.q1': {
    en: 'Is Bharosa Shop’s ghee really lab tested?',
    hi: 'क्या भरोसा शॉप का घी वाकई लैब में परीक्षित है?',
    gu: 'શું ભરોસા શોપનું ઘી ખરેખર લેબમાં પરીક્ષણ કરેલું છે?',
  },
  'faq.a1': {
    en: 'Yes. Every batch of our A2 Bilona ghee is screened by NABL-accredited labs for 230+ chemical pesticides and purity markers before it’s listed. Each product carries a QR batch code you can scan to view the full lab report.',
    hi: 'हाँ। हमारे A2 बिलोना घी का हर बैच सूचीबद्ध होने से पहले NABL-मान्यता प्राप्त लैब द्वारा 230+ रासायनिक कीटनाशकों एवं शुद्धता मानकों के लिए जांचा जाता है। हर उत्पाद पर एक क्यूआर बैच कोड होता है जिसे स्कैन कर आप पूरी लैब रिपोर्ट देख सकते हैं।',
    gu: 'હા. અમારા A2 બિલોના ઘીનો દરેક બેચ લિસ્ટ થાય તે પહેલાં NABL-માન્યતા પ્રાપ્ત લેબ દ્વારા 230+ રાસાયણિક જંતુનાશકો અને શુદ્ધતા માપદંડો માટે તપાસવામાં આવે છે. દરેક ઉત્પાદન પર ક્યુઆર બેચ કોડ હોય છે જે સ્કેન કરીને તમે સંપૂર્ણ લેબ રિપોર્ટ જોઈ શકો છો.',
  },
  'faq.q2': {
    en: 'How do I sell my organic products on Bharosa Shop?',
    hi: 'मैं भरोसा शॉप पर अपने जैविक उत्पाद कैसे बेचूं?',
    gu: 'હું ભરોસા શોપ પર મારા ઓર્ગેનિક ઉત્પાદનો કેવી રીતે વેચી શકું?',
  },
  'faq.a2': {
    en: 'Apply for Verified Seller status from the homepage or footer. Our team assists with NABL lab testing, and once approved you get zero listing commission for your first 90 days plus direct bi-weekly payouts.',
    hi: 'होमपेज या फुटर से सत्यापित विक्रेता स्थिति के लिए आवेदन करें। हमारी टीम NABL लैब परीक्षण में सहायता करती है, एवं स्वीकृति के बाद आपको पहले 90 दिनों के लिए शून्य लिस्टिंग कमीशन के साथ प्रत्यक्ष पाक्षिक भुगतान मिलता है।',
    gu: 'હોમપેજ અથવા ફૂટરમાંથી ચકાસાયેલ વિક્રેતા સ્ટેટસ માટે અરજી કરો. અમારી ટીમ NABL લેબ ટેસ્ટિંગમાં મદદ કરે છે, અને મંજૂરી પછી તમને પ્રથમ 90 દિવસ માટે શૂન્ય લિસ્ટિંગ કમિશન સાથે સીધી પખવાડિક ચુકવણી મળે છે.',
  },
  'faq.q3': {
    en: 'What does the Bharosa Verified Seal mean?',
    hi: 'भरोसा सत्यापित सील का क्या अर्थ है?',
    gu: 'ભરોસા ચકાસાયેલ સીલનો અર્થ શું છે?',
  },
  'faq.a3': {
    en: 'The Bharosa Verified Seal is only awarded to vendors and products that pass our 3-step farm vetting system, including independent lab testing for chemical residues and full farm-to-table traceability.',
    hi: 'भरोसा सत्यापित सील केवल उन विक्रेताओं एवं उत्पादों को दी जाती है जो हमारी 3-चरण फार्म जांच प्रणाली को पास करते हैं, जिसमें रासायनिक अवशेषों के लिए स्वतंत्र लैब परीक्षण एवं संपूर्ण फार्म-से-मेज़ ट्रेसेबिलिटी शामिल है।',
    gu: 'ભરોસા ચકાસાયેલ સીલ ફક્ત તે વિક્રેતાઓ અને ઉત્પાદનોને આપવામાં આવે છે જે અમારી 3-પગલાની ફાર્મ ચકાસણી પ્રણાલી પાસ કરે છે, જેમાં રાસાયણિક અવશેષો માટે સ્વતંત્ર લેબ ટેસ્ટિંગ અને સંપૂર્ણ ફાર્મ-થી-ટેબલ ટ્રેસેબિલિટીનો સમાવેશ થાય છે.',
  },
  'faq.q4': {
    en: 'Does Bharosa Shop deliver across India?',
    hi: 'क्या भरोसा शॉप पूरे भारत में डिलीवरी करता है?',
    gu: 'શું ભરોસા શોપ સમગ્ર ભારતમાં ડિલિવરી કરે છે?',
  },
  'faq.a4': {
    en: 'Yes, we ship pan-India from our verified farmer network, with cold-chain handling for perishables like ghee and honey where required.',
    hi: 'हाँ, हम अपने सत्यापित किसान नेटवर्क से पूरे भारत में शिपिंग करते हैं, आवश्यकतानुसार घी एवं शहद जैसी नाशवान वस्तुओं के लिए कोल्ड-चेन हैंडलिंग के साथ।',
    gu: 'હા, અમે અમારા ચકાસાયેલ ખેડૂત નેટવર્કમાંથી સમગ્ર ભારતમાં શિપિંગ કરીએ છીએ, જરૂર પડ્યે ઘી અને મધ જેવી નાશવંત વસ્તુઓ માટે કોલ્ડ-ચેન હેન્ડલિંગ સાથે.',
  },

  // Home (featured products + testimonials)
  'home.specialsEyebrow': { en: 'Batch-Screened Specials', hi: 'बैच-जांचित विशेष', gu: 'બેચ-તપાસેલ ખાસ' },
  'home.specialsTitle': {
    en: 'Featured Verified Harvests',
    hi: 'विशेष सत्यापित फसल',
    gu: 'વિશેષ ચકાસાયેલ પાક',
  },
  'home.viewAllCategories': { en: 'View All Categories', hi: 'सभी श्रेणियाँ देखें', gu: 'બધી કેટેગરી જુઓ' },
  'home.noProducts': {
    en: 'No verified products yet — check back soon as our farmers get approved.',
    hi: 'अभी तक कोई सत्यापित उत्पाद नहीं — हमारे किसानों के स्वीकृत होते ही जल्द वापस देखें।',
    gu: 'હજુ સુધી કોઈ ચકાસાયેલ ઉત્પાદનો નથી — અમારા ખેડૂતો મંજૂર થતાં જ ટૂંક સમયમાં ફરી તપાસો.',
  },
  'home.storiesEyebrow': { en: 'Customer Stories', hi: 'ग्राहक कहानियाँ', gu: 'ગ્રાહક વાર્તાઓ' },
  'home.storiesTitle': {
    en: 'Trusted by 45,000+ Kitchens Across India',
    hi: 'पूरे भारत में 45,000+ रसोई का भरोसा',
    gu: 'સમગ્ર ભારતમાં 45,000+ રસોડાનો ભરોસો',
  },

  // Farmer agreement — homepage summary section
  'agrSection.eyebrow': { en: 'Seller Terms', hi: 'विक्रेता शर्तें', gu: 'વિક્રેતા શરતો' },
  'agrSection.title': {
    en: 'Our Farmer Supply & Quality Agreement',
    hi: 'हमारा किसान आपूर्ति एवं गुणवत्ता अनुबंध',
    gu: 'અમારો ખેડૂત સપ્લાય અને ગુણવત્તા કરાર',
  },
  'agrSection.desc': {
    en: 'Every farmer and seller on Bharosa Shop works under one clear, tri-lingual agreement — so quality standards, lab testing, payouts, and returns are transparent from day one.',
    hi: 'भरोसा शॉप पर हर किसान और विक्रेता एक स्पष्ट, त्रिभाषी अनुबंध के तहत काम करता है — ताकि गुणवत्ता मानक, लैब जांच, भुगतान और रिटर्न पहले दिन से पारदर्शी रहें।',
    gu: 'ભરોસા શોપ પરનો દરેક ખેડૂત અને વિક્રેતા એક સ્પષ્ટ, ત્રિભાષી કરાર હેઠળ કામ કરે છે — જેથી ગુણવત્તાના ધોરણો, લેબ ટેસ્ટિંગ, પેમેન્ટ અને રિટર્ન પહેલા દિવસથી પારદર્શક રહે.',
  },
  'agrSection.cta': { en: 'Read Full Agreement', hi: 'पूरा अनुबंध पढ़ें', gu: 'સંપૂર્ણ કરાર વાંચો' },
  'agrSection.note': {
    en: 'Available in English, Gujarati & Hindi · PDF download included',
    hi: 'अंग्रेज़ी, गुजराती एवं हिन्दी में उपलब्ध · PDF डाउनलोड सहित',
    gu: 'અંગ્રેજી, ગુજરાતી અને હિન્દીમાં ઉપલબ્ધ · PDF ડાઉનલોડ સાથે',
  },
  'agrSection.disclaimer': {
    en: 'This is a short summary. Please read the full agreement for complete terms.',
    hi: 'यह एक संक्षिप्त सारांश है। पूर्ण शर्तों के लिए कृपया पूरा अनुबंध पढ़ें।',
    gu: 'આ એક ટૂંકો સારાંશ છે. સંપૂર્ણ શરતો માટે કૃપા કરીને સંપૂર્ણ કરાર વાંચો.',
  },
  'agrSection.p1.title': { en: '100% chemical-free warranty', hi: '100% रसायन-मुक्त गारंटी', gu: '૧૦૦% કેમિકલ મુક્ત ખાતરી' },
  'agrSection.p1.desc': {
    en: 'Products must be free of synthetic fertilizers, toxic pesticides, carbide, and adulterants.',
    hi: 'उत्पाद रासायनिक उर्वरक, कीटनाशक, कार्बाइड और मिलावट से मुक्त होने चाहिए।',
    gu: 'ઉત્પાદનો રાસાયણિક ખાતર, ઝેરી જંતુનાશકો, કાર્બાઇડ અને ભેળસેળથી મુક્ત હોવા જોઈએ.',
  },
  'agrSection.p2.title': { en: 'Random NABL lab testing', hi: 'रैंडम NABL लैब जांच', gu: 'રેન્ડમ NABL લેબ ટેસ્ટિંગ' },
  'agrSection.p2.desc': {
    en: 'Any batch can be sampled at any stage. Bharosa pays if it passes; the seller pays if it fails.',
    hi: 'किसी भी बैच का किसी भी चरण में नमूना लिया जा सकता है। पास होने पर खर्च भरोसा वहन करता है; फेल होने पर विक्रेता।',
    gu: 'કોઈપણ બેચનું કોઈપણ તબક્કે સેમ્પલ લઈ શકાય છે. પાસ થાય તો ખર્ચ ભરોસા ભોગવે છે; ફેલ થાય તો વિક્રેતા.',
  },
  'agrSection.p3.title': { en: '1-week payment cycle', hi: '1 सप्ताह का भुगतान चक्र', gu: '૧ અઠવાડિયાનું પેમેન્ટ સાયકલ' },
  'agrSection.p3.desc': {
    en: 'Paid 1 week (7 business days) after successful delivery, once the customer is satisfied and there is no dispute.',
    hi: 'सफल डिलीवरी के 1 सप्ताह (7 दिन) बाद, ग्राहक की संतुष्टि और कोई विवाद न होने पर भुगतान किया जाता है।',
    gu: 'સફળ ડિલિવરીના ૧ અઠવાડિયા (૭ દિવસ) પછી, ગ્રાહક સંતુષ્ટ હોય અને કોઈ વિવાદ ન હોય ત્યારે પેમેન્ટ કરવામાં આવે છે.',
  },
  'agrSection.p4.title': { en: 'Strict action on adulteration', hi: 'मिलावट पर सख्त कार्रवाई', gu: 'ભેળસેળ પર કડક કાર્યવાહી' },
  'agrSection.p4.desc': {
    en: 'Adulterated or chemically treated products mean blacklisting and a minimum ₹1,00,000 penalty, plus legal action.',
    hi: 'मिलावटी या रसायन-उपचारित उत्पाद पर ब्लैकलिस्ट, न्यूनतम ₹1,00,000 जुर्माना और कानूनी कार्रवाई।',
    gu: 'ભેળસેળવાળા કે કેમિકલ-ટ્રીટેડ ઉત્પાદન પર બ્લેકલિસ્ટ, લઘુત્તમ ₹૧,૦૦,૦૦૦ દંડ અને કાયદેસર કાર્યવાહી.',
  },
  'agrSection.p5.title': { en: 'Returns & courier charges', hi: 'रिटर्न एवं कूरियर खर्च', gu: 'રિટર્ન અને કુરિયર ખર્ચ' },
  'agrSection.p5.desc': {
    en: 'For quality-related returns and RTO, return courier and logistics costs are borne by the seller.',
    hi: 'गुणवत्ता से जुड़े रिटर्न और RTO पर रिटर्न कूरियर व लॉजिस्टिक्स खर्च विक्रेता वहन करता है।',
    gu: 'ગુણવત્તા સંબંધિત રિટર્ન અને RTO પર રિટર્ન કુરિયર અને લોજિસ્ટિક્સ ખર્ચ વિક્રેતા ભોગવે છે.',
  },
  'agrSection.p6.title': { en: 'Vadodara jurisdiction', hi: 'वडोदरा क्षेत्राधिकार', gu: 'વડોદરા હકુમત' },
  'agrSection.p6.desc': {
    en: 'Disputes are governed by Indian law and the competent courts of Vadodara, Gujarat.',
    hi: 'विवाद भारतीय कानून एवं वडोदरा, गुजरात के सक्षम न्यायालयों के अधीन होंगे।',
    gu: 'વિવાદો ભારતીય કાયદા અને વડોદરા, ગુજરાતની સક્ષમ કોર્ટોને આધીન રહેશે.',
  },

  // Farmer agreement — full page
  'agr.breadcrumbHome': { en: 'Home', hi: 'होम', gu: 'હોમ' },
  'agr.breadcrumb': { en: 'Farmer Agreement', hi: 'किसान अनुबंध', gu: 'ખેડૂત કરાર' },
  'agr.eyebrow': {
    en: 'For Farmers & Sellers',
    hi: 'किसानों एवं विक्रेताओं के लिए',
    gu: 'ખેડૂતો અને વિક્રેતાઓ માટે',
  },
  'agr.langAll': { en: 'All languages', hi: 'सभी भाषाएँ', gu: 'બધી ભાષાઓ' },
  'agr.downloadTitle': { en: 'Download the Agreement', hi: 'अनुबंध डाउनलोड करें', gu: 'કરાર ડાઉનલોડ કરો' },
  'agr.downloadDesc': {
    en: 'Get the complete tri-lingual agreement (English, Gujarati & Hindi) as a PDF for your records.',
    hi: 'पूरा त्रिभाषी अनुबंध (अंग्रेज़ी, गुजराती एवं हिन्दी) अपने रिकॉर्ड के लिए PDF में प्राप्त करें।',
    gu: 'સંપૂર્ણ ત્રિભાષી કરાર (અંગ્રેજી, ગુજરાતી અને હિન્દી) તમારા રેકોર્ડ માટે PDF માં મેળવો.',
  },
  'agr.downloadBtn': {
    en: 'Download Agreement (PDF)',
    hi: 'अनुबंध डाउनलोड करें (PDF)',
    gu: 'કરાર ડાઉનલોડ કરો (PDF)',
  },

  // Footer
  'footer.farmerAgreement': { en: 'Farmer Agreement', hi: 'किसान अनुबंध', gu: 'ખેડૂત કરાર' },
  'footer.desc': {
    en: 'Every vendor and product listed on Bharosa Shop is thoroughly vetted. Only the best lab-certified organic products earn the signature Bharosa Verified Badge.',
    hi: 'भरोसा शॉप पर सूचीबद्ध हर विक्रेता एवं उत्पाद की पूरी तरह जांच की जाती है। केवल सर्वोत्तम लैब-प्रमाणित जैविक उत्पाद ही सिग्नेचर भरोसा सत्यापित बैज अर्जित करते हैं।',
    gu: 'ભરોસા શોપ પર સૂચિબદ્ધ દરેક વિક્રેતા અને ઉત્પાદનની સંપૂર્ણ ચકાસણી કરવામાં આવે છે. ફક્ત શ્રેષ્ઠ લેબ-પ્રમાણિત ઓર્ગેનિક ઉત્પાદનો જ સિગ્નેચર ભરોસા ચકાસાયેલ બેજ મેળવે છે.',
  },
  'footer.categoriesHeading': { en: 'Organic Categories', hi: 'जैविक श्रेणियाँ', gu: 'ઓર્ગેનિક કેટેગરી' },
  'footer.cat1': { en: 'A2 Desi Cow Ghee', hi: 'A2 देसी गाय का घी', gu: 'A2 દેશી ગાયનું ઘી' },
  'footer.cat2': { en: 'Lakadong Turmeric & Spices', hi: 'लकाडोंग हल्दी एवं मसाले', gu: 'લકાડોંગ હળદર અને મસાલા' },
  'footer.cat3': { en: 'Raw Wild Forest Honey', hi: 'कच्चा जंगली शहद', gu: 'કાચું જંગલી મધ' },
  'footer.cat4': { en: 'Wood-Pressed Kachi Ghani Oils', hi: 'लकड़ी घानी का तेल', gu: 'લાકડાની ઘાણીનું તેલ' },
  'footer.cat5': { en: 'Khapli Wheat & Ancient Grains', hi: 'खपली गेहूं एवं प्राचीन अनाज', gu: 'ખાપલી ઘઉં અને પ્રાચીન અનાજ' },
  'footer.trustHeading': { en: 'Trust & Quality', hi: 'भरोसा एवं गुणवत्ता', gu: 'ભરોસો અને ગુણવત્તા' },
  'footer.trustLink1': {
    en: '3-Step Farm Vetting System',
    hi: '3-चरण फार्म जांच प्रणाली',
    gu: '3-પગલાની ફાર્મ ચકાસણી પ્રણાલી',
  },
  'footer.trustLink2': {
    en: 'NABL Lab Testing Standard',
    hi: 'NABL लैब परीक्षण मानक',
    gu: 'NABL લેબ ટેસ્ટિંગ ધોરણ',
  },
  'footer.trustLink3': { en: 'Meet Our Organic Farmers', hi: 'हमारे जैविक किसानों से मिलें', gu: 'અમારા ઓર્ગેનિક ખેડૂતોને મળો' },
  'footer.trustLink4': {
    en: 'Apply for Seller Verification',
    hi: 'विक्रेता सत्यापन के लिए आवेदन करें',
    gu: 'વિક્રેતા ચકાસણી માટે અરજી કરો',
  },
  'footer.trustLink5': { en: 'Why Bharosa', hi: 'भरोसा क्यों', gu: 'ભરોસા શા માટે' },
  'footer.helplineHeading': { en: 'Helpline', hi: 'हेल्पलाइन', gu: 'હેલ્પલાઇન' },
  'footer.connectHeading': { en: 'Stay Connected', hi: 'जुड़े रहें', gu: 'જોડાયેલા રહો' },
  'footer.connectDesc': {
    en: 'Receive seasonal harvest alerts and traditional Ayurvedic organic recipes.',
    hi: 'मौसमी फसल अलर्ट एवं पारंपरिक आयुर्वेदिक जैविक व्यंजन प्राप्त करें।',
    gu: 'મોસમી પાક ચેતવણીઓ અને પરંપરાગત આયુર્વેદિક ઓર્ગેનિક વાનગીઓ મેળવો.',
  },
  'footer.emailPlaceholder': { en: 'Your email address', hi: 'आपका ईमेल पता', gu: 'તમારું ઇમેઇલ સરનામું' },
  'footer.join': { en: 'Join', hi: 'जुड़ें', gu: 'જોડાઓ' },
  'footer.subscribed': {
    en: 'Subscribed to Bharosa Harvest Alerts!',
    hi: 'भरोसा हार्वेस्ट अलर्ट की सदस्यता ले ली गई!',
    gu: 'ભરોસા હાર્વેસ્ટ એલર્ટ્સ માટે સબ્સ્ક્રાઇબ થયું!',
  },
  'footer.backToTop': { en: 'Back to Top', hi: 'ऊपर वापस जाएँ', gu: 'ઉપર પાછા જાઓ' },
  'footer.rightsReserved': { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।', gu: 'તમામ હકો સુરક્ષિત.' },
  'footer.privacyPolicy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति', gu: 'ગોપનીયતા નીતિ' },
  'footer.labVettingTerms': { en: 'Lab Vetting Terms', hi: 'लैब जांच शर्तें', gu: 'લેબ તપાસ શરતો' },
};

export function translate(lang: Lang, key: string): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

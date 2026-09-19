import type { Lang } from '@/lib/i18n/translations';

export type AgreementSegment = { t: string; k?: 'strong' | 'critical' };
export type AgreementText = Record<Lang, AgreementSegment[]>;

export interface AgreementClause {
  id: string;
  title: Record<Lang, string>;
  body: AgreementText;
}

export const AGREEMENT_PDF = {
  href: '/documents/Bharosa_Shop_Farmer_Agreement_TriLingual.pdf',
  downloadName: 'Bharosa_Shop_Farmer_Agreement_TriLingual.pdf',
  meta: 'PDF · 2 pages · 57 KB',
};

export const AGREEMENT_TITLE: Record<Lang, string> = {
  en: 'Farmer Supply, Quality Compliance & Platform Agreement',
  gu: 'ખેડૂત સપ્લાય, ગુણવત્તા પાલન અને પ્લેટફોર્મ કરાર',
  hi: 'किसान आपूर्ति, गुणवत्ता अनुपालन एवं अनुबंध',
};

export const AGREEMENT_TAGLINE = 'Honestly Pure • 100% Chemical-Free & Pesticide-Free';

export const AGREEMENT_PARTIES: AgreementText = {
  en: [
    { t: 'Agreement Parties:', k: 'strong' },
    { t: ' Executed between ' },
    { t: 'BHAROSA SHOP (www.bharosa.shop)', k: 'strong' },
    { t: ', Vadodara, Gujarat ("Company") and the undersigned Registered Farmer / Producer / Seller ("Seller").' },
  ],
  gu: [
    { t: 'કરારના પક્ષકારો:', k: 'strong' },
    { t: ' આ કરાર ' },
    { t: 'ભરોસા શોપ (www.bharosa.shop)', k: 'strong' },
    { t: ', વડોદરા, ગુજરાત ("કંપની") અને નીચે સહી કરનાર ખેડૂત/ઉત્પાદક/વિક્રેતા ("વિક્રેતા") વચ્ચે કરવામાં આવ્યો છે.' },
  ],
  hi: [
    { t: 'अनुबंध के पक्षकार:', k: 'strong' },
    { t: ' यह अनुबंध ' },
    { t: 'भरोसा शॉप (www.bharosa.shop)', k: 'strong' },
    { t: ', वडोदरा, गुजरात ("कंपनी") एवं पंजीकृत किसान / विक्रेता ("विक्रेता") के बीच निष्पादित किया गया है।' },
  ],
};

export const AGREEMENT_CLAUSES: AgreementClause[] = [
  {
    id: 'purity-warranty',
    title: {
      en: 'Absolute Zero-Chemical & 100% Purity Warranty',
      gu: 'શુદ્ધતા અને કેમિકલ મુક્ત ખાતરી',
      hi: '100% रसायन-मुक्त एवं शुद्धता गारंटी',
    },
    body: {
      en: [
        {
          t: 'The Seller strictly warrants that 100% of all supplied products (Grains, Spices, Seasonal Fruits, etc.) are purely natural, genuine, and completely free from synthetic chemical fertilizers, toxic pesticides, artificial ripening agents (such as calcium carbide), artificial colors, chemical preservatives, or counterfeit adulterants.',
        },
      ],
      gu: [
        {
          t: 'વિક્રેતા સંપૂર્ણ ખાતરી આપે છે કે સપ્લાય કરાયેલ તમામ ઉત્પાદનો (અનાજ, મસાલા, મોસમી ફળો વગેરે) ૧૦૦% કુદરતી અને શુદ્ધ છે; તેમાં કોઈ પણ પ્રકારના રાસાયણિક ખાતરો, ઝેરી જંતુનાશકો, કાર્બાઇડ કે અન્ય કૃત્રિમ પકવવાના કેમિકલ, ભેળસેળ કે કૃત્રિમ રંગોનો ઉપયોગ કરવામાં આવેલ નથી.',
        },
      ],
      hi: [
        {
          t: 'विक्रेता पूर्णतः गारंटी देता है कि आपूर्ति किए गए सभी उत्पाद (अनाज, मसाले, मौसमी फल आदि) 100% प्राकृतिक और शुद्ध हैं; इनमें किसी भी प्रकार के रासायनिक उर्वरक, कीटनाशक, कृत्रिम पकाने वाले रसायन (कार्बाइड), मिलावट या कृत्रिम रंगों का प्रयोग नहीं किया गया है।',
        },
      ],
    },
  },
  {
    id: 'lab-testing',
    title: {
      en: 'Random Lab Testing & Testing Cost Liability',
      gu: 'રેન્ડમ લેબ ટેસ્ટ અને ખર્ચની જવાબદારી',
      hi: 'रैंडम लैब टेस्ट एवं शुल्क देयता',
    },
    body: {
      en: [
        {
          t: 'Bharosa Shop holds the unconditional right to collect random samples from any batch at any stage for testing in certified/NABL-accredited laboratories. If the product passes, Bharosa Shop bears the testing fees. ',
        },
        {
          t: 'If the product fails the lab test (traces of chemical, pesticide, carbide, or adulteration found), 100% of the testing fee shall be borne entirely by the Seller and deducted directly from payouts.',
          k: 'critical',
        },
      ],
      gu: [
        {
          t: 'ભરોસા શોપને કોઈપણ સમયે કોઈપણ પ્રોડક્ટનું રેન્ડમ સેમ્પલ લઈ માન્ય લેબોરેટરીમાં ટેસ્ટિંગ કરવાનો સંપૂર્ણ અધિકાર રહેશે. જો ટેસ્ટ પાસ થશે તો ખર્ચ કંપની ભોગવશે. ',
        },
        {
          t: 'જો લેબ ટેસ્ટ ફેઇલ થશે (કેમિકલ, જંતુનાશક કે ભેળસેળ જણાશે), તો લેબ ટેસ્ટિંગનો ૧૦૦% તમામ ખર્ચ વિક્રેતા/ખેડૂતે ચૂકવવો પડશે અને તે પેમેન્ટમાંથી કાપી લેવામાં આવશે.',
          k: 'critical',
        },
      ],
      hi: [
        {
          t: 'भरोसा शॉप को किसी भी समय उत्पाद का रैंडम सैंपल लेकर अधिकृत प्रयोगशाला में जांच कराने का पूर्ण अधिकार होगा। पास होने पर खर्च कंपनी वहन करेगी। ',
        },
        {
          t: 'यदि टेस्ट फेल होता है (रसायन, कीटनाशक या मिलावट पाई जाती है), तो लैब जांच का 100% पूरा खर्च विक्रेता द्वारा वहन किया जाएगा और भुगतान से काटा जाएगा।',
          k: 'critical',
        },
      ],
    },
  },
  {
    id: 'penalty',
    title: {
      en: 'Minimum ₹1,00,000 Penalty & Legal Action',
      gu: 'લઘુત્તમ ₹૧,૦૦,૦૦૦ દંડ અને કાયદેસર કાર્યવાહી',
      hi: 'न्यूनतम ₹1,00,000 जुर्माना एवं कानूनी कार्रवाई',
    },
    body: {
      en: [
        {
          t: 'If any product is found unorganic, adulterated, chemically treated, or fake, the Seller shall be immediately terminated and blacklisted. ',
        },
        {
          t: 'The Seller shall pay a mandatory minimum penalty of ₹1,00,000 (Rupees One Lakh) as liquidated damages for fraud and brand defamation to Bharosa Shop.',
          k: 'critical',
        },
        {
          t: ' Furthermore, Bharosa Shop reserves the strict right to file criminal cases under the Food Safety and Standards Act (FSSAI) and applicable provisions of BNS/IPC, along with civil suits.',
        },
      ],
      gu: [
        {
          t: 'જો કોઈપણ ઉત્પાદનમાં રસાયણ, ઝેરી તત્ત્વો કે ભેળસેળ સાબિત થશે, તો વિક્રેતાને ભરોસા શોપ પ્લેટફોર્મ પરથી તાત્કાલિક બ્લેકલિસ્ટ કરાશે. ',
        },
        {
          t: 'કંપનીની વિશ્વસનીયતાને નુકસાન પહોંચાડવા બદલ વિક્રેતા પાસેથી લઘુત્તમ ₹૧,૦૦,૦૦૦ (અક્ષરે એક લાખ રૂપિયા) નો દંડ વસૂલવામાં આવશે.',
          k: 'critical',
        },
        {
          t: ' આ ઉપરાંત કંપની ફૂડ સેફ્ટી એક્ટ (FSSAI) અને ભારતીય કાયદા હેઠળ પોલીસ કેસ અને કાયદેસરની કોર્ટ કાર્યવાહી કરશે.',
        },
      ],
      hi: [
        {
          t: 'यदि किसी भी उत्पाद में रसायन, जहरीले तत्व या मिलावट पाई जाती है, तो विक्रेता को तुरंत ब्लैकलिस्ट किया जाएगा। ',
        },
        {
          t: 'भरोसा शॉप की साख को नुकसान पहुंचाने के एवज में विक्रेता पर न्यूनतम ₹1,00,000 (एक लाख रुपये) का अनिवार्य जुर्माना लगाया जाएगा।',
          k: 'critical',
        },
        {
          t: ' इसके अलावा FSSAI एवं भारतीय दंड विधान के तहत आपराधिक (पुलिस केस) व दीवानी मुकदमा दर्ज किया जाएगा।',
        },
      ],
    },
  },
  {
    id: 'payment-cycle',
    title: {
      en: 'Payment Settlement Cycle (1 Week / 7 Days)',
      gu: 'પેમેન્ટ પતાવટ સાયકલ (૧ અઠવાડિયું)',
      hi: 'भुगतान निपटान चक्र (1 सप्ताह / 7 दिन)',
    },
    body: {
      en: [
        {
          t: 'All sales proceeds for products sold on the Bharosa Shop platform shall be disbursed and transferred to the Seller after ',
        },
        { t: '1 week (7 business days)', k: 'strong' },
        {
          t: ' following successful delivery to the end customer, after ensuring customer satisfaction and non-dispute.',
        },
      ],
      gu: [
        {
          t: 'ભરોસા શોપ પ્લેટફોર્મ પર વેચાયેલા માલનું પેમેન્ટ ગ્રાહકને સફળતાપૂર્વક પાર્સલ મળ્યાના ',
        },
        { t: '૧ અઠવાડિયા (૭ દિવસ) પછી', k: 'strong' },
        { t: ' હિસાબ ચકાસીને વિક્રેતા/ખેડૂતના બેંક ખાતામાં જમા કરવામાં આવશે.' },
      ],
      hi: [
        {
          t: 'भरोसा शॉप प्लेटफॉर्म पर बेचे गए उत्पादों का भुगतान ग्राहक को पार्सल की सफल डिलीवरी के ',
        },
        { t: '1 सप्ताह (7 दिन) बाद', k: 'strong' },
        { t: ' संतुष्टि सत्यापन उपरांत विक्रेता के बैंक खाते में स्थानांतरित किया जाएगा।' },
      ],
    },
  },
  {
    id: 'returns',
    title: {
      en: 'Customer Return & Courier/RTO Charges',
      gu: 'રિટર્ન પાર્સલ અને કુરિયર ખર્ચ',
      hi: 'रिटर्न पार्सल एवं कूरियर/RTO खर्च',
    },
    body: {
      en: [
        {
          t: 'If any parcel or order is returned by the customer due to quality issues, damage, spoilage, dispatch error, or customer rejection (RTO), ',
        },
        {
          t: 'all return courier fees, freight, and return logistics handling charges shall be borne 100% by the original Seller',
          k: 'critical',
        },
        { t: ' and deducted from seller payouts.' },
      ],
      gu: [
        {
          t: 'જો ગ્રાહક દ્વારા ગુણવત્તાની ખામી, બગડેલો માલ, ખોટો માલ અથવા અન્ય કારણોસર પાર્સલ રિટર્ન કરવામાં આવે, તો ',
        },
        {
          t: 'રિટર્ન કુરિયર અને ટ્રાન્સપોર્ટેશનનો તમામ ૧૦૦% ખર્ચ મૂળ વિક્રેતા/ખેડૂતે જ ભોગવવાનો રહેશે',
          k: 'critical',
        },
        { t: ', જે આગામી પેમેન્ટમાંથી કાપી લેવાશે.' },
      ],
      hi: [
        {
          t: 'यदि ग्राहक द्वारा गुणवत्ता, खराबी, क्षति या अस्वीकृति के कारण पार्सल वापस (रिटर्न) आता है, तो ',
        },
        {
          t: 'रिटर्न कूरियर एवं परिवहन का संपूर्ण 100% खर्च मूल विक्रेता/किसान द्वारा वहन किया जाएगा',
          k: 'critical',
        },
        { t: ' और उसके भुगतान से काटा जाएगा।' },
      ],
    },
  },
  {
    id: 'jurisdiction',
    title: {
      en: 'Jurisdiction',
      gu: 'કાનૂની હકુમત',
      hi: 'कानूनी क्षेत्राधिकार',
    },
    body: {
      en: [
        {
          t: 'Any legal dispute arising out of this agreement shall be governed exclusively by Indian law and subject to the competent courts of ',
        },
        { t: 'Vadodara, Gujarat', k: 'strong' },
        { t: '.' },
      ],
      gu: [
        { t: 'આ કરાર હેઠળ કોઈપણ કાનૂની વિવાદના ઉકેલ માટે માત્ર ' },
        { t: 'વડોદરા, ગુજરાત', k: 'strong' },
        { t: ' કોર્ટની હકુમત માન્ય રહેશે.' },
      ],
      hi: [
        { t: 'इस अनुबंध से उत्पन्न किसी भी कानूनी विवाद का निपटारा विशेष रूप से ' },
        { t: 'वडोदरा, गुजरात', k: 'strong' },
        { t: ' न्यायालय के क्षेत्राधिकार में होगा।' },
      ],
    },
  },
];

export const AGREEMENT_SIGNATURE = {
  company: {
    heading: { en: 'For BHAROSA SHOP (Company)', gu: 'ભરોસા શોપ વતી' },
    fields: [
      { en: 'Authorized Signatory', gu: 'અધિકૃત સહીકર્તા' },
      { en: 'Name', gu: null },
      { en: 'Designation', gu: null },
      { en: 'Date', gu: 'તારીખ' },
    ],
    signature: { en: 'Signature & Seal', gu: 'સહી અને સિક્કો' },
  },
  farmer: {
    heading: { en: 'Farmer / Seller Declaration', gu: 'ખેડૂત/વિક્રેતા સંમતિ' },
    fields: [
      { en: 'Farmer Name', gu: 'ખેડૂતનું નામ' },
      { en: 'Aadhaar No.', gu: 'આધાર કાર્ડ નં.' },
      { en: 'Village/Dist', gu: 'ગામ/જિલ્લો' },
      { en: 'Phone No.', gu: 'મોબાઇલ નં.' },
    ],
    signature: { en: 'Farmer Signature / Thumb', gu: 'ખેડૂતની સહી / અંગૂઠો' },
  },
};

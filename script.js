// ===================================================
// GREEN PROJECT ARMENIA - CORE JAVASCRIPT
// Full Russian default, 100% Trilingual Parity, Live Currency, Calculator
// ===================================================

const AppState = {
  lang: 'ru',               // Russian is the primary default language
  currency: 'AMD',          // 'AMD' | 'USD'
  fxRateUSD: 395,           // 1 USD = 395 AMD
  activeRoomFilter: 'all',
  activeProjFilter: 'all',
  activeSort: 'price-asc',
  mortgage: {
    priceAMD: 28000000,
    downPercent: 10,
    years: 20,
    interestRate: 11.5
  }
};

/**
 * 1. ПОЛНЫЙ СЛОВАРЬ ЛОКАЛИЗАЦИИ (RU / HY / EN)
 * 100% паритет всех ключей. При выборе "RU" отображается исключительно русский язык.
 */
const I18N = {
  ru: {
    pageTitle: "Green Project — квартиры в новостройках Еревана",
    topAnnouncement: "Действует закон о возврате подоходного налога • Ипотека от 10%",
    brandName: "Green Project",
    navApartments: "Квартиры",
    navAdvantages: "Преимущества",
    navAbout: "О комплексе",
    navCalculator: "Ипотека",
    navContact: "Контакты",
    navMap: "Карта",
    btnLeaveRequest: "Оставить заявку",

    // Hero
    heroBadge: "Монолитные кварталы класса А+ в Ереване",
    heroHeading: "Монолитное жилье с чистовой отделкой и подземным паркингом",
    heroText: "Монолитный железобетонный каркас, шумоизоляция 55 дБ, двухуровневый подземный паркинг и чистовая отделка. Защита средств через эскроу-счета и возврат налога по Ст. 156.1 НК РА.",
    btnSeeApartments: "Смотреть квартиры",
    btnBookTour: "Записаться на просмотр",
    statArea: "площадь",
    statFloors: "этажей",
    statDownPay: "ипотека",
    floatCard1Title: "Зелёные дворы",
    floatCard1Sub: "без машин",
    floatCard2Title: "Возврат налога",
    floatCard2Sub: "до 500 тыс ֏/мес",

    // Catalog
    catalogH2: "Выберите свою квартиру",
    catalogSub: "6 вариантов планировок с отделкой под ключ от застройщика Green Project.",
    lblSort: "Сортировка:",
    sortPriceAsc: "Сначала дешевле",
    sortPriceDesc: "Сначала дороже",
    sortAreaDesc: "По площади",
    filterAll: "Все",
    filter1k: "1-комн.",
    filter2k: "2-комн.",
    filter3k: "3-комн.",
    filterTH: "Таунхаусы",
    filterAllProjects: "Все проекты",

    // Apartments
    badgeReserved: "Бронь",
    badgeNew: "Новинка",
    badgeInSale: "В продаже",
    districtAvan: "ЖК Green Avan • Аван",
    districtNork: "ЖК Green Nork • Нор-Норк",
    districtKasakh: "Green Townhouse • с. Касах",
    apt1Title: "Компактная 1-комнатная",
    apt2Title: "Светлая студия у парка",
    apt3Title: "Двухкомнатная с балконом",
    apt4Title: "Двухкомнатная с видом на Арарат",
    apt5Title: "Семейная трёхкомнатная",
    apt6Title: "Таунхаус с террасой и садом",
    btnDetails: "Подробнее →",

    // Advantages
    advHeading: "Инженерные стандарты и комфорт",
    advSub: "Монолитный железобетон, шумоизоляция 55 дБ, отапливаемый паркинг и отделка под ключ.",
    adv1Title: "Дворы-парки без машин",
    adv1Desc: "Ландшафтное озеленение, безопасные детские городки из эко-материалов и зоны отдыха вместо парковок во дворе.",
    adv2Title: "Чистовая отделка под ключ",
    adv2Desc: "Немецкий ламинат 33 класса, европейская сантехника, керамогранит, стяжка пола с шумоизоляцией и межкомнатные двери.",
    adv3Title: "Монолит и сейсмика 9 баллов",
    adv3Desc: "Железобетонный каркас по СНиП РА, межквартирные перегородки 200 мм с шумопоглощением 55 дБ и круглосуточная охрана.",
    adv4Title: "Подземный отапливаемый паркинг",
    adv4Desc: "Двухуровневый отапливаемый паркинг с прямым доступом на скоростном лифте и станциями зарядки электромобилей.",
    adv5Title: "Семейная инфраструктура",
    adv5Desc: "Детские сады и школы в радиусе 300 метров, колясочные зоны на первых этажах и закрытые спортивные площадки.",
    adv6Title: "Возврат налога (Ст. 156.1 НК РА)",
    adv6Desc: "Государственный возврат до 500 000 ֏ в месяц уплаченного подоходного налога на погашение процентов по ипотеке.",

    // About
    aboutBadge: "О комплексе",
    aboutTitle: "Инженерное качество и сейсмическая безопасность 9 баллов",
    aboutP1: "Green Project — девелопер полного цикла в Армении. Мы возводим монолитные жилые комплексы с железобетонным каркасом марки B25/B30, расчетной сейсмостойкостью 9 баллов (СНиП РА) и двухкамерными стеклопакетами с аргоновым наполнением.",
    aboutP2: "В каждом проекте предусмотрены двухуровневый отапливаемый подземный паркинг со скоростными лифтами Otis/Kone, межквартирная шумоизоляция 55 дБ и ландшафтный дизайн-парк во дворе. Продажи ведутся через защищенные счета эскроу с субсидированной ипотекой от 10%.",

    // Calculator
    calcH2: "Калькулятор ипотеки и возврата подоходного налога",
    calcSub: "Рассчитайте ежемесячный платеж и узнайте, сколько процентов компенсирует государство по Ст. 156.1 Налогового кодекса РА:",
    lblBankPresets: "Банки Армении:",
    lblPrice: "Стоимость недвижимости",
    lblDown: "Первоначальный взнос",
    lblYears: "Срок кредита",
    lblRate: "Ставка по ипотеке",
    lblLoanPrincipal: "Сумма кредита:",
    lblStandardPayment: "Стандартный платеж в месяц:",
    taxRefundTitle: "Возврат подоходного налога:",
    taxRefundDesc: "Компенсируется государством из уплаченного подоходного налога (до 500 000 ֏ в месяц)",
    lblEffectivePayment: "Реальный платеж для вас:",
    btnGetMortgageApproval: "Получить одобрение ипотеки",

    // Contact
    contactH2: "Запишитесь на просмотр",
    contactSub: "Оставьте заявку — менеджер перезвонит, ответит на вопросы и подберёт удобное время показа квартиры.",
    officeAddress: "Офис продаж: г. Ереван, ул. Царав Ахбюр, 61/4",
    fieldName: "Имя",
    fieldPhone: "Телефон",
    fieldComment: "Комментарий",
    btnSubmitForm: "Отправить заявку",
    privacyPolicy: "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.",

    // Footer
    footerDesc: "Современные жилые комплексы среди зелени в Ереване. Квартиры с отделкой под ключ, закрытые дворы и развитая инфраструктура для комфортной жизни.",
    footerNavTitle: "Разделы",
    footerContactsTitle: "Контакты",
    allRightsReserved: "Все права защищены.",

    // Modals
    modalLeadTitle: "Оставить заявку",
    modalLeadSub: "Менеджер Green Project перезвонит вам в течение 10 минут.",
    modalTourTitle: "Запись на просмотр",
    modalTourSub: "Выберите удобный день для экскурсии по стройплощадке.",
    lblDate: "Дата показа",
    btnConfirmDate: "Подтвердить запись",
    toastSuccess: "Заявка успешно отправлена!",

    filterProjAvan: "Green Avan (Аван)",
    filterProjNork: "Green Nork (Нор-Норк)",
    filterProjKasakh: "Green Townhouse (Касах)",
    room1k: "1 комн.",
    room2k: "2 комн.",
    room3k: "3 комн.",
    room4k: "4 комн.",
    floorsTownhouse: "1-2 эт.",
    footerCountry: "г. Ереван, Республика Армения",
    specArea: "Общая площадь:",
    specRooms: "Комнатность:",
    specFloor: "Этаж:",
    specCeiling: "Высота потолков:",
    specFinish: "Отделка:",
    specFinishVal: "Чистовая под ключ",
    specSeismic: "Сейсмостойкость:",
    specSeismicVal: "9 баллов (монолит)",
    btnBookThisApt: "Забронировать эту планировку",
    btnCalcThisApt: "Рассчитать в ипотечном калькуляторе ↓",
    rooms1Val: "1 комната",
    rooms2Val: "2 комнаты",
    rooms3Val: "3 комнаты",
    rooms4Val: "4 комнаты (таунхаус)",

    // Project Passport
    passportTitle: "Единый архитектурный стандарт Green Project",
    passportDesc: "3 жилых квартала в экологически чистых локациях Еревана и пригорода с прямым доступом к центру.",
    passportBadgeAvan: "ЖК Green Avan (ул. Царав Ахбюр)",
    passportBadgeNork: "ЖК Green Nork (Нор-Норк)",
    passportBadgeKasakh: "Green Townhouse (с. Касах)",
    passportBadgeTax: "✓ 100% возврат налога",

    // Delivery tags
    delivery2026Q2: "Сдача: II кв. 2026",
    delivery2026Q3: "Сдача: III кв. 2026",
    delivery2026Q4: "Сдача: IV кв. 2026",

    // Lead Magnet
    catalogMagnetTitle: "Скачайте полный каталог планировок и прайс-лист 2026",
    catalogMagnetDesc: "PDF-презентация со всеми 6 вариантами планировок, спецификацией чистовой отделки и расчётом ежемесячных платежей по ипотеке.",
    btnDownloadCatalog: "Получить PDF каталог",

    // Escrow & Legal
    escrowTitle: "100% юридическая безопасность: защита средств по закону РА",
    escrowSub: "Покупка квартиры напрямую от застройщика Green Project через специальные банковские счета эскроу в соответствии с Законом Республики Армения «О градостроительстве».",
    escrowItem1Title: "Эскроу-счета (Escrow)",
    escrowItem1Desc: "Ваши деньги замораживаются в банке-партнере и переводятся застройщику только после сдачи дома и регистрации в Кадастре.",
    escrowItem2Title: "Нотариальная регистрация",
    escrowItem2Desc: "Каждый договор предварительной купли-продажи заверяется нотариусом и регистрируется в Государственном комитете кадастра РА.",
    escrowItem3Title: "Возврат подоходного налога",
    escrowItem3Desc: "Официальная аккредитация во всех системообразующих банках Армении с прямой передачей документов в КГД РА.",

    // FinTech & Calculator additions
    lawCapBadge: "Порог ст. 156.1: до 55 млн ֏",
    kasakhTaxBadge: "В с. Касах (Green Townhouse) закон о возврате налога действует бессрочно и в полном объеме!",
    legendClient: "● Ваш платёж: ",
    legendGov: "● Гасит государство: ",
    savingsYear1: "Экономия за 1-й год:",
    savingsYear5: "Экономия за 5 лет:",
    savingsNote: "Государственная субсидия окупает до 50% стоимости квартиры!",
    salaryTitle: "Официальная белая зарплата:",
    salaryDesc: "Совокупный доход заёмщика и созаёмщиков при ставке налога 20%",
    btnBookWhatsApp: "Забронировать в WhatsApp",

    // Mobile Dock
    dockTitle: "Green Project",
    dockSub: "Ипотека от 27 240 ֏/мес",
    dockWhatsApp: "WhatsApp",
    dockCall: "Позвонить",
    dockConsult: "Заявка",

    // Passport & Lead Magnet Extra Keys
    passportAllTitle: "3 современных жилых проекта в Ереване и пригороде",
    passportAllDesc: "Монолитный железобетонный каркас B25, сейсмостойкость 9 баллов, шумоизоляция 55 дБ, подземный паркинг и отделка под ключ.",
    passportAllTag: "Ипотека от 10% • Возврат налога",
    deliveryAvan: "Сдача: IV кв. 2026 • 90%",
    deliveryNork: "Сдача: III кв. 2026 • 95%",
    deliveryKasakh: "Сдача: IV кв. 2026 • 85%",
    leadMagnetBadge: "Материалы для скачивания",
    leadMagnetH3: "Генеральный каталог и шахматка актуальных цен 2026",
    leadMagnetP: "Получите подробный PDF-буклет с полными планировками, спецификацией чистовой отделки и графиком субсидированных платежей по всем 3 проектам.",
    btnGetCatalogPdf: "Скачать презентацию (PDF)",

    // Setl Group Corporate Structure Additions
    navProjects: "Проекты",
    navStandards: "Стандарты",
    navNews: "Ход строительства",
    topBarLocation: "Ереван и Котайк",
    topBarAccreditation: "Аккредитация во всех банках РА • Эскроу • Ст. 156.1 НК РА",
    btnRequestCall: "Заказать звонок",
    heroSubtitle: "Девелопер монолитных жилых кварталов класса А+ в Ереване: энергоэффективность, подземный отапливаемый паркинг и эскроу-счета",
    heroPromo1: "Ипотека от 10% • Возврат налога до 500 000 ֏/мес",
    heroPromo2: "Старт продаж в с. Касах — бессрочная господдержка",
    heroPromo3: "Сейсмостойкость 9 баллов (монолит) • Сдача 2026",
    statProjectsCount: "флагманских проекта",
    statGovSubsidy: "субсидия государства",
    projectsHeading: "Жилые комплексы Green Project",
    projectsSub: "Монолитный железобетон, экологически чистые районы и быстрый доступ к центру Еревана",
    projClassComfort: "Комфорт-плюс",
    projClassBusiness: "Бизнес-класс",
    projClassTownhouses: "Премиум таунхаусы",
    projAvanTime: "10 мин до центра",
    projNorkTime: "15 мин до центра",
    projKasakhTime: "12 мин до центра",
    projAvanFeatures: "14 этажей • Ландшафтный дизайн-парк во дворе, зоны воркаута • Отапливаемый подземный паркинг • Школа и садик рядом",
    projNorkFeatures: "6 этажей • Панорамный вид на Арарат • Монолитно-кирпичная технология, класс энергоэффективности А+",
    projKasakhFeatures: "2 этажа • Собственная терраса и благоустроенный участок 124 м² • Закрытая охраняемая территория, видеонаблюдение",
    btnSelectApartment: "Выбрать квартиру",
    btnSelectTownhouse: "Выбрать таунхаус",
    fromPriceLabel: "от",
    standardsHeading: "Инженерные стандарты строительства Green Project",
    standardsSub: "Монолитный железобетонный каркас, энергоэффективность класса А+, шумоизоляция 55 дБ и сейсмостойкость 9 баллов",
    newsHeading: "Динамика строительства и новости",
    newsSub: "Следите за ходом возведения домов и новостями компании Green Project в реальном времени",
    news1Date: "12 сентября 2026",
    news1Title: "ЖК Green Avan: завершены монолитные работы 14-го этажа",
    news1Desc: "Завершен каркас здания, начаты работы по остеклению двухкамерными стеклопакетами и разводке сетей.",
    news2Date: "05 сентября 2026",
    news2Title: "ЖК Green Nork: чистовая отделка МОП и монтаж фасадов",
    news2Desc: "Готовность комплекса 95%. Завершается благоустройство закрытого придомового сквера с видом на Арарат.",
    news3Date: "28 августа 2026",
    news3Title: "Green Townhouse: монтаж террас и озеленение в с. Касах",
    news3Desc: "Установлены индивидуальные террасы, выполнена планировка придомовых садов и прокладка эко-дорожек.",
    btnMoreNews: "Все новости компании",
    footerProjectsTitle: "Проекты",
    footerBuyersTitle: "Покупателям",
    footerLicense: "Лицензия девелопера РА № 18492 • Строительство в соответствии со стандартами сейсмостойкости СНиП РА",
    footerWorkingHours: "Ежедневно: 09:00 — 20:00",

    emptyCatalogTitle: "Нет подходящих планировок",
    emptyCatalogDesc: "По выбранным фильтрам квартир не найдено. Попробуйте выбрать другую комнатность или сбросить фильтры проектов.",
    btnResetFilters: "Показать все квартиры",
    mapHeading: "Проекты на карте Еревана и Котайка",
    mapSub: "Жилые комплексы в экологически чистых районах с быстрым доступом к центру столицы",
    mapTabAll: "Все объекты",
    mapTabSales: "Офис продаж",
    mapDistanceKentron: "до площади Республики",
    mapPinOffice: "Центральный офис продаж (Царав Ахбюр 61/4)",
    mapPinAvan: "ЖК Green Avan (ул. Царав Ахбюр)",
    mapPinNork: "ЖК Green Nork (Нор-Норк)",
    mapPinKasakh: "Green Townhouse (с. Касах)"
  },

  hy: {
    pageTitle: "Green Project — բնակարաններ Երևանի նորակառույցներում",
    topAnnouncement: "Գործում է եկամտահարկի վերադարձի օրենքը • Հիփոթեք սկսած 10%-ից",
    brandName: "Green Project",
    navApartments: "Բնակարաններ",
    navAdvantages: "Առավելություններ",
    navAbout: "Համալիրի մասին",
    navCalculator: "Հիփոթեք",
    navContact: "Կապ",
    navMap: "Քարտեզ",
    btnLeaveRequest: "Թողնել հայտ",

    heroBadge: "A+ դասի մոնոլիտ բնակելի թաղամասեր Երևանում",
    heroHeading: "Մոնոլիտ բնակարաններ ամբողջական հարդարմամբ և ստորգետնյա պարկինգով",
    heroText: "Երկաթբետոնե մոնոլիտ կարկաս, 55 դԲ ձայնամեկուսացում, երկմակարդակ պարկինգ և բնակարաններ մաքուր հարդարմամբ։ Էսքրոու հաշիվներ և եկամտահարկի վերադարձ։",
    btnSeeApartments: "Դիտել բնակարանները",
    btnBookTour: "Գրանցվել դիտման",
    statArea: "մակերես",
    statFloors: "հարկ",
    statDownPay: "հիփոթեք",
    floatCard1Title: "Կանաչ բակեր",
    floatCard1Sub: "առանց մեքենաների",
    floatCard2Title: "Եկամտահարկ",
    floatCard2Sub: "մինչև 500 հզ ֏/ամիս",

    catalogH2: "Ընտրեք ձեր բնակարանը",
    catalogSub: "6 պահանջված հատակագծեր՝ պատրաստի հարդարմամբ Green Project կառուցապատողից:",
    lblSort: "Տեսակավորել՝",
    sortPriceAsc: "Սկզբում մատչելի",
    sortPriceDesc: "Սկզբում թանկ",
    sortAreaDesc: "Ըստ մակերեսի",
    filterAll: "Բոլորը",
    filter1k: "1-սենյակ",
    filter2k: "2-սենյակ",
    filter3k: "3-սենյակ",
    filterTH: "Թաունհաուսներ",
    filterAllProjects: "Բոլոր նախագծերը",

    badgeReserved: "Ամրագրված",
    badgeNew: "Նորույթ",
    badgeInSale: "Վաճառքում",
    districtAvan: "«Green Avan» ԲՀ • Ավան",
    districtNork: "«Green Nork» ԲՀ • Նոր-Նորք",
    districtKasakh: "«Green Townhouse» • Քասախ",
    apt1Title: "Կոմպակտ 1-սենյականոց",
    apt2Title: "Լուսավոր ստուդիա այգու մոտ",
    apt3Title: "2-սենյականոց պատշգամբով",
    apt4Title: "2-սենյականոց տեսարանով դեպի Արարատ",
    apt5Title: "Ընտանեկան 3-սենյականոց",
    apt6Title: "Թաունհաուս տեռասայով և բակով",
    btnDetails: "Մանրամասն →",

    advHeading: "Ինժեներական չափանիշներ և հարմարավետություն",
    advSub: "Երկաթբետոնե մոնոլիտ, 55 դԲ ձայնամեկուսացում, ջեռուցվող պարկինգ և մաքուր հարդարում:",
    adv1Title: "Բակ-պուրակներ առանց մեքենաների",
    adv1Desc: "Լանդշաֆտային կանաչապատում, էկո-նյութերով մանկական խաղահրապարակներ և հանգստի գոտիներ:",
    adv2Title: "Ամբողջական մաքուր հարդարում",
    adv2Desc: "Գերմանական 33 դասի լամինատ, եվրոպական սանտեխնիկա, սալիկապատում, ձայնամեկուսիչ հատակներ և դռներ:",
    adv3Title: "Մոնոլիտ և 9 բալ սեյսմակայունություն",
    adv3Desc: "Երկաթբետոնե կարկաս ՀՀ ՇՆ չափանիշներով, 200 մմ միջբնակարանային պատեր 55 դԲ ձայնամեկուսացմամբ և 24/7 հսկողություն:",
    adv4Title: "Ստորգետնյա ջեռուցվող ավտոկայանատեղի",
    adv4Desc: "Երկմակարդակ ջեռուցվող պարկինգ արագընթաց վերելակով և էլեկտրոմոբիլների լիցքավորման կայաններով:",
    adv5Title: "Ընտանեկան ենթակառուցվածք",
    adv5Desc: "Մանկապարտեզներ և դպրոցներ 300 մ շառավղով, մանկասայլակների գոտիներ շքամուտքերում և սպորտային հրապարակներ:",
    adv6Title: "Եկամտահարկի վերադարձ (ՀՀ ՀՕ հոդ. 156.1)",
    adv6Desc: "Պետական փոխհատուցում մինչև 500 000 ֏/ամիս վճարված եկամտահարկից՝ հիփոթեքի տոկոսները մարելու համար:",

    aboutBadge: "Համալիրի մասին",
    aboutTitle: "Ինժեներական որակ և 9 բալ սեյսմիկ անվտանգություն",
    aboutP1: "Green Project-ը լիարժեք ցիկլով կառուցապատող է Հայաստանում: Մենք կառուցում ենք B25/B30 մակնիշի երկաթբետոնե մոնոլիտ կարկասով, 9 բալ սեյսմակայունությամբ (ՀՀ ՇՆ) և արգոնով լցված երկխցիկ ապակեպատմամբ բնակելի համալիրներ:",
    aboutP2: "Յուրաքանչյուր նախագծում նախատեսված է երկմակարդակ ջեռուցվող ստորգետնյա պարկինգ Otis/Kone արագընթաց վերելակներով, 55 դԲ միջբնակարանային ձայնամեկուսացում և բարեկարգ լանդշաֆտային պուրակ: Վաճառքը՝ էսքրոու հաշիվներով:",

    calcH2: "Հիփոթեքի և եկամտահարկի վերադարձի հաշվիչ",
    calcSub: "Հաշվարկեք ամսական վճարը և տեսեք, թե որքան գումար է փոխհատուցում պետությունը՝",
    lblBankPresets: "ՀՀ Բանկեր՝",
    lblPrice: "Բնակարանի արժեքը",
    lblDown: "Կանխավճար",
    lblYears: "Վարկի ժամկետ",
    lblRate: "Տոկոսադրույք",
    lblLoanPrincipal: "Վարկի գումար՝",
    lblStandardPayment: "Ստանդարտ ամսական վճար՝",
    taxRefundTitle: "Եկամտահարկի վերադարձ՝",
    taxRefundDesc: "Փոխհատուցվում է պետության կողմից ձեր վճարած հարկից (մինչև 500,000 ֏/ամիս)",
    lblEffectivePayment: "Ձեր ԻՐԱԿԱՆ վճարը՝",
    btnGetMortgageApproval: "Ստանալ հիփոթեքի հաստատում",

    contactH2: "Գրանցվել դիտման",
    contactSub: "Թողեք հայտ, և մեր մասնագետը կկապվի ձեզ հետ և կընտրի հարմար ժամանակ:",
    officeAddress: "Վաճառքի գրասենյակ՝ ք. Երևան, Ծարավ Աղբյուր փ. 61/4",
    fieldName: "Անուն",
    fieldPhone: "Հեռախոսահամար",
    fieldComment: "Մեկնաբանություն",
    btnSubmitForm: "Ուղարկել հայտը",
    privacyPolicy: "Սեղմելով կոճակը՝ դուք տալիս եք ձեր համաձայնությունը տվյալների մշակմանը:",

    footerDesc: "Ժամանակակից էկոլոգիական բնակելի համալիրներ Երևանում: Բնակարաններ հարդարմամբ, փակ բակերով և հարմարավետությամբ:",
    footerNavTitle: "Բաժիններ",
    footerContactsTitle: "Կապ",
    allRightsReserved: "Բոլոր իրավունքները պաշտպանված են:",

    modalLeadTitle: "Թողնել հայտ",
    modalLeadSub: "Green Project-ի մասնագետը կզանգահարի ձեզ 10 րոպեի ընթացքում:",
    modalTourTitle: "Գրանցվել դիտման",
    modalTourSub: "Ընտրեք հարմար օր շինհրապարակ այցելելու համար:",
    lblDate: "Այցելության օր",
    btnConfirmDate: "Հաստատել գրանցումը",
    toastSuccess: "Հայտը հաջողությամբ ուղարկված է:",

    filterProjAvan: "Green Avan (Ավան)",
    filterProjNork: "Green Nork (Նոր Նորք)",
    filterProjKasakh: "Green Townhouse (Քասախ)",
    room1k: "1 սենյակ",
    room2k: "2 սենյակ",
    room3k: "3 սենյակ",
    room4k: "4 սենյակ",
    floorsTownhouse: "1-2 հարկ",
    footerCountry: "ք. Երևան, Հայաստանի Հանրապետություն",
    specArea: "Ընդհանուր մակերես՝",
    specRooms: "Սենյակներ՝",
    specFloor: "Հարկ՝",
    specCeiling: "Առաստաղի բարձրություն՝",
    specFinish: "Հարդարում՝",
    specFinishVal: "Ամբողջական մաքուր",
    specSeismic: "Սեյսմակայունություն՝",
    specSeismicVal: "9 բալ (մոնոլիտ)",
    btnBookThisApt: "Ամրագրել այս բնակարանը",
    btnCalcThisApt: "Հաշվարկել հիփոթեքի հաշվիչում ↓",
    rooms1Val: "1 սենյակ",
    rooms2Val: "2 սենյակ",
    rooms3Val: "3 սենյակ",
    rooms4Val: "4 սենյակ (թաունհաուս)",

    // Project Passport
    passportTitle: "Green Project միասնական ճարտարապետական ստանդարտ",
    passportDesc: "3 բնակելի թաղամաս Երևանի և մերձակայքի էկոլոգիապես մաքուր վայրերում:",
    passportBadgeAvan: "«Green Avan» ԲՀ (Ծարավ Աղբյուր փ.)",
    passportBadgeNork: "«Green Nork» ԲՀ (Նոր Նորք)",
    passportBadgeKasakh: "«Green Townhouse» (գ. Քասախ)",
    passportBadgeTax: "✓ 100% եկամտահարկի վերադարձ",

    // Delivery tags
    delivery2026Q2: "Հանձնում՝ II եռ. 2026",
    delivery2026Q3: "Հանձնում՝ III եռ. 2026",
    delivery2026Q4: "Հանձնում՝ IV եռ. 2026",

    // Lead Magnet
    catalogMagnetTitle: "Ներբեռնեք հատակագծերի ամբողջական կատալոգը և 2026 գնացուցակը",
    catalogMagnetDesc: "PDF շնորհանդես բոլոր 6 հատակագծերով, մաքուր հարդարման բնութագրերով և հիփոթեքի ամսական վճարների հաշվարկով:",
    btnDownloadCatalog: "Ստանալ PDF կատալոգը",

    // Escrow & Legal
    escrowTitle: "100% իրավական անվտանգություն՝ գումարի պաշտպանություն ՀՀ օրենքով",
    escrowSub: "Բնակարանի ձեռքբերում անմիջապես «Green Project» կառուցապատողից հատուկ էսքրոու բանկային հաշիվներով՝ համաձայն ՀՀ «Քաղաքաշինության մասին» օրենքի:",
    escrowItem1Title: "Էսքրոու հաշիվներ (Escrow)",
    escrowItem1Desc: "Ձեր գումարը սառեցվում է գործընկեր բանկում և փոխանցվում է միայն շենքի հանձնումից և Կադաստրում գրանցումից հետո:",
    escrowItem2Title: "Նոտարական գրանցում",
    escrowItem2Desc: "Յուրաքանչյուր նախնական առուվաճառքի պայմանագիր վավերացվում է նոտարով և գրանցվում ՀՀ Կադաստրի կոմիտեում:",
    escrowItem3Title: "Եկամտահարկի վերադարձ",
    escrowItem3Desc: "Պաշտոնական հավատարմագրում ՀՀ բոլոր առաջատար բանկերում և փաստաթղթերի ուղիղ փոխանցում ՀՀ ՊԵԿ:",

    // FinTech & Calculator additions
    lawCapBadge: "Հոդվ. 156.1 շեմ՝ մինչև 55 մլն ֏",
    kasakhTaxBadge: "Քասախում (Green Townhouse) եկամտահարկի վերադարձի օրենքը գործում է ԱՆԺԱՄԿԵՏ և ամբողջ ծավալով:",
    legendClient: "● Ձեր վճարը՝ ",
    legendGov: "● Մարում է պետությունը՝ ",
    savingsYear1: "Խնայողություն 1-ին տարում՝",
    savingsYear5: "Խնայողություն 5 տարում՝",
    savingsNote: "Պետական սուբսիդիան փոխհատուցում է բնակարանի արժեքի մինչև 50%-ը:",
    salaryTitle: "Պաշտոնական գրանցված աշխատավարձ՝",
    salaryDesc: "Վարկառուի և համավարկառուների ընդհանուր եկամուտը 20% հարկային դրույքաչափով",
    btnBookWhatsApp: "Ամրագրել WhatsApp-ով",

    // Mobile Dock
    dockTitle: "Green Project",
    dockSub: "Հիփոթեք՝ սկսած 27 240 ֏/ամիս",
    dockWhatsApp: "WhatsApp",
    dockCall: "Զանգահարել",
    dockConsult: "Հայտ",

    // Passport & Lead Magnet Extra Keys
    passportAllTitle: "3 ժամանակակից բնակելի նախագծեր Երևանում և մերձակայքում",
    passportAllDesc: "Երկաթբետոնե մոնոլիտ կարկաս B25, 9 բալ սեյսմակայունություն, 55 դԲ ձայնամեկուսացում, ստորգետնյա պարկինգ և մաքուր հարդարում:",
    passportAllTag: "Հիփոթեք սկսած 10%-ից • Եկամտահարկի վերադարձ",
    deliveryAvan: "Հանձնում՝ IV եռ. 2026 • 90%",
    deliveryNork: "Հանձնում՝ III եռ. 2026 • 95%",
    deliveryKasakh: "Հանձնում՝ IV եռ. 2026 • 85%",
    leadMagnetBadge: "Ներբեռնման նյութեր",
    leadMagnetH3: "Գլխավոր կատալոգ և 2026 թարմ գնացուցակ",
    leadMagnetP: "Ստացեք մանրամասն PDF գրքույկ բոլոր հատակագծերով, մաքուր հարդարման բնութագրերով և սուբսիդավորված վճարումների ժամանակացույցով բոլոր 3 նախագծերի համար:",
    btnGetCatalogPdf: "Ներբեռնել շնորհանդեսը (PDF)",

    // Setl Group Corporate Structure Additions
    navProjects: "Նախագծեր",
    navStandards: "Ստանդարտներ",
    navNews: "Շինարարության ընթացք",
    topBarLocation: "Երևան և Կոտայք",
    topBarAccreditation: "Հավատարմագրում բոլոր բանկերում • Էսքրոու • ՀՀ ՀՕ հոդվ. 156.1",
    btnRequestCall: "Պատվիրել զանգ",
    heroSubtitle: "Երևանում A+ դասի մոնոլիտ բնակելի թաղամասերի կառուցապատող. երկաթբետոն, ջեռուցվող ստորգետնյա պարկինգ և էսքրոու հաշիվներ",
    heroPromo1: "Հիփոթեք 10%-ից • Եկամտահարկի վերադարձ մինչև 500,000 ֏/ամիս",
    heroPromo2: "Վաճառքի մեկնարկ Քասախում — անժամկետ պետական աջակցություն",
    heroPromo3: "9 բալ սեյսմակայունություն (մոնոլիտ) • Հանձնում 2026",
    statProjectsCount: "առանցքային նախագիծ",
    statGovSubsidy: "պետական սուբսիդիա",
    projectsHeading: "«Green Project»-ի բնակելի համալիրները",
    projectsSub: "Երկաթբետոնե մոնոլիտ, էկոլոգիապես մաքուր շրջաններ և արագ հասանելիություն Երևանի կենտրոն",
    projClassComfort: "Կոմֆորտ պլյուս",
    projClassBusiness: "Բիզնես դաս",
    projClassTownhouses: "Պրեմիում թաունհաուսներ",
    projAvanTime: "10 րոպե մինչև կենտրոն",
    projNorkTime: "15 րոպե մինչև կենտրոն",
    projKasakhTime: "12 րոպե մինչև կենտրոն",
    projAvanFeatures: "14 հարկ • Լանդշաֆտային դիզայն-պուրակ բակում • Ջեռուցվող ստորգետնյա պարկինգ • Դպրոց և մանկապարտեզ",
    projNorkFeatures: "6 հարկ • Համայնապատկերային տեսարան դեպի Արարատ • Մոնոլիտ-աղյուսային տեխնոլոգիա, A+ էներգաարդյունավետություն",
    projKasakhFeatures: "2 հարկ • Սեփական տեռասա և բարեկարգ տարածք 124 քմ • Փակ պահպանվող տարածք, տեսահսկում",
    btnSelectApartment: "Ընտրել բնակարան",
    btnSelectTownhouse: "Ընտրել թաունհաուս",
    fromPriceLabel: "սկսած",
    standardsHeading: "Green Project շինարարական ինժեներական չափանիշները",
    standardsSub: "Մոնոլիտ կարկաս, էներգաարդյունավետության A+ դաս, 55 դԲ ձայնամեկուսացում և 9 բալ սեյսմակայունություն",
    newsHeading: "Շինարարության ընթացք և նորություններ",
    newsSub: "Հետևեք շենքերի կառուցման ընթացքին և ընկերության նորություններին իրական ժամանակում",
    news1Date: "12 սեպտեմբերի 2026",
    news1Title: "«Green Avan» ԲՀ. ավարտվել են 14-րդ հարկի մոնոլիտ աշխատանքները",
    news1Desc: "Ավարտվել է շենքի հիմնակմախքը, մեկնարկել են էներգախնայող պատուհանների տեղադրման աշխատանքները:",
    news2Date: "05 սեպտեմբերի 2026",
    news2Title: "«Green Nork» ԲՀ. ընդհանուր տարածքների հարդարում և ճակատների մոնտաժ",
    news2Desc: "Համալիրի պատրաստվածությունը 95% է: Ավարտվում է Արարատի տեսարանով փակ պուրակի բարեկարգումը:",
    news3Date: "28 օգոստոսի 2026",
    news3Title: "«Green Townhouse». տեռասաների մոնտաժ և բակերի կանաչապատում Քասախում",
    news3Desc: "Տեղադրվել են անհատական տեռասաները, իրականացվել է բակերի կանաչապատում և արահետների սալիկապատում:",
    btnMoreNews: "Ընկերության բոլոր նորությունները",
    footerProjectsTitle: "Նախագծեր",
    footerBuyersTitle: "Գնորդներին",
    footerLicense: "ՀՀ կառուցապատողի լիցենզիա № 18492 • Շինարարություն ՀՀ սեյսմակայունության նորմերին համապատասխան",
    footerWorkingHours: "Ամեն օր՝ 09:00 — 20:00",

    emptyCatalogTitle: "Համապատասխան հատակագծեր չեն գտնվել",
    emptyCatalogDesc: "Ընտրված զտիչներով բնակարաններ չեն գտնվել: Փորձեք ընտրել այլ սենյակներ կամ չեղարկել զտիչները:",
    btnResetFilters: "Ցուցադրել բոլոր բնակարանները",
    mapHeading: "Նախագծերը Երևանի և Կոտայքի քարտեզի վրա",
    mapSub: "Բնակելի համալիրներ մայրաքաղաքի էկոլոգիապես մաքուր գոտիներում՝ կենտրոնի արագ հասանելիությամբ",
    mapTabAll: "Բոլոր օբյեկտները",
    mapTabSales: "Վաճառքի գրասենյակ",
    mapDistanceKentron: "Հանրապետության հրապարակից",
    mapPinOffice: "Կենտրոնական վաճառքի գրասենյակ (Ծարավ Աղբյուր 61/4)",
    mapPinAvan: "«Green Avan» ԲՀ (Ծարավ Աղբյուր փ.)",
    mapPinNork: "«Green Nork» ԲՀ (Նոր-Նորք)",
    mapPinKasakh: "«Green Townhouse» (գ. Քասախ)"
  },

  en: {
    pageTitle: "Green Project — New Developments in Yerevan",
    topAnnouncement: "Income Tax Refund Law applies • Mortgage from 10%",
    brandName: "Green Project",
    navApartments: "Apartments",
    navAdvantages: "Advantages",
    navAbout: "About Complex",
    navCalculator: "Mortgage",
    navContact: "Contacts",
    navMap: "Map",
    btnLeaveRequest: "Leave a Request",

    heroBadge: "Class A+ Monolithic Residential Complexes in Yerevan",
    heroHeading: "Monolithic Residences with Turnkey Finish & Underground Parking",
    heroText: "Monolithic reinforced concrete framework, 55 dB sound insulation, dual-level underground parking, and turnkey finish. Protected by escrow accounts and RA Tax Code Art. 156.1.",
    btnSeeApartments: "Explore Apartments",
    btnBookTour: "Book a Viewing",
    statArea: "area",
    statFloors: "floors",
    statDownPay: "mortgage",
    floatCard1Title: "Green Parks",
    floatCard1Sub: "car-free",
    floatCard2Title: "Tax Refund",
    floatCard2Sub: "up to 500k ֏/mo",

    catalogH2: "Choose Your Apartment",
    catalogSub: "6 turnkey layout options with premium finishing from Green Project developer.",
    lblSort: "Sort by:",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortAreaDesc: "By Area",
    filterAll: "All",
    filter1k: "1-bed",
    filter2k: "2-bed",
    filter3k: "3-bed",
    filterTH: "Townhouses",
    filterAllProjects: "All Projects",

    badgeReserved: "Reserved",
    badgeNew: "New",
    badgeInSale: "Available",
    districtAvan: "Green Avan • Avan",
    districtNork: "Green Nork • Nor-Nork",
    districtKasakh: "Green Townhouse • Kasakh",
    apt1Title: "Compact 1-Bedroom",
    apt2Title: "Bright Studio near Park",
    apt3Title: "2-Bedroom with Balcony",
    apt4Title: "2-Bedroom with Ararat View",
    apt5Title: "Family 3-Bedroom Suite",
    apt6Title: "Townhouse with Terrace & Garden",
    btnDetails: "Details →",

    advHeading: "Engineering Standards & Living Comfort",
    advSub: "Reinforced concrete monolith, 55 dB acoustic insulation, heated parking, and turnkey finishing.",
    adv1Title: "Car-Free Park Courtyards",
    adv1Desc: "Landscape gardening, eco-friendly children playgrounds, and quiet recreation zones instead of courtyard parking.",
    adv2Title: "Turnkey Finishing",
    adv2Desc: "33-class German laminate, European sanitary ware, porcelain stoneware, acoustic screed, and interior doors.",
    adv3Title: "Monolith & 9-Point Seismic Safety",
    adv3Desc: "Reinforced concrete framework per RA codes, 200 mm partition walls with 55 dB soundproofing, and 24/7 security.",
    adv4Title: "Underground Heated Parking",
    adv4Desc: "Two-level heated parking with direct high-speed elevator access, EV charging stations, and guest spaces.",
    adv5Title: "Family Infrastructure",
    adv5Desc: "Kindergartens and schools within 300 meters, ground-floor stroller storage rooms, and enclosed sports areas.",
    adv6Title: "Tax Refund (RA Tax Code Art. 156.1)",
    adv6Desc: "Government refund of up to 500,000 AMD/month from paid income tax to subsidize mortgage interest payments.",

    aboutBadge: "About Complex",
    aboutTitle: "Engineering Quality & 9-Point Seismic Resistance",
    aboutP1: "Green Project is a full-cycle real estate developer in Armenia. We build monolithic residential complexes using B25/B30 grade reinforced concrete, engineered for 9-point seismic resistance (RA building codes) and argon-filled double glazing.",
    aboutP2: "Each project features two-level heated underground parking with Otis/Kone high-speed elevators, 55 dB inter-apartment acoustic insulation, and landscaped courtyard park. Sales secured by escrow with subsidized mortgages from 10% down.",

    calcH2: "Mortgage & Income Tax Refund Calculator",
    calcSub: "Calculate your monthly payments and see how much the Armenian state refunds under Tax Code Art. 156.1:",
    lblBankPresets: "Armenian Banks:",
    lblPrice: "Property Price",
    lblDown: "Down Payment",
    lblYears: "Loan Term",
    lblRate: "Mortgage Rate",
    lblLoanPrincipal: "Total Loan Amount:",
    lblStandardPayment: "Standard Monthly Payment:",
    taxRefundTitle: "Monthly State Tax Refund:",
    taxRefundDesc: "Refunded by the Armenian government from your paid income tax (up to 500,000 ֏/mo)",
    lblEffectivePayment: "Your EFFECTIVE Payment:",
    btnGetMortgageApproval: "Apply for Mortgage Approval",

    contactH2: "Book a Viewing",
    contactSub: "Leave a request — our property manager will call you back and arrange a convenient tour time.",
    officeAddress: "Sales Office: Yerevan, 61/4 Tsarav Aghbyur St.",
    fieldName: "Full Name",
    fieldPhone: "Phone Number",
    fieldComment: "Comment",
    btnSubmitForm: "Submit Request",
    privacyPolicy: "By clicking the button you consent to the processing of personal data.",

    footerDesc: "Modern sustainable residential complexes in Yerevan. Turnkey apartments, gated parks, and quality infrastructure.",
    footerNavTitle: "Sections",
    footerContactsTitle: "Contact",
    allRightsReserved: "All rights reserved.",

    modalLeadTitle: "Leave a Request",
    modalLeadSub: "A Green Project specialist will call you back within 10 minutes.",
    modalTourTitle: "Book a Tour",
    modalTourSub: "Choose a convenient day for a tour around the building site.",
    lblDate: "Tour Date",
    btnConfirmDate: "Confirm Tour",
    toastSuccess: "Your request has been submitted successfully!",

    filterProjAvan: "Green Avan (Avan)",
    filterProjNork: "Green Nork (Nor-Nork)",
    filterProjKasakh: "Green Townhouse (Kasakh)",
    room1k: "1-room",
    room2k: "2-room",
    room3k: "3-room",
    room4k: "4-room",
    floorsTownhouse: "1-2 fl.",
    footerCountry: "Yerevan, Republic of Armenia",
    specArea: "Total Area:",
    specRooms: "Bedrooms:",
    specFloor: "Floor:",
    specCeiling: "Ceiling Height:",
    specFinish: "Finishing:",
    specFinishVal: "Turnkey fine finish",
    specSeismic: "Seismic Safety:",
    specSeismicVal: "9 points (monolith)",
    btnBookThisApt: "Reserve this Apartment",
    btnCalcThisApt: "Calculate in Mortgage Tool ↓",
    rooms1Val: "1 Bedroom",
    rooms2Val: "2 Bedrooms",
    rooms3Val: "3 Bedrooms",
    rooms4Val: "4 Bedrooms (Townhouse)",

    // Project Passport
    passportTitle: "Green Project Unified Architectural Standard",
    passportDesc: "3 residential quarters in ecologically clean locations in Yerevan and suburbs with direct access to center.",
    passportBadgeAvan: "Green Avan Complex (Tsarav Aghbyur St.)",
    passportBadgeNork: "Green Nork Complex (Nor-Nork)",
    passportBadgeKasakh: "Green Townhouse (Kasakh)",
    passportBadgeTax: "✓ 100% Tax Refund",

    // Delivery tags
    delivery2026Q2: "Delivery: Q2 2026",
    delivery2026Q3: "Delivery: Q3 2026",
    delivery2026Q4: "Delivery: Q4 2026",

    // Lead Magnet
    catalogMagnetTitle: "Download Complete 2026 Floor Plans Catalog & Price List",
    catalogMagnetDesc: "PDF presentation featuring all 6 floor plans, turnkey specifications, and monthly mortgage payment breakdown.",
    btnDownloadCatalog: "Get PDF Catalog",

    // Escrow & Legal
    escrowTitle: "100% Legal Security: Funds Protection under RA Law",
    escrowSub: "Purchasing an apartment directly from Green Project developer via specialized escrow bank accounts in full compliance with the RA Law on Urban Development.",
    escrowItem1Title: "Escrow Bank Accounts",
    escrowItem1Desc: "Your funds are held safely in a partner bank and released to the developer only after building handover and Cadastre registration.",
    escrowItem2Title: "Notarial Registration",
    escrowItem2Desc: "Every preliminary purchase agreement is notarized and officially registered in the RA State Cadastre Committee.",
    escrowItem3Title: "Income Tax Refund",
    escrowItem3Desc: "Official accreditation across leading Armenian banks with direct tax document processing with State Revenue Committee.",

    // FinTech & Calculator additions
    lawCapBadge: "Art. 156.1 cap: up to 55M ֏",
    kasakhTaxBadge: "In Kasakh (Green Townhouse), the tax refund law applies indefinitely and in full!",
    legendClient: "● Your payment: ",
    legendGov: "● Paid by State: ",
    savingsYear1: "Savings in Year 1:",
    savingsYear5: "Savings in 5 Years:",
    savingsNote: "State subsidy can cover up to 50% of the apartment's cost!",
    salaryTitle: "Required Gross Salary:",
    salaryDesc: "Combined gross income of borrower and co-borrowers at 20% tax rate",
    btnBookWhatsApp: "Book via WhatsApp",

    // Mobile Dock
    dockTitle: "Green Project",
    dockSub: "Mortgage from 27 240 ֏/mo",
    dockWhatsApp: "WhatsApp",
    dockCall: "Call",
    dockConsult: "Request",

    // Passport & Lead Magnet Extra Keys
    passportAllTitle: "3 modern residential projects in Yerevan and suburbs",
    passportAllDesc: "Monolithic reinforced concrete B25, 9-point seismic safety, 55 dB soundproofing, underground parking, and turnkey finish.",
    passportAllTag: "Mortgage from 10% • Tax Refund",
    deliveryAvan: "Delivery: Q4 2026 • 90%",
    deliveryNork: "Delivery: Q3 2026 • 95%",
    deliveryKasakh: "Delivery: Q4 2026 • 85%",
    leadMagnetBadge: "Download Materials",
    leadMagnetH3: "Master Catalog & 2026 Price Sheet",
    leadMagnetP: "Receive a detailed PDF brochure with full floor plans, turnkey specifications, and subsidized payment schedules for all 3 projects.",
    btnGetCatalogPdf: "Download Presentation (PDF)",

    // Setl Group Corporate Structure Additions
    navProjects: "Projects",
    navStandards: "Standards",
    navNews: "Construction Progress",
    topBarLocation: "Yerevan & Kotayk",
    topBarAccreditation: "Accredited in all RA banks • Escrow • Tax Code Art. 156.1",
    btnRequestCall: "Request Call",
    heroSubtitle: "Developer of Class A+ monolithic residential quarters in Yerevan: energy efficiency, heated parking, and escrow protection",
    heroPromo1: "Mortgage from 10% • Tax refund up to 500,000 ֏/mo",
    heroPromo2: "Sales launch in Kasakh — indefinite state subsidy",
    heroPromo3: "Magnitude 9 seismic safety • Handover 2026",
    statProjectsCount: "flagship projects",
    statGovSubsidy: "state subsidy",
    projectsHeading: "Green Project Residential Complexes",
    projectsSub: "Monolithic reinforced concrete, eco-friendly districts, and rapid access to Yerevan city center",
    projClassComfort: "Comfort Plus",
    projClassBusiness: "Business Class",
    projClassTownhouses: "Premium Townhouses",
    projAvanTime: "10 min to center",
    projNorkTime: "15 min to center",
    projKasakhTime: "12 min to center",
    projAvanFeatures: "14 floors • Landscaped courtyard park, workout zones • Heated underground parking • Schools nearby",
    projNorkFeatures: "6 floors • Ararat panoramic views • Monolithic brick construction, Class A+ energy rating",
    projKasakhFeatures: "2 floors • Private terrace & landscaped plot 124 sqm • Gated secured territory, 24/7 CCTV",
    btnSelectApartment: "Choose Apartment",
    btnSelectTownhouse: "Choose Townhouse",
    fromPriceLabel: "from",
    standardsHeading: "Green Project Engineering & Construction Standards",
    standardsSub: "Monolithic framework, Class A+ energy efficiency, 55 dB sound insulation, and 9-point seismic resistance",
    newsHeading: "Construction Dynamics & News",
    newsSub: "Follow construction progress and company updates in real time",
    news1Date: "September 12, 2026",
    news1Title: "Green Avan: 14th floor monolithic works completed",
    news1Desc: "Building frame completed, energy-efficient window installation and internal utility networks underway.",
    news2Date: "September 5, 2026",
    news2Title: "Green Nork: common areas fine finishing and facade installation",
    news2Desc: "Project reaches 95% completion. Private park landscaping with Mount Ararat view nearing finalization.",
    news3Date: "August 28, 2026",
    news3Title: "Green Townhouse: terrace installation and landscaping in Kasakh",
    news3Desc: "Private terraces installed, yard landscaping and eco-walkways completed.",
    btnMoreNews: "All Company News",
    footerProjectsTitle: "Projects",
    footerBuyersTitle: "For Buyers",
    footerLicense: "RA Developer License No. 18492 • Construction under RA seismic safety standards",
    footerWorkingHours: "Daily: 09:00 — 20:00",

    emptyCatalogTitle: "No matching floor plans found",
    emptyCatalogDesc: "No apartments found for the selected filters. Try choosing different bedroom count or reset project filters.",
    btnResetFilters: "Show All Apartments",
    mapHeading: "Projects on Yerevan & Kotayk Map",
    mapSub: "Residential complexes in eco-friendly districts with rapid access to city center",
    mapTabAll: "All Locations",
    mapTabSales: "Sales Office",
    mapDistanceKentron: "to Republic Square",
    mapPinOffice: "Sales Headquarters (61/4 Tsarav Aghbyur)",
    mapPinAvan: "Green Avan Complex (Tsarav Aghbyur St.)",
    mapPinNork: "Green Nork Complex (Nor-Nork)",
    mapPinKasakh: "Green Townhouse (Kasakh Village)"
  }
};

/**
 * 2. FORMATTING AND CURRENCY HELPERS
 */
function formatCurrency(amountAMD, targetCurrency = AppState.currency) {
  if (targetCurrency === 'USD') {
    const usd = Math.round(amountAMD / AppState.fxRateUSD);
    return '$' + usd.toLocaleString('en-US');
  } else {
    // Russian and Armenian locale formatting
    const locale = AppState.lang === 'ru' ? 'ru-RU' : (AppState.lang === 'hy' ? 'hy-AM' : 'en-US');
    return amountAMD.toLocaleString(locale) + ' ֏';
  }
}

/**
 * 3. LANGUAGE SWITCHER
 */
function setLanguage(lang) {
  if (!I18N[lang]) return;
  AppState.lang = lang;
  document.documentElement.lang = lang;

  // Update Buttons Active State
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Translate all [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) {
      el.innerHTML = I18N[lang][key];
    }
  });

  // Recalculate calculator displays
  updateMortgageCalculation();
  updateCardPrices();
  updatePassportBanner();

  if (typeof currentSelectedApartment !== 'undefined' && currentSelectedApartment) {
    const modalBadge = document.getElementById('aptModalBadge');
    const modalDistrict = document.getElementById('aptModalDistrict');
    const modalTitle = document.getElementById('aptModalTitle');
    const modalRooms = document.getElementById('aptModalRooms');
    if (modalBadge) modalBadge.textContent = I18N[lang][currentSelectedApartment.badgeKey];
    if (modalDistrict) modalDistrict.textContent = I18N[lang][currentSelectedApartment.districtKey];
    if (modalTitle) modalTitle.textContent = I18N[lang][currentSelectedApartment.titleKey];
    if (modalRooms) modalRooms.textContent = I18N[lang][currentSelectedApartment.roomsKey];
  }

  const dockBtnWa = document.getElementById('dockBtnWa');
  if (dockBtnWa) {
    let defaultMsg = '';
    if (lang === 'ru') {
      defaultMsg = 'Здравствуйте! Хочу узнать подробности о квартирах в Green Project.';
    } else if (lang === 'hy') {
      defaultMsg = 'Բարև ձեզ, ցանկանում եմ տեղեկություններ ստանալ Green Project-ի բնակարանների մասին:';
    } else {
      defaultMsg = 'Hello! I would like to get information about apartments at Green Project.';
    }
    dockBtnWa.href = `https://wa.me/37494664522?text=${encodeURIComponent(defaultMsg)}`;
  }
}

/**
 * 4. CURRENCY SWITCHER
 */
function setCurrency(cur) {
  if (cur !== 'AMD' && cur !== 'USD') return;
  AppState.currency = cur;

  // Update Buttons Active State
  document.querySelectorAll('[data-currency]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-currency') === cur);
  });

  updateCardPrices();
  updateMortgageCalculation();
}

function updateCardPrices() {
  document.querySelectorAll('.price-dyn[data-raw-amd]').forEach(el => {
    const raw = parseInt(el.getAttribute('data-raw-amd'), 10);
    el.textContent = formatCurrency(raw);
  });

  document.querySelectorAll('.proj-price-dyn[data-raw-amd]').forEach(el => {
    const raw = parseInt(el.getAttribute('data-raw-amd'), 10);
    const prefix = (I18N[AppState.lang] && I18N[AppState.lang].fromPriceLabel) || 'от';
    el.textContent = `${prefix} ${formatCurrency(raw)}`;
  });

  document.querySelectorAll('.price-sqm-dyn[data-raw-amd-sqm]').forEach(el => {
    const rawSqm = parseInt(el.getAttribute('data-raw-amd-sqm'), 10);
    const perSqm = AppState.lang === 'ru' ? '/ м²' : (AppState.lang === 'hy' ? '/ քմ' : '/ sq.m');
    el.textContent = `${formatCurrency(rawSqm)} ${perSqm}`;
  });

  const heroStat = document.getElementById('heroStatPrice');
  if (heroStat) {
    heroStat.textContent = 'от 38 м²';
  }

  if (typeof currentSelectedApartment !== 'undefined' && currentSelectedApartment) {
    const modalPrice = document.getElementById('aptModalPrice');
    const modalMortgageHint = document.getElementById('aptModalMortgageHint');
    if (modalPrice) modalPrice.textContent = formatCurrency(currentSelectedApartment.priceAMD);
    if (modalMortgageHint) {
      const P = currentSelectedApartment.priceAMD * 0.9;
      const r = (11.5 / 100) / 12;
      const n = 20 * 12;
      const factor = Math.pow(1 + r, n);
      const monthly = Math.round(P * ((r * factor) / (factor - 1)));
      const interest = Math.round(P * r);
      const refund = Math.min(interest, 500000);
      const effective = Math.max(0, monthly - refund);
      const perMo = AppState.lang === 'ru' ? 'мес.' : (AppState.lang === 'hy' ? 'ամիս' : 'mo.');
      modalMortgageHint.textContent = `${formatCurrency(effective)} / ${perMo}`;
    }
  }
}

function filterProjectFromShowcase(projId) {
  AppState.activeProjFilter = projId;
  document.querySelectorAll('[data-filter-proj]').forEach(b => {
    b.classList.toggle('project-active', b.getAttribute('data-filter-proj') === projId);
  });
  applyFiltersAndSort();
  updatePassportBanner(projId);
  const target = document.getElementById('apartments');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
if (typeof window !== 'undefined') {
  window.filterProjectFromShowcase = filterProjectFromShowcase;
}

function getYearsString(years, lang) {
  if (lang === 'hy') return `${years} տարի`;
  if (lang === 'en') return `${years} ${years === 1 ? 'year' : 'years'}`;
  const mod10 = years % 10;
  const mod100 = years % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${years} лет`;
  if (mod10 === 1) return `${years} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${years} года`;
  return `${years} лет`;
}

/**
 * 5. MORTGAGE & TAX REFUND CALCULATOR
 */
function updateMortgageCalculation() {
  const inputPrice = document.getElementById('inputPrice');
  const inputDown = document.getElementById('inputDown');
  const inputYears = document.getElementById('inputYears');
  const inputRate = document.getElementById('inputRate');

  if (!inputPrice || !inputDown || !inputYears || !inputRate) return;

  const priceAMD = parseFloat(inputPrice.value);
  const downPercent = parseFloat(inputDown.value);
  const years = parseFloat(inputYears.value);
  const annualRate = parseFloat(inputRate.value);

  AppState.mortgage = { priceAMD, downPercent, years, interestRate: annualRate };

  const downAmountAMD = Math.round(priceAMD * (downPercent / 100));
  const loanPrincipalAMD = priceAMD - downAmountAMD;

  // Labels
  document.getElementById('calcPriceDisplay').textContent = formatCurrency(priceAMD);
  document.getElementById('calcDownDisplay').textContent = `${downPercent}% (${formatCurrency(downAmountAMD)})`;
  
  document.getElementById('calcYearsDisplay').textContent = getYearsString(years, AppState.lang);
  document.getElementById('calcRateDisplay').textContent = `${annualRate.toFixed(1)}%`;

  // Annuity Formula
  const totalMonths = years * 12;
  const monthlyRate = (annualRate / 100) / 12;
  let standardMonthlyAMD = 0;
  if (monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    standardMonthlyAMD = Math.round(loanPrincipalAMD * ((monthlyRate * factor) / (factor - 1)));
  } else {
    standardMonthlyAMD = Math.round(loanPrincipalAMD / totalMonths);
  }

  // Monthly Interest Portion: I = P * r
  const monthlyInterestAMD = Math.round(loanPrincipalAMD * monthlyRate);

  // Statutory Tax Refund (Cap 500,000 AMD/month per RA Tax Code Art. 156.1)
  const maxRefund = 500000;
  const taxRefundAMD = Math.min(monthlyInterestAMD, maxRefund);
  const effectiveMonthlyAMD = Math.max(0, standardMonthlyAMD - taxRefundAMD);

  // Result displays
  const perMonthWord = AppState.lang === 'ru' ? 'мес.' : (AppState.lang === 'hy' ? 'ամիս' : 'mo.');
  document.getElementById('resLoan').textContent = formatCurrency(loanPrincipalAMD);
  document.getElementById('resStandardMonthly').textContent = `${formatCurrency(standardMonthlyAMD)} / ${perMonthWord}`;
  document.getElementById('resTaxRefund').textContent = `+ ${formatCurrency(taxRefundAMD)} / ${perMonthWord}`;
  document.getElementById('resEffectiveMonthly').textContent = `${formatCurrency(effectiveMonthlyAMD)} / ${perMonthWord}`;

  // 1. Visual Payment Ratio Bar (Client vs Gov)
  const ratioClient = document.getElementById('ratioClient');
  const ratioGov = document.getElementById('ratioGov');
  const legendClientText = document.getElementById('legendClientText');
  const legendGovText = document.getElementById('legendGovText');

  if (ratioClient && ratioGov && standardMonthlyAMD > 0) {
    const clientPct = Math.max(5, Math.min(95, (effectiveMonthlyAMD / standardMonthlyAMD) * 100));
    const govPct = (100 - clientPct).toFixed(1);
    const clientPctDisplay = clientPct.toFixed(1);

    ratioClient.style.width = `${clientPctDisplay}%`;
    ratioGov.style.width = `${govPct}%`;

    ratioClient.title = `${I18N[AppState.lang].legendClient}${formatCurrency(effectiveMonthlyAMD)}`;
    ratioGov.title = `${I18N[AppState.lang].legendGov}${formatCurrency(taxRefundAMD)}`;

    if (legendClientText) {
      legendClientText.textContent = `${I18N[AppState.lang].legendClient}~${Math.round(clientPct)}%`;
    }
    if (legendGovText) {
      legendGovText.textContent = `${I18N[AppState.lang].legendGov}~${Math.round(govPct)}%`;
    }
  }

  // 2. Cumulative Savings (Year 1 & Year 5)
  const savingsYear1Val = document.getElementById('savingsYear1Val');
  const savingsYear5Val = document.getElementById('savingsYear5Val');
  if (savingsYear1Val) {
    const s1 = taxRefundAMD * 12;
    savingsYear1Val.textContent = `+ ${formatCurrency(s1)}`;
  }
  if (savingsYear5Val) {
    const s5 = taxRefundAMD * 60;
    savingsYear5Val.textContent = `+ ${formatCurrency(s5)}`;
  }

  // 3. Gross Salary Requirement (Flat 20% Armenian Income Tax: gross = tax / 0.20)
  const resSalaryNeeded = document.getElementById('resSalaryNeeded');
  if (resSalaryNeeded) {
    const grossNeeded = Math.round(taxRefundAMD / 0.20);
    if (AppState.lang === 'ru') {
      resSalaryNeeded.textContent = `от ${formatCurrency(grossNeeded)} / мес. (Gross)`;
    } else if (AppState.lang === 'hy') {
      resSalaryNeeded.textContent = `սկսած ${formatCurrency(grossNeeded)} / ամիս (Gross)`;
    } else {
      resSalaryNeeded.textContent = `from ${formatCurrency(grossNeeded)} / mo. (Gross)`;
    }
  }

  // 4. Mobile Sticky Dock Price Update
  const dockPriceHint = document.getElementById('dockPriceHint');
  if (dockPriceHint) {
    if (AppState.lang === 'ru') {
      dockPriceHint.textContent = `Ипотека от ${formatCurrency(effectiveMonthlyAMD)}/мес`;
    } else if (AppState.lang === 'hy') {
      dockPriceHint.textContent = `Հիփոթեք՝ սկսած ${formatCurrency(effectiveMonthlyAMD)}/ամիս`;
    } else {
      dockPriceHint.textContent = `Mortgage from ${formatCurrency(effectiveMonthlyAMD)}/mo`;
    }
  }
}

/**
 * 6. APARTMENTS FILTERING & SORTING
 */
function applyFiltersAndSort() {
  const cards = Array.from(document.querySelectorAll('.apartment-card'));
  const grid = document.getElementById('apartmentsGrid');
  if (!grid) return;

  // Filter
  let visibleCount = 0;
  cards.forEach(card => {
    const room = card.getAttribute('data-room');
    const proj = card.getAttribute('data-proj');

    const matchRoom = AppState.activeRoomFilter === 'all' || AppState.activeRoomFilter === room;
    const matchProj = AppState.activeProjFilter === 'all' || AppState.activeProjFilter === proj;

    if (matchRoom && matchProj) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyState = document.getElementById('apartmentsEmptyState');
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // Sort
  cards.sort((a, b) => {
    const priceA = parseInt(a.getAttribute('data-price-amd'), 10);
    const priceB = parseInt(b.getAttribute('data-price-amd'), 10);
    const areaA = parseFloat(a.getAttribute('data-area'));
    const areaB = parseFloat(b.getAttribute('data-area'));

    if (AppState.activeSort === 'price-asc') return priceA - priceB;
    if (AppState.activeSort === 'price-desc') return priceB - priceA;
    if (AppState.activeSort === 'area-desc') return areaB - areaA;
    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
}

function resetCatalogFilters() {
  AppState.activeRoomFilter = 'all';
  AppState.activeProjFilter = 'all';
  document.querySelectorAll('[data-filter-room]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter-room') === 'all');
  });
  document.querySelectorAll('[data-filter-proj]').forEach(b => {
    b.classList.toggle('project-active', b.getAttribute('data-filter-proj') === 'all');
  });
  applyFiltersAndSort();
  updatePassportBanner('all');
}

/**
 * 7. APARTMENT DETAILS & MODALS
 */
const APARTMENTS_DATA = {
  apt1: {
    id: 'apt1',
    img: 'images/apt-3.png',
    badgeKey: 'badgeReserved',
    badgeClass: 'badge-reserved',
    districtKey: 'districtAvan',
    titleKey: 'apt1Title',
    area: '38 м²',
    roomsKey: 'rooms1Val',
    floor: '9 / 14',
    priceAMD: 14060000
  },
  apt2: {
    id: 'apt2',
    img: 'images/apt-4.png',
    badgeKey: 'badgeNew',
    badgeClass: 'badge-new',
    districtKey: 'districtAvan',
    titleKey: 'apt2Title',
    area: '42 м²',
    roomsKey: 'rooms1Val',
    floor: '4 / 14',
    priceAMD: 15540000
  },
  apt3: {
    id: 'apt3',
    img: 'images/apt-1.png',
    badgeKey: 'badgeInSale',
    badgeClass: 'badge-sale',
    districtKey: 'districtAvan',
    titleKey: 'apt3Title',
    area: '64 м²',
    roomsKey: 'rooms2Val',
    floor: '7 / 14',
    priceAMD: 23680000
  },
  apt4: {
    id: 'apt4',
    img: 'images/apt-2.png',
    badgeKey: 'badgeInSale',
    badgeClass: 'badge-sale',
    districtKey: 'districtNork',
    titleKey: 'apt4Title',
    area: '71 м²',
    roomsKey: 'rooms2Val',
    floor: '3 / 6',
    priceAMD: 33650000
  },
  apt5: {
    id: 'apt5',
    img: 'images/apt-6.png',
    badgeKey: 'badgeInSale',
    badgeClass: 'badge-sale',
    districtKey: 'districtAvan',
    titleKey: 'apt5Title',
    area: '92 м²',
    roomsKey: 'rooms3Val',
    floor: '5 / 14',
    priceAMD: 34040000
  },
  apt6: {
    id: 'apt6',
    img: 'images/apt-5.png',
    badgeKey: 'badgeNew',
    badgeClass: 'badge-new',
    districtKey: 'districtKasakh',
    titleKey: 'apt6Title',
    area: '124 м²',
    roomsKey: 'rooms4Val',
    floor: '1-2',
    priceAMD: 45880000
  }
};

let currentSelectedApartment = null;

function openApartmentModal(aptId) {
  const apt = APARTMENTS_DATA[aptId];
  if (!apt) return;
  currentSelectedApartment = apt;

  const modalImg = document.getElementById('aptModalImg');
  const modalBadge = document.getElementById('aptModalBadge');
  const modalDistrict = document.getElementById('aptModalDistrict');
  const modalTitle = document.getElementById('aptModalTitle');
  const modalArea = document.getElementById('aptModalArea');
  const modalRooms = document.getElementById('aptModalRooms');
  const modalFloor = document.getElementById('aptModalFloor');
  const modalPrice = document.getElementById('aptModalPrice');
  const modalMortgageHint = document.getElementById('aptModalMortgageHint');

  if (modalImg) modalImg.src = apt.img;
  if (modalBadge) {
    modalBadge.className = 'apartment-badge ' + apt.badgeClass;
    modalBadge.textContent = I18N[AppState.lang][apt.badgeKey];
  }
  if (modalDistrict) modalDistrict.textContent = I18N[AppState.lang][apt.districtKey];
  if (modalTitle) modalTitle.textContent = I18N[AppState.lang][apt.titleKey];
  if (modalArea) modalArea.textContent = apt.area;
  if (modalRooms) modalRooms.textContent = I18N[AppState.lang][apt.roomsKey];
  if (modalFloor) modalFloor.textContent = apt.floor;
  if (modalPrice) modalPrice.textContent = formatCurrency(apt.priceAMD);

  // Mortgage calculation hint for this apartment
  const P = apt.priceAMD * 0.9;
  const r = (11.5 / 100) / 12;
  const n = 20 * 12;
  const factor = Math.pow(1 + r, n);
  const monthly = Math.round(P * ((r * factor) / (factor - 1)));
  const interest = Math.round(P * r);
  const refund = Math.min(interest, 500000);
  const effective = Math.max(0, monthly - refund);
  
  if (modalMortgageHint) {
    const perMo = AppState.lang === 'ru' ? 'мес.' : (AppState.lang === 'hy' ? 'ամիս' : 'mo.');
    modalMortgageHint.textContent = `${formatCurrency(effective)} / ${perMo}`;
  }

  openModal('modalApartment');
}

function bookCurrentApartment() {
  closeModal('modalApartment');
  openModal('modalLead');
  const comment = document.getElementById('inputComment');
  if (comment && currentSelectedApartment) {
    const aptName = I18N[AppState.lang][currentSelectedApartment.titleKey];
    comment.value = (AppState.lang === 'ru' ? 'Интересует бронь: ' : (AppState.lang === 'hy' ? 'Հետաքրքրված եմ ամրագրմամբ՝ ' : 'Interested in reservation: ')) + aptName;
  }
}

function bookCurrentApartmentWhatsApp() {
  if (!currentSelectedApartment) return;
  const aptTitle = I18N[AppState.lang][currentSelectedApartment.titleKey];
  const aptPrice = formatCurrency(currentSelectedApartment.priceAMD, 'AMD');
  let msg = '';
  if (AppState.lang === 'ru') {
    msg = `Здравствуйте! Меня интересует планировка "${aptTitle}" (${currentSelectedApartment.area}, ${aptPrice}) в Green Project. Хочу забронировать и узнать подробности.`;
  } else if (AppState.lang === 'hy') {
    msg = `Բարև ձեզ: Ինձ հետաքրքրում է «${aptTitle}» հատակագիծը (${currentSelectedApartment.area}, ${aptPrice}) «Green Project»-ում: Ցանկանում եմ ամրագրել և ստանալ մանրամասներ:`;
  } else {
    msg = `Hello! I am interested in the floor plan "${aptTitle}" (${currentSelectedApartment.area}, ${aptPrice}) at Green Project. I would like to book a consultation.`;
  }
  window.open(`https://wa.me/37494664522?text=${encodeURIComponent(msg)}`, '_blank');
}

function updatePassportBanner(proj = AppState.activeProjFilter) {
  const pTitle = document.getElementById('passportTitle');
  const pDesc = document.getElementById('passportDesc');
  const pIcon = document.getElementById('passportIcon');
  if (!pTitle || !pDesc) return;

  if (proj === 'avan') {
    if (pIcon) pIcon.textContent = '🏢';
    pTitle.textContent = I18N[AppState.lang].districtAvan;
    pDesc.textContent = AppState.lang === 'ru'
      ? '14 этажей, чистовая отделка, отапливаемый подземный паркинг, ул. Царав Ахбюр 61/4.'
      : (AppState.lang === 'hy'
        ? '14 հարկ, մաքուր հարդարում, ջեռուցվող ստորգետնյա պարկինգ, Ծարավ Աղբյուր փ. 61/4:'
        : '14 floors, turnkey finish, heated underground parking, 61/4 Tsarav Aghbyur St.');
  } else if (proj === 'nork') {
    if (pIcon) pIcon.textContent = '⛰️';
    pTitle.textContent = I18N[AppState.lang].districtNork;
    pDesc.textContent = AppState.lang === 'ru'
      ? '6 этажей, панорамные виды на библейский Арарат, тихий зелёный массив, чистый горный воздух.'
      : (AppState.lang === 'hy'
        ? '6 հարկ, համայնապատկերային տեսարան դեպի Արարատ, հանգիստ կանաչ գոտի, մաքուր օդ:'
        : '6 floors, panoramic views of Mount Ararat, quiet residential green area, fresh mountain air.');
  } else if (proj === 'kasakh' || proj === 'townhouse') {
    if (pIcon) pIcon.textContent = '🏡';
    pTitle.textContent = I18N[AppState.lang].districtKasakh;
    pDesc.textContent = AppState.lang === 'ru'
      ? 'Двухуровневые таунхаусы 124 м² с террасой и садом. Бессрочный возврат подоходного налога по ст. 156.1 НК РА!'
      : (AppState.lang === 'hy'
        ? 'Երկհարկանի թաունհաուսներ 124 քմ սեփական տեռասայով և բակով: Եկամտահարկի ԱՆԺԱՄԿԵՏ վերադարձ:'
        : 'Duplex townhouses 124 sq.m with terrace & garden. Indefinite income tax refund under RA Tax Code!');
  } else {
    if (pIcon) pIcon.textContent = '🏢';
    pTitle.textContent = I18N[AppState.lang].passportAllTitle || I18N[AppState.lang].passportTitle;
    pDesc.textContent = I18N[AppState.lang].passportAllDesc || I18N[AppState.lang].passportDesc;
  }
}

// Lenis Smooth Inertial Scroll & GSAP ScrollTrigger Integration
let lenisInstance = null;

function initLenisScroll() {
  if (typeof window === 'undefined' || typeof Lenis === 'undefined') return;
  try {
    lenisInstance = new Lenis({
      duration: 0.6,
      lerp: 0.15,
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time) {
      if (lenisInstance) lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        if (lenisInstance) lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  } catch (e) {
    console.warn('Lenis smooth scroll skipped:', e);
  }
}

// Smart Executive Header (Hide on down, show on up with blur)
function initSmartHeader() {
  if (typeof window === 'undefined') return;
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0);
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0);
    
    if (currentScrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    if (currentScrollY > 140 && currentScrollY > lastScrollY + 6) {
      header.classList.add('header-hidden');
    } else if (currentScrollY < lastScrollY - 6 || currentScrollY <= 140) {
      header.classList.remove('header-hidden');
    }

    lastScrollY = Math.max(0, currentScrollY);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

function initScrollReveal() {
  if (typeof window === 'undefined') {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
    }
    return;
  }

  // GSAP 3 + ScrollTrigger Animation Orchestration
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // Section titles and subtitles (smooth y: 40 -> 0, opacity: 0 -> 1)
      const headings = document.querySelectorAll('.section-h2, .section-subtitle, .about-title, .escrow-title');
      headings.forEach((el) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Staggered card grids (stagger: 0.1s)
      const grids = [
        { selector: '.projects-grid .project-showcase-card', trigger: '.projects-grid' },
        { selector: '.apartments-grid .apartment-card', trigger: '.apartments-grid' },
        { selector: '.advantages-grid .advantage-card', trigger: '.advantages-grid' },
        { selector: '.news-grid .news-card', trigger: '.news-grid' },
        { selector: '.escrow-features-grid .escrow-feature-item', trigger: '.escrow-features-grid' },
        { selector: '.hero-stats-dl > div', trigger: '.hero-stats-dl' }
      ];

      grids.forEach(grid => {
        const items = document.querySelectorAll(grid.selector);
        if (items.length) {
          gsap.fromTo(items,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid.trigger,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
      return;
    } catch (e) {
      console.warn('GSAP ScrollTrigger error, falling back to IntersectionObserver:', e);
    }
  }

  // Graceful fallback for non-GSAP environments
  if (typeof IntersectionObserver === 'undefined') {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
    }
    return;
  }

  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  } catch (e) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
  }
}

function calculateThisApartment() {
  closeModal('modalApartment');
  if (!currentSelectedApartment) return;
  const inputPrice = document.getElementById('inputPrice');
  if (inputPrice) {
    inputPrice.value = String(currentSelectedApartment.priceAMD);
    updateMortgageCalculation();
  }
  const calcSection = document.getElementById('calculator');
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  try {
    const form = e.target || {};
    const hasQuery = typeof form.querySelector === 'function';
    const nameInput = hasQuery ? form.querySelector('input[type="text"]') : null;
    const phoneInput = hasQuery ? form.querySelector('input[type="tel"]') : null;
    const dateInput = hasQuery ? form.querySelector('input[type="date"]') : null;
    const commentInput = hasQuery ? form.querySelector('textarea') : null;
    const selectProject = hasQuery ? form.querySelector('select') : null;

    const lead = {
      id: 'lead_' + Date.now(),
      formId: form.id || 'leadForm',
      name: nameInput ? nameInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      date: dateInput ? dateInput.value : '',
      comment: commentInput ? commentInput.value.trim() : '',
      project: selectProject ? selectProject.value : '',
      language: AppState.lang,
      currency: AppState.currency,
      submittedAt: new Date().toISOString()
    };

    if (typeof localStorage !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('green_project_leads') || '[]');
      stored.unshift(lead);
      localStorage.setItem('green_project_leads', JSON.stringify(stored));
    }
  } catch (err) {
    console.warn('Lead persistence error:', err);
  }

  const toast = document.getElementById('toastBox');
  const toastText = document.getElementById('toastText');
  if (toast && toastText) {
    toastText.textContent = I18N[AppState.lang].toastSuccess;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3500);
  }
  e.target.reset();
  document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
}

function getLeads() {
  try {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('green_project_leads') || '[]');
    }
  } catch {}
  return [];
}

function clearLeads() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('green_project_leads');
    }
  } catch {}
}

/**
 * 7b. INTERACTIVE MAP CONTROLLER
 */
function selectMapLocation(target) {
  const tabs = [
    { key: 'all', id: 'mapTabAll' },
    { key: 'avan', id: 'mapTabAvan' },
    { key: 'nork', id: 'mapTabNork' },
    { key: 'townhouse', id: 'mapTabKasakh' },
    { key: 'office', id: 'mapTabOffice' }
  ];

  tabs.forEach(t => {
    const el = document.getElementById(t.id);
    if (el) {
      if (t.key === target) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  const items = [
    { key: 'avan', cardId: 'mapCardAvan', pinId: 'pinAvan' },
    { key: 'nork', cardId: 'mapCardNork', pinId: 'pinNork' },
    { key: 'townhouse', cardId: 'mapCardKasakh', pinId: 'pinKasakh' },
    { key: 'office', cardId: 'mapCardOffice', pinId: 'pinOffice' }
  ];

  items.forEach(item => {
    const card = document.getElementById(item.cardId);
    const pin = document.getElementById(item.pinId);
    const isVisible = target === 'all' || target === item.key;
    const isSelected = target === item.key;

    if (card) {
      if (isVisible) {
        card.style.removeProperty('display');
      } else {
        card.style.display = 'none';
      }
      if (isSelected) {
        card.classList.add('map-card-active');
        if (typeof card.scrollIntoView === 'function') {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        card.classList.remove('map-card-active');
      }
    }

    if (pin) {
      if (isVisible) {
        pin.style.opacity = '1';
        if (isSelected) pin.classList.add('pin-highlighted');
        else pin.classList.remove('pin-highlighted');
      } else {
        pin.style.opacity = '0.3';
        pin.classList.remove('pin-highlighted');
      }
    }
  });
}

/**
 * Toggle between Yandex Maps widget and Interactive Vector Scheme
 */
function toggleMapView(mode) {
  const yandexLayer = document.getElementById('yandexMapLayer');
  const vectorLayer = document.getElementById('vectorMapLayer');
  const btnYandex = document.getElementById('mapToggleYandex');
  const btnVector = document.getElementById('mapToggleVector');

  if (!yandexLayer || !vectorLayer) return;

  if (mode === 'yandex') {
    yandexLayer.style.display = 'block';
    vectorLayer.style.display = 'none';
    if (btnYandex) btnYandex.classList.add('active');
    if (btnVector) btnVector.classList.remove('active');
  } else {
    yandexLayer.style.display = 'none';
    vectorLayer.style.display = 'block';
    if (btnYandex) btnYandex.classList.remove('active');
    if (btnVector) btnVector.classList.add('active');
  }
}

function initPhoneMask() {
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.startsWith('374')) {
        val = val.substring(3);
      } else if (val.startsWith('0')) {
        val = val.substring(1);
      }
      val = val.substring(0, 8);

      let formatted = '+374 ';
      if (val.length > 0) formatted += '(' + val.substring(0, 2);
      if (val.length >= 2) formatted += ') ';
      if (val.length > 2) formatted += val.substring(2, 4);
      if (val.length >= 4) formatted += '-' + val.substring(4, 6);
      if (val.length >= 6) formatted += '-' + val.substring(6, 8);

      if (e.target.value.trim() === '' || val.length === 0) {
        // preserve empty
      } else {
        e.target.value = formatted;
      }
    });
  });
}

function initTourDatePicker() {
  const tourDate = document.getElementById('tourDate');
  if (tourDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    tourDate.setAttribute('min', minDate);
    if (!tourDate.value) {
      tourDate.value = minDate;
    }
  }
}

function toggleContactWidgetModal() {
  const modal = document.getElementById('modalQuickContact');
  if (modal) {
    if (modal.classList.contains('active')) {
      closeModal('modalQuickContact');
    } else {
      openModal('modalQuickContact');
    }
  }
}

function switchWidgetTab(tabName) {
  const btnCall = document.getElementById('tabBtnCall');
  const btnChat = document.getElementById('tabBtnChat');
  const paneCall = document.getElementById('widgetPaneCall');
  const paneChat = document.getElementById('widgetPaneChat');

  if (tabName === 'call') {
    if (btnCall) { btnCall.classList.add('active'); btnCall.setAttribute('aria-selected', 'true'); }
    if (btnChat) { btnChat.classList.remove('active'); btnChat.setAttribute('aria-selected', 'false'); }
    if (paneCall) paneCall.style.display = 'block';
    if (paneChat) paneChat.style.display = 'none';
  } else {
    if (btnChat) { btnChat.classList.add('active'); btnChat.setAttribute('aria-selected', 'true'); }
    if (btnCall) { btnCall.classList.remove('active'); btnCall.setAttribute('aria-selected', 'false'); }
    if (paneCall) paneCall.style.display = 'none';
    if (paneChat) paneChat.style.display = 'block';
  }
}

function initBankPillButtons() {
  document.querySelectorAll('.bank-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bank-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const rate = parseFloat(btn.getAttribute('data-bank-rate'));
      const inputRate = document.getElementById('inputRate');
      if (inputRate && !isNaN(rate)) {
        inputRate.value = rate;
        updateMortgageCalculation();
      }
    });
  });
}

function checkUrlParameters() {
  if (typeof window === 'undefined' || !window.location || !window.location.search) return;
  const params = new URLSearchParams(window.location.search);

  // Project filter (?project=avan, nork, townhouse)
  const projParam = params.get('project');
  if (projParam) {
    AppState.activeProjFilter = projParam;
    document.querySelectorAll('[data-filter-proj], [data-filter-project]').forEach(b => {
      const val = b.getAttribute('data-filter-proj') || b.getAttribute('data-filter-project');
      const match = val === projParam;
      b.classList.toggle('active', match);
      b.classList.toggle('project-active', match);
    });
    applyFiltersAndSort();
    updatePassportBanner(projParam);
  }

  // Rooms filter (?rooms=1k, 2k, 3k, th)
  const roomsParam = params.get('rooms');
  if (roomsParam) {
    AppState.activeRoomFilter = roomsParam;
    document.querySelectorAll('[data-filter-room], [data-filter]').forEach(b => {
      const val = b.getAttribute('data-filter-room') || b.getAttribute('data-filter');
      b.classList.toggle('active', val === roomsParam);
    });
    applyFiltersAndSort();
  }

  // Price parameter on mortgage page (?price=23680000)
  const priceParam = params.get('price');
  if (priceParam) {
    const p = parseInt(priceParam, 10);
    const inputPrice = document.getElementById('inputPrice');
    if (inputPrice && !isNaN(p)) {
      inputPrice.value = p;
      updateMortgageCalculation();
    }
  }
}

function loadCustomCatalogIfAvailable() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const stored = localStorage.getItem('green_project_catalog');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(item => {
          if (APARTMENTS_DATA[item.id]) {
            APARTMENTS_DATA[item.id].status = item.status;
            if (item.priceAMD) APARTMENTS_DATA[item.id].priceAMD = item.priceAMD;
          }
        });
      }
    }
  } catch (e) {
    // Non-critical fallback
  }
}

/**
 * 8. INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {

  // URL Param support with safe fallback (Node VM / Headless resilience)
  const urlParams = (typeof window !== 'undefined' && window.location && window.location.search)
    ? new URLSearchParams(window.location.search)
    : null;
  const initialLang = (urlParams && urlParams.get('lang')) || 'ru';
  const initialCur = (urlParams && urlParams.get('currency')) || 'AMD';

  // Default Language: RUSSIAN (or URL param)
  setLanguage(['ru', 'hy', 'en'].includes(initialLang) ? initialLang : 'ru');

  // Default Currency: AMD (or URL param)
  setCurrency(['AMD', 'USD'].includes(initialCur) ? initialCur : 'AMD');

  // Language buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  // Currency buttons
  document.querySelectorAll('[data-currency]').forEach(btn => {
    btn.addEventListener('click', () => setCurrency(btn.getAttribute('data-currency')));
  });

  // Room Filters
  document.querySelectorAll('[data-filter-room]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-room]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeRoomFilter = btn.getAttribute('data-filter-room');
      applyFiltersAndSort();
    });
  });

  // Project Filters
  document.querySelectorAll('[data-filter-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-proj]').forEach(b => b.classList.remove('project-active'));
      btn.classList.add('project-active');
      AppState.activeProjFilter = btn.getAttribute('data-filter-proj');
      applyFiltersAndSort();
      updatePassportBanner(AppState.activeProjFilter);
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.activeSort = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Calculator Sliders
  ['inputPrice', 'inputDown', 'inputYears', 'inputRate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateMortgageCalculation);
  });

  // Bank Presets
  document.querySelectorAll('.bank-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bank-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const rate = parseFloat(btn.getAttribute('data-rate'));
      const inputRate = document.getElementById('inputRate');
      if (inputRate) {
        inputRate.value = rate;
        updateMortgageCalculation();
      }
    });
  });

  // Mobile Drawer
  const btnToggle = document.getElementById('btnToggleDrawer');
  const btnClose = document.getElementById('btnCloseDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('mobileDrawer');

  const openDrawer = () => {
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
    }
  };

  const closeDrawer = () => {
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    }
  };

  if (btnToggle) btnToggle.addEventListener('click', openDrawer);
  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

  // Modal Backdrop Click & ESC
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
      closeDrawer();
    }
  });

  // Run initial calculation, prices, passport, catalog and scroll reveal
  loadCustomCatalogIfAvailable();
  initBankPillButtons();
  checkUrlParameters();
  updateMortgageCalculation();
  updateCardPrices();
  updatePassportBanner();
  initScrollReveal();
  initLenisScroll();
  initSmartHeader();
  initPhoneMask();
  initTourDatePicker();
});

if (typeof window !== 'undefined') {
  window.AppState = AppState;
  window.I18N = I18N;
  window.APARTMENTS_DATA = APARTMENTS_DATA;
  window.formatCurrency = formatCurrency;
  window.setLanguage = setLanguage;
  window.setCurrency = setCurrency;
  window.updateCardPrices = updateCardPrices;
  window.filterProjectFromShowcase = filterProjectFromShowcase;
  window.getYearsString = getYearsString;
  window.updateMortgageCalculation = updateMortgageCalculation;
  window.applyFiltersAndSort = applyFiltersAndSort;
  window.openApartmentModal = openApartmentModal;
  window.bookCurrentApartment = bookCurrentApartment;
  window.bookCurrentApartmentWhatsApp = bookCurrentApartmentWhatsApp;
  window.updatePassportBanner = updatePassportBanner;
  window.initScrollReveal = initScrollReveal;
  window.initLenisScroll = initLenisScroll;
  window.initSmartHeader = initSmartHeader;
  window.calculateThisApartment = calculateThisApartment;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.handleFormSubmit = handleFormSubmit;
  window.selectMapLocation = selectMapLocation;
  window.toggleMapView = toggleMapView;
  window.getLeads = getLeads;
  window.clearLeads = clearLeads;
  window.initPhoneMask = initPhoneMask;
  window.initTourDatePicker = initTourDatePicker;
  window.toggleContactWidgetModal = toggleContactWidgetModal;
  window.switchWidgetTab = switchWidgetTab;
  window.initBankPillButtons = initBankPillButtons;
  window.checkUrlParameters = checkUrlParameters;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AppState,
    I18N,
    APARTMENTS_DATA,
    formatCurrency,
    setLanguage,
    setCurrency,
    updateCardPrices,
    filterProjectFromShowcase,
    getYearsString,
    updateMortgageCalculation,
    applyFiltersAndSort,
    openApartmentModal,
    bookCurrentApartment,
    bookCurrentApartmentWhatsApp,
    updatePassportBanner,
    initScrollReveal,
    initLenisScroll,
    initSmartHeader,
    calculateThisApartment,
    openModal,
    closeModal,
    handleFormSubmit,
    selectMapLocation,
    toggleMapView,
    getLeads,
    clearLeads,
    initPhoneMask,
    initTourDatePicker,
    toggleContactWidgetModal,
    switchWidgetTab,
    initBankPillButtons,
    checkUrlParameters
  };
}


export interface MetricItem {
  label: string;
  value: string;
}

export interface DisciplineTranslation {
  label: string;
  badge: string;
  title: string;
  standard: string;
  desc: string;
  metrics: MetricItem[];
  layersTitle: string;
  layers: string[];
  inspectorTitle: string;
  inspectorSubtitle: string;
  checks: string[];
  certLabel: string;
}

export interface MatrixRowTranslation {
  feature: string;
  standard: string;
  greenProject: string;
  advantage: string;
}

export interface EscrowStepTranslation {
  num: string;
  title: string;
  desc: string;
  badge: string;
}

export interface BankPartnerTranslation {
  name: string;
  role: string;
  rate: string;
}

export interface AudienceTabTranslation {
  label: string;
  title: string;
  desc: string;
  benefits: string[];
  recommendedProject: string;
  recommendedCta: string;
}

export interface Dictionary {
  brand: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
    email: string;
    salesOfficeTitle: string;
  };
  nav: {
    projects: string;
    apartments: string;
    catalog: string;
    mortgage: string;
    standards: string;
    about: string;
    admin: string;
    requestCall: string;
    adminLogin: string;
  };
  topBar: {
    location: string;
    accreditation: string;
    bookTour: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreProjects: string;
    calculateMortgage: string;
    chooseApartment: string;
    statAreaFrom: string;
    statAreaUnit: string;
    statFloors: string;
    statFloorsUnit: string;
    statMortgage: string;
    statMortgageUnit: string;
    statProjects: string;
    statProjectsUnit: string;
  };
  audience: {
    badge: string;
    title: string;
    subtitle: string;
    tabFamily: AudienceTabTranslation;
    tabIT: AudienceTabTranslation;
    tabInvestor: AudienceTabTranslation;
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    fromPrice: string;
    chooseApartment: string;
    deliveryPrefix: string;
    readinessPrefix: string;
    timeToCenter: string;
    comfortPlus: string;
    businessClass: string;
    eliteTownhouse: string;
    featuresSummaryAvan: string;
    featuresSummaryNork: string;
    featuresSummaryTownhouse: string;
  };
  flagship: {
    title: string;
    subtitle: string;
    allCatalogBtn: string;
    detailsBtn: string;
    areaUnit: string;
    roomsUnit: string;
    floorUnit: string;
    fromPrefix: string;
    statusAvailable: string;
    statusReserved: string;
    statusSold: string;
  };
  engineering: {
    topLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    requestBlueprintBtn: string;
    standardsNote: string;
    disciplines: {
      seismic: DisciplineTranslation;
      acoustic: DisciplineTranslation;
      energy: DisciplineTranslation;
      engineering: DisciplineTranslation;
    };
    matrix: {
      title: string;
      subtitle: string;
      badge: string;
      colParam: string;
      colStandard: string;
      colGreenProject: string;
      colResult: string;
      rows: MatrixRowTranslation[];
    };
    passportCta: {
      topBadge: string;
      title: string;
      desc: string;
      btnText: string;
    };
    about: {
      badge: string;
      title: string;
      p1: string;
      p2: string;
      stat1Num: string;
      stat1Unit: string;
      stat1Title: string;
      stat1Desc: string;
      stat2Num: string;
      stat2Unit: string;
      stat2Title: string;
      stat2Desc: string;
      stat3Num: string;
      stat3Unit: string;
      stat3Title: string;
      stat3Desc: string;
      stat4Num: string;
      stat4Unit: string;
      stat4Title: string;
      stat4Desc: string;
    };
  };
  escrow: {
    topLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    passport: {
      officialStatus: string;
      developerStatus: string;
      title: string;
      licenseLabel: string;
      licenseNumber: string;
      lawLabel: string;
      lawTitle: string;
      certLabel: string;
      certTitle: string;
      downloadReportBtn: string;
      directProtectionNote: string;
    };
    stepsTitle: string;
    steps: EscrowStepTranslation[];
    consortiumTitle: string;
    consortiumSubtitle: string;
    consortiumLabel: string;
    banks: BankPartnerTranslation[];
    legalNotice: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    filterProject: string;
    allProjects: string;
    filterRooms: string;
    allRooms: string;
    filterStatus: string;
    allStatuses: string;
    priceRange: string;
    areaRange: string;
    floorRange: string;
    sortByPriceAsc: string;
    sortByPriceDesc: string;
    sortByAreaAsc: string;
    sortByAreaDesc: string;
    statusAvailable: string;
    statusReserved: string;
    statusSold: string;
    notFound: string;
    resetFilters: string;
    detailsBtn: string;
    bookConsultation: string;
    viewGrid: string;
    viewTable: string;
    colProject: string;
    colApartment: string;
    colRooms: string;
    colArea: string;
    colFloor: string;
    colDelivery: string;
    colStatus: string;
    colPrice: string;
    colAction: string;
    headerBadge: string;
    headerTitle: string;
    headerSubtitle: string;
    unitsFound: string;
    noUnitsFound: string;
    ceilingLabel: string;
    balconyLabel: string;
    propertyPriceLabel: string;
    bookByPhone: string;
    catalogLoading: string;
  };
  mortgage: {
    title: string;
    subtitle: string;
    propertyPrice: string;
    downPayment: string;
    loanTerm: string;
    interestRate: string;
    coBorrowerToggle: string;
    coBorrowerDesc: string;
    monthlyPayment: string;
    taxRefundMonthly: string;
    effectivePayment: string;
    savings5Years: string;
    requiredSalary: string;
    banksTitle: string;
    downloadPdf: string;
    urgencyTitle: string;
    urgencyYerevan: string;
    urgencyKasakh: string;
    partnerBanks: string;
    coBorrowerOn: string;
    coBorrowerOff: string;
    limitWithCoBorrower: string;
    limitSingleBorrower: string;
    lawArticle156Cap: string;
    loanAmount: string;
    subsidizedByState: string;
    yourPayment: string;
    stateCovers: string;
    savings1Year: string;
    fromPrefix: string;
    perMonth: string;
    yearsUnit: string;
    monthsUnit: string;
    ctaApproval: string;
    printPdf: string;
    pageTopBadge: string;
    pageSubtitleExtra: string;
    statusScheduleTitle: string;
    yerevanScheduleNote: string;
    kasakhScheduleNote: string;
    faqTitle: string;
    faqs: Array<{ q: string; a: string }>;
  };
  bookingPolicy: {
    title: string;
    text: string;
  };
  projectDetail: {
    backToProjects: string;
    statusReady: string;
    addressLabel: string;
    keyFeaturesTitle: string;
    floorSelectorTitle: string;
    floorSelectorSubtitle: string;
    selectBuilding: string;
    selectFloor: string;
    availableOnFloor: string;
    viewPlanBtn: string;
    reserveBtn: string;
    specsTitle: string;
    specsSubtitle: string;
    govStandardNotice: string;
    sqmPricePrefix: string;
  };
  consultModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    projectLabel: string;
    anyProject: string;
    timeLabel: string;
    anytime: string;
    morning: string;
    afternoon: string;
    evening: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    privacyNotice: string;
    validationNameError: string;
    validationPhoneError: string;
    submissionError: string;
  };
  footer: {
    projectsTitle: string;
    buyersTitle: string;
    contactsTitle: string;
    salesOffice: string;
    workingHours: string;
    allRightsReserved: string;
    adminLink: string;
    developerCharter: string;
    privacyPolicy: string;
  };
  common: {
    sqm: string;
    floor: string;
    rooms: string;
    currencyAMD: string;
    currencyUSD: string;
    close: string;
    back: string;
    details: string;
    bookViewing: string;
    consultExpert: string;
  };
}

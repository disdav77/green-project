import { Project, Unit, Language } from '@/types/database';

interface ProjectLocalizationData {
  name: Record<Language, string>;
  district: Record<Language, string>;
  address: Record<Language, string>;
  category: Record<Language, string>;
  deliveryDate: Record<Language, string>;
  timeToCenter: Record<Language, string>;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
}

const PROJECT_TRANSLATIONS: Record<string, ProjectLocalizationData> = {
  avan: {
    name: {
      ru: 'ЖК Green Avan',
      hy: 'Green Avan ԲՀ',
      en: 'Green Avan Complex',
    },
    district: {
      ru: 'Аван, Ереван',
      hy: 'Ավան, Երևան',
      en: 'Avan, Yerevan',
    },
    address: {
      ru: 'г. Ереван, Аван, ул. Царав Ахбюр, 61/4',
      hy: 'ք. Երևան, Ավան, Ծարավ Աղբյուրի փող., 61/4',
      en: 'Yerevan, Avan, Tsarav Aghbyur St., 61/4',
    },
    category: {
      ru: 'Комфорт-плюс',
      hy: 'Կոմֆորտ-պլյուս',
      en: 'Comfort Plus',
    },
    deliveryDate: {
      ru: 'IV кв. 2025',
      hy: 'IV եռ. 2025',
      en: 'Q4 2025',
    },
    timeToCenter: {
      ru: '10 мин',
      hy: '10 ր',
      en: '10 min',
    },
    description: {
      ru: '14-этажный высотный комплекс комфорт-плюс с закрытым благоустроенным двором-садом, 2 скоростными лифтами и подземным паркингом.',
      hy: '14-հարկանի կոմֆորտ-պլյուս բարձրահարկ համալիր՝ փակ բարեկարգ բակ-այգիով, 2 արագընթաց վերելակներով և ստորգետնյա կայանատեղիով:',
      en: '14-story comfort-plus high-rise with a landscaped courtyard garden, 2 high-speed lifts, and underground parking.',
    },
    features: {
      ru: [
        '2 бесшумных скоростных лифта',
        'Подземный двухуровневый паркинг',
        'Озелененная закрытая территория без машин',
        'Современная развивающая детская площадка',
        'Панорамное энергоэффективное остекление',
      ],
      hy: [
        '2 անաղմուկ արագընթաց վերելակներ',
        'Ստորգետնյա երկմակարդակ կայանատեղի',
        'Կանաչապատ փակ տարածք առանց մեքենաների',
        'Ժամանակակից զարգացնող մանկական խաղահրապարակ',
        'Պանորամային էներգաարդյունավետ ապակեպատում',
      ],
      en: [
        '2 high-speed silent elevators',
        'Two-level underground heated parking',
        'Landscaped car-free gated territory',
        'Modern educational children playground',
        'Panoramic energy-efficient glass facade',
      ],
    },
  },
  nork: {
    name: {
      ru: 'ЖК Green Nork',
      hy: 'Green Nork ԲՀ',
      en: 'Green Nork Complex',
    },
    district: {
      ru: 'Нор-Норк, Ереван',
      hy: 'Նոր Նորք, Երևան',
      en: 'Nor Nork, Yerevan',
    },
    address: {
      ru: 'г. Ереван, Нор-Норк, ул. Гюрджяна, 14',
      hy: 'ք. Երևան, Նոր Նորք, Գյուրջյան փող., 14',
      en: 'Yerevan, Nor Nork, Gyurjyan St., 14',
    },
    category: {
      ru: 'Бизнес-класс',
      hy: 'Բիզնես-դաս',
      en: 'Business Class',
    },
    deliveryDate: {
      ru: 'III кв. 2026',
      hy: 'III եռ. 2026',
      en: 'Q3 2026',
    },
    timeToCenter: {
      ru: '15 мин',
      hy: '15 ր',
      en: '15 min',
    },
    description: {
      ru: 'Камерный 6-этажный клубный дом бизнес-класса с панорамным обзором горы Арарат, приватным лобби и акустической защитой 55 дБ.',
      hy: 'Կամերային 6-հարկանի ակումբային տուն բիզնես-դասի՝ Արարատ լեռան համայնապատկերով, անձնական լոբբիով և 55 դԲ ակուստիկ պաշտպանությամբ:',
      en: 'Boutique 6-story business-class residence with panoramic views of Mount Ararat, private lobby, and 55 dB acoustic protection.',
    },
    features: {
      ru: [
        'Всего 36 квартир в доме',
        'Прямой обзор библейской горы Арарат',
        'Премиальное дизайнерское лобби',
        'Повышенная звукоизоляция 55 дБ',
        'Подземный охраняемый паркинг',
      ],
      hy: [
        'Ընդամենը 36 բնակարան շենքում',
        'Ուղիղ տեսարան դեպի բիբլիական Արարատ լեռը',
        'Պրեմիում դիզայներական նախասրահ',
        'Բարձրացված ձայնամեկուսացում 55 դԲ',
        'Ստորգետնյա պահպանվող կայանատեղի',
      ],
      en: [
        'Only 36 boutique residences in total',
        'Direct unhindered views of Mount Ararat',
        'Exclusive architectural designer lobby',
        'Certified acoustic soundproofing 55 dB',
        'Underground 24/7 guarded parking',
      ],
    },
  },
  townhouse: {
    name: {
      ru: 'Green Townhouse',
      hy: 'Green Townhouse',
      en: 'Green Townhouse',
    },
    district: {
      ru: 'с. Касах, Котайк',
      hy: 'գ. Քասախ, Կոտայք',
      en: 'Kasakh, Kotayk',
    },
    address: {
      ru: 'Котайкский марз, с. Касах, ул. Геворка Чауша, 12',
      hy: 'Կոտայքի մարզ, գ. Քասախ, Գևորգ Չաուշի փող., 12',
      en: 'Kotayk Province, Kasakh, Gevorg Chaush St., 12',
    },
    category: {
      ru: 'Премиум таунхаусы',
      hy: 'Պրեմիում թաունհաուսներ',
      en: 'Premium Townhouses',
    },
    deliveryDate: {
      ru: 'II кв. 2026',
      hy: 'II եռ. 2026',
      en: 'Q2 2026',
    },
    timeToCenter: {
      ru: '18 мин',
      hy: '18 ր',
      en: '18 min',
    },
    description: {
      ru: 'Закрытый клубный поселок из 18 премиальных таунхаусов с придомовыми участками, террасами на крыше и бессрочным возвратом налога по Ст. 156.1.',
      hy: '18 պրեմիում թաունհաուսներից բաղկացած փակ ակումբային ավան՝ սեփական հողամասերով, տանիքի տեռասներով և ՀՕ 156.1 հոդվածով անժամկետ հարկի վերադարձով:',
      en: 'Gated community of 18 premium townhouses with private landscaped plots, rooftop terraces, and indefinite Art. 156.1 tax refunds.',
    },
    features: {
      ru: [
        'Собственный земельный участок 150-250 м²',
        'Эксплуатируемая панорамная кровля-терраса',
        'Индивидуальный гараж и парковочные места',
        'Бессрочный возврат подоходного налога (Котайк)',
        'Экологически чистый воздух и приватность',
      ],
      hy: [
        'Առանձնացված հողամաս 150-250 քմ',
        'Շահագործվող պանորամային տանիք-տեռաս',
        'Անհատական ավտոտնակ և կայանման տեղեր',
        'Եկամտային հարկի անժամկետ վերադարձ (Կոտայք)',
        'Էկոլոգիապես մաքուր օդ և առանձնացվածություն',
      ],
      en: [
        'Private landscaped plot of 150-250 sqm',
        'Usable panoramic rooftop lounge terrace',
        'Individual covered garage and parking spaces',
        'Indefinite income tax refund status (Kotayk)',
        'Clean pristine mountain air and supreme privacy',
      ],
    },
  },
};

export function getLocalizedProject(project: Project, lang: Language = 'ru'): Project {
  const trans = PROJECT_TRANSLATIONS[project.slug] || PROJECT_TRANSLATIONS[project.id];
  if (!trans) return project;

  return {
    ...project,
    name: trans.name[lang] || project.name,
    district: trans.district[lang] || project.district,
    address: trans.address[lang] || project.address,
    category: trans.category[lang] || project.category,
    deliveryDate: trans.deliveryDate[lang] || project.deliveryDate,
    timeToCenter: trans.timeToCenter[lang] || project.timeToCenter,
    description: trans.description[lang] || project.description,
    features: trans.features[lang] || project.features,
  };
}

export function getLocalizedUnit(unit: Unit, lang: Language = 'ru'): Unit {
  let roomsLabel = unit.roomsLabel;

  if (unit.rooms === 1 && unit.roomsLabel.toLowerCase().includes('студия')) {
    roomsLabel = lang === 'hy' ? 'Ստուդիա' : lang === 'en' ? 'Studio' : 'Студия';
  } else if (unit.rooms === 1) {
    roomsLabel = lang === 'hy' ? '1-սենյականոց բնակարան' : lang === 'en' ? '1-Bedroom Apartment' : '1-комнатная квартира';
  } else if (unit.rooms === 2) {
    roomsLabel = lang === 'hy' ? '2-սենյականոց բնակարան' : lang === 'en' ? '2-Bedroom Apartment' : '2-комнатная квартира';
  } else if (unit.rooms === 3) {
    roomsLabel = lang === 'hy' ? '3-սենյականոց բնակարան' : lang === 'en' ? '3-Bedroom Apartment' : '3-комнатная квартира';
  } else if (unit.rooms >= 4) {
    roomsLabel = lang === 'hy' ? '4-սենյականոց թաունհաուս' : lang === 'en' ? '4-Bedroom Townhouse' : 'Таунхаус 4-комн.';
  }

  return {
    ...unit,
    roomsLabel,
  };
}

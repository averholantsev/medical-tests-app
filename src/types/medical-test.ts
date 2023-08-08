export interface IMedicalTest {
  // СОЭ
  soe: number;
  // Эритроциты
  eritrocity: number;
  // Гемаглобин
  gemaglobin: number;
  // Гематокрит
  gematokrit: number;
  // Средний объем эритроцитов (MCV)
  mcv: number;
  // Средняя концентрация Hb в эритроцитах (MCHC)
  mchc: number;
  // Среднее содержание гемоглобина в эритроците (MCH)
  mch: number;
  // Отн. ширина распред. эритр. по объему (ст. отклонение)
  rel_width_eritrocity_deviation: number;
  // Отн. ширина распред. эритр. по объему (коэфф. вариации)
  rel_width_eritrocity_variation: number;
  // Тромбоциты
  trombocity: number;
  // Средний объем тромбоцитов (MPV)
  mpv: number;
  // Тромбокрит (PCT)
  pct: number;
  // Относит.ширина распред.тромбоцитов по объему (PDW)
  pdw: number;
  // Лейкоциты
  lejkocity: number;
  // Нейтрофилы
  nejtrofily: number;
  // Нейтрофилы %
  nejtrofily_percent: number;
  // Эозинофилы
  eozinofily: number;
  // Эозинофилы %
  eozinofily_percent: number;
  // Базофилы
  bazofily: number;
  // Базофилы %
  bazofily_percent: number;
  // Моноциты
  monocity: number;
  // Моноциты %
  monocity_percent: number;
  // Лимфоциты
  limfocity: number;
  // Лимфоциты %
  limfocity_percent: number;
}

export interface IMedicalDictionaryChild {
  id: string;
  gender: 'man' | 'woman' | 'all';
  ageFrom: number | null;
  ageTo: number | null;
  measureNormMin: number;
  measureNormMax: number;
  measureIdealMin: number | null;
  measureIdealMax: number | null;
}

export interface IMedicalDictionary {
  id: string;
  name: string;
  measureUnit: string;
  description: string;
  measureLabMin: number;
  measureLabMax: number;
  decreasedTranscription: string | null;
  increasedTranscription: string | null;
  hint: string | null;
  children: IMedicalDictionaryChild[];
}

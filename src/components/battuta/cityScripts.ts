/**
 * Per-city multilingual cascade data, keyed by STAGE id.
 *
 * Drives the <TypographyCascade> overlay shown when the ZoomDive map flies
 * into a major city. Each entry is the city's name in its medieval-period
 * native script(s), often with a transliteration, anchored by the English
 * exonym.
 *
 * Coverage: every stage where the cascade adds historical depth. Stages
 * without an entry simply skip the overlay — by design, the cascade is a
 * highlight reel, not wallpaper.
 *
 * Sources for native-script forms:
 *   - Arabic: standard medieval place-names from Ibn Battuta's Rihla
 *     (Arabic editions: Defrémery & Sanguinetti 1853–58; Beirut 1964)
 *   - Chinese: Yuan-period names (Quanzhou 泉州 / Hangzhou 杭州 / Beijing 北京)
 *   - Devanagari: Sanskritic / Hindi forms
 *   - Greek: Byzantine names where applicable
 *   - Sinhala / Thaana / Tifinagh: regional native scripts
 */
import type { CityCascadeData } from '@/components/visuals/TypographyCascade';

export const CITY_SCRIPTS: Record<string, CityCascadeData> = {
  // ── Phase 1: North Africa to Mecca ──────────────────────────────────────
  'phase1-tangier': {
    eyebrow: 'The Departure',
    scripts: [
      { text: 'طَنْجَة', lang: 'ar', translit: 'Ṭanja', label: 'Maghrebi Arabic' },
    ],
    english: 'Tangier',
  },
  'phase1-tlemcen': {
    scripts: [
      { text: 'تِلِمْسَان', lang: 'ar', translit: 'Tilimsān', label: 'Arabic' },
    ],
    english: 'Tlemcen',
  },
  'phase1-tunis': {
    scripts: [
      { text: 'تُونِس', lang: 'ar', translit: 'Tūnis', label: 'Arabic' },
    ],
    english: 'Tunis',
  },
  'phase1-alexandria': {
    scripts: [
      { text: 'الْإِسْكَنْدَرِيَّة', lang: 'ar', translit: 'al-Iskandariyya', label: 'Arabic' },
      { text: 'Ἀλεξάνδρεια', lang: 'el', translit: 'Alexándreia', label: 'Greek heritage' },
    ],
    english: 'Alexandria',
  },
  'phase1-cairo': {
    eyebrow: 'Mother of Cities',
    scripts: [
      { text: 'الْقَاهِرَة', lang: 'ar', translit: 'al-Qāhira', label: 'Arabic' },
    ],
    english: 'Cairo',
  },
  'phase1-damascus': {
    scripts: [
      { text: 'دِمَشْق', lang: 'ar', translit: 'Dimashq', label: 'Arabic' },
    ],
    english: 'Damascus',
  },
  'phase1-mecca': {
    eyebrow: 'The First Pilgrimage',
    scripts: [
      { text: 'مَكَّة', lang: 'ar', translit: 'Makka', label: 'Sacred Arabic' },
    ],
    english: 'Mecca',
  },

  // ── Phase 2: Iraq, Persia & East Africa ─────────────────────────────────
  'phase2-baghdad': {
    eyebrow: 'After the Mongol Sack',
    scripts: [
      { text: 'بَغْدَاد', lang: 'ar', translit: 'Baghdād', label: 'Arabic' },
    ],
    english: 'Baghdad',
  },
  'phase2-tabriz': {
    scripts: [
      { text: 'تَبْرِیز', lang: 'ar', translit: 'Tabrīz', label: 'Persian Arabic' },
    ],
    english: 'Tabriz',
  },
  'phase2-aden': {
    scripts: [
      { text: 'عَدَن', lang: 'ar', translit: 'ʿAdan', label: 'Arabic' },
    ],
    english: 'Aden',
  },
  'phase2-mogadishu': {
    scripts: [
      { text: 'مَقْدِشُو', lang: 'ar', translit: 'Maqdishū', label: 'Arabic' },
    ],
    english: 'Mogadishu',
  },
  'phase2-kilwa': {
    eyebrow: '"One of the most beautiful cities in the world"',
    scripts: [
      { text: 'كِلْوَة', lang: 'ar', translit: 'Kilwa', label: 'Swahili Arabic' },
    ],
    english: 'Kilwa',
  },

  // ── Phase 3: Anatolia & the Golden Horde ────────────────────────────────
  'phase3-konya': {
    scripts: [
      { text: 'قُونِیَة', lang: 'ar', translit: 'Qūniya', label: 'Arabic' },
    ],
    english: 'Konya',
  },
  'phase3-crimea': {
    scripts: [
      { text: 'الْقِرِم', lang: 'ar', translit: 'al-Qirim', label: 'Arabic' },
    ],
    english: 'Crimea',
  },
  'phase3-sarai': {
    eyebrow: "Uzbeg Khan's Court",
    scripts: [
      { text: 'سَرَاي بَرْكَة', lang: 'ar', translit: 'Sarāy Barka', label: 'Arabic' },
    ],
    english: 'Sarai Berke',
  },
  'phase3-constantinople': {
    eyebrow: 'Beyond the Dar al-Islam',
    scripts: [
      { text: 'Κωνσταντινούπολις', lang: 'el', translit: 'Konstantinoúpolis', label: 'Byzantine Greek' },
      { text: 'الْقُسْطَنْطِينِيَّة', lang: 'ar', translit: 'al-Qusṭanṭīniyya', label: 'Arabic' },
    ],
    english: 'Constantinople',
  },

  // ── Phase 4: The Delhi Sultanate ────────────────────────────────────────
  'phase4-balkh': {
    scripts: [
      { text: 'بَلْخ', lang: 'ar', translit: 'Balkh', label: 'Arabic' },
    ],
    english: 'Balkh',
  },
  // Delhi cascade fires on the Appointment stage (the arrival moment). The
  // Madness stage that follows lets the prose carry the weight without
  // re-firing the typography overlay.
  'phase4-delhi-appointment': {
    eyebrow: 'Seven years as Qadi',
    scripts: [
      { text: 'दिल्ली', lang: 'hi', translit: 'Dillī', label: 'Devanagari' },
      { text: 'دِہْلِی', lang: 'ur', translit: 'Dihlī', label: 'Persian Urdu' },
    ],
    english: 'Delhi',
  },
  'phase4-calicut': {
    scripts: [
      { text: 'كَالِيكُوت', lang: 'ar', translit: 'Kālīkūt', label: 'Arabic' },
      { text: 'കോഴിക്കോട്', lang: 'mal', translit: 'Kōḻikkōṭ', label: 'Malayalam' },
    ],
    english: 'Calicut',
  },

  // ── Phase 5: Maldives to China ──────────────────────────────────────────
  'phase5-male': {
    scripts: [
      { text: 'މާލެ', lang: 'div', translit: 'Māle', label: 'Thaana' },
    ],
    english: 'Malé',
  },
  'phase5-srilanka': {
    eyebrow: "Adam's Peak",
    scripts: [
      { text: 'සිරිපාද', lang: 'sin', translit: 'Siripāda', label: 'Sinhala' },
      { text: 'سَرَنْدِيب', lang: 'ar', translit: 'Sarandīb', label: 'Medieval Arabic' },
    ],
    english: 'Sri Lanka',
  },
  'phase5-quanzhou': {
    eyebrow: 'The Eastern Extreme',
    scripts: [
      { text: '泉州', lang: 'zh', translit: 'Quánzhōu', label: 'Yuan Chinese' },
      { text: 'زَيْتُون', lang: 'ar', translit: 'Zaytūn', label: 'Medieval Arabic' },
    ],
    english: 'Quanzhou',
  },
  'phase5-beijing': {
    eyebrow: 'The disputed claim',
    scripts: [
      { text: '北京', lang: 'zh', translit: 'Běijīng', label: 'Chinese' },
      { text: 'خَان بَالِق', lang: 'ar', translit: 'Khān Bāliq', label: 'Mongol Arabic' },
    ],
    english: 'Beijing',
  },

  // ── Phase 6: The Black Death Return ─────────────────────────────────────
  'phase6-cairo-plague': {
    eyebrow: '24,000 dead per day',
    scripts: [
      { text: 'الْقَاهِرَة', lang: 'ar', translit: 'al-Qāhira', label: 'The plague-emptied city' },
    ],
    english: 'Cairo',
  },
  'phase6-damascus-plague': {
    eyebrow: 'The Interfaith Prayer',
    scripts: [
      { text: 'دِمَشْق', lang: 'ar', translit: 'Dimashq', label: 'Arabic' },
    ],
    english: 'Damascus',
  },
  'phase6-tangier-return': {
    eyebrow: 'After 24 years',
    scripts: [
      { text: 'طَنْجَة', lang: 'ar', translit: 'Ṭanja', label: 'The empty homecoming' },
    ],
    english: 'Tangier',
  },

  // ── Phase 7: Al-Andalus & Mali ──────────────────────────────────────────
  'phase7-granada': {
    scripts: [
      { text: 'غَرْنَاطَة', lang: 'ar', translit: 'Gharnāṭa', label: 'Andalusi Arabic' },
    ],
    english: 'Granada',
  },
  'phase7-sijilmasa': {
    scripts: [
      { text: 'سِجِلْمَاسَة', lang: 'ar', translit: 'Sijilmāsa', label: 'Arabic' },
    ],
    english: 'Sijilmasa',
  },
  'phase7-taghaza': {
    eyebrow: 'Houses of salt',
    scripts: [
      { text: 'تَغَازَة', lang: 'ar', translit: 'Taghāza', label: 'Saharan Arabic' },
    ],
    english: 'Taghaza',
  },
  'phase7-timbuktu': {
    scripts: [
      { text: 'تُنْبُكْتُو', lang: 'ar', translit: 'Tunbuktū', label: 'Arabic' },
    ],
    english: 'Timbuktu',
  },
  'phase7-mali': {
    eyebrow: "Mansa Suleyman's Court",
    scripts: [
      { text: 'مَالِي', lang: 'ar', translit: 'Mālī', label: 'Arabic' },
    ],
    english: 'Mali',
  },
  'phase7-fez-final': {
    eyebrow: 'Where the Rihla was dictated',
    scripts: [
      { text: 'فَاس', lang: 'ar', translit: 'Fās', label: 'Maghrebi Arabic' },
    ],
    english: 'Fez',
  },
};

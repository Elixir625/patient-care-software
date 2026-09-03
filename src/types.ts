export type Language = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", flag: "🇮🇳" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", flag: "🇮🇳" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", flag: "🇮🇳" },
];

export type AppScreen =
  | "login"
  | "home"
  | "interview"
  | "documents"
  | "history"
  | "summary"
  | "settings"
  | "account";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  imageUrl?: string;
};

export type Document = {
  id: string;
  name: string;
  type: "prescription" | "lab" | "discharge" | "scan" | "other";
  date: string;
  summary: string;
  abnormalFlags?: string[];
  imageUrl?: string;
};

export type PatientProfile = {
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  language: string;
  phone: string;
};

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to MediKiosk",
    subtitle: "Your trusted health companion",
    start: "Get Started",
    enterAbha: "Enter ABHA ID / Aadhaar",
    newPatient: "New Patient? Register",
    language: "Language",
    selectLang: "Select Language",
    home: "Home",
    aiInterview: "AI Health Interview",
    documents: "My Documents",
    history: "Medical History",
    camera: "Scan Document",
    emergency: "Emergency",
    settings: "Settings",
    account: "My Account",
    aiChat: "AI Assistant",
    typeMessage: "Type or speak your message...",
    send: "Send",
    speak: "Speak",
    uploadDoc: "Upload Document",
    scanDoc: "Scan with Camera",
    greeting: "Hello! I am Aarogya, your health assistant. How can I help you today?",
    chiefComplaint: "What is the main health problem bringing you here today?",
    consentTitle: "Your Privacy Matters",
    consentText: "We will collect and securely store your health information only with your permission. You can withdraw consent at any time.",
    iConsent: "I Agree & Continue",
    emergencyAlert: "Emergency Services",
    emergencyConfirm: "Calling Emergency Services...",
    call108: "Call 108 Ambulance",
    call112: "Call 112 Police",
    redFlag: "⚠️ URGENT: Your symptoms need immediate attention. Alerting triage staff now.",
    summaryReady: "Your health summary is ready for the doctor.",
    addDoc: "Add Document",
    noDocuments: "No documents uploaded yet",
    uploadFirst: "Upload your prescriptions, lab reports, or discharge summaries",
    abnormal: "Abnormal Values",
    timeline: "Medical Timeline",
    consentAudio: "🔊 Tap to hear explanation",
    ocrProcessing: "Reading your document...",
    ocrDone: "Document processed successfully!",
    voiceCapture: "Voice Capture Active",
    loginWith: "Login with",
    registerNew: "Register as New Patient",
    abhaPlaceholder: "14-digit ABHA Number",
    aadhaarPlaceholder: "12-digit Aadhaar Number",
    orScan: "or scan QR code",
    namePlaceholder: "Full Name",
    agePlaceholder: "Age",
    phonePlaceholder: "Mobile Number",
    submit: "Submit",
    back: "Back",
    next: "Next",
    done: "Done",
    ayushMode: "Switch to AYUSH / Ayurvedic Mode",
    standardMode: "Switch to Standard Mode",
    interviewStart: "Starting your health interview...",
    interviewDone: "Interview Complete! Generating summary...",
  },
  hi: {
    welcome: "MediKiosk में आपका स्वागत है",
    subtitle: "आपका विश्वसनीय स्वास्थ्य साथी",
    start: "शुरू करें",
    enterAbha: "ABHA ID / आधार दर्ज करें",
    newPatient: "नए मरीज? पंजीकरण करें",
    language: "भाषा",
    selectLang: "भाषा चुनें",
    home: "होम",
    aiInterview: "AI स्वास्थ्य साक्षात्कार",
    documents: "मेरे दस्तावेज़",
    history: "चिकित्सा इतिहास",
    camera: "दस्तावेज़ स्कैन करें",
    emergency: "आपातकालीन",
    settings: "सेटिंग्स",
    account: "मेरा खाता",
    aiChat: "AI सहायक",
    typeMessage: "टाइप करें या बोलें...",
    send: "भेजें",
    speak: "बोलें",
    uploadDoc: "दस्तावेज़ अपलोड करें",
    scanDoc: "कैमरे से स्कैन करें",
    greeting: "नमस्ते! मैं आरोग्या हूं, आपका स्वास्थ्य सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
    chiefComplaint: "आज आप यहाँ किस मुख्य स्वास्थ्य समस्या के लिए आए हैं?",
    consentTitle: "आपकी गोपनीयता महत्वपूर्ण है",
    consentText: "हम केवल आपकी अनुमति से आपकी स्वास्थ्य जानकारी एकत्र और सुरक्षित रूप से संग्रहीत करेंगे।",
    iConsent: "मैं सहमत हूं और जारी रखें",
    emergencyAlert: "आपातकालीन सेवाएं",
    emergencyConfirm: "आपातकालीन सेवाओं को कॉल किया जा रहा है...",
    call108: "108 एम्बुलेंस कॉल करें",
    call112: "112 पुलिस कॉल करें",
    redFlag: "⚠️ तत्काल: आपके लक्षणों पर तुरंत ध्यान देने की जरूरत है।",
    summaryReady: "आपका स्वास्थ्य सारांश डॉक्टर के लिए तैयार है।",
    addDoc: "दस्तावेज़ जोड़ें",
    noDocuments: "अभी तक कोई दस्तावेज़ अपलोड नहीं हुआ",
    uploadFirst: "अपने नुस्खे, लैब रिपोर्ट या डिस्चार्ज सारांश अपलोड करें",
    abnormal: "असामान्य मूल्य",
    timeline: "चिकित्सा समयरेखा",
    consentAudio: "🔊 स्पष्टीकरण सुनने के लिए टैप करें",
    ocrProcessing: "आपका दस्तावेज़ पढ़ा जा रहा है...",
    ocrDone: "दस्तावेज़ सफलतापूर्वक संसाधित!",
    voiceCapture: "वॉयस कैप्चर सक्रिय",
    loginWith: "इससे लॉगिन करें",
    registerNew: "नए मरीज के रूप में पंजीकरण करें",
    abhaPlaceholder: "14 अंकों की ABHA संख्या",
    aadhaarPlaceholder: "12 अंकों की आधार संख्या",
    orScan: "या QR कोड स्कैन करें",
    namePlaceholder: "पूरा नाम",
    agePlaceholder: "आयु",
    phonePlaceholder: "मोबाइल नंबर",
    submit: "जमा करें",
    back: "वापस",
    next: "आगे",
    done: "हो गया",
    ayushMode: "आयुर्वेदिक मोड में जाएं",
    standardMode: "मानक मोड में जाएं",
    interviewStart: "आपका स्वास्थ्य साक्षात्कार शुरू हो रहा है...",
    interviewDone: "साक्षात्कार पूर्ण! सारांश तैयार हो रहा है...",
  },
};

export function t(key: string, lang: string): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  return dict[key] || TRANSLATIONS["en"][key] || key;
}

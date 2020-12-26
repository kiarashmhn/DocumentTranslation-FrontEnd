export const Dictionary = {
  name: {
    persian: "نام",
    french: "Prénom"
  },
  lastName: {
    persian: "نام خانوادگی",
    french: "Nom"
  },
  type: {
    persian: "نوع شناسنامه",
    french: "Type de carte d'identité"
  },
  address: {
    persian: "آدرس دریافت مدارک ترجمه شده",
    french: "Recevoir l'adresse"
  },
  country: {
    persian: "کشور محل سکونت",
    french: "Pays de résidence"
  },
  gender: {
    persian: "جنسیت",
    french: "Le sexe"
  },
  birthDate: {
    persian: "تاریخ تولد",
    french: "Date de naissance"
  },
  birthLocation: {
    persian: "محل تولد",
    french: "Lieu de naissance"
  },
  files: {
    persian: "مستندات",
    french: "documents"
  },
  nationalId: {
    persian: "شماره ملی",
    french: "N° d'identité national"
  },
  serial: {
    persian: "شماره سریال شناسنامه",
    french: "Numéro séquentiel"
  },
  certificateId: {
    persian: "شماره شناسنامه",
    french: "N° de l’Acte de l’état civil"
  },
  registrationDate: {
    persian: "تاریخ ثبت",
    french: "Date d’enregistrement"
  },
  registrationLocation: {
    persian: "محل ثبت",
    french: "Lieu d’enregistrement"
  },
  fatherName: {
    persian: "نام پدر",
    french: "Prénom du père"
  },
  fatherId: {
    persian: "شماره شناسنامه یا ملی پدر",
    french: "N° de l’Acte de l’état civil"
  },
  fatherRegistrationLocation: {
    persian: "محل صدور شناسنامه پدر",
    french: "Lieu d’émission"
  },
  motherName: {
    persian: "نام مادر",
    french: "Prénom de la mère"
  },
  motherId: {
    persian: "شماره شناسنامه یا ملی مادر",
    french: "N° de l’Acte de l’état civil"
  },
  motherRegistrationLocation: {
    persian: "محل صدور شناسنامه مادر",
    french: "Lieu d’émission"
  },
  description: {
    persian: "توضیحات تکمیلی",
    french: "La description"
  },
  personalInfo: {
    persian: "اطلاعات شخصی",
    french: "Informations personnelles"
  },
  parentsInfo: {
    persian: "اطلاعات والدین",
    french: "Information parentale"
  },
  observations: {
    persian: "مشاهدات",
    french: "Observations"
  },
  spouses: {
    persian: "همسران",
    french: "Conjoints"
  },
  divorce: {
    persian: "طلاق",
    french: "Divorce"
  },
  children: {
    persian: "فرزندان",
    french: "Enfants"
  },
  death: {
    persian: "مرگ",
    french: "Décès"
  },
  spousesInfo: {
    persian: "اطلاعات همسران",
    french: "Informations sur les conjoints"
  },
  childrenInfo: {
    persian: "اطلاعات فرزندان",
    french: "Informations sur les enfants"
  },
  uploadFiles: {
    persian: "بارگذاری مستندات",
    french: "Importer des documents"
  },
  back: {
    persian: "مرحله قبل",
    french: "étape précédente"
  },
  next: {
    persian: "مرحله بعد",
    french: "étape suivante"
  },
  save: {
    persian: "ذخیره اطلاعات",
    french: "enregistrer"
  },
  submit: {
    persian: "ثبت درخواست",
    french: "soumettre"
  },
  allStepsCompleted: {
    persian: "همه مراحل با موفقیت تکمیل شدند",
    french: "toutes les étapes terminées"
  }
};

export const getCompleteName = text => {
  if (Dictionary[text])
    return Dictionary[text].french + "/" + Dictionary[text].persian;
  return null;
};

export const getFrenchName = text => {
  return Dictionary[text] ? Dictionary[text].french : null;
};

export const getPersianName = text => {
  return Dictionary[text] ? Dictionary[text].persian : null;
};

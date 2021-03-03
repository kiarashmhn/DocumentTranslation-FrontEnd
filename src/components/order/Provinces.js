const provinces = {
  Kaboul: {
    persian: "کابل",
    french: "Kaboul",
    districts: [
      {
        persian: "استالف",
        french: "Istalif"
      },
      {
        persian: "بگرامی",
        french: "Bagrami"
      },
      {
        persian: "فرزه",
        french: "Farza"
      },
      {
        persian: "پغمان",
        french: "Paghman"
      },
      {
        persian: "قره باغ",
        french: "Qarabagh"
      },
      {
        persian: "کابل",
        french: "Kaboul"
      },
      {
        persian: "چهارآسیاب",
        french: "Chahar Asyab"
      },
      {
        persian: "کلکان",
        french: "Kalakan"
      },
      {
        persian: "خاک جبار",
        french: "Khaki Jabbar"
      },
      {
        persian: "گلدره",
        french: "Guldara"
      },
      {
        persian: "موسهی",
        french: "Musayi"
      },
      {
        persian: "ده سبز",
        french: "Dih Sabz"
      },
      {
        persian: "سروبی",
        french: "Saroubi"
      },
      {
        persian: "میربچه کوت",
        french: "Mir Bacha Kot"
      },
      {
        persian: "شکردره",
        french: "Shakar Dara"
      }
    ]
  },
  Herat: {
    persian: "هرات",
    french: "Herat",
    districts: [
      {
        persian: "هرات",
        french: "Hérat"
      },
      {
        persian: "ادرسکن",
        french: "Adraskan"
      },
      {
        persian: "انجیل",
        french: "Enjil"
      },
      {
        persian: "اوبه",
        french: "Obe"
      },
      {
        persian: "پشتون زرغون",
        french: "Pashtun Zarghun"
      },
      {
        persian: "چشت شریف",
        french: "Chishti Sharif"
      },
      {
        persian: "زنده جان",
        french: "Zinda Jan"
      },
      {
        persian: "شینډنډ/سبزوار",
        french: "Shindand"
      },
      {
        persian: "غوریان",
        french: "Ghoryan"
      },
      {
        persian: "فارسی",
        french: "Farsi"
      },
      {
        persian: "کرخ",
        french: "Karrukh"
      },
      {
        persian: "کشک",
        french: "Kushk"
      },
      {
        persian: "کشک کهنه",
        french: "Kushk-i-Kuhna"
      },
      {
        persian: "کهسان",
        french: "Kohsan"
      },
      {
        persian: "گذره",
        french: "Guzara"
      },
      {
        persian: "گلران",
        french: "Gulran"
      }
    ]
  },
  Nangarhar: {
    persian: "ننگرهار",
    french: "Nangarhar"
  },
  Balkh: {
    persian: "بلخ",
    french: "Balkh"
  },
  Kandahar: {
    persian: "قندهار",
    french: "Kandahar"
  },
  Ghor: {
    persian: "غور",
    french: "Ghor"
  },
  Laghman: {
    persian: "لغمان",
    french: "Laghman"
  },
  Kunduz: {
    persian: "کندوز",
    french: "Kunduz"
  },
  Paktiya: {
    persian: "پکتیا",
    french: "Paktiya"
  },
  Zabol: {
    persian: "زابل",
    french: "Zabol"
  },
  Baghlan: {
    persian: "بغلان",
    french: "Baghlan"
  },
  Badakhchan: {
    persian: "بدخشان",
    french: "Badakhchan"
  },
  Bamiyan: {
    persian: "بامیان",
    french: "Bamiyan"
  },
  Badghis: {
    persian: "بادغیس",
    french: "Badghis"
  },
  MaydanWardak: {
    persian: "میدان وردک",
    french: "MaydanWardak"
  },
  Logar: {
    persian: "لوگر",
    french: "Logar"
  },
  Samangan: {
    persian: "سمنگان",
    french: "Samangan"
  },
  Takhar: {
    persian: "تخار",
    french: "Takhar"
  },
  Nouristan: {
    persian: "نورستان",
    french: "Nouristan"
  },
  Faryab: {
    persian: "فاریاب",
    french: "Faryab"
  },
  Sarpol: {
    persian: "سرپل",
    french: "Sarpol"
  },
  Paktika: {
    persian: "پکتیکا",
    french: "Paktika"
  },
  Farah: {
    persian: "فراه",
    french: "Farah"
  },
  Helmand: {
    persian: "هلمند",
    french: "Helmand"
  },
  Nimroz: {
    persian: "نیمروز",
    french: "Nimroz"
  },
  Ghazni: {
    persian: "غزنی",
    french: "Ghazni"
  },
  Orozgan: {
    persian: "ارزگان",
    french: "Orozgan"
  },
  Kapissa: {
    persian: "کاپیسا",
    french: "Kapissa"
  },
  Parwan: {
    persian: "پروان",
    french: "Parwan"
  },
  Pandjchir: {
    persian: "پنجشیر",
    french: "Pandjchir"
  },
  Djozdjan: {
    persian: "جوزجان",
    french: "Djozdjan"
  },
  Khost: {
    persian: "خوست",
    french: "Khost"
  },
  Kounar: {
    persian: "کنر",
    french: "Kounar"
  },
  Deykandi: {
    persian: "دایکندی",
    french: "Deykandi"
  }
};

export const getDistricts = province => {
  console.log(province);
  if (province) {
    let p = provinces[province];
    if (p) return p.districts ? p.districts : [];
    return [];
  }
  return [];
};
export default provinces;

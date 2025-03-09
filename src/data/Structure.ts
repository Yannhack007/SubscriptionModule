import {countries, languages} from "countries-list";

import moment from 'moment-timezone';
import currencyCodes from 'currency-codes';

const currencyOptions = currencyCodes.data.map(currency => ({
  value: currency.code,
  label: `${currency.code} - ${currency.currency}`
}));

const timezoneOptions = moment.tz.names().map(tz => ({
  value: tz,
  label: `${tz} (${moment.tz(tz).format('Z')})`
}));

const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name
}));

const languageOptions = Object.entries(languages).map(([code, language]) => ({
    value: code,
    label: language.name
}));

const meetingPointOptions = [
    { value: 'any', label: 'any' },
    { value: 'airport', label: 'Airport' },
    { value: 'trainStation', label: 'Train Station' },
    { value: 'cityCenter', label: 'City Center' },
    { value: 'hotel', label: 'Hôtel' },

];

const driverType=[
    {value: 'any', label: 'Any'},
    {value: 'with', label: 'With vehicle'},
    {value: 'without', label: 'Without vehicle'},

]

const tripType=[
    {value: 'any', label: 'Any'},
    {value: 'vip', label: 'VIP'},
    {value: 'classic', label: 'Classic'},
    {value: 'emergency', label: 'Emergency'},

]

const vehiculeType=[
    {value: 'economy', label: 'Economy'},
    {value: 'luxury', label: 'Luxury'},
    {value: 'Commercial', label: 'Commercial'},
    {value: 'Personal', label: 'Personal'},
]

const vehicleSize = [
    {value: "compact", label: "Compact"},
    {value: "midsize", label: "Midsize"},
    {value:"fullsize",label:"Fullsize"},
    {value: "suv", label: "SUV"},
    {value: "truck", label: "Truck"},
    {value: "van", label: "Van"},
    {value: 'minivan', label: 'Minivan'},
    {value: 'pickup', label: 'Pickup'},
  ];

  const testimonials = [
    {
      text: "Ce produit a révolutionné notre façon de travailler. Nous sommes plus productifs que jamais!",
      author: "Marie Dupont",
      title: "CEO",
      imageUrl: "/img/bafou1.jpg"
    },
    {
      text: "Le service client est exceptionnel. Ils ont résolu notre problème en un rien de temps.",
      author: "Jean Martin",
      title: "Directeur technique",
      imageUrl: "/img/bafou6.jpg"
    },
    {
      text: "Je recommande vivement cette solution à toute entreprise cherchant à améliorer ses processus.",
      author: "Sophie Lefebvre",
      title: "Manager",
      imageUrl: "/img/bafou4.jpg"
    }
  ];

  const partners = [
    {
      id: '1',
      name: 'Entreprise A',
      logo: '/img/featured-img-2.jpg',
      website: 'https://www.entreprise-a.com'
    },
    {
      id: '2',
      name: 'Entreprise B',
      logo: '/img/featured-img-3.jpg',
      website: 'https://www.entreprise-b.com'
    },
    {
      id: '3',
      name: 'Entreprise C',
      logo: '/img/featured-img-4.jpg',
      website: 'https://www.entreprise-a.com'
    },
    {
      id: '4',
      name: 'Entreprise D',
      logo: '/img/featured-img-5.jpg',
      website: 'https://www.entreprise-b.com'
    },
  ];

const paymentHistoryData= [
    {
        paymentInvoice: 'INV12345',
        driverName: 'John Doe',
        amount: 50.0,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        createdAt: '2023-08-01T10:00:00Z',
        payAt: '2023-08-01T10:05:00Z',
    },
    {
        paymentInvoice: 'INV12346',
        driverName: 'Jane Smith',
        amount: 30.0,
        paymentMethod: 'Cash',
        status: 'Pending',
        createdAt: '2023-08-05T14:15:00Z',
        payAt: '',
    },
    {
        paymentInvoice: 'INV12347',
        driverName: 'Alice Johnson',
        amount: 70.0,
        paymentMethod: 'Mobile Payment',
        status: 'Failed',
        createdAt: '2023-08-10T09:30:00Z',
        payAt: '',
    },
    {
        paymentInvoice: 'INV12348',
        driverName: 'Bob Brown',
        amount: 25.0,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        createdAt: '2023-08-15T12:00:00Z',
        payAt: '2023-08-15T12:02:00Z',
    },
    {
        paymentInvoice: 'INV12349',
        driverName: 'Charlie Davis',
        amount: 45.0,
        paymentMethod: 'Cash',
        status: 'Pending',
        createdAt: '2023-08-18T17:45:00Z',
        payAt: '',
    },
];

const paymentMethod=[
    {value: 'any', label: 'any', icon:'/img/visa.png', info:''},
    {value: 'Bank Card', label: 'Bank Card', icon:'/img/credit-card-2.png', info:'Card Number'},
    {value: 'Paypal', label: 'Paypal', icon:'/img/paypal.png', info:'examplePaypal@gmail.com'},
    {value: 'Orange Money', label: 'Orange Money', icon:'/img/orange-money.png', info:'123456789'},
    {value: 'Mobile Money', label: 'Mobile Money', icon:'/img/mobile--money.png', info:'987654321'},
    {value: 'Cash', label: 'Cash', icon:'/img/salary.png', info:'30000'},
]

const tripIntention=[
    {value: 'any', label: 'any'},
    {value: 'tourism', label: 'Tourism'},
    {value: 'short', label: 'Short distance travel'},
    {value: 'long', label: 'Long distance travel'},
    {value: 'errand', label: 'Errand'} 
]

const pricingMethod=[
    {value: 'any', label: 'any'},
    {value: 'km', label: 'Price per km'},
    {value: 'hour', label: 'Price per hour'},
    {value: 'day', label: 'Price per day'},
    {value: 'flatRate',label:'flat rate'},

]



const paymentOptions = [
    {value: 'any', label: 'any'},
    {value: 'km', label: 'Price per km'},
    {value: 'hour', label: 'Price per hour'},
    {value: 'day', label: 'Price per day'},
    {value: 'flatRate', label: 'Flat rate'},
];

const experienceOptions = [
    { value: '0-1', label: '0-1 an' },
    { value: '1-3', label: '1-3 ans' },
    { value: '3-5', label: '3-5 ans' },
    { value: '5-10', label: '5-10 ans' },
    { value: '10+', label: '10+ ans' },
];

const adsMap=[
    {id:1,pickup_location:'Yaoundé',dropoff_location:'Baganté',travel_date:'15/08/2024',travel_time:'3pm',
    offer_status:'Published',mobility_cost:1500,is_mobility_cost_negociable:false,
    prefered_payment_mode_id:'Card',prefered_billing_id:'',created_at:'14/08/2024',
    updated_at:'15/08/2024',is_luggage:false
    },
    {id:2,pickup_location:'Douala',dropoff_location:'Edea',travel_date:'20/08/2024',travel_time:'8am',
    offer_status:'Drafts',mobility_cost:1000,is_mobility_cost_negociable:true,
    prefered_payment_mode_id:'Mobile',prefered_billing_id:'',created_at:'14/08/2024',
    updated_at:'15/08/2024',is_luggage:false
    },
    {id:3,pickup_location:'Bamenda',dropoff_location:'Maroua',travel_date:'20/08/2024',travel_time:'2am',
    offer_status:'Confirmed',mobility_cost:50000,is_mobility_cost_negociable:true,
    prefered_payment_mode_id:'Mobile',prefered_billing_id:'',created_at:'14/08/2024',
    updated_at:'15/08/2024',is_luggage:false 
    },
    {id:4,pickup_location:'Edea',dropoff_location:'Mamfe',travel_date:'16/08/2024',travel_time:'2am',
        offer_status:'Drafts',mobility_cost:50000,is_mobility_cost_negociable:true,
        prefered_payment_mode_id:'Mobile',prefered_billing_id:'',created_at:'14/08/2024',
        updated_at:'15/08/2024',is_luggage:false
    },
    {id:5,pickup_location:'Kribi',dropoff_location:'Bafoussam',travel_date:'20/08/2024',travel_time:'2am',
        offer_status:'Drafts',mobility_cost:50000,is_mobility_cost_negociable:true,
        prefered_payment_mode_id:'Mobile',prefered_billing_id:'',created_at:'14/08/2024',
        updated_at:'15/08/2024',is_luggage:true
    },
    {id:6,pickup_location:'Kribi',dropoff_location:'Bafoussam',travel_date:'20/08/2024',travel_time:'2am',
        offer_status:'Expired',mobility_cost:50000,is_mobility_cost_negociable:true,
        prefered_payment_mode_id:'Mobile',prefered_billing_id:'',created_at:'14/08/2024',
        updated_at:'15/08/2024',is_luggage:true
    }
]

const BillAddress=[
    {id:1, country:'Cameroon', city:'Yaoundé', street:'Biyem Assi', postalCode:'0000', select:false},
    {id:2, country:'Cameroon', city:'Douala', street:'Ndokoti', postalCode:'0000', select:false}
  ]

const sortOptions = [
    {value: 'any', label: 'any'},
    { value: 'mostCommented', label: 'Top rated' },
    { value: 'avgRating', label: 'The avarage ' },

];

const amenitiesOptions = [
    { value: 'any', label: 'any' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'air_conditioned', label: 'Air-conditioned' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'soft', label: 'Soft' },
    { value: 'Audio system', label: 'Audio system' },
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'Backup camera', label: 'Backup camera' },
    { value: 'Display Screen', label: 'Display Screen' },
];

const referringOptions = [
    { value: 'any', label: 'any' },
    { value: 'syndicate', label: 'Syndicate' },
    { value: 'agencies', label: 'Agencies' },
    { value: 'driving_school', label: 'Driving School' },
    { value: 'driving_organisation', label: 'Driving Organisation' },
];

const priceCategoryOptions = [
    { value: 'all_price', label: 'All prices' },
    { value: 'low_price', label: 'Low price' },
    { value: 'high_price', label: 'High price' },
    { value: 'average_price', label: 'Average price' },
    { value: 'best_price', label: 'Best price' },
];

const vehicles = [
    {
      id: 1,
      model: "Camry",
      brand: "Toyota",
      transmission: "Automatic 2WD",
      size: "Midsize",
      fuelType: "Gasoline",
      type: "Sedan",
      manufacturer: "Toyota Motor Corporation",
      amenities: ["Air conditioning", "Audio system", "Bluetooth", "Backup camera"],
      keywords: ["economical", "reliable", "comfortable"],
      registration: "AB-123-CD",
      registrationExpiryDate: "2025-12-31",
      serialnumber: "JTDKB3FU1M3226789",
      images: [], // This would normally be filled with File objects
      tankCapacity: 50, // in liters
      luggageCapacity: 450, // in liters
      availableSeats: 5,
      canTransport: ["Passengers", "Luggage","Animals"],
      mileage: 45000, // in kilometers
      fuelconsumption: 6.5, // in liters/100km
      age: 3,
      active:true // in years
    },
    {
      id: 2,
      model: "Corolla",
      brand: "Toyota",
      transmission: "Automatic 2WD",
      size: "Compact",
      fuelType: "Gasoline",
      type: "Sedan",
      manufacturer: "Toyota Motor Corporation",
      amenities: ["Air conditioning", "Audio system", "Bluetooth", "Backup camera"],
      keywords: ["economical", "reliable", "compact"],
      registration: "EF-456-GH",
      registrationExpiryDate: "2026-06-30",
      serialnumber: "JTDBR3FU2M3456789",
      images: [], // This would normally be filled with File objects
      tankCapacity: 45, // in liters
      luggageCapacity: 350, // in liters
      availableSeats: 5,
      canTransport: ["Passengers", "Luggage"],
      mileage: 35000, // in kilometers
      fuelconsumption: 5.5, // in liters/100km
      age: 2,
      active:false // in years
    },
    {
      id: 3,
      model: "RAV4",
      brand: "Toyota",
      transmission: "Automatic 4WD",
      size: "Compact SUV",
      fuelType: "Gasoline",
      type: "SUV",
      manufacturer: "Toyota Motor Corporation",
      amenities: ["Air conditioning", "Audio system", "Bluetooth", "Backup camera", "All-wheel drive"],
      keywords: ["spacious", "versatile", "capable"],
      registration: "IJ-789-KL",
      registrationExpiryDate: "2027-03-31",
      serialnumber: "JTMRF3FU3M3789012",
      images: [], // This would normally be filled with File objects
      tankCapacity: 55, // in liters
      luggageCapacity: 580, // in liters
      availableSeats: 5,
      canTransport: ["Passengers", "Luggage", "Sports equipment"],
      mileage: 25000, // in kilometers
      fuelconsumption: 7.0, // in liters/100km
      age: 1,
      active:false // in years
    }
  ];

const fuelType=[
    {value:"diesel",label:"Diesel"},
    {value:"gasoline",label:"Gasoline"},
    {value:"electric",label:"Electric"},
    {value:"hybrid",label:"Hybrid"},
    {value:"solar",label:"Solar"},
    {value:"propane",label:"Propane"},
    {value:"ethanol",label:"Ethanol"},
]


const reviews: Review[] = [
{
    review_id: "REV001",
    user_id: "USR001",
    rated_entity_id: "ENT001",
    rated_entity_type: "driving_school",
    rating: 5,
    comment: "Excellente école de conduite, les instructeurs sont très professionnels !",
    note: 9,
    icon: "star",
    like_count: 25,
    dislike_count: 2,
    created_at: "2023-10-01T10:00:00Z",
    update_at: "2023-10-01T12:00:00Z",
    is_hidden: false,
},
{
    review_id: "REV002",
    user_id: "USR002",
    rated_entity_id: "ENT002",
    rated_entity_type: "syndicate",
    rating: 4,
    comment: "Bonne expérience, mais il y a quelques améliorations à apporter.",
    note: 8,
    icon: "thumbs-up",
    like_count: 15,
    dislike_count: 1,
    created_at: "2023-10-02T11:30:00Z",
    update_at: "2023-10-02T11:30:00Z",
    is_hidden: false,
},
{
    review_id: "REV003",
    user_id: "USR003",
    rated_entity_id: "ENT003",
    rated_entity_type: "driving_school",
    rating: 3,
    comment: "L'école est correcte, mais les horaires sont parfois compliqués.",
    note: 6,
    icon: "meh",
    like_count: 5,
    dislike_count: 3,
    created_at: "2023-10-03T14:45:00Z",
    update_at: "2023-10-03T14:45:00Z",
    is_hidden: false,
},
{
    review_id: "REV004",
    user_id: "USR004",
    rated_entity_id: "ENT004",
    rated_entity_type: "other",
    rating: 2,
    comment: "Pas satisfait de l'accueil, je ne recommande pas.",
    note: 4,
    icon: "thumbs-down",
    like_count: 2,
    dislike_count: 20,
    created_at: "2023-10-04T09:15:00Z",
    update_at: "2023-10-04T09:15:00Z",
    is_hidden: false,
},
{
    review_id: "REV005",
    user_id: "USR005",
    rated_entity_id: "ENT005",
    rated_entity_type: "syndicate",
    rating: 5,
    comment: "Une très bonne organisation, je me sens soutenu !",
    note: 10,
    icon: "heart",
    like_count: 30,
    dislike_count: 0,
    created_at: "2023-10-05T16:30:00Z",
    update_at: "2023-10-05T16:30:00Z",
    is_hidden: false,
}
];



export {

    //Searchpage
    meetingPointOptions,
    driverType,
    tripIntention,
    tripType,
    paymentMethod,
    pricingMethod,
    countryOptions,
    languageOptions,

    //SearchResultSections
    paymentOptions,
    experienceOptions,
    sortOptions,
    amenitiesOptions,
    referringOptions,
    priceCategoryOptions,

    //Dashboard user preference
    currencyOptions,
    timezoneOptions,
    vehiculeType,

    //USer Ads
    adsMap,
    BillAddress,
    paymentHistoryData,

    vehicles,
    fuelType,
    vehicleSize,
    reviews,
    testimonials,
    partners





}
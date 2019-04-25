/**
 * The default settings
 * @type {Object}
 */
const defaultSettings = {
    quoteFont: "Source Serif Pro",
    authorFont: "Source Sans Pro",
    alwaysShowTopSites: false,
    showBackgroundImage: true,
    autoRefreshQuote: false,
    backgroundColor: "#34495e",
    fontColor: "#ecf0f1"
};

/**
 * The default fonts
 * @remark These do not need to be loaded using WebFont.load()
 * @type {Array}
 */
const defaultFonts = [
    "Arial",
    "Source Serif Pro",
    "Source Sans Pro"
];

/**
 * Locally stored quotes and images
 * @type {Array}
 */
const offlineQuotes = [
    {
        quote: "I don't like to hold back, because that's how you hurt yourself.",
        author: "Chester Bennington"
    },
    {
        quote: "You can't be afraid of people willing to hurt you, cause if you fear life, then you will never live.",
        author: "Chester Bennington"
    },
    {
        quote: "The truth is you don't know what is going to happen tomorrow. Life is a crazy ride, and nothing is guaranteed.",
        author: "Eminem"
    },
    {
        quote: "I say what I want to say and do what I want to do. There's no in between. People will either love you for it or hate you for it.",
        author: "Eminem"
    },
    {
        quote: "Don't let your dreams be dreams. Just do it.",
        author: "Shia LaBeouf"
    }
];

/**
 * The available fonts to set in settings
 * @type {Object}
 */
const fonts = [
  {
    "name": "Abril Fatface",
    "value": "Abril Fatface"
  },
  {
    "name": "Alegreya",
    "value": "Alegreya"
  },
  {
    "name": "Alegreya Sans",
    "value": "Alegreya Sans"
  },
  {
    "name": "Anonymous Pro",
    "value": "Anonymous Pro"
  },
  {
    "name": "Archivo Narrow",
    "value": "Archivo Narrow"
  },
  {
    "name": "Arial",
    "value": "Arial"
  },
  {
    "name": "Arvo",
    "value": "Arvo"
  },
  {
    "name": "Bitter",
    "value": "Bitter"
  },
  {
    "name": "Cabin",
    "value": "Cabin"
  },
  {
    "name": "Cardo",
    "value": "Cardo"
  },
  {
    "name": "Chivo",
    "value": "Chivo"
  },
  {
    "name": "Cormorant",
    "value": "Cormorant"
  },
  {
    "name": "Crimson Text",
    "value": "Crimson Text"
  },
  {
    "name": "Domine",
    "value": "Domine"
  },
  {
    "name": "Eczar",
    "value": "Eczar"
  },
  {
    "name": "Fira Sans",
    "value": "Fira Sans"
  },
  {
    "name": "Inconsolata",
    "value": "Inconsolata"
  },
  {
    "name": "Karla",
    "value": "Karla"
  },
  {
    "name": "Libre Baskerville",
    "value": "Libre Baskerville"
  },
  {
    "name": "Libre Franklin",
    "value": "Libre Franklin"
  },
  {
    "name": "Lato",
    "value": "Lato"
  },
  {
    "name": "Lora",
    "value": "Lora"
  },
  {
    "name": "Merriweather",
    "value": "Merriweather"
  },
  {
    "name": "Montserrat",
    "value": "Montserrat"
  },
  {
    "name": "Neuton",
    "value": "Neuton"
  },
  {
    "name": "Open Sans",
    "value": "Open Sans"
  },
  {
    "name": "Playfair Display",
    "value": "Playfair Display"
  },
  {
    "name": "Poppins",
    "value": "Poppins"
  },
  {
    "name": "Proza Libre",
    "value": "Proza Libre"
  },
  {
    "name": "PT Sans",
    "value": "PT Sans"
  },
  {
    "name": "PT Serif",
    "value": "PT Serif"
  },
  {
    "name": "Source Sans Pro",
    "value": "Source Sans Pro"
  },
  {
    "name": "Source Serif Pro",
    "value": "Source Serif Pro"
  },
  {
    "name": "Space Mono",
    "value": "Space Mono"
  },
  {
    "name": "Spectral",
    "value": "Spectral"
  },
  {
    "name": "Raleway",
    "value": "Raleway"
  },
  {
    "name": "Roboto",
    "value": "Roboto"
  },
  {
    "name": "Roboto Slab",
    "value": "Roboto Slab"
  },
  {
    "name": "Rubik",
    "value": "Rubik"
  },
  {
    "name": "Work Sans",
    "value": "Work Sans"
  }
];

/**
 * The available colors to set in settings
 * @type {Array}
 */
const colors = [
	"#2ecc71",
	"#3498db",
	"#9b59b6",
	"#f1c40f",
	"#e67e22",
	"#e74c3c",
	"#ecf0f1",
	"#34495e",
	"#333333"
];
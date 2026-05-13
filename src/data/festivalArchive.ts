export type FestivalFilm = {
  title: string;
  director: string;
  country?: string;
  year?: number;
  duration?: string;
  format?: string;
  description?: string;
};

export type FestivalProgram = {
  label?: string;
  title: string;
  date?: string;
  time?: string;
  description?: string;
  venue?: string;
  isSpecialEvent?: boolean;
  films: FestivalFilm[];
};

export type FestivalEditionData = {
  slug: string;
  year: number;
  title: string;
  dates: string;
  venue: string;
  description: string;
  bannerImage: string;
  posterImage?: string;
  filmCount?: number;
  countryCount?: number;
  programs: FestivalProgram[];
  highlights?: FestivalFilm[];
  note?: string;
};

export const festivalEditions: FestivalEditionData[] = [
  // ─────────────────────────────────────────────
  // 2025
  // ─────────────────────────────────────────────
  {
    slug: "2025",
    year: 2025,
    title: "Engauge 2025",
    dates: "November 6–8, 2025",
    venue: "Northwest Film Forum, Seattle",
    description:
      "The Engauge Experimental Film Festival showcases artist-made celluloid work from around the world — handmade, optically printed, direct animation, and beyond. All work featured in the festival originates on film stock.",
    bannerImage: "/assets/festival-2025-still-1.jpg",
    filmCount: 70,
    highlights: [
      { title: "And by the Night", director: "Anna Kipervaser", country: "USA", format: "16mm" },
      { title: "Herbaria", director: "Derek Jenkins", country: "USA", format: "16mm" },
      { title: "Late December", director: "Bill Basquin", country: "USA", format: "16mm" },
    ],
    programs: [
      {
        label: "Program 1",
        title: "History / Memory / Archive",
        date: "Thursday, November 6",
        time: "7pm",
        description:
          "These filmmakers mine the past in all its richness — using found footage, recovered audio, source footage, movement, re-creations, documentary evidence — to convey senses of beauty, sorrow, solace and resilience.",
        films: [
          { title: "Full Out", director: "Sarah Ballard", country: "USA", duration: "14:25", format: "16mm to digital", description: "In 19th century Paris at the Salpêtrière Hospital, patients were hypnotized on stage to reproduce the symptoms of hysteria for public audiences. Over a century later, high school cheerleaders are fainting en masse." },
          { title: "Wherever Street Piece", director: "Panu Johansson", country: "Finland", duration: "8:49", format: "16mm to digital", description: "A found footage film describing impersonal and fragmented memories that cannot be directly linked to the life of one particular individual." },
          { title: "I Was There", director: "Kamila Kuc", country: "Poland/UK", duration: "12:25", format: "Super 8 to digital", description: "A haunting exploration of familial bonds, intergenerational memory, and the enduring impact of shared narratives." },
          { title: "Lessons on Flight", director: "Cecilia Araneda", country: "Chile/Canada", duration: "4:27", format: "16mm to digital", description: "Shot on 16mm film, eco-processed with olives and hand coloured on site in rural Chile, examining the flight patterns of the green-backed firecrown hummingbird." },
          { title: "Deep 1", director: "Philip Hoffman", country: "Canada", duration: "15:00", format: "16mm to digital", description: "Filmed over 2 years (2020–2022), a diaristic meditation, flower/plant processed and decayed with hyacinth and lichen extract." },
        ],
      },
      {
        label: "Program 2",
        title: "Program 2",
        date: "Friday, November 7",
        time: "4:30pm",
        films: [],
      },
      {
        label: "Program 3",
        title: "Program 3",
        date: "Friday, November 7",
        time: "7:30pm",
        films: [],
      },
      {
        label: "Program 4",
        title: "Program 4",
        date: "Saturday, November 8",
        time: "3:30pm",
        films: [],
      },
      {
        label: "Program 5",
        title: "Program 5",
        date: "Saturday, November 8",
        time: "5:30pm",
        films: [],
      },
      {
        label: "Program 6",
        title: "Program 6",
        date: "Saturday, November 8",
        time: "7:30pm",
        films: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2024
  // ─────────────────────────────────────────────
  {
    slug: "2024",
    year: 2024,
    title: "Engauge 2024",
    dates: "November 6–9, 2024",
    venue: "Northwest Film Forum, Seattle",
    description:
      "The 7th Engauge Experimental Film Festival celebrates sprocket-driven, artist-made experimental film, presenting seven programs of shorts and one feature over four nights at NWFF's cinema in Capitol Hill. All work originates on film stock.",
    bannerImage: "/assets/festival-2024-banner.jpg",
    highlights: [
      { title: "El Signo Vacío (the empty sign)", director: "Kathryn Ramey", country: "USA", format: "35mm", description: "A 35mm feature presentation." },
      { title: "Live Music and Film", director: "Lori Goldston & Friends", country: "USA", description: "Closing-night live performance of original compositions over six films presented on 16mm." },
    ],
    programs: [
      { label: "Wed Nov 6, 7pm", title: "El Signo Vacío (the empty sign)", date: "Wednesday, November 6", time: "7pm", isSpecialEvent: true, description: "A 35mm presentation of Kathryn Ramey's feature.", films: [] },
      { label: "Thu Nov 7, 7pm", title: "Light and Land, Ocean and Sky", date: "Thursday, November 7", time: "7pm", films: [] },
      { label: "Fri Nov 8, 5:30pm", title: "Tell No Tales", date: "Friday, November 8", time: "5:30pm", films: [] },
      { label: "Fri Nov 8, 7:30pm", title: "Adventures in Perception", date: "Friday, November 8", time: "7:30pm", films: [] },
      { label: "Sat Nov 9, 3:30pm", title: "My Front Window", date: "Saturday, November 9", time: "3:30pm", films: [] },
      { label: "Sat Nov 9, 5:30pm", title: "Traces on a Body", date: "Saturday, November 9", time: "5:30pm", films: [] },
      { label: "Sat Nov 9, 7:30pm", title: "Live Music and Film", date: "Saturday, November 9", time: "7:30pm", isSpecialEvent: true, description: "Closing-night live performance from Lori Goldston and friends, with original compositions over six films presented on 16mm.", films: [] },
    ],
  },

  // ─────────────────────────────────────────────
  // 2023
  // ─────────────────────────────────────────────
  {
    slug: "2023",
    year: 2023,
    title: "Engauge 2023",
    dates: "November 1–4, 2023",
    venue: "Northwest Film Forum, Seattle",
    description:
      "The 6th Engauge Experimental Film Festival celebrated experimental filmmaker Harry Smith's centenary — Smith is from Anacortes, WA — with a live performance by Lori Goldston and other musicians, plus a solo show by San Francisco-based filmmaker Greta Snider.",
    bannerImage: "/assets/festival-2023-banner.jpg",
    filmCount: 70,
    highlights: [
      { title: "Harry Smith Centenary Celebration", director: "Harry Smith + Lori Goldston & Friends", country: "USA", description: "Live musical composition and accompaniment." },
      { title: "Solo Show", director: "Greta Snider", country: "USA", description: "A full solo presentation by San Francisco-based filmmaker Greta Snider." },
    ],
    programs: [],
  },

  // ─────────────────────────────────────────────
  // 2022
  // ─────────────────────────────────────────────
  {
    slug: "2022",
    year: 2022,
    title: "Engauge 2022",
    dates: "November 2022",
    venue: "Northwest Film Forum, Seattle",
    description:
      'For our first "in person only" festival since the pandemic, we had a crowd of enthusiastic filmmakers and filmgoers. About a dozen filmmakers attended from all over the US and Canada. We ended with a jaw-dropping 9-projector expanded cinema performance, "Je Ne Sais Plus," from Kristin Reeves — experienced while sipping champagne and eating popcorn in the NWFF lobby.',
    bannerImage: "/assets/festival-2022-banner.jpg",
    note: 'Photo credits: Ruth Hayes, Lisa Marr, and Spencer Sundall. Featured image from "Cinegraffic Score" by Tim Grabham.',
    highlights: [
      { title: "Je Ne Sais Plus", director: "Kristin Reeves", country: "USA", description: "A 9-projector expanded cinema performance closing the festival." },
    ],
    programs: [],
  },

  // ─────────────────────────────────────────────
  // 2021
  // ─────────────────────────────────────────────
  {
    slug: "2021",
    year: 2021,
    title: "Engauge 2021",
    dates: "October 28–31 (in person) + October 28 – November 8 (online), 2021",
    venue: "Northwest Film Forum, Seattle & Online",
    description:
      "Following the pandemic hiatus, Engauge returned with its first hybrid festival — screening in person at Northwest Film Forum while simultaneously presenting online for audiences worldwide.",
    bannerImage: "/assets/festival-2021-logo.jpg",
    filmCount: 71,
    countryCount: 18,
    programs: [],
  },

  // ─────────────────────────────────────────────
  // 2020 — no festival
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 2019
  // ─────────────────────────────────────────────
  {
    slug: "2019",
    year: 2019,
    title: "Engauge 2019",
    dates: "November 7–9, 2019",
    venue: "Northwest Film Forum, Seattle",
    description:
      "Films from 20 countries and 11 states. Two nights of screenings plus an expanded cinema performance by the Olympia-based Crackpot Crafters. The festival presented works from Argentina, Brazil, Canada, Chile, China, Colombia, Ecuador, France, Germany, Greece, Iran, Ireland, Italy, Paraguay, Russia, South Africa, Switzerland, Taiwan, the United Kingdom, and the United States.",
    bannerImage: "/assets/festival-2019-still-2.jpg",
    posterImage: "/assets/festival-2019-poster.jpg",
    filmCount: 60,
    countryCount: 20,
    programs: [
      {
        label: "Program 1",
        title: "Super 8 Hotel",
        date: "Thursday, November 7",
        time: "7pm",
        description: "A selection of short super 8 films from around the world.",
        films: [
          { title: "Tupianas", director: "Marcos Bonisson + Khalil Charif", country: "Brazil", year: 2016, duration: "5:35", format: "Super 8 to digital" },
          { title: "Sleep Mask", director: "Phryne Konti", country: "Greece", year: 2019, duration: "3:10", format: "Super 8 to digital" },
          { title: "The Salesman", director: "Aaron Zeghars", country: "Canada", year: 2016, duration: "3:30", format: "Super 8 to digital" },
          { title: "Liquid is Light", director: "Kalpana Submaranian", country: "USA", year: 2016, duration: "4:02", format: "Super 8 to digital" },
          { title: "The Immortality of the Crab", director: "Giacomo Manzotti", country: "Italy", duration: "2:20", format: "Super 8 to digital" },
          { title: "She World: Enumeration", director: "Ursula Brookbank", country: "USA", year: 2014, duration: "5:34", format: "Super 8 to digital" },
          { title: "Scenes from the Periphery", director: "Derek Taylor", country: "USA", year: 2019, duration: "2:20", format: "Super 8 to digital" },
          { title: "Quaker City Home Movies: Pressing Cider", director: "Taylor Dunne", country: "USA", year: 2015, duration: "3:00", format: "Super 8 to digital" },
          { title: "Eigentlich ist das kein Film / Actually, This Is Not a Film", director: "Patrick Müeller", country: "Germany", year: 2018, duration: "4:42", format: "Super 8 to digital" },
          { title: "Rain, Train, Mother, Son", director: "Gary Hawkins", country: "USA", year: 2019, duration: "2:14", format: "Super 8 to digital" },
          { title: "The Last Skate", director: "Sandy McLennan", country: "Canada", year: 2018, duration: "4:50", format: "Super 8 to digital" },
          { title: "Please Step Out of the Frame", director: "Karissa Hahn", country: "USA", year: 2018, duration: "4:10", format: "Super 8 to digital" },
          { title: "We Had a Hard Freeze", director: "Sean Kenny", country: "USA", year: 2018, duration: "3:06", format: "Super 8 to digital" },
          { title: "Lands of the Sea", director: "Azucena Losana", country: "Argentina", year: 2019, duration: "5:54", format: "Super 8 to digital" },
          { title: "Symptom", director: "Oisin McFarland Smith", country: "Ireland", year: 2017, duration: "3:11", format: "Super 8 to digital" },
          { title: "Magic Explained", director: "Paul Tarragó", country: "UK", year: 2019, duration: "7:00", format: "Super 8 to digital" },
          { title: "Starfish Aorta Colossus", director: "Lynne Sachs", country: "USA", year: 2015, duration: "5:00", format: "Super 8 to digital" },
        ],
      },
      {
        label: "Program 2",
        title: "Trapped Ghosts",
        date: "Thursday, November 7",
        time: "9pm",
        description:
          "A mostly Super-8 program with an edgy vibe. These films are shot on Super-8 or 16mm film — each is a reflection on loss, corruption, disappearance, nostalgia, power and change. Several of the films incorporate found footage, manipulated physically or digitally.",
        films: [
          { title: "ínî / Trapped Ghost", director: "Hanny Hsieh", country: "Taiwan", year: 2019, duration: "10:00", format: "Super 8 and 35mm to digital" },
          { title: "Monotlith", director: "Gabriel Bullen", country: "Canada", year: 2018, duration: "3:20", format: "Super 8 to digital" },
          { title: "Beneath a Glass Floor Lobby", director: "Lisa Danker", country: "USA", year: 2016, duration: "5:04", format: "Super 8 to digital" },
          { title: "Interzone", director: "Benjamin Poumey", country: "Switzerland", year: 2014, duration: "6:28", format: "Super 8 to digital" },
          { title: "Failure / Malogro", director: "Moira Lacowicz", country: "Argentina", duration: "3:37", format: "Super 8 to digital" },
          { title: "Our Great Day 1967", director: "Roger Horn", country: "South Africa", year: 2018, duration: "2:53", format: "Super 8 to digital" },
          { title: "63 Acres", director: "Stephanie Gray", country: "USA", year: 2019, duration: "10:19", format: "Super 8 to digital" },
          { title: "Ponchartrain", director: "Adam Sekuler", country: "USA", year: 2016, duration: "4:08", format: "16mm to digital" },
          { title: "Detenerte en el pulso / To Hold the Pulse", director: "Nicole Remy", country: "Peru", year: 2016, duration: "6:38", format: "Super 8 to digital" },
          { title: "Corruption", director: "Jason Ewert", country: "USA", year: 2019, duration: "3:27", format: "Super 8 to digital" },
          { title: "Punctured", director: "Michelle Mellor", country: "USA", year: 2014, duration: "3:50", format: "Super 8 to digital" },
          { title: "Trigger Warning", director: "Scott Fitzpatrick", country: "Canada", year: 2017, duration: "5:00", format: "Super 8 to digital" },
          { title: "Torino '63", director: "Noemi Pulvirenti", country: "Italy", year: 2017, duration: "9:40", format: "Super 8 to digital" },
          { title: "Nostalgia Mar / Sea Nostalgia", director: "David Walls", country: "Paraguay", year: 2018, duration: "3:10", format: "Super 8 to digital" },
        ],
      },
      {
        label: "Program 3",
        title: "Celluloid Dreams: the Cinema of Janice Findley",
        date: "Friday, November 8",
        time: "7pm",
        description:
          "Beloved local filmmaker Janice Findley shows her work and reflects on her oeuvre. All films photographed, edited, released, and projected on 16mm. Introduction by Todd Rendleman, Director of Film Studies and Professor of Communication at Seattle Pacific University. Films include Beyond Kabuki, A Nermish Gothic, Tripletime, Faux Paw and I Am the Night. Findley's work is part of MoMA's permanent collection.",
        films: [
          { title: "Beyond Kabuki", director: "Janice Findley", country: "USA", format: "16mm" },
          { title: "A Nermish Gothic", director: "Janice Findley", country: "USA", format: "16mm" },
          { title: "Tripletime", director: "Janice Findley", country: "USA", format: "16mm" },
          { title: "Faux Paw", director: "Janice Findley", country: "USA", format: "16mm" },
          { title: "I Am the Night", director: "Janice Findley", country: "USA", format: "16mm" },
        ],
      },
      {
        label: "Program 4",
        title: "Senses of Time",
        date: "Friday, November 8",
        time: "9pm",
        description:
          "Films about the play of time in filmmaking, including animation, found footage and time-lapse techniques. Four films projected on 16mm.",
        films: [
          { title: "Just a Minute", director: "Allison Beda", country: "Canada", year: 2008, duration: "1:00", format: "35mm to digital" },
          { title: "Archeopsychic Time Zones", director: "Georg Koszulinski", country: "USA", year: 2017, duration: "5:06", format: "16mm to digital" },
          { title: "Senses of Time", director: "Wenhua Shi", country: "USA", year: 2018, duration: "5:00", format: "16mm to digital" },
          { title: "Failing Up", director: "Jackie Goss", country: "USA", year: 2019, duration: "7:10", format: "16mm to digital" },
          { title: "Erosion of Blue", director: "Frank Fang", country: "China", year: 2019, duration: "3:22", format: "16mm to digital" },
          { title: "Darkness", director: "Hossein Moradizadeh", country: "Iran", year: 2018, duration: "3:00", format: "35mm to digital" },
          { title: "A Collection of Attempts in Astral Travel", director: "Ryan Betschart + Rachel Nakawatse", country: "USA", year: 2016, duration: "7:00", format: "16mm to digital" },
          { title: "Unless You're Living It", director: "Sarah Bliss", country: "USA", year: 2019, duration: "8:22", format: "16mm to digital" },
          { title: "A Slower Speed of Light", director: "Stuart Pound", country: "UK", duration: "5:56", format: "16mm to digital" },
          { title: "Winter's First Moons", director: "Kathleen Rugh", country: "USA", year: 2018, duration: "3:17", format: "16mm" },
          { title: "Matters of Bioluminescence", director: "Robbie Land", country: "USA", year: 2015, duration: "8:00", format: "16mm" },
          { title: "Oz", director: "Lawrence Jordan", country: "USA", duration: "9:00", format: "16mm" },
          { title: "Helios", director: "Eric Stewart", country: "USA", duration: "5:00", format: "16mm" },
        ],
      },
      {
        label: "Program 5",
        title: "Please Step Out of the Frame",
        date: "Saturday, November 9",
        time: "4pm",
        description:
          "Films that for the most part elide the human figure in favor of abstract forms or urban and rural landscapes.",
        films: [
          { title: "Before", director: "Cecilia Araneda", country: "Chile/Canada", year: 2017, duration: "3:35", format: "16mm to digital" },
          { title: "Non-Stop Beautiful Ladies", director: "Alee Peoples", country: "USA", year: 2015, duration: "9:00", format: "16mm to digital" },
          { title: "The Lilac Game", director: "Emma Piper-Burkett", country: "USA", year: 2019, duration: "4:15", format: "16mm to digital" },
          { title: "Picture Particles", director: "Thorsten Fleisch", country: "Germany", year: 2014, format: "16mm to digital" },
          { title: "Grabados del Ojo nocturno", director: "Jean-Jacques Martinod", country: "Ecuador", year: 2016, duration: "6:40", format: "Super 8 and 16mm to digital" },
          { title: "Letter I", director: "David Webber", country: "USA", year: 2018, duration: "2:01", format: "16mm to digital" },
          { title: "Fetish Frames_1", director: "Masha Godovannaya", country: "Russia", year: 2013, duration: "3:31", format: "16mm to digital" },
          { title: "The Woman with the Suitcase", director: "Ana Bravo Perez", country: "Colombia", duration: "8:00", format: "16mm to digital" },
          { title: "Agar Agar", director: "Alex Mackenzie", country: "Canada", year: 2017, duration: "2:00", format: "16mm to digital" },
          { title: "Knee Jerk", director: "Kerry Laitala", country: "USA", year: 2018, duration: "5:53", format: "16mm to digital" },
          { title: "Before After Again", director: "Michele Smith and Zoe Kirk-Gushowaty", country: "Canada", year: 2015, duration: "6:55", format: "16mm to digital" },
          { title: "Untitled", director: "Eric Ostrowski", country: "USA", year: 2019, duration: "3:41", format: "35mm to digital" },
          { title: "Le dernier jour du papillon lune / The Last Day of the Luna Moth", director: "Guillaume Vallée", country: "Canada", year: 2019, duration: "4:52", format: "16mm to digital" },
          { title: "Not (a)part", director: "Vicky Smith", country: "UK", year: 2019, duration: "6:00", format: "16mm to digital" },
          { title: "Twilight", director: "Richard Reeves", country: "Canada", year: 2018, duration: "2:00", format: "35mm to digital" },
        ],
      },
      {
        label: "Special Event",
        title: "Crackpot Crafters Expanded Cinema Performance",
        date: "Saturday, November 9",
        time: "8pm",
        venue: "West Ballroom, Oddfellows Hall — 915 East Pine Street, 2nd floor",
        isSpecialEvent: true,
        description:
          "The Olympia-based Crackpot Crafters bring their special brand of 16mm loopiness — casting images on parachutes, screens and disco balls, with live sound accompaniment. Stroll around the space and take in the performance from different angles. Free drink with your ticket purchase.",
        films: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2018
  // ─────────────────────────────────────────────
  {
    slug: "2018",
    year: 2018,
    title: "Engauge 2018",
    dates: "November 8–10, 2018",
    venue: "Northwest Film Forum, Seattle",
    description:
      "The inaugural Engauge Experimental Film Festival, founded by Seattle artist/filmmakers Caryn Cline and Jon Behrens working in 16mm and 35mm. Four programs of sprocket-driven shorts and an expanded cinema performance.",
    bannerImage: "/assets/festival-2018-banner.jpg",
    posterImage: "/assets/festival-2018-poster.jpg",
    programs: [
      {
        label: "Program #1",
        title: "The Aura of Uncertainty",
        date: "Thursday, November 8",
        time: "7pm",
        description: "A sprocket-driven shorts program, showing works finished on 35mm and 16mm film.",
        films: [
          { title: "Welcome En Gauge", director: "Devon Davonte", country: "USA", year: 2018, duration: "1:30", format: "35mm | silent", description: "An 88-second, two thousand frame 35mm incantation summoning all cinematic goddesses & cavemanic deities. Entirely handcrafted — no cameras were harmed in the making." },
          { title: "Aura of Uncertainty", director: "Ryan Marino", country: "USA", year: 2016, duration: "6:09", format: "16mm | color | sound", description: "Ominous passages of time and light provide a fleeting glimpse into the unknown." },
          { title: "Theoria", director: "Josh Weissbach", duration: "5:46", format: "16mm | color | silent", description: "A Greek man, once a guide on the island of Delos, started discussing what the word theory meant. The ensuing conversation was the initial inspiration for this film." },
          { title: "I Am Learning to Abandon the World", director: "I. Moon", year: 2016, duration: "10:00", format: "16mm | color | sound", description: "A silent found-footage film cutting together eventless moments from a trove of vintage 16mm films discovered at a salvage house." },
          { title: "Contact", director: "Rhys Morgan", year: 2017, duration: "2:50", format: "16mm | b+w | sound", description: "Digital and physical worlds make contact with each other and with us via their contact with the film. Created using inkjet printing, DIY contact printing, photograms, and scratching." },
          { title: "My Earth's Eye", director: "Paul Turano", year: 2016, duration: "8:00", format: "16mm | color | sound", description: "A portrait of a pond near my childhood home, a personal inventory of a place where I explored nature and the nature of being on the earth." },
          { title: "Mujer", director: "Sofia Canales", year: 2013, duration: "10:00", format: "16mm | b+w | sound", description: "Three Latina women of different generations take pleasure in helping each other bathe, dress up, and cook a meal for themselves. 'Mujer' flows like a dream." },
          { title: "Our Summer Made Her Light Escape", director: "Sasha Waters-Freyer", year: 2012, duration: "4:30", format: "16mm | color | sound", description: "A wordless portrait of interiority, maternal ambivalence and the passage of time." },
          { title: "Minong, I Slept", director: "Vera Brunner-Sung", year: 2012, duration: "5:00", format: "16mm | color | silent", description: "On the remote wilderness island called Minong (Isle Royale), remains of human industry are absorbed into the forest and shoreline." },
          { title: "A Study of Fly", director: "Cherlyn Hsing-Hsin Liu", year: 2018, duration: "12:45", format: "16mm | color | sound", description: "A reflection on the relationship between insect, human, environment and the universe." },
          { title: "Framelines", director: "Sabine Gruffat", year: 2017, duration: "10:14", format: "35mm | color | sound", description: "A scratch film for the 21st century made by laser etching abstract patterns on the film emulsion of negative and positive 35mm colour film." },
        ],
      },
      {
        label: "Program #2",
        title: "Films to Break Projectors",
        date: "Friday, November 9",
        time: "7pm",
        description: "Short films from the region, country and world, including Portugal, Lebanon and Australia.",
        films: [
          { title: "Lost in a Forest (All Alone)", director: "Nicole Baker", year: 2015, duration: "1:34", format: "color + sound", description: "The perceptual slip when we find ourselves alone in the forest in the dark." },
          { title: "XCTRY", director: "Bill Brown", year: 2018, duration: "6:00", format: "16mm | color + sound", description: "Brown re-works 16mm footage shot during a cross-country road trip from Chicago to Las Vegas." },
          { title: "Broken Tongue", director: "Monica Saviron", year: 2013, duration: "3:00", format: "color + b/w + sound", description: "An ode to the freedom of movement, association, and expression." },
          { title: "Film to Break Projectors", director: "Tim Grabham", year: 2016, duration: "5:07", format: "color + sound", description: "Glues, scrapes and splices 35mm, 16mm, standard and super 8 film to create defective and unprojectable celluloid collages." },
          { title: "Gitpu", director: "Nicholas Kovats", year: 2018, duration: "5:55", format: "Super 8 | color + sound", description: "\"Gitpu\" is Mi'kmaq for eagle. My cousin Lorne's spiritual connection with nature did not prepare me for his passing." },
          { title: "Bodyshutter", director: "Sam P. Kessie", year: 2017, duration: "4:44", format: "b/w + sound", description: "A hybrid dance for screen piece experimenting with 16mm film and digital video editing techniques." },
          { title: "Frack", director: "Grayson Cooke", year: 2015, duration: "8:41", format: "color + sound", description: "An art/science project combining environmental critique with material enquiry. Chemicals used in hydraulic fracturing are used to dissolve photographs of sedimentary rock." },
          { title: "Splintering", director: "Luz Olivia", year: 2018, duration: "6:49", format: "16mm | b/w + sound", description: "An examination of the emotional isolation that occurs post sexual assault, deconstructing traditional narrative on hand processed 16mm film." },
          { title: "Fire Escape on 34th Street", director: "Aylon Ben-Ami", year: 2018, duration: "1:41", format: "Super 8 | b/w + silent" },
          { title: "On Familiar Waters", director: "Rita Mahfouz", year: 2018, duration: "7:44", format: "color + sound", description: "Originally extracted from film scenes revolving around a ship or the sea, the sentences portray a city, drowned." },
          { title: "Spatial", director: "Miles Sprietsma", year: 2015, duration: "4:35", format: "b/w + color + sound" },
          { title: "No Personal Checks", director: "Gwendolyn Audrey Foster", year: 2018, duration: "4:52", format: "Super 8 | color + sound" },
          { title: "Fifty Feet Near Wendover", director: "Kate Lain", year: 2018, duration: "3:18", format: "Super 8 | b/w + silent" },
          { title: "Memory, Female Noun", director: "Luisa Sequeira", year: 2016, duration: "7:24", format: "b/w + color + sound" },
          { title: "Pwdre Ser — the rot of stars", director: "Charlotte Pryce", year: 2018, duration: "6:44", format: "color + sound", description: "The film depicts an encounter with a mysterious, luminous, electrical substance." },
        ],
      },
      {
        label: "Program #3",
        title: '"Astro Trilogy and other works"',
        date: "Friday, November 9",
        time: "9pm",
        isSpecialEvent: true,
        description:
          "An expanded cinema performance by Kerry Laitala with live sound by Wobbly. A mind-boggling cinematic show from San Francisco-based filmmakers and performers Kerry Laitala and Wobbly.",
        films: [],
      },
      {
        label: "Program #4",
        title: "The Open Window",
        date: "Saturday, November 10",
        time: "4pm",
        description:
          "A collection of short films, many of which feature hand-coloring and -processing, scratching, eco-processing, found footage and/or other analog processes.",
        films: [
          { title: "Film Loop 31: Shisendo", director: "Michael Lyons", year: 2017, duration: "1:30", format: "16mm | b/w (blue) + sound", description: "Photographed at Shisendo temple in northeast Kyoto and hand-developed using matcha (powdered green tea)." },
          { title: "Self-Portrait, Post-Partum", director: "Louise Bourque", year: 2017, duration: "13:00", format: "b/w + sound", description: "A triptych made of self-portraits intercut with short excerpts of altered footage from a B movie trailer." },
          { title: "Nutrition Fugue", director: "Peter Lichter", year: 2018, duration: "4:00", format: "35mm | color + sound", description: "Made from 35mm celluloid raw footage of communist-era Hungarian state store advertising, digged in soil and rotten with food." },
          { title: "See Weeds", director: "Dawn George", year: 2017, duration: "3:20", format: "b/w + sound", description: "An examination of three weeds and each weed's direct effects on film stock via hand-processing with eco-processing techniques." },
          { title: "Big Agnes Ascent", director: "Kevin Obsatz", year: 2012, duration: "3:35", format: "16mm | color + sound", description: "Made with a primitive, hand-cranking 16mm pinhole camera." },
          { title: "End of an Era", director: "Parker Thiessen", year: 2014, duration: "1:25", format: "b/w + sound", description: "An old media format accepts the inevitable." },
          { title: "Erased Etchings", director: "Linda Fenstermaker", year: 2017, duration: "8:45", format: "color + sound", description: "Documents a place of memory and the collisions between past and present." },
          { title: "T is for Turnip", director: "Kiera Faber", year: 2015, duration: "2:42", format: "16mm | color + sound", description: "3,467 hand painted 16mm frames metaphorically explore three siblings' collective childhood trauma." },
          { title: "Cuentos Para Los Ninos #1", director: "Michelle Trujillo", year: 2018, duration: "3:21", format: "16mm | b/w + sound", description: "La Llorona transcends from the world of the living to that of infinite waters." },
          { title: "Pulse", director: "Matthew Pell", year: 2015, duration: "1:34", format: "color + sound", description: "The rhythm of a city. The rhythm of life." },
          { title: "The Four Five Bleed", director: "Ingrid Stobbe", year: 2011, duration: "3:27", format: "color + sound", description: "A celluloid reaction to e. e. Cummings' 'Buffalo Bill's.'" },
          { title: "Principle Meridian", director: "Nathaniel Cummings-Lambert", year: 2017, duration: "3:24", format: "16mm | color + sound", description: "An experimental 16mm short exploring the terrain of Harney and Lake county of Southeastern Oregon." },
        ],
      },
    ],
  },
];

export function getFestivalBySlug(slug: string): FestivalEditionData | null {
  return festivalEditions.find((e) => e.slug === slug) ?? null;
}

export function getArchiveEditions(): FestivalEditionData[] {
  return festivalEditions.sort((a, b) => b.year - a.year);
}

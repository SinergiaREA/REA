(() => {
    "use strict";

    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = Enero, 1 = Febrero, 2 = Marzo...

    // ── Determinar estación del año (hemisferio norte, México) ──
    const estaciones = {
        0: "Invierno ❄️",   1: "Invierno ❄️",   2: "Primavera 🌸",
        3: "Primavera 🌸",  4: "Primavera 🌸",  5: "Verano ☀️",
        6: "Verano ☀️",     7: "Verano ☀️",     8: "Otoño 🍂",
        9: "Otoño 🍂",     10: "Otoño 🍂",     11: "Invierno ❄️"
    };

    const nombresMes = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const mesActual = nombresMes[currentMonth];
    const anioActual = now.getFullYear();
    const estacion = estaciones[currentMonth];

    // ══════════════════════════════════════════════════════════
    //  BASE DE DATOS DE CAMPAÑAS — 12 MESES DE MÉXICO
    // ══════════════════════════════════════════════════════════
    const campaignsDb = {
        0: { // Enero
            id: "enero_nuevo",
            monthName: "Enero",
            themeColor: "#0057FF",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: false,
            loaderIcon: "🎆",
            loaderEmojis: ["🎆", "🎇", "✨", "🥂", "🎉", "💫"],
            loaderColors: ["#0057FF", "#FFD700", "#00C875", "#A855F7", "#FF2D78"],
            efemerides: [
                { emoji: "🎆", date: "1 de Enero", title: "Año Nuevo", desc: "Inicio de un nuevo ciclo lleno de oportunidades y esperanza." },
                { emoji: "👑", date: "6 de Enero", title: "Día de Reyes", desc: "Tradición mexicana de regalos, rosca y chocolate caliente." },
                { emoji: "📜", date: "5 de Febrero", title: "Día de la Constitución", desc: "Conmemoración de la Constitución Política de México (puente)." }
            ]
        },
        1: { // Febrero
            id: "febrero_amor",
            monthName: "Febrero",
            themeColor: "#E91E63",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Día del Amor y la Amistad",
            campaignDate: "14 de Febrero",
            heroColors: ["#E91E63", "#F06292", "#FF2D78", "#FFB6C1", "#C2185B"],
            ctaText: "💝 Regalos para San Valentín",
            ctaLink: "galeria_perfumes.html",
            showPopup: true,
            loaderIcon: "💖",
            loaderEmojis: ["💖", "💝", "❤️", "🌹", "💕", "✨"],
            loaderColors: ["#E91E63", "#F06292", "#FF2D78", "#FFB6C1", "#C2185B"],
            efemerides: [
                { emoji: "📜", date: "5 de Febrero", title: "Día de la Constitución", desc: "Conmemoración de la Constitución Política de México." },
                { emoji: "💝", date: "14 de Febrero", title: "Día del Amor y la Amistad", desc: "Celebrando el amor, la amistad y los lazos que nos unen." },
                { emoji: "🇲🇽", date: "24 de Febrero", title: "Día de la Bandera", desc: "Honor a nuestro lábaro patrio, símbolo de identidad nacional." }
            ]
        },
        2: { // Marzo
            id: "marzo_primavera",
            monthName: "Marzo",
            themeColor: "#4CAF50",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: false,
            loaderIcon: "🌸",
            loaderEmojis: ["🌸", "🌼", "🌻", "🦋", "🌺", "💫"],
            loaderColors: ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107"],
            efemerides: [
                { emoji: "🇲🇽", date: "21 de Marzo", title: "Natalicio de Benito Juárez", desc: "Fundador del Estado moderno mexicano, símbolo de reforma y libertad." },
                { emoji: "🌸", date: "21 de Marzo", title: "Equinoccio de Primavera", desc: "Inicio de la estación, renovación y energía natural." },
                { emoji: "🌳", date: "21 de Marzo", title: "Día Internacional de los Bosques", desc: "Cuidando nuestro planeta y sus recursos naturales." },
                { emoji: "📖", date: "21 de Marzo", title: "Día Mundial de la Poesía", desc: "Celebrando la expresión artística y literaria." },
                { emoji: "💙", date: "21 de Marzo", title: "Día del Síndrome de Down", desc: "Valorando la diversidad, inclusión y dignidad humana." }
            ]
        },
        3: { // Abril
            id: "abril_nino",
            monthName: "Abril",
            themeColor: "#FF9800",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Día del Niño",
            campaignDate: "30 de Abril",
            heroColors: ["#FF5722", "#FF9800", "#FFC107", "#4CAF50", "#2196F3"],
            ctaText: "🎁 Regalos para el Día del Niño",
            ctaLink: "galeria_perfumes.html",
            showPopup: false,
            loaderIcon: "🎁",
            loaderEmojis: ["🎈", "🧩", "🧸", "🎉", "🎮", "🌟"],
            loaderColors: ["#FF5722", "#FF9800", "#FFC107", "#4CAF50", "#2196F3"],
            efemerides: [
                { emoji: "🌎", date: "22 de Abril", title: "Día de la Tierra", desc: "Cuidando nuestro planeta azul y creando conciencia ambiental." },
                { emoji: "📚", date: "23 de Abril", title: "Día Mundial del Libro", desc: "Fomentando la lectura, la cultura y la protección de la propiedad intelectual." },
                { emoji: "👦", date: "30 de Abril", title: "Día del Niño", desc: "Celebrando la alegría, la inocencia y los derechos de la infancia." }
            ]
        },
        4: { // Mayo
            id: "mayo_madres",
            monthName: "Mayo",
            themeColor: "#E91E63",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Día de las Madres",
            campaignDate: "10 de Mayo",
            heroColors: ["#E91E63", "#F06292", "#F48FB1", "#FFCDD2", "#C2185B"],
            ctaText: "El regalo ideal para mamá está aquí 💐",
            ctaLink: "galeria_perfumes.html",
            showPopup: true,
            loaderIcon: "💖",
            loaderEmojis: ["🌹", "💖", "🌸", "💐", "✨", "💝"],
            loaderColors: ["#E91E63", "#F06292", "#F48FB1", "#FFCDD2", "#C2185B"],
            efemerides: [
                { emoji: "🛠️", date: "1 de Mayo", title: "Día del Trabajo", desc: "Reconociendo el esfuerzo y dedicación de los trabajadores." },
                { emoji: "👩‍👧", date: "10 de Mayo", title: "Día de las Madres", desc: "Celebrando el amor incondicional y la dedicación de las madres." },
                { emoji: "🧑‍🏫", date: "15 de Mayo", title: "Día del Maestro", desc: "Honrando a quienes nos guían y enseñan con paciencia." },
                { emoji: "🎓", date: "23 de Mayo", title: "Día del Estudiante", desc: "Reconociendo el esfuerzo en la búsqueda del conocimiento." }
            ]
        },
        5: { // Junio
            id: "junio_padre",
            monthName: "Junio",
            themeColor: "#1565C0",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Día del Padre",
            campaignDate: "Tercer domingo de Junio",
            heroColors: ["#1565C0", "#1976D2", "#2196F3", "#42A5F5", "#0D47A1"],
            ctaText: "🎁 El regalo perfecto para papá",
            ctaLink: "galeria_perfumes.html",
            showPopup: true,
            loaderIcon: "👔",
            loaderEmojis: ["👔", "🏆", "⭐", "💪", "🎁", "✨"],
            loaderColors: ["#1565C0", "#1976D2", "#2196F3", "#42A5F5", "#0D47A1"],
            efemerides: [
                { emoji: "🌍", date: "5 de Junio", title: "Día Mundial del Medio Ambiente", desc: "Protegiendo y cuidando nuestro planeta para las futuras generaciones." },
                { emoji: "👨‍👧", date: "Tercer domingo", title: "Día del Padre", desc: "Celebrando el amor, la guía y el esfuerzo de los padres." },
                { emoji: "☀️", date: "21 de Junio", title: "Solsticio de Verano", desc: "El día más largo del año marca el inicio del verano." }
            ]
        },
        6: { // Julio
            id: "julio_verano",
            monthName: "Julio",
            themeColor: "#FF6F00",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: false,
            loaderIcon: "☀️",
            loaderEmojis: ["☀️", "🌊", "🏖️", "🌴", "🍉", "🌺"],
            loaderColors: ["#FF6F00", "#FF8F00", "#FFA000", "#FFB300", "#FFC107"],
            efemerides: [
                { emoji: "🏖️", date: "Julio", title: "Vacaciones de Verano", desc: "Tiempo de descanso, diversión y momentos en familia." },
                { emoji: "🍫", date: "11 de Julio", title: "Día del Chocolate", desc: "Celebrando uno de los regalos más dulces de México al mundo." },
                { emoji: "🌮", date: "Julio", title: "Gastronomía Mexicana", desc: "Orgullo culinario reconocido como patrimonio cultural de la humanidad." }
            ]
        },
        7: { // Agosto
            id: "agosto_regreso",
            monthName: "Agosto",
            themeColor: "#00897B",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Regreso a Clases",
            campaignDate: "Agosto",
            heroColors: ["#00897B", "#00ACC1", "#0097A7", "#4CAF50", "#FFC107"],
            ctaText: "📚 Todo para el regreso a clases",
            ctaLink: "#papeleria",
            showPopup: false,
            loaderIcon: "📚",
            loaderEmojis: ["📚", "✏️", "🎒", "📐", "🖊️", "📖"],
            loaderColors: ["#00897B", "#00ACC1", "#0097A7", "#4CAF50", "#FFC107"],
            efemerides: [
                { emoji: "📚", date: "Agosto", title: "Regreso a Clases", desc: "Preparando el nuevo ciclo escolar con material y útiles de calidad." },
                { emoji: "🎒", date: "Agosto", title: "Temporada Escolar", desc: "Cuadernos, lápices, mochilas y todo lo que necesitas." },
                { emoji: "✏️", date: "Agosto", title: "Material Educativo", desc: "Recursos didácticos para preescolar, primaria y secundaria." }
            ]
        },
        8: { // Septiembre
            id: "septiembre_patria",
            monthName: "Septiembre",
            themeColor: "#006847",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Fiestas Patrias",
            campaignDate: "15-16 de Septiembre",
            heroColors: ["#006847", "#CE1126", "#FFFFFF", "#FFD700", "#004D33"],
            ctaText: "🇲🇽 ¡Viva México!",
            ctaLink: "#servicios",
            showPopup: false,
            loaderIcon: "🇲🇽",
            loaderEmojis: ["🇲🇽", "🦅", "🎆", "🎉", "🌮", "🎺"],
            loaderColors: ["#006847", "#CE1126", "#FFFFFF", "#FFD700", "#004D33"],
            efemerides: [
                { emoji: "🇲🇽", date: "15-16 de Sept.", title: "Independencia de México", desc: "Celebrando el grito de Dolores y nuestra libertad como nación." },
                { emoji: "🌍", date: "21 de Sept.", title: "Día Internacional de la Paz", desc: "Promoviendo la paz, la tolerancia y la convivencia mundial." },
                { emoji: "🍂", date: "22 de Sept.", title: "Equinoccio de Otoño", desc: "Inicio del otoño, cosecha y reflexión." }
            ]
        },
        9: { // Octubre
            id: "octubre_muertos",
            monthName: "Octubre",
            themeColor: "#FF6F00",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: false,
            loaderIcon: "🎃",
            loaderEmojis: ["🎃", "💀", "🕯️", "🌺", "👻", "✨"],
            loaderColors: ["#FF6F00", "#E65100", "#BF360C", "#FF8F00", "#FFB300"],
            efemerides: [
                { emoji: "👧", date: "11 de Octubre", title: "Día de la Niña", desc: "Reconociendo los derechos y el potencial de las niñas." },
                { emoji: "🏥", date: "12 de Octubre", title: "Día de la Raza", desc: "Reflexión sobre la diversidad cultural y el encuentro de dos mundos." },
                { emoji: "🎃", date: "31 de Octubre", title: "Halloween / Víspera de Muertos", desc: "Inicio de la temporada más mística y colorida de México." }
            ]
        },
        10: { // Noviembre
            id: "noviembre_difuntos",
            monthName: "Noviembre",
            themeColor: "#E65100",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Día de Muertos",
            campaignDate: "1-2 de Noviembre",
            heroColors: ["#E65100", "#FF6F00", "#FFB300", "#7B1FA2", "#4A148C"],
            ctaText: "💀 Tradición y Cultura Mexicana",
            ctaLink: "#valores",
            showPopup: false,
            loaderIcon: "💀",
            loaderEmojis: ["💀", "🕯️", "🌺", "💐", "🦋", "✨"],
            loaderColors: ["#E65100", "#FF6F00", "#FFB300", "#7B1FA2", "#4A148C"],
            efemerides: [
                { emoji: "💀", date: "1-2 de Nov.", title: "Día de Muertos", desc: "Patrimonio cultural de la humanidad. Honrando a quienes ya partieron con ofrendas y cempasúchil." },
                { emoji: "🇲🇽", date: "20 de Nov.", title: "Revolución Mexicana", desc: "Conmemoración de la lucha por la justicia social y la democracia." }
            ]
        },
        11: { // Diciembre
            id: "diciembre_navidad",
            monthName: "Diciembre",
            themeColor: "#C62828",
            heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual} · ${estacion}`,
            hasSpecialCampaign: true,
            campaignTitle: "Navidad y Año Nuevo",
            campaignDate: "25 de Diciembre",
            heroColors: ["#C62828", "#2E7D32", "#FFD700", "#FFFFFF", "#B71C1C"],
            ctaText: "🎄 Regalos de Navidad perfectos",
            ctaLink: "galeria_perfumes.html",
            showPopup: true,
            loaderIcon: "🎄",
            loaderEmojis: ["🎄", "🎅", "⭐", "🎁", "❄️", "✨"],
            loaderColors: ["#C62828", "#2E7D32", "#FFD700", "#FFFFFF", "#B71C1C"],
            efemerides: [
                { emoji: "🕯️", date: "12 de Dic.", title: "Día de la Virgen de Guadalupe", desc: "Celebración religiosa y cultural profundamente arraigada en México." },
                { emoji: "🎄", date: "24-25 de Dic.", title: "Navidad", desc: "Época de unión familiar, tradiciones y espíritu de generosidad." },
                { emoji: "🎆", date: "31 de Dic.", title: "Fin de Año", desc: "Cierre de ciclo, reflexión y esperanza por un nuevo comienzo." }
            ]
        }
    };

    const currentCampaign = campaignsDb[currentMonth] || {
        id: "default",
        monthName: new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(now),
        hasSpecialCampaign: false,
        heroGreetingSub: `Bienvenido a ${mesActual} ${anioActual}`,
        efemerides: [],
        loaderIcon: "✨",
        loaderEmojis: ["✨", "💫", "⭐", "🌟", "🔸", "🔹"],
        loaderColors: ["#0057FF", "#00C875", "#FF2D78", "#7B2FBE", "#FFD200"]
    };

    window.REA_CAMPAIGN = currentCampaign;
})();

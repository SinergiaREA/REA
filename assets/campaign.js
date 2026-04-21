(() => {
    "use strict";

    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = Enero, 1 = Febrero, 2 = Marzo...

    const campaignsDb = {
        2: { // Marzo
            id: "marzo_primavera",
            monthName: "Marzo",
            themeColor: "#4CAF50",
            heroGreetingSub: "Bienvenido a marzo · Primavera 🌸",
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
            themeColor: "#FF9800", // Naranja
            heroGreetingSub: "Bienvenido a abril · Mes del Niño 🎈",
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
            themeColor: "#E91E63", // Rosa
            heroGreetingSub: "Bienvenido a mayo · Mes de las Madres 🌸",
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
        }
    };

    let currentCampaign = campaignsDb[currentMonth] || {
        id: "default",
        monthName: new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(now),
        hasSpecialCampaign: false,
        heroGreetingSub: `Bienvenido a ${new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(now)}`,
        efemerides: []
    };

    window.REA_CAMPAIGN = currentCampaign;
})();

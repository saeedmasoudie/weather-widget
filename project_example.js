class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const staticUrl = this.getAttribute('static-url');
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${staticUrl}/styles.css">
            <div>
                <div class="current-weather">
                    <h2 id="city-name" class="left">تهران</h2>
                    <img id="weather-icon" class="center" src="" alt="Weather Icon">
                    <div class="right">
                        <p id="temperature">--°C</p>
                        <p id="description">وضعیت آب و هوا</p>
                    </div>
                </div>
                <div class="forecast" id="forecast"></div>
            </div>
        `;
        this.fetchWeatherData(staticUrl);
    }

    async fetchWeatherData(staticUrl) {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=51.42&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto";
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.updateWeatherUI(data, staticUrl);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    updateWeatherUI(data, staticUrl) {
		const t = translations[currentLang];

		// Update current weather
		const cityName = this.shadowRoot.getElementById("city-name");
		const temperature = this.shadowRoot.getElementById("temperature");
		const description = this.shadowRoot.getElementById("description");
		const weatherIcon = this.shadowRoot.getElementById("weather-icon");
		const forecast = this.shadowRoot.getElementById("forecast");

		if (cityName && temperature && description && weatherIcon && forecast) {
			cityName.textContent = t.city;

			let temp = data.current_weather.temperature;
			temperature.textContent = `${convertTempAndConvertToLocale(temp)}${getTempUnit()}`;

			description.textContent = t.weatherCodes[data.current_weather.weathercode] || "Unknown";
			weatherIcon.src = getWeatherIcon(data.current_weather.weathercode, staticUrl);

			// Set direction to RTL for Persian language
			if (currentLang === 'fa') {
				forecast.style.direction = 'rtl';
			}

			// Create and update 7-day forecast
			forecast.innerHTML = ''; // Clear existing forecast

			// Adjust day order for Persian
			let days = t.days;
			if (currentLang === 'fa') {
				days = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
			}

			for (let i = 0; i < 7; i++) {
				let dayIndex = i % 7;
				const dayElem = document.createElement('div');
				dayElem.className = 'day';
				dayElem.innerHTML = `
					<p>${days[dayIndex]}</p>
					<img src="${getWeatherIcon(data.daily.weathercode[i], staticUrl)}" alt="Weather Icon">
					<p class="high">${convertTempAndConvertToLocale(data.daily.temperature_2m_max[i])}${getTempUnit()}</p>
					<p class="low">${convertTempAndConvertToLocale(data.daily.temperature_2m_min[i])}${getTempUnit()}</p>
				`;
				forecast.appendChild(dayElem);
			}
		} else {
			console.error("Error: One or more elements not found in the shadow DOM.");
		}
	}
}

customElements.define('weather-widget', WeatherWidget);

const translations = {
    en: {
        city: "Tehran",
        weatherCondition: "Weather Condition",
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        weatherCodes: {
            0: "Clear Sky",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Cloudy",
            45: "Fog",
            48: "Rime Fog",
            51: "Drizzle",
            53: "Drizzle",
            55: "Drizzle",
            56: "Freezing Drizzle",
            57: "Freezing Drizzle",
            61: "Rain",
            63: "Rain",
            65: "Rain",
            66: "Freezing Rain",
            67: "Freezing Rain",
            71: "Snow",
            73: "Snow",
            75: "Snow",
            77: "Snow Grains",
            80: "Rain Showers",
            81: "Rain Showers",
            82: "Rain Showers",
            85: "Snow Showers",
            86: "Snow Showers",
            95: "Thunderstorms",
            96: "Thunderstorms",
            99: "Thunderstorms",
        }
    },
    fa: {
        city: "تهران",
        weatherCondition: "وضعیت آب و هوا",
        days: ["جمعه", "شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
        weatherCodes: {
            0: "آسمان صاف",
            1: "تقریبا صاف",
            2: "نیمه ابری",
            3: "ابری",
            45: "مه",
            48: "مه یخی",
            51: "باران ریز",
            53: "باران ریز",
            55: "باران ریز",
            56: "باران منجمد",
            57: "باران منجمد",
            61: "باران",
            63: "باران",
            65: "باران",
            66: "باران منجمد",
            67: "باران منجمد",
            71: "برف",
            73: "برف",
            75: "برف",
            77: "برف دانه",
            80: "رگبار باران",
            81: "رگبار باران",
            82: "رگبار باران",
            85: "رگبار برف",
            86: "رگبار برف",
            95: "رعد و برق",
            96: "رعد و برق",
            99: "رعد و برق",
        }
    },
    ru: {
        city: "Тегеран",
        weatherCondition: "Погодные условия",
        days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weatherCodes: {
            0: "Ясное небо",
            1: "Преимущественно ясно",
            2: "Переменная облачность",
            3: "Облачно",
            45: "Туман",
            48: "Иней",
            51: "Мелкий дождь",
            53: "Мелкий дождь",
            55: "Мелкий дождь",
            56: "Ледяной дождь",
            57: "Ледяной дождь",
            61: "Дождь",
            63: "Дождь",
            65: "Дождь",
            66: "Ледяной дождь",
            67: "Ледяной дождь",
            71: "Снег",
            73: "Снег",
            75: "Снег",
            77: "Снежные зерна",
            80: "Ливни",
            81: "Ливни",
            82: "Ливни",
            85: "Снегопады",
            86: "Снегопады",
            95: "Гроза",
            96: "Гроза",
            99: "Гроза",
        }
    }
};

let isCelsius = true;
let currentLang = 'fa';

function convertTemp(temp) {
    return isCelsius ? temp : (temp * 9/5) + 32;
}

function getTempUnit() {
    return isCelsius ? "°C" : "°F";
}

function convertToLocaleNumber(num) {
    return currentLang === 'fa' ? num.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]) : num.toString();
}

function convertTempAndConvertToLocale(temp) {
    const convertedTemp = convertTemp(temp);
    return convertToLocaleNumber(convertedTemp);
}

function getWeatherIcon(code, staticUrl) {
    const icons = {
        0: `${staticUrl}/climacons/climacon-sunny.svg`,
        1: `${staticUrl}/climacons/climacon-sunny.svg`,
        2: `${staticUrl}/climacons/climacon-partly-cloudy-day.svg`,
        3: `${staticUrl}/climacons/climacon-cloudy.svg`,
        45: `${staticUrl}/climacons/climacon-fog.svg`,
        48: `${staticUrl}/climacons/climacon-fog.svg`,
        51: `${staticUrl}/climacons/climacon-drizzle.svg`,
        53: `${staticUrl}/climacons/climacon-drizzle.svg`,
        55: `${staticUrl}/climacons/climacon-drizzle.svg`,
        56: `${staticUrl}/climacons/climacon-freezing-rain.svg`,
        57: `${staticUrl}/climacons/climacon-freezing-rain.svg`,
        61: `${staticUrl}/climacons/climacon-rain.svg`,
        63: `${staticUrl}/climacons/climacon-rain.svg`,
        65: `${staticUrl}/climacons/climacon-rain.svg`,
        66: `${staticUrl}/climacons/climacon-freezing-rain.svg`,
        67: `${staticUrl}/climacons/climacon-freezing-rain.svg`,
        71: `${staticUrl}/climacons/climacon-snowflake-cold.svg`,
        73: `${staticUrl}/climacons/climacon-snow.svg`,
        75: `${staticUrl}/climacons/climacon-snow.svg`,
        77: `${staticUrl}/climacons/climacon-snowflake-cold.svg`,
        80: `${staticUrl}/climacons/climacon-rain.svg`,
        81: `${staticUrl}/climacons/climacon-rain.svg`,
        82: `${staticUrl}/climacons/climacon-rain.svg`,
        85: `${staticUrl}/climacons/climacon-light-snow.svg`,
        86: `${staticUrl}/climacons/climacon-light-snow.svg`,
        95: `${staticUrl}/climacons/climacon-storm.svg`,
        96: `${staticUrl}/climacons/climacon-storm.svg`,
        99: `${staticUrl}/climacons/climacon-storm.svg`,
    };
    return icons[code] || `${staticUrl}/climacons/climacon-question-mark.svg`;
}

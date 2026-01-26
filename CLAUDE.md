# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a learning project repository for web development, currently focused on building a **real-time weather and air quality information dashboard** ("우리동네 날씨 실시간 파악 & 미세먼지 알림판").

## Project Structure

- `first trial/` - Initial learning project with basic HTML/CSS/JS
  - `index.html` - Sample webpage with dark mode toggle feature
  - `initial.md` - Project specification and API documentation for the weather/air quality dashboard
- `real time_API/` - Intended location for the main weather/air quality dashboard project

## Architecture Guidelines

### Technology Stack
The project uses a minimal, beginner-friendly stack:
- **No build tools** - Direct browser execution
- **Vanilla JavaScript** - No frameworks or libraries
- **HTML5, CSS3** - Standard web technologies
- **Browser APIs** - Geolocation API for location detection

### API Integration Strategy

The project is designed as an MVP using two main API approaches:

**Option 1: OpenWeatherMap (Recommended for fastest start)**
- Single API for both weather and air quality data
- Immediate API key issuance upon registration
- Endpoints:
  - Weather: `https://api.openweathermap.org/data/2.5/weather`
  - Air Pollution: `https://api.openweathermap.org/data/2.5/air_pollution`
- Parameters: `units=metric` (Celsius), `lang=kr` (Korean)

**Option 2: Korean Government APIs (Most accurate for Korea)**
- Weather: 기상청 단기예보 API via 공공데이터포털
- Air Quality: 에어코리아 API (한국환경공단)
- Note: API key approval takes 1-2 hours

### Code Organization Philosophy

- **Single-file applications** - Keep HTML, CSS, and JavaScript in one file for simplicity
- **Inline styles and scripts** - Avoid separate files unless the project grows significantly
- **Direct API calls** - Use `fetch()` API without abstraction layers
- **Minimal error handling** - Focus on happy path for MVP

## Development Workflow

### Creating New Features

1. All development should happen in simple HTML files
2. Test by opening HTML files directly in browser (no server needed)
3. Use browser DevTools Console for debugging API responses

### Testing API Calls

Use browser DevTools Console to test API endpoints before integrating:
```javascript
fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=YOUR_KEY&units=metric&lang=kr')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Working with Location Data

The project uses browser Geolocation API:
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // Use coordinates for API calls
  },
  (error) => console.error('Location error:', error)
);
```

## API Key Management

- **Never commit API keys** to the repository
- Store keys in separate `config.js` file (add to .gitignore)
- Or use `const API_KEY = prompt('Enter your API key:');` for testing

## Project Phases

As defined in initial.md, the MVP follows this progression:
1. **Phase 1**: Basic weather display using OpenWeatherMap
2. **Phase 2**: Add air quality (PM10, PM2.5) information
3. **Phase 3**: UI improvements and automatic location detection
4. **Future**: Forecasts, notifications, alerts

## Korean Language Considerations

- UI text should be in Korean (한글)
- API responses from Korean government APIs are in Korean
- OpenWeatherMap supports Korean with `lang=kr` parameter
- Temperature in Celsius (°C), not Fahrenheit

## Key Implementation Details

### Expected Data Display
- Current temperature (온도)
- Weather description (날씨 상태)
- PM10 levels (미세먼지)
- PM2.5 levels (초미세먼지)
- Location name (지역명)

### Typical API Response Structure

**OpenWeatherMap Weather:**
```javascript
{
  main: { temp: 15.2, humidity: 65 },
  weather: [{ description: "맑음" }],
  name: "Seoul"
}
```

**OpenWeatherMap Air Pollution:**
```javascript
{
  list: [{
    components: { pm10: 45, pm2_5: 25 }
  }]
}
```

## Reference Documentation

All API documentation and implementation guides are in `first trial/initial.md`. Refer to that file for:
- Detailed API endpoints and parameters
- Step-by-step implementation guide
- Code examples
- External resource links

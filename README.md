# Weather Dashboard 

A dynamic, fully responsive single-page web application developed with vanilla JavaScript, HTML5, and CSS3. The application demonstrates asynchronous JavaScript programming by consuming real-time datasets from the **OpenWeatherMap API**.

## Key Features

*   **Real-Time Data Consumption:** Utilizes asynchronous network requests via the JavaScript Fetch API to retrieve active updates including temperature, descriptions, wind speed, and humidity levels.
*   **Dynamic DOM Manipulation:** Implements programmatic frontend rendering to dynamically append, update, or remove interactive UI cards representing distinct locations.
*   **Client-Side State Management:** Features full operational CRUD capabilities allowing users to add, edit, manually refresh, or delete specific city records on the dashboard.
*   **Contextual Data Engineering:** Evaluates localized API response parameters through custom conditional algorithms to alter weather iconography based on numerical temperature ranges and weather descriptions.

## Tech Stack & Concepts Applied

*   **Frontend:** HTML5, CSS3 (Flexbox architecture, dynamic popups, custom animations)
*   **Core Engine:** Vanilla JavaScript (ES6+, Fetch API, Promises, Event Listeners)
*   **Third-Party Protocols:** OpenWeatherMap REST API, FontAwesome CDN integration
*   **Architecture Pattern:** Decoupled client-side logic mapped directly to external endpoints

## Architectural Overview

The backend processing maps weather status directly using specific conditional layers:
*   **Icon Selection:** Evaluates status responses using language-flexible checks (e.g., matching phrases such as "tormenta", "lluvia", or "nublado" to output precise Unicode emojis).
*   **Thermal Mapping:** Uses evaluation logic to automatically index thermal stages into interactive visualization formats:
    *   $\text{Temperature} \le 0^\circ\text{C} \implies$ Extreme Cold
    *   $0^\circ\text{C} < \text{Temperature} \le 18^\circ\text{C} \implies$ Cold Weather
    *   $18^\circ\text{C} < \text{Temperature} \le 30^\circ\text{C} \implies$ Optimal / Mild Weather
    *   $\text{Temperature} > 30^\circ\text{C} \implies$ High Heat Index

## How to Run

1. Clone this repository to your local machine.
2. Open `clima.html` directly in any modern web browser.
3. *Note: Ensure a valid API key from OpenWeatherMap is declared inside `script_clima.js` to enable functional network sync.*

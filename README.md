Usage
Type a keyword into the search bar.
Wait for the recipes to load.
Click on a recipe to see more details or search it on Google.
Code Explanation
HTML (index.html)
Sets up the structure of the web page.
Includes a search input and a container for displaying recipes.
CSS (styles.css)
Styles the layout and design of the web page.
Provides responsive design adjustments.
JavaScript (script.js)
Adds event listeners for user interactions.
Fetches and displays recipes from the Edamam API.
Provides a function to search recipes on Google.
Example Code Snippet
javascript
Kodu kopyala
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const recipeContainer = document.getElementById('recipeContainer');

    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value;
        if (query.length > 2) {
            fetchRecipes(query);
        }
    });

    async function fetchRecipes(query) {
        const appId = 'YOUR_APP_ID';
        const appKey = 'YOUR_APP_KEY';
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
        const data = await response.json();
        displayRecipes(data.hits);
    }

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';
        recipes.forEach(recipeData => {
            const recipe = recipeData.recipe;
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.label}">
                <div class="details">
                    <h2>${recipe.label}</h2>
                    <p>${recipe.source}</p>
                    <button onclick="searchOnGoogle('${recipe.label}')">Search this on Google</button>
                </div>
            `;
            recipeContainer.appendChild(recipeCard);
        });
    }

    window.searchOnGoogle = function(query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)} recipe`, '_blank');
    };
});
Contributing
Contributions are welcome! Please fork this repository and open a pull request to add new features or fix bugs.

License
This project is licensed under the MIT License.

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
        const appId = '47c6c11a';  // Görseldeki Application ID
        const appKey = 'b2f11fde0800d6a03a9362ec44b8846b';  // Görseldeki Application Key
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

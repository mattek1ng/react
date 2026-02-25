export default function ingredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={ingredient}>
            <span>{ingredient}</span>
            <button 
                className="remove-btn" 
                onClick={() => props.removeIngredient(index)}
                aria-label={`Remove ${ingredient}`}
            >
                
            </button>
        </li>
    ))
    return (
        
        <section>

<section>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {props.ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>}
            </section>
        </section>    )
}
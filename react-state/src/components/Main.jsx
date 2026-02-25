import React from "react"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"    
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState()
    
    async function getRecipe() {
        const RecipeMarkDown = await getRecipeFromMistral(ingredients)
        setRecipe(RecipeMarkDown)
    }


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredient(indexToRemove) {
        setIngredients(prevIngredients => prevIngredients.filter((ingredient, index) => index !== indexToRemove))
        setRecipe(null)
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} removeIngredient={removeIngredient} />}
            
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
# Chef Claude: dele opp Main til mindre komponenter, og koble prosjektet til et eksternt API

Her er dagens kodegjennomgang. Følg denne.

## Originalkode `Main.jsx`

Start med denne koden i `Main`:

```jsx
import React from "react"

export default function Main() {

    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )
    const [recipeShown, setRecipeShown] = React.useState(false)
    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
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
            
            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={toggleRecipeShown}>Get a recipe</button>
                </div>}
            </section>}
            
            {recipeShown && <section>
                <h2>Chef Claude Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                    <h3>Beef Bolognese Pasta</h3>
                    <strong>Ingredients:</strong>
                    <ul>
                        <li>1 lb. ground beef</li>
                        <li>1 onion, diced</li>
                        <li>3 cloves garlic, minced</li>
                        <li>2 tablespoons tomato paste</li>
                        <li>1 (28 oz) can crushed tomatoes</li>
                        <li>1 cup beef broth</li>
                        <li>1 teaspoon dried oregano</li>
                        <li>1 teaspoon dried basil</li>
                        <li>Salt and pepper to taste</li>
                        <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                    </ul>
                    <strong>Instructions:</strong>
                    <ol>
                        <li>Bring a large pot of salted water to a boil for the pasta.</li>
                        <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                        <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                        <li>Stir in the tomato paste and cook for 1 minute.</li>
                        <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                        <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                        <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                        <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                        <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                    </ol>
                </article>
            </section>}
        </main>
    )
}
```

## Separer innholdet i mindre komponenter
- Lag en `IngredientsList.jsx` og `ClaudeRecipe.jsx` 
- Importerer disse komponentene i `Main.jsx`, pass på at IL importeres før CR

### `Main.jsx`

```jsx
import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {


    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )
    const [recipeShown, setRecipeShown] = React.useState(false)
    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
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
            
            {ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            }
            
            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}
```

### `IngredientsList.jsx`

```jsx
export default function IngredientsList(props) {
    
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>
    )
}
```

### `ClaudeRecipe.jsx`

```jsx
export default function ClaudeRecipe() {
    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                <h3>Beef Bolognese Pasta</h3>
                <strong>Ingredients:</strong>
                <ul>
                    <li>1 lb. ground beef</li>
                    <li>1 onion, diced</li>
                    <li>3 cloves garlic, minced</li>
                    <li>2 tablespoons tomato paste</li>
                    <li>1 (28 oz) can crushed tomatoes</li>
                    <li>1 cup beef broth</li>
                    <li>1 teaspoon dried oregano</li>
                    <li>1 teaspoon dried basil</li>
                    <li>Salt and pepper to taste</li>
                    <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                </ul>
                <strong>Instructions:</strong>
                <ol>
                    <li>Bring a large pot of salted water to a boil for the pasta.</li>
                    <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                    <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                    <li>Stir in the tomato paste and cook for 1 minute.</li>
                    <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                    <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                    <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                    <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                    <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                </ol>
            </article>
        </section>
    )
}
```

## Sette opp API

Du kan velge å bruke Claude API, men det koster 5 dollar. En gratis versjon er <a href="https://huggingface.co/">Hugging Face</a>. Der kan du lage deg en konto, gå til "access tokens", lage en ny access token, kalle den for "Recipe App", og kopiere nøkkelen du får. Det er veldig viktig at du tar vare på denne, da du ikke får tilgang til å se den så snart du har lukket dette vinduet. 

For å legge til denne access token-nøkkelen fra API-et til React-prosjektet vårt, vil vi bruke miljøvariabler slik at vi slipper å hardkode nøkkelen direkte i koden.

1. Opprett en `.env`-fil i rotmappa i prosjektet.
2. Definer miljøvariabelen. Variabelnavnet MÅ starte med `VITE_` hvis vi bruker Vite.
3. Legg til nøkkelen din i formatet `KEY=VALUE`, uten anførselstegn rundt verdien:
   1. `VITE_HF_ACCESS_TOKEN=din_faktiske_access_token_her`.
4. Legg til `.env` i `.gitignore`, for å forhindre at den lastes opp til GitHub, dette er avgjørende for sikkerheten.
5. Endringer i `.env`-filer krever at du restarter utviklingsserveren for at de nye variablene skal lastes inn. Kjør `npm run dev` på nytt.
6. Du kan nå få tilgang til nøkkelen i React-komponentene dine via `process.env`

**Merknad:** Selv om miljøvariabler hindrer eksponering i kildekoden din, vil nøkler i en front-end React-applikasjon fortsatt være synlige for brukere som inspiserer koden i nettleseren. For sensitive elelr private nøkler, anbefales den mest sikre metoden:

- Bruk en server-side proxy eller serverløs funksjon. Din React-app kaller din egen backend, som deretter kaller det eksterne API-et med den sikre nøkkelen lagret kun på serveren.

## AI-kode

Vi skal ikke fokusere noe særlig på AI-koden som trengs, dere kan derfor bare kopiere koden jeg har lagt ut, og legge den i en `ai.js`-fil. Vi trenger ikke å forstå alt som står her. Det vi trenger å vite er at i `Main.jsx`, når vi ønsker å bruke en AI for å generere en oppskrift basert på ingrediensene vi har skrevet inn, trenger vi kun å importere funksjonen som er skrevet i `ai.js`, og kalle på den funksjonen, og gi den ingredienslista som vi lagrer i state i `Main.jsx`, som jeg skal vise dere etterpå.

```js
// For at denne skal funke, må vi importere den til prosjektet vårt. Kjør npm install + det som står i anførselstegn.
import { InferenceClient } from '@huggingface/inference'

// Når du snakker med en AI, må du gi den en "system prompt", som setter rammer for hva AI-en trenger å vite for å forstå hva oppgaven dens er. Legg merke til at vi til slutt skriver at den skal gi responsen sin i markdown-format. 
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN)


export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
```

## Få oppskriften fra AI-kokken

Vi har lyst til å lagre responsen vi får fra AI-kokken i state, slik at den ikke forsvinner for hver gang siden rendres.  

Derfor vil vi endre litt på koden vår i `Main.jsx`: 

Det er ikke lenger relevant å kalle funksjonen vår for `toggleRecipeShown()`, vi kan derfor endre den til `getRecipe()`. Vi må deretter endre prop-navnet både i komponenten i `Main` og i `IngredientsList`. Så må vi endre på hvordan funksjonen fungerer. Istedenfor å sette oppskriften til om den er vist eller ikke, skal vi heller kalle på `getRecipeFromMistral()`, som forventer en liste med ingredienser, så vi kan sende inn ingredienslista vår: 

```jsx
function getRecipe() {
    getRecipeFromMistral(ingredients)
}
```

Vi endrer funksjonen slik at den er en asynkron funksjon, som betyr at den ikke stopper resten av koden fra å kjøre til den er ferdig, den lar deg kjøre andre oppgaver samtidig. Den er ideell for oppgaver som tar tid, for eksempel å hente data fra et API. Asynkrone funksjoner returnerer et Promise (et løfte om at en verdi vil komme senere). Ved hjelp av nøkkelordene `async` og `await` kan man skrive asynkron kode som ser ut og oppfører seg som synkron, lineær kode.

Så vi gjør den om til en asynkron funskjon, og lagrer responsen som en recipeMarkdown. Vi console logger oppskriften så vi kan se at det fungerer.

```jsx
async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    console.log(recipeMarkdown)
}
```

Istedenfor å console logge oppskriften, la oss heller lagre den i state. Vi endrer vår tidligere state fra recipeShown til å bare hete recipe, og istedet for å starte den som en boolean, starter vi den som en tom streng:

```jsx
const [recipe, setRecipe] = React.useState("")
```

Og så kaller vi setRecipe med recipeMarkdown:

```jsx
async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
}
```

```jsx
{ingredients.length > 0 &&
    <IngredientsList
        ingredients={ingredients}
        getRecipe={getRecipe}
    />
}
```

Nå kan vi bruke tilstanden til recipe, til å bestemme hva som skal rendres på siden. Foreløpig har vi recipeShown og ClaudeRecipe, vi lar dette bare hete recipe:

```jsx
{recipe && <ClaudeRecipe />}
```

Så lenge recipe ikke er en tom streng, viser vi oppskriften. Vi har ikke enda endret på den hardkodede oppskriften i `ClaudeRecipe`, men la oss bare se at det fungerer. Og det gjør det, supert. 

Nå kan vi sende oppskriften gjennom props til `ClaudeRecipe`-komponenten vår:

```jsx
{recipe && <ClaudeRecipe recipe={recipe} />}
```

I `ClaudeRecipe` skal vi nå motta props, vi kan fjerne alt som er hardkodet, og så kan vi rendre teksten fra `props.recipe`.

```jsx
export default function ClaudeRecipe(props) {
    return (
        <section>
            {props.recipe}
        </section>
    )
}
```

Nå kan vi også fjerne de hardkodede ingrediensene fra ingredienslisten.

## Formattere responsen fra AI-kokken

Istedenfor å gjøre det manuelt, kan vi bruke en third-party-package kalt react markdown package, for å formattere responsen.

Vi må først kjøre `npm install react-markdown` og så importere react markdown i `ClaudeRecipe`.

```jsx
import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
} 
```

## Ferdig kode: `Main.jsx`

```jsx
import React from "react"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../../ai"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {


    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
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

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
```

## Ferdig kode: `App.css`

```jsx
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Inter, sans-serif;
    background-color: #FAFAF8;
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 11px;
    height: 80px;
    background-color: white;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
}

header > img {
    width: 50px;
}

header > h1 {
    font-weight: 400;
}

main {
    padding: 30px 30px 10px;
}

.add-ingredient-form {
    display: flex;
    justify-content: center;
    gap: 12px;
    height: 38px;
}

.add-ingredient-form > input {
    border-radius: 6px;
    border: 1px solid #D1D5DB;
    padding: 9px 13px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    flex-grow: 1;
    min-width: 150px;
    max-width: 400px;
}

.add-ingredient-form > button {
    font-family: Inter, sans-serif;
    border-radius: 6px;
    border: none;
    background-color: #141413;
    color: #FAFAF8;
    width: 150px;
    font-size: 0.875rem;
    font-weight: 500;
}

.add-ingredient-form > button::before {
    content: "+";
    margin-right: 5px;
}

ul.ingredients-list {
    margin-bottom: 48px;
}

ul.ingredients-list > li {
    color: #475467;
    line-height: 28px;
}

.get-recipe-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background: #F0EFEB;
    padding: 10px 28px;
}

.get-recipe-container h3 {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 24px;
}

.get-recipe-container p {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 20px;
}

.get-recipe-container button {
    border: none;
    border-radius: 6px;
    background: #D17557;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    color: #FAFAF8;
    padding: 9px 17px;
    font-family: Inter, sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
}

.suggested-recipe-container {
    color: #475467;
    line-height: 28px;
    font-size: 1.125rem;
    font-weight: 400;
}

.suggested-recipe-container ul li, .suggested-recipe-container ol li {
    margin-bottom: 8px;
}

```
 
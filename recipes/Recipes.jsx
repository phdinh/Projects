import React, {useEffect, useState, useCallback} from "react";
import recipesService from "../services/recipesService";
import RecipesCards from "./RecipeCard"

function Recipes() {
    const [data, setData] = useState({arrayOfRecipes: [], recipesCards: [] });

    //useCallback improves performance
    //why? this hook is used to memoize a function aka this only gets recreated if React notices a dependency change
    //reduces unnecessary re-renders
    const mapRecipe = useCallback((aRecipe) => (
         <RecipesCards
        recipe={aRecipe}
        key={"ListA-" + aRecipe.id} />
    ), []);

    useEffect(() => {
        console.log("firing useEffect for getRecipes");
        recipesService.getRecipes()
            .then(onGetRecipesSuccess)
            .catch(onGetRecipesError);
    }, [])

    const onGetRecipesSuccess = (response) => {
        console.log("getRecipesSuccess", response);
        let recipesArr = response; 
        console.log({ recipesArr }); //from api 

        setData((prevState) => {
            const copy = {...prevState};
            copy.arrayOfRecipes = recipesArr;
            copy.recipesCards = recipesArr.map(mapRecipe);
            return copy;
        })
    }

    const onGetRecipesError = (error) => {
        console.log("could not retrieve array of recipes", error);
    }

    const onDifficultyClicked = (e) => {
        let recipeValue = e.target.value; 
        console.log("value", recipeValue)
        e.preventDefault();
        console.log("refactoring to single click handler...");
        console.log("my current array:", data.arrayOfRecipes); //this exists....
        if (recipeValue === "Reset") {
            console.log("step into reset");
            setData((prevState) => {
                const copy = {...prevState}; //makes a copy of most recent version of state
                console.log("copy reset", copy);
                copy.recipesCards = copy.arrayOfRecipes.map(mapRecipe); //mapping over og array from api, assigning to recipeCards
                return copy;
            })
        }
        else {
            console.log(recipeValue);
            const filterByDifficulty = data.arrayOfRecipes.filter(aRecipe =>  aRecipe.difficulty === recipeValue);
            console.log('filter by difficulty', filterByDifficulty);
            const filteredMappedRecipes = filterByDifficulty.map(mapRecipe);
            console.log("filtered mapped", filteredMappedRecipes);
            setData((prevState) => {
                const copy = {...prevState};
                console.log("before mapping filter", copy);
                copy.recipesCards = filteredMappedRecipes;
                console.log("after mapping filter", copy.recipesCards);
                return copy;
            }); 
        }  
     };
    
    return (
        <React.Fragment>
            <br />
            <h1 className="text-center">Recipes</h1>

            <div className="container">
                <button
                    type="submit"
                    className="btn btn-danger me-2"
                    name="advancedBtn"
                    value="Advanced"
                    onClick={e => onDifficultyClicked(e)}>Advanced
                </button> 
                <button
                    type="submit"
                    className="btn btn-warning me-2"
                    name="intermediateBtn"
                    value="Intermediate"
                    onClick={e => onDifficultyClicked(e)}>Intermediate
                </button> 
                <button
                    type="submit"
                    className="btn btn-success me-2"
                    name="easyBtn"
                    value="Easy"
                    onClick={e => onDifficultyClicked(e)}>Easy
                </button> 
                <button
                    type="submit"
                    className="btn btn-secondary me-2"
                    name="resetBtn"
                    value="Reset"
                    onClick={e => onDifficultyClicked(e)}>Reset
                </button> 

                <div className="row"> 
                   { data.recipesCards }
                </div>
            </div>
            <hr />

        </React.Fragment>
    )

}

export default Recipes;



// HOMEWORK:
// EXTRACTING CARD TEMPLATE INTO ITS OWN COMPONENT
// Extract the card inside of the mapping function and turn it into its own component: RecipesCard.jsx
// Utilize the RecipesCard component to map through the array of objects
// Your RecipesCard component needs to accept props in order to display the data inside of each object\
// FILTERING THROUGH DATA
// Create three buttons ( Easy, Intermediate, Advanced)
// On click of each button filter through the array of recipes and only display the recipes corresponding to that difficulty level
     // const filterEasy = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Easy");
        // const filterInter = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Intermediate");
        // const filterAdv = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Advanced");
        // const filterByDifficulty = difficultyLevel => {
        //     setData(data.arrayOfRecipes.filter(aRecipe => {
        //         return aRecipe.difficultyLevel === difficultyLevel
        //     })
        // )
        
        // console.log("length of arr", data.arrayOfRecipes.length);
        // data.arrayofRecipes is undefined.....
    //combine filtering functions into one, make dynamic
    // const onEasyClicked = (e) => {
    //     e.preventDefault();
    //     console.log("easy difficulty firing...");
    //     const easyRecipes = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Easy");
    //     setFilteredRecipes(easyRecipes);
    // };


    // const onInterClicked = (e) => {
    //     e.preventDefault();
    //     console.log("intermediate difficulty firing...");
    //     const interRecipes = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Intermediate");
    //     setFilteredRecipes(interRecipes);
    // }

    // const onAdvancedClicked = (e) => {
    //     e.preventDefault();
    //     console.log("advanced difficulty firing... gotta filter now");
    //     const advRecipes = data.arrayOfRecipes.filter(aRecipe => aRecipe.difficulty === "Advanced");
    //     setFilteredRecipes(advRecipes);
    // }
    //#ENDREGION

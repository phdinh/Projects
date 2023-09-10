import React from "react";

function Recipe(props) {
    const recipe = props.recipe;
    console.log("data passed into Recipe component", props.recipe);

 

    return (
       <React.Fragment>
             
            <div className="col-md-4 card-group p-3" key={recipe.id}>
                <div className="card">
                    <img
                        src="https://tinyurl.com/3b4jvw2w"
                        className="card-img-top"
                        alt="job img coding"
                    />
                    <div className="card-body">
                        <h4 className="card-title text-center"> Chef {recipe.chef}</h4>
                        <h5 className="card-title text-center"> Dish: {recipe.name}</h5>
                        <p className="card-text text-center"> {recipe.region} Cuisine  | Difficulty: {recipe.difficulty}
                        </p>   
                    </div>
                </div>
            </div> 
       </React.Fragment>
    )
}

export default React.memo(Recipe);
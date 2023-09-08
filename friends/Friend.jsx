import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./friend.css"


function Friend(props) {
    //extend to generate a logger with a name of sabio:Friend


    const friend = props.friend;
    console.log("Friend info from Friend Comp", props.friend);

    const friendSkills = friend.skills; //array of objects


    const navigate = useNavigate();
   
    const onEditClicked = (e) => {
        e.preventDefault();
        navigateToFriendFormPage(friend);
    }
    const navigateToFriendFormPage = (friend) => {
        const stateForTransport = { payload: friend, type: "FRIEND_VIEW" };
        navigate(`${friend.id}/edit`, {state: stateForTransport });
    }

    // const goToPage = (e) => {
    //     e.preventDefault();
    //     navigateToFriendFormPage(friend)
    // } // routed back to FriendForm.jsx
    // const navigateToFriendFormPage = (friend) => {
    //     const state = { type: "FRIEND_DATA", payload: friend };
    //     navigate(`${friend.id}`, { state })
    // }
   
    const handleDeleteClicked = (e) => {
        e.preventDefault();
        props.onFriendClicked(friend, e); //where child calls up to parent
    };


    return (
        <div className="col-md-4 card-group p-3" >
        <Card key={friend.id}>
            <img
                src={friend.primaryImage.url}
                className="card-img-top"
                alt="I love code"
            />
            <div className="card-body">
                <h5 className="card-title text-center">{friend.title} {friend.bio}</h5>
                <p className="card-text text-center">
                    {friend.summary}
                </p>
                <p className="card-text">
                {friendSkills ? friendSkills.map(sk => (
                        <li>{sk.name}</li>
                    )) : <li>NO SKILLS </li>}
                </p>
            </div>

            <div className="card-footer" id="foot">

                <button
                    name="delete"
                    className="btn btn-danger me-2 mt-auto" 
                    onClick={handleDeleteClicked}
                    href="http://localhost:3000/test"
                    >Delete
                </button>
                <button
                    name="edit"
                    className="btn btn-warning "
                    onClick={onEditClicked}
                    >Edit
                </button>
            </div>
        </Card>
    </div>          
    );
}
export default React.memo(Friend);


    //eliminate use case of this service function
    // friendsService.getById(friend.id) //all info is already on card
    //     .then(onGetByIdSuccess)
    //     .catch(onGetByIdError)

   //  const navigateNoFriendSelected = () => {
    //     navigate(`/friends/2555`);
    //  }   
    // const onGetByIdSuccess = (response) => {
    //     console.log("successfully grabbed friend's data", response.data.item);
    //     //need to pass info from here into friendform to populate input fields
    //     //take with it object with friendData (in state) thus do not have to make ajax call to getById
       
    // }

    // const onGetByIdError = (error) => {
    //     console.log("could not grab friend's data", error);
    // }
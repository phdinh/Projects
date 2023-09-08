import React, { useState, useEffect, useCallback } from "react";
import friendsService from "../../services/friendsService";
import Friend from "./Friend";
import "./friends.css";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import debug from "sabio-debug";

function Friends() {
  // const [arrayOfFriends, setArrayOfFriends] = useState([]);
  //^ we want to avoid this, each state would have to be maintained individually and re-render

  // const [arrayOfFriendsOld] = useState([
  //     {
  //         statusId: "Active",
  //         title: "Miss",
  //         bio: "Kelsi was a student at East High",
  //         summary: "She is the main pianist for the drama department",
  //         headline: "Kelsi Nielsen, HSM",
  //         entityTypeId: 200,
  //         id: 101,
  //         slug: "knielson",
  //         skills: "playing piano, songwriting, dancing",
  //         primaryImage:  "https://randomuser.me/api/portraits/lego/5.jpg",
  //         dateCreated: "7/19/2023",
  //         dateModified: "7/19/2023",
  //     },
  //     {
  //        statusId: "Active",
  //        title: "Mr",
  //         bio: "Bruce is a billionare in Gotham",
  //         summary: "Brucy Wayne also happens to be Batman",
  //         headline: "Bruce Wayne, DC",
  //         entityTypeId: 201,
  //         id: 102,
  //         slug: "bwayne",
  //         skills: "analytical, martial arts",
  //         primaryImage: "https://randomuser.me/api/portraits/lego/2.jpg",
  //         dateCreated: "7/19/2023",
  //         dateModified: "7/19/2023",
  //     },
  //     {
  //         statusId: "Active",
  //         title: "Mr",
  //         bio: "Gordon is the star of Hell's Kitchen",
  //         summary: "He is a renowned chef and tv personality",
  //         headline: "Gordan Ramsay, Chef",
  //         entityTypeId: 202,
  //         id: 103,
  //         slug: "gramsay",
  //         skills: "sense of humor, cooking",
  //         primaryImage:"https://randomuser.me/api/portraits/lego/8.jpg",
  //         dateCreated: "7/19/2023",
  //         dateModified: "7/19/2023",
  //     },
  // ]); //static list
  // false && console.log(arrayOfFriendsOld);

  const _logger = debug.extend("Friend");
  _logger("testing the logger");

  const [data, setData] = useState({
    arrayOfFriends: [],
    friendsComponents: [],
  });
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); //derive from list of items wo taking up memory storing in another chunk of state

  const [currentPage, setCurrentPage] = useState(1); //where user is currently at

  const onChangePage = (page) => {
    console.log("current page:", page);
    setCurrentPage(page);
    // setData((prevState) => {
    //     const copy = {...prevState};
    //     copy.pageIndex = page;
    //     return copy;
    // })
  };
  const pageIndex = currentPage - 1;
  const pageSize = 12;

  const onSearchClicked = () => {
    // navigate(`/friends/search?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}/${searchQuery}`)
    //just make api call
    friendsService
      .searchFriends(pageIndex, pageSize, searchQuery)
      .then(onSearchFriendsSuccess)
      .catch(onSearchFriendsError);
  };

  // useEffect(() => {
  //     console.log("firing useEffect for searchFriends");
  // },[searchQuery])

  const onSearchFriendsSuccess = (data) => {
    console.log("search friends success handler", data);
    let arrayOfPeeps = data.item.pagedItems;
    console.log({ arrayOfPeeps }); //from api
    //this should run every time keystroke is registered --- useEffect() hook?
    setData((prevState) => {
      const copy = { ...prevState };
      copy.arrayOfFriends = arrayOfPeeps; //assign to copy of state in updater
      copy.friendsComponents = arrayOfPeeps.map(mapFriend); //map() as soon as I know what array is
      return copy;
    });
  };
  const onSearchFriendsError = (error) => {
    console.log(error);
  };

  const filterFriends = (aFriendObj) => {
    const friendData = aFriendObj.props.friend;
    if (typeof friendData.bio !== "string" || searchQuery === "") {
      return false;
    } else {
      return friendData.bio.toLowerCase().includes(searchQuery.toLowerCase());
      //making query search case-insensitive, to see if whatever's typed in search is included in friend data
    }
  };

  const filteredFriends = data.friendsComponents.filter(filterFriends);
  console.log(
    "what's being typed in query and should be filtered: ",
    searchQuery
  );
  console.log("filtered Friends:", filteredFriends);

  //fx component is recreating this fx wrapped by useCallBack
  const onDeleteRequested = useCallback((myFriend, evtObj) => {
    console.log(myFriend.id, { myFriend, evtObj }); //view data that's coming in...

    const handler = getDeleteSuccessHandler(myFriend.id);

    friendsService.deleteFriend(myFriend.id).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted); //happen immediately
    return () => {
      //idToBeDeleted persisted after Ajax call, got curried forward
      console.log("onDeleteSuccess", idToBeDeleted); //last thing that's going to happen...

      setData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFriends = [...pd.arrayOfFriends]; //make sure pointer pts to a brand new arr

        //behaves similarly to .filter() -->> find data inside particular index of array
        const idxOf = pd.arrayOfFriends.findIndex((friend) => {
          let result = false;
          if (friend.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        //found matching id's
        if (idxOf >= 0) {
          //this array can be manipulated bc its a copy of most recent state, not manipulating state itself
          pd.arrayOfFriends.splice(idxOf, 1); //starting at idxOf, remove 1 friend
          pd.friendsComponents = pd.arrayOfFriends.map(mapFriend); //refactor to: pd.friendsComponents.splice(idxOf, 1);
          //no longer needs re-mapping arrOfFriends -- list, friendsComp -- mappedList
          //react reacts to any change
        }
        return pd;
      });
    };
  };
  const onDeleteError = (error) => {
    console.log("Delete error:", error);
  };

  const mapFriend = (aFriend) => {
    // console.log("mapping", aFriend);
    return (
      <Friend
        friend={aFriend}
        key={"ListA-" + aFriend.id}
        onFriendClicked={onDeleteRequested}
      />
    );
  };

  useEffect(() => {
    console.log("firing useEffect for getFriends");
    friendsService
      .getFriends(pageIndex, pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError); //fx component version of startUp, or componentDidMount in class
  }, [currentPage]); //re-render items based on page user is on

  const onGetFriendsSuccess = (data) => {
    console.log(data);
    let arrayOfPeeps = data.item.pagedItems;
    console.log({ arrayOfPeeps }); //from api

    //change to useEffect so it's persistent after initial render
    setData((prevState) => {
      const copy = { ...prevState };
      copy.arrayOfFriends = arrayOfPeeps; //assign to copy of state in updater
      copy.friendsComponents = arrayOfPeeps.map(mapFriend); //map() as soon as I know what array is
      return copy;
    });
  };

  const onGetFriendsError = (error) => {
    console.log(error);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  const onClickToggleContent = (e) => {
    console.log(e);
    setToggle(!toggle);
  };

  return (
    <React.Fragment>
      <div className="friends p-5 mb-4 rounded-3">
        <h1 className="text-center title"> Friends </h1>

        <div className="search">
          <input
            id="search"
            type="search"
            className="searchField me-2"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            id="searchBtn"
            type="submit"
            className="btn btn-warning"
            name="searchButton"
            onClick={onSearchClicked}
          >
            Search
          </button>

          <Pagination
            className="pagination"
            onChange={onChangePage}
            currentPage={currentPage}
            total={50}
          />
          {filteredFriends}
        </div>
        <br />
        <div className="container">
          <h3 onClick={onHeaderClicked}>Toggling{count}</h3>
          <br />
          <button
            onClick={onClickToggleContent}
            id="show-friends"
            className="btn btn-dark me-2"
          >
            {toggle ? "Hide Friends" : "Show Friends"}
          </button>
          <Link to="/friends/new" className="btn btn-primary">
            Add Friend
          </Link>
          <Link to="/hw/recipes" className="btn btn-info">
            Recipes
          </Link>

          <div className="row"> {toggle && data.friendsComponents} </div>
          {/* <div className="row"> {data.show && data.friendsComponents}</div> */}
        </div>
      </div>
      <br />
      <Pagination
        className="pagination"
        onChange={onChangePage}
        currentPage={currentPage}
        total={50}
      />
      <br />
      <hr />
    </React.Fragment>
  );
}
export default Friends;

/* STEPS FOR DELETING A FRIEND */
//step 1: have a click handler, fire button that will send ajax call to api
//step 2: WAIT for success handler (200 code)
//step 3: remove friend from array WITHOUT MUTATING STATE
//step 4: copy array, update it, and change state w updater fx
//step 5: react re-renders if step 4 was done correctly

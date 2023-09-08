import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import friendsService from "../../services/friendsService";
import toastr from "toastr";

//model in .net must match form data in state
//shape of payload will be dependent on SQL database
const defaultFormData = {
    
        id: null,
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: 1001,
        primaryImage: "",
        // imageTypeId: 200, //supposed to make table w PK, and image table hold FK of this..
        // imageUrl: "",
        skills: "", //giant string --> turn into an array bc that is what .net expects
        tenantId: "U05BG487DTL",
        // userId: 3
}
function FriendForm() {
  const [userFormData, setUserFormData] = useState(defaultFormData);

  const navigate = useNavigate();
  const { state } = useLocation(); //what does this destructuring state term do? unload its data?
  const { id } = useParams();

  // const [editFriendId, setEditFriendId] = useState(id);
  // console.log("FriendId =>>>", id);
  // console.log(editFriendId)

  useEffect(() => {
    console.log("useEffect is firing!");
    // setEditFriendId(id); //preventing stale state...
    if (state?.type === "FRIEND_VIEW" && state?.payload) {

      setUserFormData((prevState) => {
        return {
            ...prevState, ...state.payload, 
            skills: state.payload.skills?.map((sk) => (sk.name)).join(", "),
            primaryImage: state.payload.primaryImage
        }; 
           
        });
      };
      console.log("what's in state:", userFormData);
    //   console.log("changing skills in payload from clicked Friend to a giant str", state.payload); //still an arr of objects
  }, [id, state]); //dependencies

  const onSubmitButton = (e) => {                          
    const payload = { ...userFormData, skills: [userFormData.skills], imageUrl: userFormData.primaryImage.url, imageTypeId: userFormData.primaryImage.typeId }; //override primaryImage and turn into an obj??
     //og an array of objects, we only want the skill names
    //split str by commas and console.log to see what's getting sent over to .net
    
    console.log("payload data:", payload);
    e.preventDefault();

    if (payload.id > 0) {
      friendsService
        .updateFriend(payload.id, payload)
        .then(onUpdateFriendSuccess)
        .catch(onUpdateFriendError);
    } else {
      friendsService
        .addFriend(payload)
        .then(onAddFriendSuccess)
        .catch(onAddFriendError);
    }
  };

  const onUpdateFriendSuccess = (response) => {
    console.log("successful update", response);
    navigate(`/friends/`); //after updating, redirect to friends component...
  };

  const onUpdateFriendError = (error) => {
    console.log("could not update", error);
  };

  const onAddFriendSuccess = (response) => {
    console.log("successfully registered", response.data.item); // new friend's id

    setUserFormData((prevState) => {
      const newFriendObj = { ...prevState };
      newFriendObj.id = response.data.item;
      return newFriendObj;
    });
    toastr.success("toastr registered!");
  };

  const onAddFriendError = (error) => {
    console.log("could not register", error);
    toastr.error("error, could not register");
  };
  // const fileSelected = (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   const formData = new FormData(); //instance of FormData() ? from where
    
  //   formData.append("file", file);

  //   uploadFile(formData)
  //     .then(onFileUploadSuccess)
  //     .catch(onFileUploadError);
  //     console.log("file: ", file);
  // }


  function onFormFieldChange(e) {
    console.log("onChange", { syntheticEvent: e });

    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    console.log({ nameOfField, newUserValue });

    setUserFormData((prevState) => {
      console.log("updater userFormData fx onChange");
      const newUserObj = { ...prevState };

      //update changed field directly
      newUserObj[nameOfField] = newUserValue;

      return newUserObj;
    });
  }

  return (
    <React.Fragment>
      <h1 className="text-center text-warning p-4">Register a new Friend</h1>

      <div className="col-md-10 mx-auto col-lg-5">
        <form className="row p-4 p-md-5 border rounded-3 bg-light">
          <div className="col-md-3">
            <label htmlFor="titleField" className="form-label">
              {" "}
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              name="title"
              placeholder="Mr."
              value={userFormData.title} //data binding to form field
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-9">
            <label htmlFor="bioField" className="form-label">
              {" "}
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputBio"
              placeholder="example bio, fullname"
              name="bio"
              value={userFormData.bio}
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="slugField" className="form-label">
              {" "}
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inputSlug"
              placeholder="enter a unique username here"
              name="slug"
              value={userFormData.slug}
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="summaryField" className="form-label">
              Introduction
            </label>
            <input
              type="text"
              className="form-control"
              id="inputSummary"
              name="summary"
              placeholder="Write a brief introduction here"
              value={userFormData.summary}
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="skillsField" className="form-label">
              Skills
            </label>
            <input
              type="text"
              className="form-control"
              id="inputSkill"
              name="skills"
              placeholder="Enter skill"
              value={userFormData.skills}
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="headlineField" className="form-label">
              Headline
            </label>
            <input
              type="text"
              className="form-control"
              id="inputHeadline"
              name="headline"
              placeholder="example fname"
              value={userFormData.headline}
              onChange={onFormFieldChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="primaryImageUrl" className="form-label">
              Profile Image Url
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPrimaryImageUrl"
              name="imageUrl"
              placeholder="https://example.com"
              value={userFormData.primaryImage.url}
              onChange={onFormFieldChange}
            />
            {/* <label htmlFor="file" className="form-label">
              or Upload File
            </label>
            <input
              type="file"
              multiple id="fileImg"
              name="fileImg"
              accept="image/png, image/jpeg"
              onChange={fileSelected}
            /> */}
          </div>
          <div className="col-md-3">
            <label htmlFor="tenantIdField" className="form-label"></label>
            <input
              type="hidden"
              className="form-control"
              id="inputTenantId"
              name="tenantId"
              value={userFormData.tenantId}
              onChange={onFormFieldChange}
              required
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              id="register-btn"
              className="btn btn-warning w-100 btn-lg"
              onClick={onSubmitButton}
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-5">
        <h4>Output</h4>
        <pre>
          <code>{JSON.stringify(userFormData, undefined, 2)}</code>
        </pre>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default FriendForm;

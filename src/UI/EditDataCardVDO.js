import React, { useEffect, useState } from "react";
import classes from "./EditDataCard.module.css";
import Card from "./Card";
import { SketchPicker, CompactPicker } from "react-color";
import { useCollapse } from "react-collapsed";

const EditDataCardVDO = (props) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [updateLink, setUpdateLink] = useState(
    "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video/items"
  );

  const [comment, setComment] = useState("your comment");

  const [id, setId] = useState("default");
  const [normal, setNormal] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const [VDOurl, setVDOurl] = useState("www");
  const [enable, setEnable] = useState("no");
  const [width, setwidth] = useState("1.2");
  const [height, setHeight] = useState("0.6");

  useEffect(() => {
    setUpdateLink(props.link);
    setComment(props.comment);
    setId(props.id);
    setNormal(props.normal);
    setPosition(props.position);
    setVDOurl(props.VDOurl);
    setEnable(props.enable);
    setwidth(props.width);
    setHeight(props.height);
  }, []);
  const widthInputChangeHandler = (event) => {
    setwidth(event.target.value);
  };
  const HeightInputChangeHandler = (event) => {
    setHeight(event.target.value);
  };

  const normalxInputChangeHandler = (event) => {
    setNormal({...normal,x:parseFloat(event.target.value)});
  };
  const normalyInputChangeHandler = (event) => {
    setNormal({...normal,y:parseFloat(event.target.value)});
  };
  const normalzInputChangeHandler = (event) => {
    setNormal({...normal,z:parseFloat(event.target.value)});
  };


  const commentInputChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const idInputChangeHandler = (event) => {
    setId(event.target.value);
  };

  const VDOurlInputChangeHandler = (event) => {
    setVDOurl(event.target.value);
  };
  const enableInputChangeHandler = (event) => {
    setEnable(event.target.value);
  };

  const onDeleteClick = () => {
    var ans = window.confirm("คุณต้องการที่จะลบ VDO ตรงจุดนี้ใช่หรือไม่");

    if (ans == false) {
      return;
    }

    const deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: "", // We send data in JSON format
    };

    // make the HTTP put request using fetch api
    fetch(updateLink, deleteMethod)
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err)); // Do something with the error
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const dataToPut = {
      comment: comment,
      id: id,
      VDOurl: VDOurl,
      enable: enable,
      position: position,
      normal: normal,
      width: width,
      height: height,
    };
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(dataToPut), // We send data in JSON format
    };

    // make the HTTP put request using fetch api
    fetch(updateLink, putMethod)
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err)); // Do something with the error
    /* setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    setEnteredEmailTouched(false); */
  };

  return (
    <div>
      <Card>
        <div className="collapsible">
          <button className="header" {...getToggleProps()}>
            {isExpanded
              ? "" + comment + " [" + id + "]"
              : "" + comment + " [" + id + "]"}
          </button>
          <div {...getCollapseProps()}>
            <div className="content">
              <br></br>
              <form onSubmit={formSubmissionHandler}>
                <div className={classes["form-control"]}>
                  <label htmlFor="id">id</label>
                  <input
                    type="text"
                    id="id"
                    onChange={idInputChangeHandler}
                    value={id}
                    disabled={"disabled"}
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="comment">comment</label>
                  <input
                    type="text"
                    id="comment"
                    onChange={commentInputChangeHandler}
                    value={comment}
                  />
                </div>

                <div className={classes["form-control"]}>
                  <label htmlFor="VDOurl">link</label>
                  <input
                    type="text"
                    id="VDOurl"
                    onChange={VDOurlInputChangeHandler}
                    value={VDOurl}
                  />
                </div>

                <div className={classes["form-control"]}>
                  <label htmlFor="width">Width</label>
                  <input
                    type="text"
                    id="width"
                    onChange={widthInputChangeHandler}
                    value={width}
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="Height">Height</label>
                  <input
                    type="text"
                    id="Height"
                    onChange={HeightInputChangeHandler}
                    value={height}
                  />
                </div>

                <div className={classes["form-control"]}>
                  <label htmlFor="rotation-x">Rotation x</label>
                  <input
                    type="number"
                    id="rotation-x"
                    onChange={normalxInputChangeHandler}
                    value={normal.x}
                    step={0.01}
                    min={-100}
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="rotation-y">Rotation y</label>
                  <input
                    type="number"
                    id="rotation-y"
                    onChange={normalyInputChangeHandler}
                    value={normal.y}
                    step={0.01}
                    min={-100}
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="rotation-z">Rotation z</label>
                  <input
                    type="number"
                    id="rotation-z"
                    onChange={normalzInputChangeHandler}
                    value={normal.z}
                    step={0.01}
                    min={-100}
                  />
                </div>

                
                <div className={classes["form-control"]}>
                  <label htmlFor="enable">enable</label>

                  <select
                    value={enable}
                    onChange={enableInputChangeHandler}
                    id="enable"
                  >
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <button onClick={onDeleteClick}>Delete</button>
      </Card>
    </div>
  );
};

export default EditDataCardVDO;

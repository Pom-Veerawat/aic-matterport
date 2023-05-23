import React, { useEffect, useState } from "react";
import classes from "./EditDataCard.module.css";
import Card from "./Card";
import { SketchPicker, CompactPicker } from "react-color";
import { useCollapse } from "react-collapsed";

const EditDataCard = (props) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [updateLink, setUpdateLink] = useState(
    "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/MatterTag/items"
  );
  const [color, setColor] = useState({ r: 100, g: 100, b: 100 });
  const [header, setHeader] = useState("Header text");
  const [iconTxt, setIconTxt] = useState("customSVG-tem-2");
  const [id, setId] = useState("default");
  const [normal, setNormal] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [type, setType] = useState("data");
  const [val, setVal] = useState("www");
  const [enable, setEnable] = useState("no");

  useEffect(() => {
    setUpdateLink(props.link);
    setColor(props.color);
    setHeader(props.header);
    setIconTxt(props.iconTxt);
    setId(props.id);

    setNormal(props.normal);
    setPosition(props.position);
    setType(props.type);
    setVal(props.val);
    setEnable(props.enable);
  }, []);

  const headerInputChangeHandler = (event) => {
    setHeader(event.target.value);
  };

  const idInputChangeHandler = (event) => {
    setId(event.target.value);
  };

  const iconTxtInputChangeHandler = (event) => {
    setIconTxt(event.target.value);
  };

  const typeInputChangeHandler = (event) => {
    setType(event.target.value);
  };
  const valInputChangeHandler = (event) => {
    setVal(event.target.value);
  };
  const enableInputChangeHandler = (event) => {
    setEnable(event.target.value);
  };

  const colorInputChangeHandler = (event) => {
    setColor({ r: event.rgb.r, g: event.rgb.g, b: event.rgb.b });
  };

  const onDeleteClick = () => {
    var ans = window.confirm("คุณต้องการที่จะลบ Tag ตรงจุดนี้ใช่หรือไม่");

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
      color: { r: color.r, g: color.g, b: color.b },
      header: header,
      icon: iconTxt,
      id: id,
      type: type,
      val: val,
      enable: enable,
      position: position,
      normal: normal,
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
              ? "" + header + " [" + id+"]"
              : "" + header + " [" + id+"]"}
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
                  <label htmlFor="header">header</label>
                  <input
                    type="text"
                    id="header"
                    onChange={headerInputChangeHandler}
                    value={header}
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="iconTxt">iconTxt</label>

                  <select
                    value={iconTxt}
                    onChange={iconTxtInputChangeHandler}
                    id="iconTxt"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Lighting">
                    Lighting
                    </option>
                    <option value="Sensors">Sensors</option>
                    <option value="Facilities_Management">Facilities_Management</option>
                    <option value="CCTV">CCTV</option>
                  </select>
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="type">type</label>

                  <select
                    value={type}
                    onChange={typeInputChangeHandler}
                    id="type"
                  >
                    <option value="iframe">iframe</option>
                    <option value="rawdata">rawdata</option>
                  </select>
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="val">data or link</label>
                  <input
                    type="text"
                    id="val"
                    onChange={valInputChangeHandler}
                    value={val}
                  />
                </div>
                <div>
                  <CompactPicker
                    color={color}
                    onChange={colorInputChangeHandler}
                  ></CompactPicker>
                </div>
                <br></br>
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

export default EditDataCard;

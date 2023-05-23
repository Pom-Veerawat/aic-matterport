import React, { useEffect, useState } from "react";
import classes from "./EditorMP.module.css";
import EditDataCard from "../UI/EditDataCard";
import ReactCardFlip from "react-card-flip";
import EditDataCardVDO from "../UI/EditDataCardVDO";

const EditorMP = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [linkOrigin, setLinkOrigin] = useState(
    "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/MatterTag/items/"
  );
  const [linkOriginVDO, setLinkOriginVDO] = useState(
    "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video/items/"
  );

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState("");
  const [dataVDO, setDataVDO] = useState([]);
  const [dataVDOFilter, setDataVDOFilter] = useState("");

  const [refreshVal, setRefreshVal] = useState(false);
  const [refreshValVDO, setRefreshValVDO] = useState(false);

  const passRemoveTagHandler = () => {
    props.refreshtag();
  };
  const passRemoveVDOHandler = () => {
    props.refreshVDO();
  };

  useEffect(() => {
    readDatafromjson();
    readDatafromjsonVDO();
  }, []);
  useEffect(() => {
    readDatafromjson();
  }, [refreshVal]);

  useEffect(() => {
    readDatafromjsonVDO();
  }, [refreshValVDO]);

  const readDatafromjson = () => {
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/MatterTag.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((dataJson) => {
        /*  const dataToPut = {
            color: { r: color.r, g: color.g, b: color.b },
            header: header,
            icon: iconTxt,
            id: id,
            type: type,
            val: val,
            enable: enable,
            position: position,
            normal: normal,
          }; */
        const arrGetData = [];
        for (const key in dataJson.items) {
          /*   console.log(`${key}: ${data.items[key]}`);
            console.log(data.items[key]); */
          arrGetData.push(dataJson.items[key]);
        }
        setData([]);
        setData([...arrGetData]);

        //console.log(data);
        //console.log(refreshVal);
      });
  };

  const readDatafromjsonVDO = () => {
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((dataJson) => {
        /*  const dataToPut = {
            color: { r: color.r, g: color.g, b: color.b },
            header: header,
            icon: iconTxt,
            id: id,
            type: type,
            val: val,
            enable: enable,
            position: position,
            normal: normal,
          }; */
        const arrGetData = [];
        for (const key in dataJson.items) {
          /*   console.log(`${key}: ${data.items[key]}`);
            console.log(data.items[key]); */
          arrGetData.push(dataJson.items[key]);
        }
        setDataVDO([]);
        setDataVDO([...arrGetData]);

        //console.log(data);
        //console.log(refreshVal);
      });
  };

  const onClickRefrsh = () => {
    setData([]);
    setRefreshVal((prev) => !prev);
    passRemoveTagHandler();
  };

  const onClickRefrshVDO = () => {
    setDataVDO([]);
    setRefreshValVDO((prev) => !prev);
    passRemoveVDOHandler();
  };

  const cardmap = data.map((val, idx) => {
    var tt = refreshVal;
    const searchheader = String(val["header"]);
    const searchval = String(val["val"]);

    if (dataFilter == "") {
      return (
        <EditDataCard
          key={val.id}
          link={linkOrigin + val.id + ".json"}
          color={val.color}
          header={val.header}
          iconTxt={val.icon}
          id={val.id}
          normal={val.normal}
          position={val.position}
          type={val.type}
          val={val.val}
          enable={val.enable}
        ></EditDataCard>
      );
    } else {
      if (searchheader.includes(dataFilter) || searchval.includes(dataFilter)) {
        return (
          <EditDataCard
            key={val.id}
            link={linkOrigin + val.id + ".json"}
            color={val.color}
            header={val.header}
            iconTxt={val.icon}
            id={val.id}
            normal={val.normal}
            position={val.position}
            type={val.type}
            val={val.val}
            enable={val.enable}
          ></EditDataCard>
        );
      }
    }
  });

  const cardmapVDO = dataVDO.map((val, idx) => {
    var tt = refreshVal;
    const searchheader = String(val["comment"]);
    const searchval = String(val["VDOurl"]);

    if (dataVDOFilter == "") {
      return (
        <EditDataCardVDO
          key={val.id}
          link={linkOriginVDO + val.id + ".json"}
          comment={val.comment}
          id={val.id}
          normal={val.normal}
          position={val.position}
          VDOurl={val.VDOurl}
          enable={val.enable}
          width={val.width}
          height={val.height}
        ></EditDataCardVDO>
      );
    } else {
      if (
        searchheader.includes(dataVDOFilter) ||
        searchval.includes(dataVDOFilter)
      ) {
        return (
          <EditDataCardVDO
            key={val.id}
            link={linkOriginVDO + val.id + ".json"}
            comment={val.comment}
            id={val.id}
            normal={val.normal}
            position={val.position}
            VDOurl={val.VDOurl}
            enable={val.enable}
            width={val.width}
            height={val.height}
          ></EditDataCardVDO>
        );
      }
    }
  });
  const searchInput1ChangeHandler = (event) => {
    setDataFilter(event.target.value);
  };
  const searchInput2ChangeHandler = (event) => {
    setDataVDOFilter(event.target.value);
  };
  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div style={{ backgroundColor: "red" }}>
          <button onClick={() => setIsFlipped((prev) => !prev)}>
            ไปยัง VDO setting
          </button>
          <br></br>
          ปรับค่าด้านล่างสำหรับ TAG
          <br></br>
          <button onClick={onClickRefrsh}>Refresh TAG</button>
          <br></br>
          <label htmlFor="search1">ค้นหา</label>
          <input
            type="text"
            id="search1"
            onChange={searchInput1ChangeHandler}
            value={dataFilter}
          />
          {cardmap}
          <br></br>
        </div>
        <div style={{ backgroundColor: "green" }}>
          <button onClick={() => setIsFlipped((prev) => !prev)}>
            ไปยัง TAG setting
          </button>
          <br></br>
          ปรับค่าด้านล่างสำหรับ VDO
          <br></br>
          <button onClick={onClickRefrshVDO}>Refresh VDO</button>
          <br></br>
          <label htmlFor="search2">ค้นหา</label>
          <input
            type="text"
            id="search2"
            onChange={searchInput2ChangeHandler}
            value={dataVDOFilter}
          />
          {cardmapVDO}
          <br></br>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default EditorMP;

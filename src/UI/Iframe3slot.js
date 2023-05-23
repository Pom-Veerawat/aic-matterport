import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./Iframe3slot.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <iframe style={{width:'33%',height:'95%'}} src={props.message1}>
          Your browser does not support inline frames.
        </iframe>
        <iframe style={{width:'33%',height:'95%'}} src={props.message2}>
          Your browser does not support inline frames.
        </iframe>
        <iframe style={{width:'33%',height:'95%'}} src={props.message3}>
          Your browser does not support inline frames.
        </iframe>
        {/* <p>{props.message}</p> */}
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>ตกลง</Button>
      </footer>
    </Card>
  );
};

const Iframe3slot = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message1={props.message1}
          message2={props.message2}
          message3={props.message3}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Iframe3slot;

import React, { useRef } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import classes from "./Mainpage.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../Store/auth-slice";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Mainpage = () => {
  const subjectRef = useRef();
  const mailRef = useRef();
  const textRef = useRef();
  const clickHandler = () => {
    const enteredSubject = subjectRef.current.value;
    const enteredMail = mailRef.current.value;
    const enteredText = textRef.current.innerText;
    const mail = enteredMail.replace(/@|\./g, "");
    const name = enteredMail.split("@")[0];

    fetch(
      "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" + mail + "/.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          subject: enteredSubject,
          mailBody: enteredText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <>
      <Container>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
          <Form.Control placeholder="Enter email address" ref={mailRef} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2 ">Subject</InputGroup.Text>
          <Form.Control placeholder="Subject" ref={subjectRef} />
        </InputGroup>
        <Editor
          editorRef={(ref) => (textRef.current = ref)}
          editorClassName={classes.editor}
          // toolbarClassName={classes.toolbar}
          editorStyle={{ height: "350px" }}
          toolbar={{
            options: ["inline", "blockType"],
          }}
        ></Editor>
        <Button onClick={clickHandler} className={classes.sendButton}>
          Send
        </Button>
      </Container>
    </>
  );
};

export default Mainpage;

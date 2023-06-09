import React, { Fragment, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import classes from "./Composepage.module.css";
import { Editor } from "react-draft-wysiwyg";
import NavItem from "../Header/Nav";
import { useNavigate } from "react-router";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useDispatch } from "react-redux";
import { mailAction } from "../../Store/mail-slice";
const Composepage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const subjectRef = useRef();
  const mailRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const clickHandler = () => {
    const enteredSubject = subjectRef.current.value;
    const enteredMail = mailRef.current.value;
    const enteredText = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const mail = enteredMail.replace(/@|\./g, "");
    const name = localStorage.getItem("email").split("@")[0];
    const sendData = async () => {
      try {
        const response = await fetch(
          "https://mail-box-2b4a6-default-rtdb.firebaseio.com/" +
            mail +
            "/.json",
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
        const newResponse = await fetch(
          "https://mail-box-2b4a6-default-rtdb.firebaseio.com/sent/" +
            name +
            "/.json",
          {
            method: "POST",
            body: JSON.stringify({
              To: enteredMail,
              subject: enteredSubject,
              mailBody: enteredText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok || !newResponse.ok) {
          throw new Error("Send email failed");
        }
        dispatch(mailAction.changeMailState());
        alert("Send email successfull");
        navigate("/inbox");
      } catch (error) {
        alert(error.message);
      }
    };
    sendData();
  };
  return (
    <Fragment>
      <NavItem />
      <br />
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
          editorState={editorState}
          editorClassName={classes.editor}
          editorStyle={{ height: "350px" }}
          toolbar={{
            options: ["inline", "blockType"],
          }}
          onEditorStateChange={onEditorStateChange}
        ></Editor>
        <Button onClick={clickHandler} className={classes.sendButton}>
          Send
        </Button>
      </Container>
    </Fragment>
  );
};

export default Composepage;

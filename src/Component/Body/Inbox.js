import React, { Fragment, useEffect, useState} from "react";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import classes from "./Inbox.module.css";
import NavItem from "../Header/Nav";
import {
  deleteMail,
  deleteSentMail,
  getAction,
  mailAction,
  sentMailItem,
  sentMailUpdate,
  update,
} from "../../Store/mail-slice";
const Inbox = () => {
  const [inbox, setInbox] = useState(true);
  const getMail = useSelector((state) => state.mail.getMail);
  const sentMail = useSelector((state) => state.mail.sentMail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const length = getMail.filter(
    (item) => item[1].userClicked !== true || item[1].userClicked === undefined
  ).length;

  useEffect(() => {
    console.log("running");
    dispatch(mailAction.resetMailDetail());
    setTimeout(() => {
      dispatch(getAction(localStorage.getItem("email")));
    }, 2000);
  }, [dispatch, getMail]);

  const composeHandler = () => {
    navigate("/mailbox");
  };

  const handleClick = (event, key) => {
    dispatch(update(key));
    navigate("/inbox/" + key);
  };
  const sentItemClickHandler = (event, key) => {
    dispatch(sentMailUpdate(key));
    navigate("/inbox/" + key);
  };
  const deleteHandler = (event, key) => {
    dispatch(mailAction.changeMailState());
    dispatch(deleteMail(key));
  };
  const deleteSentMailHandler = (event, key) => {
    dispatch(deleteSentMail(key));
  };
  const inboxHandler = () => {
    setInbox(true);
    dispatch(getAction(localStorage.getItem("email")));
  };
  const sentHandler = () => {
    dispatch(sentMailItem()); // sent message request handler
    setInbox(false);
  };
  const listItems = getMail.map((item) => {
    return (
      <ListGroup.Item key={item[0]}>
        <Container>
          <Row>
            <Col>
              <div
                style={{ display: "flex" }}
                onClick={(event) => handleClick(event.target, item[0])}
              >
                {!item[1].userClicked && <div className={classes.dot}></div>}
                {item[1].userClicked && <div className={classes.dot1}></div>}
                <Col lg={3} sm={3}>
                  <strong>{item[1].name} </strong>
                </Col>
                <Col lg={8} sm={7}>
                  <em>{item[1].subject}</em>
                </Col>
              </div>
            </Col>
            <Col lg={1} sm={2}>
              <Button
                variant="outline-danger"
                onClick={(event) => deleteHandler(event.target, item[0])}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  });
  const sentItems = sentMail.map((item) => {
    return (
      <ListGroup.Item key={item[0]}>
        <Container>
          <Row>
            <Col>
              <div
                style={{ display: "flex" }}
                onClick={(event) => sentItemClickHandler(event.target, item[0])}
              >
                <Col lg={3} sm={3}>
                  <strong>
                    <em>To : </em>
                    {item[1].To}
                  </strong>
                </Col>
                <Col lg={8} sm={7}>
                  <em>{item[1].subject}</em>
                </Col>
              </div>
            </Col>
            <Col lg={1} sm={2}>
              <Button
                variant="outline-danger"
                onClick={(event) =>
                  deleteSentMailHandler(event.target, item[0])
                }
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  });
  return (
    <Fragment>
      <NavItem />

      <Container className={classes.container} fluid>
        <Row>
          <Col className={classes.col1} lg={2} sm={3}>
            <Button onClick={composeHandler}>Compose</Button>
            <br />
            <br />
            <ToggleButtonGroup
              type="radio"
              vertical
              name="options"
              defaultValue={1}
              style={{ width: "100%" }}
            >
              <ToggleButton
                id="tbg-radio-1"
                variant="info"
                onClick={inboxHandler}
                value={1}
              >
                Inbox <Badge pill>{length}</Badge>
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" variant="info" value={2}>
                Draft
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-3"
                variant="info"
                onClick={sentHandler}
                value={3}
              >
                Sent
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col className={classes.col2} lg={10} sm={9}>
            {inbox && <ListGroup>{listItems}</ListGroup>}
            {!inbox && <ListGroup>{sentItems}</ListGroup>}
            {!inbox && sentMail.length === 0 && (
              <p>You have not send any messages</p>
            )}
            {inbox && getMail.length === 0 && <p>No Messages Present</p>}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Inbox;

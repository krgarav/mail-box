import React, { Fragment, useEffect, useState, useMemo } from "react";
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
  getAction,
  mailAction,
  sentMailItem,
  sentMailUpdate,
  update,
} from "../../Store/mail-slice";
import { isEqual } from "lodash";
let first = true;
let newMail = [];
const Inbox = () => {
  const [trigerred, setTrigered] = useState(false);
  const [inbox, setInbox] = useState(true);
  const mailState = useSelector((state) => state.mail.mailState);
  const getMail = useSelector((state) => state.mail.getMail);
  const sentMail = useSelector((state) => state.mail.sentMail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const length = getMail.filter(
    (item) => item[1].userClicked !== true || item[1].userClicked === undefined
  ).length;

  useEffect(() => {
    dispatch(mailAction.resetMailDetail());
    if (newMail.length === 0) {
      newMail = [...getMail];
    }
    if (first) {
      dispatch(getAction(localStorage.getItem("email")));
      first = false;
    } else {
      if (!isEqual(newMail, getMail) === true) {
        dispatch(getAction(localStorage.getItem("email"))); //changing state of getmail
        newMail = [...getMail];
        return;
      } else {
        return;
      }
    }
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
    setTrigered((prev) => !prev);
    dispatch(mailAction.changeMailState());
    dispatch(deleteMail(key));
  };
  const inboxHandler = () => {
    setInbox(true);
    dispatch(getAction(localStorage.getItem("email")));
  };
  const sentHandler = () => {
    dispatch(sentMailItem());

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
                {/* {!item[1].userClicked && <div className={classes.dot}></div>}
                {item[1].userClicked && <div className={classes.dot1}></div>} */}
                <Col lg={3} sm={3}>
                  <strong>
                    <em>To : </em>
                    {item[1].To}{" "}
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Inbox;

import React, { Fragment, useEffect } from "react";
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
import { getAction } from "../../Store/mail-slice";
const Inbox = () => {
  const getMail = useSelector((state) => state.mail.getMail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let length = getMail.length;
  useEffect(() => {
    dispatch(getAction(localStorage.getItem("email")));
  }, [dispatch, getMail]);
  const composeHandler = () => {
    navigate("/mailbox");
  };

  const handleClick = (event,key) => {
    // console.log(event);
    // console.log("key index: ", key);
    navigate("/inbox/" + key);
  };
  const deleteHandler = () => {
    console.log("clicked");
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
                <Col lg={3} sm={3}>
                  <strong>{item[1].name} </strong>
                </Col>
                <Col lg={8} sm={7}>
                  <em>{item[1].subject}</em>
                </Col>
              </div>
            </Col>
            <Col lg={1} sm={2}>
              <Button variant="outline-danger" onClick={deleteHandler}>
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

      <Container fluid>
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
              <ToggleButton id="tbg-radio-1" variant="info" value={1}>
                Inbox <Badge>{length}</Badge>
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" variant="info" value={2}>
                Draft
              </ToggleButton>
              <ToggleButton id="tbg-radio-3" variant="info" value={3}>
                Sent
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col className={classes.col2} lg={10} sm={9}>
            <ListGroup>{listItems}</ListGroup>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Inbox;

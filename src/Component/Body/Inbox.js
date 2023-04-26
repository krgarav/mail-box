import React, { Fragment, useEffect } from "react";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../Store/auth-slice";
import { useNavigate } from "react-router";
import classes from "./Inbox.module.css";
import NavItem from "../Header/Nav";
import { getAction } from "../../Store/mail-slice";
const Inbox = () => {
  const getMail = useSelector((state) => state.mail.getMail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAction(localStorage.getItem("email")));
  }, []);
  const composeHandler = () => {
    navigate("/mailbox");
  };
  console.log(getMail);
  const listItems = getMail.map((item) => {
    return (
      <ListGroup.Item key={item.subject}>
        <Container>
          <Row>
            <Col lg={3} sm={3}>
              <strong>{item.name} </strong>
            </Col>
            <Col lg={8} sm={7}>
              <em>{item.subject}</em>
            </Col>
            <Col lg={1} sm={2}>
              <Button variant="outline-danger">Delete</Button>
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

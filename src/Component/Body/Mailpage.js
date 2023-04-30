import React, { Fragment } from "react";
import NavItem from "../Header/Nav";
import { useSelector } from "react-redux";

import { Markup } from "interweave";
import { Container, Spinner } from "react-bootstrap";
import classes from "./Mailpage.module.css";
const Mailpage = () => {
  const mailDetail = useSelector((state) => state.mail.mailDetail);
  return (
    <Fragment>
      <NavItem />
      <br />
      {mailDetail.length === undefined && (
        <Container>
          {mailDetail.To && <h3>To : {mailDetail.To}</h3>}
          {mailDetail.name && <h3>Sender : {mailDetail.name}</h3>}
          <br />
          <strong>
            Subject : <em>{mailDetail.subject}</em>
          </strong>
          <br />
          <br />
          <div className={classes.container}>
            <Markup content={mailDetail.mailBody} />{" "}
          </div>
        </Container>
      )}
      {mailDetail.length === 0 && (
        <div>
          Loading... <Spinner />
        </div>
      )}
    </Fragment>
  );
};
export default Mailpage;

import React, { Fragment, useEffect } from "react";
import NavItem from "../Header/Nav";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMailDetail } from "../../Store/mail-slice";
import { Markup } from "interweave";
import { Container, Spinner } from "react-bootstrap";
import classes from "./Mailpage.module.css";
const Mailpage = () => {
  const mailDetail = useSelector((state) => state.mail.mailDetail);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMailDetail(params.item));
  }, [dispatch, params.item]);
  const path = window.location.pathname.split("/")[2] === params.item;

  return (
    <Fragment>
      <NavItem />
      <br />
      {mailDetail.length === undefined && (
        <Container>
          <h3>Sender : {mailDetail.name}</h3>
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
        <p>
          Loading... <Spinner />
        </p>
      )}
    </Fragment>
  );
};
export default Mailpage;

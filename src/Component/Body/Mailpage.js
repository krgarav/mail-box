import React, { Fragment, useEffect } from "react";
import NavItem from "../Header/Nav";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMailDetail } from "../../Store/mail-slice";
import { Markup } from "interweave";
import { Container } from "react-bootstrap";
let first = false;
const Mailpage = () => {
  const mailDetail = useSelector((state) => state.mail.mailDetail);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMailDetail(params.item));
  }, [dispatch, params.item]);
  const path = window.location.pathname.split("/")[2] === params.item;
  // console.log(window.location.pathname.split("/")[2]);
 
  return (
    <Fragment>
      <NavItem />
      {path && (
        <Container>
          <h3>{mailDetail.name}</h3>
          <p>{mailDetail.subject}</p>
          <Markup content={mailDetail.mailBody} />
        </Container>
      )}
      {!path&&<p>Loading...</p>}
    </Fragment>
  );
};
export default Mailpage;

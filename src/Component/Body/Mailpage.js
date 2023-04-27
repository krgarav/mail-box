import React, { Fragment, useEffect } from "react";
import NavItem from "../Header/Nav";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMailDetail } from "../../Store/mail-slice";
import { Markup } from "interweave";
import { Container } from "react-bootstrap";

const Mailpage = () => {
  const mailDetail = useSelector((state) => state.mail.mailDetail);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMailDetail(params.item));
  }, [dispatch, params.item]);

  return (
    <Fragment>
      <NavItem />
      <Container>
        <h3>{mailDetail.name}</h3>
        <p>{mailDetail.subject}</p>
        <Markup content={mailDetail.mailBody} />
      </Container>
    </Fragment>
  );
};
export default Mailpage;

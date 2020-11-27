import React, { Fragment, useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import MediaCard from "../../../custom/MediaCard";
import IdentityCertificate from "./IdentityCertificate";
import PropTypes from "prop-types";

function CreateOrder(props) {
  const { selectSubscription } = props;

  useEffect(selectSubscription, [selectSubscription]);

  const [openIdentityDialog, setOpenIdentityDialog] = useState(false);
  const identityCertificateRef = useRef();

  const handleOpenDialog = () => {
    console.log("called");
    setOpenIdentityDialog(true);
  };

  const handleSubmit = () => {
    console.log(identityCertificateRef.getState());
  };

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} key={"identityCard"}>
          <MediaCard
            imageUrl={"/public/images/identityCard.png"}
            title={"نرجمه شناسنامه"}
            onClick={handleOpenDialog}
            secondaryTitle={"نرجمه شناسنامه"}
          />
          <IdentityCertificate
            ref={identityCertificateRef}
            onClose={() => {}}
            onSubmit={handleSubmit}
            open={openIdentityDialog}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default CreateOrder;

CreateOrder.propTypes = {
  selectSubscription: PropTypes.func.isRequired
};

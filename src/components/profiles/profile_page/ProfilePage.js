import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import useFirestoreDoc from "./../../../hooks/useFirestoreDoc";
import { getUserProfile } from "../../../firestore/firestoreService";
//import { LISTEN_TO_CURRENT_USER_PROFILE } from "../../../store/actionTypes";
import { listenToSelectedtUserProfile } from "../../../store/actions/profileActions";
import LoadingComponent from "../../../utils/LoadingComponent";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile); // name in root reducer
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    //data: profile => dispatch({type: LISTEN_TO_CURRENT_USER_PROFILE, payload: profile})
    data: (profile) => dispatch(listenToSelectedtUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content="Loading profile..." />;
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
}

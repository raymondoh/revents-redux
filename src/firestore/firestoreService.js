import cuid from "cuid";
import firebase from "../config/firebaseConfig"; // config file

// DB REFERENCES
const db = firebase.firestore();

// Listen with id
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  // get JS date
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

// Listen to data all events
export function listenToEventsFromFirestore() {
  return db.collection("events").orderBy("date");
}

// listen to one event
export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

// add event to firestore
export function addEventToFirestore(event) {
  return db.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/50.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/50.jpg",
    }),
  });
}

// update event in firestore
export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

// delete event in firestore
export function deleteEventInFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

// cancel event
export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

// set user profile f=data
export function setUserProfileData(user) {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

// get userProfile
export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

// update user profile
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
      console.log("USER", user);
    }
    console.log("USER", user);
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

// update user profile photo
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
      return await db
        .collection("users")
        .doc(user.uid)
        .collection("photos")
        .add({
          name: filename,
          url: downloadURL,
        });
    }
  } catch (error) {
    //throw error;
    console.log(error);
  }
}
// get user photos
export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

// set main photo
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

// delete photo
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

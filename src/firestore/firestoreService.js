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

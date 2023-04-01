import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB42rQ2zTwoaVVZOEuu_A5-V0rztXcuj90",
  authDomain: "fee-portral.firebaseapp.com",
  projectId: "fee-portral",
  storageBucket: "fee-portral.appspot.com",
  messagingSenderId: "173545797532",
  appId: "1:173545797532:web:7b22b6569d3409d1237a59",
  measurementId: "G-XW0BGD6EWY",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "students", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {
      firstName,
      lastName,
      rollNumber,
      departmentName,
      password,
      email,
      isFeePaid,
    } = userAuth;
    const department = additionalInformation.departmentName.toString();
    console.log(department);
    const createdAt = new Date();

    //Getting fee from departments collection
    const departmentsRef = collection(db, "departments");
    const departmentsSnapshot = await getDocs(departmentsRef);

    let departmentData = null;
    departmentsSnapshot.forEach((doc) => {
      if (doc.data().departmentName === department) {
        departmentData = doc.data();
      }
    });
    if (departmentData) {
      const departmentFee = departmentData.fee;
      const feePaid = 0;
      const feeLeft = departmentFee - feePaid;

      try {
        await setDoc(userDocRef, {
          firstName,
          lastName,
          rollNumber,
          departmentName,
          password,
          email,
          departmentFee,
          isFeePaid,
          feePaid,
          feeLeft,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.error("Error creating user document: ", error);
      }
    } else {
      alert("User not created");
      console.error("Department not found!");
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const fetchStudent = async (userId) => {
  const userRef = doc(db, "students", userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  return userData;
};

// To fetch Notifications

export const fetchNotifications = async (limitNum) => {
  try {
    const q = query(collection(db, 'notifications'), limit(limitNum));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

/*
  apiKey: "AIzaSyB42rQ2zTwoaVVZOEuu_A5-V0rztXcuj90",
  authDomain: "fee-portral.firebaseapp.com",
  projectId: "fee-portral",
  storageBucket: "fee-portral.appspot.com",
  messagingSenderId: "173545797532",
  appId: "1:173545797532:web:7b22b6569d3409d1237a59",
  measurementId: "G-XW0BGD6EWY",
*/

// catch (error) {
//   console.log("error creating the user", error.message);
// }

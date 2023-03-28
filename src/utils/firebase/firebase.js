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
  where,
  getDocs,
  collection,
  query,
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
    const { firstname, lastname, rollNumber, departmentName, password, email } =
      userAuth;
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
      try {
        await setDoc(userDocRef, {
          firstname,
          lastname,
          rollNumber,
          departmentName,
          password,
          email,
          departmentFee,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.error("Error creating user document: ", error);
      }
    } else {
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

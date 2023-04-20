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
  addDoc,
  limit,
  orderBy,
  where,
  updateDoc,
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

// eslint-disable-next-line no-unused-vars
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
    const { firstName, lastName, rollNumber, departmentName, password, email } =
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
      const feePaid = 0;
      const feeDue = departmentFee - feePaid;
      let isFeePaid = false;
      if (feeDue === 0) {
        isFeePaid = true;
      }

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
          feeDue,
          
          createdAt,
          ...additionalInformation,
        });
        console.log("user registration complete");
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

export const fetchUser = async (userId) => {
  const userRef = doc(db, "students", userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  return userData;
};

export const fetchAdmin = async (userId) => {
  const adminRef = doc(db, "admin", userId);
  const adminDoc = await getDoc(adminRef);
  const userData = adminDoc.data();
  return userData;
};
// To fetch Notifications

export const fetchNotifications = async (limitNum) => {
  try {
    const q = query(
      collection(db, "notifications"),
      limit(limitNum),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

// To fetch all students

export const fetchStudents = async (limitNum) => {
  try {
    if (limitNum === 0) {
      const q = query(collection(db, "students"), orderBy("rollNumber"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } else {
      const q = query(
        collection(db, "students"),
        limit(limitNum),
        orderBy("rollNumber")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// To get selected student UID

export const getStudentByEmail = async (email) => {
  try {
    const q = query(collection(db, "students"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    } else {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
  } catch (error) {
    console.error("Error retrieving student data:", error);
    return null;
  }
};

// Get current user's UID
export const getCurrentUserUid = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  return currentUser ? currentUser.uid : null;
};

// To check Role

export const checkUserRole = async (uid) => {
  const adminRef = doc(collection(db, "admin"), `${uid}`);
  const userRef = doc(collection(db, "students"), `${uid}`);

  const adminDoc = await getDoc(adminRef);
  if (adminDoc.exists()) {
    return "admin";
  } else {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return "user";
    } else {
      return "not found";
    }
  }
};

// To add Notification

export const addNotification = async (notification) => {
  try {
    // Convert the string date to a Date object
    const dateObj = new Date(notification.date);

    // Add the notification to Firestore
    const docRef = await addDoc(collection(db, "notifications"), {
      date: dateObj,
      notificationNumber: notification.notificationNumber,
      message: notification.message,
    });
    console.log("Notification added to Firestore with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding notification to Firestore: ", error);
  }
};

// To Add Student

export const addStudent = async (studentData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    rollNumber,
    departmentName,
    feePaid,
  } = studentData;

  const departmentsRef = collection(db, "departments");
  const departmentsSnapshot = await getDocs(departmentsRef);
  const createdAt = new Date();

  let departmentData = null;
  departmentsSnapshot.forEach((doc) => {
    if (doc.data().departmentName === departmentName) {
      departmentData = doc.data();
    }
  });
  try {
    if (departmentData) {
      const departmentFee = departmentData.fee;
      const feeDue = departmentFee - studentData.feePaid;
      let isFeePaid = false;
      if (feeDue === 0) {
        isFeePaid = true;
      }
      // Add the form data to Firestore
      const docRef = await addDoc(collection(db, "students"), {
        firstName,
        lastName,
        email,
        password,
        rollNumber,
        departmentName,
        feePaid: parseInt(feePaid),
        departmentFee,
        isFeePaid,
        feeDue,
        createdAt,
      });
      console.log("Document written with ID: ", docRef.id);
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

// export const addStudent = async (studentData) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     rollNumber,
//     departmentName,
//     feePaid,
//   } = studentData;

//   const departmentsRef = collection(db, "departments");
//   const departmentsSnapshot = await getDocs(departmentsRef);
//   const createdAt = new Date();

//   let departmentData = null;
//   departmentsSnapshot.forEach((doc) => {
//     if (doc.data().departmentName === departmentName) {
//       departmentData = doc.data();
//     }
//   });

//   try {
//     if (departmentData) {
//       const departmentFee = departmentData.fee;
//       const feeDue = departmentFee - studentData.feePaid;
//       let isFeePaid = false;
//       if (feeDue === 0) {
//         isFeePaid = true;
//       }

//       const studentRef = doc(db, "students", email);
//       await runTransaction(db, async (transaction) => {
//         const studentDoc = await transaction.get(studentRef);
//         if (!studentDoc.exists()) {
//           // Create a new user account in Firebase Authentication
//           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//           const { uid } = userCredential.user;

//           // Add the student data to Firestore with the same UID
//           await setDoc(studentRef, {
//             firstName,
//             lastName,
//             rollNumber,
//             departmentName,
//             feePaid: parseInt(feePaid),
//             departmentFee,
//             isFeePaid,
//             feeDue,
//             createdAt,
//             uid,
//           });

//           console.log("Student data added to Firestore with UID:", uid);
//         } else {
//           throw new Error("User already exists");
//         }
//       });
//     } else {
//       console.error("No such document!");
//     }
//   } catch (error) {
//     console.error("Error adding student:", error);
//   }
// };




// To Fetch Departments

export const fetchDepartments = async () => {
  try {
    const q = query(collection(db, "departments"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

// To Update the fee

export const updateFee = async (departmentName, newFee) => {
  const departmentsRef = collection(db, "departments");
  const departmentQuery = query(
    departmentsRef,
    where("departmentName", "==", departmentName)
  );

  try {
    const departmentSnapshot = await getDocs(departmentQuery);

    if (departmentSnapshot.size === 0) {
      console.log(`No department found with name ${departmentName}`);
      return;
    }

    const departmentDoc = doc(db, "departments", departmentSnapshot.docs[0].id);

    await updateDoc(departmentDoc, { fee: newFee });
    console.log(`Fee for department ${departmentName} updated successfully!`);
  } catch (error) {
    console.error(
      `Error updating fee for department ${departmentName}:`,
      error
    );
  }
};

// To Add Department
export const addDepartment = async (departmentName, fee) => {
  try {
    const docRef = await addDoc(collection(db, "departments"), {
      departmentName,
      fee,
    });
    console.log("Department added with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding department to Firebase:", error);
    return false;
  }
};

// To Update student Fee

export const updateStudentFeeDue = async (studentId, amountPaid) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    const studentDoc = await getDoc(studentRef);
    const currentFeeDue = studentDoc.data().feeDue;
    const newFeeDue = currentFeeDue - amountPaid;

    let feePaid = studentDoc.data().feePaid || 0;
    feePaid += amountPaid;

    let isFeePaid = false;
    if (newFeeDue <= 0) {
      isFeePaid = true;
    }

    await updateDoc(studentRef, {
      feeDue: newFeeDue >= 0 ? newFeeDue : 0,
      feePaid: feePaid,
      isFeePaid: isFeePaid
    });

    console.log('FeeDue, feePaid, and isFeePaid fields updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating fields: ', error);
    return false;
  }
}




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

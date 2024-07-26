import { getDocs, orderBy, query, where } from "firebase/firestore";
import { db, collection, addDoc } from "../firebase";

export const sendMessage = async (data, callback) => {
  try {
    await addDoc(collection(db, "messages"), data);
    callback({ status: true, message: "success" });
  } catch (e) {
    callback({ status: false, message: "error" });
    console.error("Error adding document: ", e);
  }
};

export const getMessages = async (idMessage, callback) => {
  try {
    const q = query(
      collection(db, "messages"),
      where("id_message", "==", idMessage),
      where("deleted_at", "==", null),
      orderBy("date_created", "desc")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
    // return data;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

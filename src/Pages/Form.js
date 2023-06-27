import { push, ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";

import { database, storage } from "../firebase";
import { useState } from "react";

const DB_STUDENTS_KEY = "students";
const STORAGE_STUDENTS_KEY = "students/";

export default function Form() {
  const [name, setName] = useState("");
  const [fileInputFile, setFileInputFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");

  const writeData = () => {
    const studentListRef = databaseRef(database, DB_STUDENTS_KEY);
    const newStudentRef = push(studentListRef);

    console.log(fileInputFile);

    const storageRefInstance = storageRef(
      storage,
      STORAGE_STUDENTS_KEY + fileInputFile.name
    );
    // 1
    uploadBytes(storageRefInstance, fileInputFile).then((snapshot) => {
      console.log(snapshot);
      console.log("uploaded image");
      //2
      getDownloadURL(storageRefInstance).then((url) => {
        console.log(url);
        console.log(storageRefInstance._location.path_);
        // console.log("submission:", user);
        // 3
        set(newStudentRef, {
          name: name,
          date: new Date().toLocaleString(),
          url: url,
          ref: String(storageRefInstance),
          // user: user.email,
        });

        setName("");
        setFileInputFile(null);
        setFileInputValue("");
      });
    });
  };

  return (
    <div>
      <p>Form</p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Add a name here"
      />

      <input
        type="file"
        value={fileInputValue}
        onChange={(e) => {
          setFileInputFile(e.target.files[0]);
          setFileInputValue(e.target.value);
        }}
        placeholder="add file here"
      />
      <button onClick={writeData}>Send</button>
    </div>
  );
}

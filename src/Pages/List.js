import {
  onChildAdded,
  ref as databaseRef,
  remove,
  onChildRemoved,
} from "firebase/database";
import { database, storage } from "../firebase";
import { deleteObject, ref as storageRef } from "firebase/storage";

import { useState, useEffect } from "react";

const DB_STUDENTS_KEY = "students";

export default function List() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentsRef = databaseRef(database, DB_STUDENTS_KEY);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(studentsRef, (data) => {
      console.log(data);
      setStudents((prevState) => [
        ...prevState,
        { key: data.key, val: data.val() },
      ]);
    });

    onChildRemoved(studentsRef, (data) => {
      let StudentArray = [...students];
      let NewStudentArray = StudentArray.filter(
        (item) => item.key !== data.key
      );
      setStudents(NewStudentArray);
    });
  }, []);

  let studentListItems = students.map((student) => (
    <div key={student.key}>
      <h3>
        {student.val.date}- {student.val.name}
      </h3>
      <div>
        <h4>{student.val.user}</h4>
        <img
          style={{ height: "50vh" }}
          src={student.val.url}
          alt={student.val.name}
        />
        <br />
        <button
          onClick={(e) => {
            // delete the image stored in storage
            const ImageToDeleteRef = storageRef(storage, student.val.ref);

            deleteObject(ImageToDeleteRef).then(() => console.log("deleted?"));

            // delete the entry wihtin the real time database.
            const itemToDelete = databaseRef(
              database,
              "students/" + student.key
            );

            remove(itemToDelete).then(() => console.log("success"));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <p>List</p>
      {studentListItems}
    </div>
  );
}

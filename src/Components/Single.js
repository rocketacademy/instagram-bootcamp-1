import { useParams } from "react-router-dom";

export default function Single(props) {
  let param = useParams();
  console.log(param);
  return (
    <div>
      <div key={props.student.key}>
        <h2>Single - {param.studentID}</h2>
        <h3>
          {props.student.val.date}- {props.student.val.name}
        </h3>
        <div>
          <h4>{props.student.val.user}</h4>
          <img
            style={{ height: "50vh" }}
            src={props.student.val.url}
            alt={props.student.val.name}
          />
        </div>
      </div>
    </div>
  );
}

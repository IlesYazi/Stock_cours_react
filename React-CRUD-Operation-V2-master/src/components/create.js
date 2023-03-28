import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Create() {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  console.log(checkbox);
  const postData = () => {
    axios
      .post(`http://localhost:3004/posts`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        history.push("/read");
      });
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Objet</label>
          <input
            placeholder="Objet"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Rayon</label>
          <input
            placeholder="Rayon"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Est-il en stock ?"
            onChange={(e) => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

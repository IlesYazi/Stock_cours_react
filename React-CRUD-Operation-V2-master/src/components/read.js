import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [dbbTaille, setDbbTaille] = useState();
  const [bouttonNextDisable, setBouttonNextDisable] = useState();
  const [checkboxLike, setCheckboxLike] = useState();
  const [txtBoutonLike, setTxtBoutonLike] = useState();
  const [page, setPage] = useState(1);

  const dbb = axios.get(`http://localhost:3004/posts`).then((response) => {
    setDbbTaille(response.data.length);
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3004/posts?_page=1&_limit=2`)
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };

  const getData = (e, p) => {
    axios
      .get(`http://localhost:3004/posts?q=${e}&_page=${p}&_limit=2`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3004/posts/${id}`).then(() => {
      getData();
    });
  };

  const checkboxValue = (id) => {
    axios.get(`http://localhost:3004/posts/${id}`).then((data) => {
      if (data.data.checkbox === false) {
        console.log("checkboxValue ::::", data.data.checkbox);
        setCheckboxLike(true);
        getData(searchTxt, page);
        setTxtBoutonLike("Dislike");
      } else {
        //(data.data.checkbox === true)
        setCheckboxLike(false);
        getData(searchTxt, page);
        setTxtBoutonLike("Like");
      }
    });
  };

  const majDataStock = (id) => {
    checkboxValue(id);
    axios.patch(`http://localhost:3004/posts/${id}`, {
      checkbox: checkboxLike,
    });
    getData(searchTxt, page);
    console.log("dacheckboxValuens le checkboxValue : ", checkboxLike);
    console.log("dans le majDataStock : ");
  };

  const prevPage = () => {
    getData(searchTxt, page - 1);
    setPage(page - 1);
    setBouttonNextDisable(false);
    if (page < 2) {
      getData(searchTxt, 1);
      setPage(1);
    }
    console.log("Numero de page : ", page);
  };

  const nextPage = () => {
    getData(searchTxt, page + 1);
    setPage(page + 1);
    if (page > dbbTaille / 2 - 1) {
      setBouttonNextDisable(true);
      // getData(searchTxt, 1);
      // setPage(1);
    }
    console.log("Numero de page : ", page);
  };

  return (
    <div>
      <div class="ui icon input">
        <input
          type="text"
          placeholder="Search..."
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <i aria-hidden="true" class="search icon"></i>
      </div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Props</Table.HeaderCell>
            <Table.HeaderCell>Rayon</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete Props</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.filter((data) => {
            return searchTxt.toLowerCase() === ""
              ? data
              : data.firstName.toLowerCase().includes(searchTxt);
          }).map((data) => {
            return (
              <Table.Row>
                {/* <Table.Cell><img src={data.image}/></Table.Cell> */}
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell positive>
                  {data.checkbox ? "En stock" : "Pas de stock"}
                </Table.Cell>
                <Table.Cell>
                  <div
                    class="ui right labeled button"
                    role="button"
                    tabindex="0"
                  >
                    <button
                      onClick={() => majDataStock(data.id)}
                      class="ui icon green button"
                    >
                      <i aria-hidden="true" class="heart icon"></i>
                      {/* {txtBoutonLike} */}
                      Like
                    </button>
                  </div>
                </Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div class="ui buttons">
        <button
          onClick={() => console.log("Boutton prev") & prevPage()}
          class="ui button"
        >
          Prev
        </button>
        <div class="or" data-text={page}></div>
        <button
          disabled={bouttonNextDisable}
          onClick={() =>
            console.log("Boutton next") &
            nextPage() &
            console.log("dbb ?? :", dbbTaille, dbb)
          }
          class="ui positive button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

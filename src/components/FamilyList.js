import { useEffect, useState } from "react";
import { Card, CardDeck, Col, Container, Jumbotron, Row } from "react-bootstrap";
import FamilyMember from "./FamilyMember";

import axios from "axios";

function FamilyList() {

  useEffect(() => {
    refresh();
  }, [])
  const [formData, setFormData] = useState([]);

  const addOrEdit = (formData, onSuccess) => {
    console.log("reached form submission function")
    if (parseInt(formData.get('familyId')) === 0) {
      familyApi().create(formData)
        .then(res => {
          console.log(res.data)
          onSuccess()
        }).catch(err => console.log(err.response))
    }
    else {
      familyApi().update(formData.get('familyId'))
        .then(res => {
          console.log(res.data)
          onSuccess()
        }).catch(err => console.log(err.response))
    }

  };

  const familyApi = (url = "https://localhost:44330/api/FamilyImageViewer/") => {
    return {
      fetchAll: () => axios.get(url),
      create: newMember => axios.post(url, newMember),
      update: (id, updateMember) => axios.put(url + id.updateMember),
      delete: id => axios.delete(url + id)
    }

      ;
  }

  let dataSet = [{ "familyId": 1, "familyFirstName": "john", "familyLastName": "doe", "birthDate": "1998-10-02T00:00:00", "relation": "brother", "quote": "\"hello this is a test\"", "imageName": null, "imageFile": null }, { "familyId": 1, "familyFirstName": "john", "familyLastName": "doe", "birthDate": "1998-10-02T00:00:00", "relation": "brother", "quote": "\"hello this is a test\"", "imageName": null, "imageFile": null }];
  function refresh() { console.log('refresh function hit'); familyApi().fetchAll().then(res => dataSet = res.data).catch(err => console.log(err.data)); }






  const listOfMembers = () =>
    dataSet.map((x, i) => {
      return (




        <Col xs={6} key={i}>
          <Card border="light"  >
            <div className="card-content">
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title> {x.familyFirstName} {x.familyLastName}</Card.Title>
                <Card.Text>
                  {x.quote}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{x.relation}</small>

              </Card.Footer>
            </div>
            <div className="deleteOrEdit" > <i className=" text-secondary fas fa-edit"></i><i className=" text-secondary ml-2 far fa-trash-alt"></i></div>

          </Card>
        </Col>
      );
    });

  return (
    <>

      <Col xs={12}>
        <Jumbotron className="mt-3 bg-light " fluid>
          <Container>
            <div className="display-4">React Album</div>
          </Container>
        </Jumbotron>
      </Col>
      <Col xs={4}>
        <FamilyMember addOrEdit={addOrEdit} />
      </Col>
      <Col className=" form" xs={8}>
        <h4>Members</h4>
        <hr></hr>

        <Row>
          {listOfMembers()}
        </Row>

      </Col>
    </>
  );
}

export default FamilyList;

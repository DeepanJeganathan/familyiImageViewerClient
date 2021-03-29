import { useEffect, useState } from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import FamilyMember from "./FamilyMember";

import axios from "axios";

function FamilyList() {
  const [formData, setFormData] = useState([]);


  const addOrEdit = (formData, onSuccess) => {
    console.log("reached form submission function")

    if(formData.familyId===0){
    familyApi().create(formData)
      .then(res => {
        console.log(res.data)
        onSuccess()
      }).catch(err => console.log(err.response))
    }
    else{
      familyApi().put(formData.familyId)
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


  }

  useEffect(() => { }, [formData]);

  const listOfMembers = () =>
    formData.map((x, i) => {
      return (
        <Col key={i} xs={4}>
          <div >
            <img alt={x.imageName}
              style={{ width: "100%", height: "100%" }}
              src={x.imageSrc}
            ></img>
            {x.familyFirstName}
          </div>
        </Col>
      );
    });

  return (
    <>

      <Col xs={12}>
        <Jumbotron className="mt-3 bg-light" fluid>
          <Container>
            

          </Container>
        </Jumbotron>
      </Col>
      <Col xs={4}>
        <FamilyMember addOrEdit={addOrEdit} />
      </Col>
      <Col className="bg-light" xs={8}>
        <div className="display-4">family members</div>
        <hr></hr>
        <Row>{listOfMembers()}</Row>
      </Col>
    </>
  );
}

export default FamilyList;

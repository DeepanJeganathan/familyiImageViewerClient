import { useEffect, useState } from "react";
import { Card,  Col, Container, Jumbotron, Row } from "react-bootstrap";
import FamilyMember from "./FamilyMember";

import axios from "axios";

function FamilyList() {
  const [formData, setFormData] = useState([]);
  const [updateData, setUpdateData]= useState(null);

  useEffect(() => { refresh()
 
  }, [])



  const addOrEdit = (form, onSuccess) => {
    if (form.get('familyId') === "0") {
      familyApi().create(form)
        .then(res => {
          console.log("reached create")
          refresh();
          onSuccess();
        }).catch(err => console.log(err.response))
    }
    else {    
      console.log(parseInt(form.get('familyId')));
      familyApi().update(form.get('familyId'),form)
        .then(res => {
          console.log("reached update")
          refresh();
          onSuccess()
        }).catch(err => console.log(err.response))
    }

  };

  //url = "http://localhost:44330/api/FamilyImageViewer/"
  const familyApi = (url = "http://localhost:52046/api/FamilyImageViewer/") => {
    return {
      fetchAll: () => axios.get(url),
      create: newMember => axios.post(url, newMember),
      update: (id, updateMember) => axios.put(url + id),
      delete: id => axios.delete(url + id)
    }
      ;
  }


  function refresh()
   { 
    familyApi().fetchAll()
   .then(res => setFormData(res.data))
   .catch(err => console.log(err.data)) 
  }

function HandleEdit(x){
  axios.get("http://localhost:52046/api/FamilyImageViewer/"+ x.target.id)
  .then(res=>setUpdateData(res.data))
  .catch(err=>console.log(err.response))
}


  const listOfMembers = () =>
    formData.map((x, i) => {
      return (
        <Col xs={12} md={6} key={i}>
          <Card className='m-2 ' border="light"  >
            <div className="card-content">
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>  {x.familyLastName}</Card.Title>
                <Card.Text>
                  {x.quote}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{x.relation}</small>
              </Card.Footer>
            </div>
            <div className="deleteOrEdit" > <i id={x.familyId} onClick={HandleEdit} className=" text-secondary fas fa-edit"></i><i className=" text-secondary ml-2 far fa-trash-alt"></i></div>

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
      <Col xs={5}>
        <FamilyMember updateData={updateData} addOrEdit={addOrEdit} />
      </Col>
      <Col className=" family-list-container" xs={7}>
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

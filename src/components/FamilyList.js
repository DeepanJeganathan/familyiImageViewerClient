import { useEffect, useState } from "react";
import { Card,  Col, Container, Jumbotron, Row } from "react-bootstrap";
import FamilyMember from "./FamilyMember";

import axios from "axios";

function FamilyList() {
  const [formData, setFormData] = useState([]);
  const [updateData, setUpdateData]= useState(null);

  useEffect(() => { refresh()
 
  },[] )



  const addOrEdit = (form, onSuccess) => {
    console.log(form)
    if (form.get('familyId') === "0") {
      familyApi().create(form)
        .then(res => {
          console.log("reached create")
          refresh();
          onSuccess();
        }).catch(err => console.log(err.response))
    }
    else {   
      console.log("update func") 
      console.log(form.get('imageFile'))
      familyApi().update(form.get('familyId'),form)
        .then(res => {
          console.log("reached update")
          refresh();
          onSuccess()
        }).catch(err => console.log(err.response))
    }

  };
  //url = "http://localhost:52046/api/FamilyImageViewer/"

  //url = "http://localhost:44330/api/FamilyImageViewer/"
  const familyApi = (url = "http://192.168.0.105:8087/api/FamilyImageViewer/") => {
    return {
      fetchAll: () => axios.get(url),
      create: newMember => axios.post(url, newMember),
      update: (id, updateMember) => axios.put(url + id,updateMember),
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
  axios.get("http://192.168.0.105:8087/api/FamilyImageViewer/"+ x.target.id)
  .then(res=>setUpdateData(res.data))
  .catch(err=>console.log(err.response))
}
function HandleDelete(x){
familyApi().delete(x.target.id).then(res=> refresh()).catch(err=>console.log(err.response))

}
function GetAge(birthDate){
 
 return Math.floor((new Date()-new Date(birthDate).getTime())/3.15576e+10)
}


  const listOfMembers = () =>
 
    formData.map((x, i) => {
     
      return (
        <Col  xs={12} md={6} key={i}>
          <Card className='m-2' border="light"  >
            <div className="card-content">
              <Card.Img variant="top" src={x.imageSrc} />
              <Card.Body>
                <Card.Title> {x.familyFirstName} {x.familyLastName}<div className="small text-muted p-1">{GetAge(x.birthDate)} yrs old</div></Card.Title>
                <Card.Text>
                  {x.quote}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{x.relation}</small>
              </Card.Footer>
            </div>
            <div className="deleteOrEdit" > <i id={x.familyId} onClick={HandleEdit}  className=" text-secondary fas fa-edit"></i><i onClick={HandleDelete} id={x.familyId} className=" text-secondary ml-2 far fa-trash-alt"></i></div>

          </Card>
        </Col>
      );
    });

  return (
    <>

      <Col xs={12}>
        <Jumbotron className="mt-3 bg-light gradient-border " fluid>
          <Container>
            <div className="display-4 text-secondary">My Family</div>
          </Container>
        </Jumbotron>
      </Col>
      <Col xs={4}>
        <FamilyMember updateData={updateData} addOrEdit={addOrEdit} />
      </Col>
      <Col className=" family-list-container" xs={8}>
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

import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const defaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg";

const initalValues = {
  familyId: 0,
  familyFirstName: "",
  familyLastName: "",
  birthDate: "",
  relation: "",
  quote: "",
  imageName: "",
  imageSrc: defaultImg,
  imageFile: null,
};


function FamilyMember({ addOrEdit }) {
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState(initalValues);

  function ResetForms(){
    setFormValues(initalValues);
    setErrors({});
    //reset image uploader seperately
    document.getElementById('image-uploader').value=null;
  }

  function HandleChange(e) {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  }

  function ShowPreview(e) {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      //get virtual path to show image preview use filereader built in function
      const reader = new FileReader();
      reader.onload = (img) => {
        setFormValues({
          ...formValues,
          imageFile: imgFile,
          imageSrc: img.target.result,
        });
      };
      reader.readAsDataURL(imgFile);
    } else {
      setFormValues({
        ...formValues,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  }
  function ValidateFields() {
    let fieldValues = {};
    fieldValues.familyFirstName =
      formValues.familyFirstName === "" ? false : true;
    fieldValues.imageSrc = formValues.imageSrc === defaultImg ? false : true;
    setErrors(fieldValues);
    console.log(errors);
    return Object.values(fieldValues).every((x) => x === true);
  }
  function HandleSubmit(e) {
    e.preventDefault();
    if (ValidateFields()) {
      
        const formData=new FormData();
        formData.append('familyId', formValues.familyId)
        formData.append('familyFirstName', formValues.familyFirstName)
        formData.append('familyLastName', formValues.familyLastName)
        formData.append('birthDate', formValues.birthDate)
        formData.append('relation', formValues.relation)
        formData.append('quote', formValues.quote)
        formData.append('imageName', formValues.imageName)
        formData.append('imageSrc', formValues.imageSrc)
        formData.append('imageFile', formValues.imageFile)
      addOrEdit(formData,ResetForms);
     
      console.log(
        `form values are now set to${console.log(
          formValues
        )}, errors are now reset to${console.log(errors)}`
      );
    } else {
      console.log("validation failed");
    }
  }

  function applyErrorClass(field) {
    if (field in errors && errors[field] === false) {
      return "invalid-field";
    }
  }

  return (
    <>
      <Card className="form">
        {" "}
        <Form autoComplete="off" noValidate onSubmit={HandleSubmit}>
          <Card.Img variant="top" src={formValues.imageSrc} />

          <Card.Body>
            <Form.Group>
              <Form.File
              id="image-uploader"
                accept="image/*"
                className={applyErrorClass("imageSrc")}
                onChange={ShowPreview}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                className={applyErrorClass("familyFirstName")}
                placeholder="enter first name"
                name="familyFirstName"
                value={formValues.familyFirstName}
                onChange={HandleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="familyLastName"
                value={formValues.familyLastName}
                onChange={HandleChange}
                placeholder="enter last name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formValues.birthDate}
                onChange={HandleChange}
              />
            </Form.Group>
            <Form.Control
              name="relation"
              value={formValues.relation}
              onChange={HandleChange}
              as="select"
            >
              <option>Mother</option>
              <option>Father</option>
              <option>Daughter</option>
              <option>Son</option>
              <option>Grandparents</option>
              <option>Uncle</option>
              <option>Aunt</option>
              <option>Niece</option>
            </Form.Control>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Favourite Quote</Form.Label>
              <Form.Control
                name="quote"
                value={formValues.quote}
                onChange={HandleChange}
                placeholder="enter your favourite quote"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Body>
        </Form>
      </Card>
    </>
  );
}

export default FamilyMember;

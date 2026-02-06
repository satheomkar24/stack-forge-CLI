import { Col, Container, Row } from "reactstrap";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileForm from "../components/profile/ProfileForm";

const Profile = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col md={4} className="mb-4 mb-md-0">
          <ProfileImage />
        </Col>

        <Col md={8}>
          <ProfileForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

import { Container, Tab, Tabs } from "react-bootstrap";
import UsersTable from "./users.table";

const TabsContent = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 my-3"
      >
        <Tab eventKey="users" title="users">
          <UsersTable />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsContent;

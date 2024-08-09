import { Container, Tab, Tabs } from "react-bootstrap";
import UsersTable from "./users.table";
import BlogsTable from "./blog/blogs.table";

const TabsContent = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="users"
        id="uncontrolled-tab-example"
        className="mb-3 my-3"
      >
        <Tab eventKey="users" title="users">
          <UsersTable />
        </Tab>
        <Tab eventKey="blogs" title="blogs">
          <BlogsTable/>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsContent;

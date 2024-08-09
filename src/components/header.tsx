import { Container, Form, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { changeMode } from "../redux/app/app.slide";

const Header = () => {
  const users = useAppSelector((state) => state.user.listUser);
  const blogs = useAppSelector((state) => state.blog.listBlog)
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-bs-theme", mode);
    }
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          Navbar with {users.length} Users and {blogs.length} Blogs
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Form.Check // prettier-ignore
              defaultChecked={mode === "light" ? false : true}
              onChange={(e) =>
                dispatch(
                  changeMode(e.target.checked === true ? "dark" : "light")
                )
              }
              type="switch"
              id="custom-switch"
              label={
                mode === "light" ? (
                  <Navbar.Text>Light mode</Navbar.Text>
                ) : (
                  <Navbar.Text>Dark mode</Navbar.Text>
                )
              }
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

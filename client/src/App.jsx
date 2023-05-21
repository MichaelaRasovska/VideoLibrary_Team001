import styles from './App.css';
import VideoList from './bricks/VideoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import UserContext from './UserProvider';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const { user, users, changeUser } = useContext(UserContext);

  //reload data if database changed
  const [databaseChanged, setDatabaseChanged] = useState(false);

  const handleReload = () => {
    setDatabaseChanged(!databaseChanged);
  };

  //server call for data (videos and genres)
  const [initialDataLoadCall, setInitialDataLoadCall] = useState({
    state: 'pending',
  });
  const videoDataUrl = 'http://localhost:3000/videos';
  const genreDataUrl = 'http://localhost:3000/genres';

  async function fetchData(dataUrl) {
    const videoResponse = await fetch(dataUrl, {
      method: 'GET',
    });
    if (videoResponse.status >= 400) {
      setInitialDataLoadCall({ state: 'error', error: videoResponse });

      return null;
    }

    return await videoResponse.json();
  }

  useEffect(() => {
    async function fetchInitialData() {
      const videoData = await fetchData(videoDataUrl);
      const genreData = await fetchData(genreDataUrl);

      if (!videoData || !genreData) {
        return;
      }

      setInitialDataLoadCall({
        state: 'success',
        videoData: videoData,
        genreData: genreData,
      });
    }

    fetchInitialData();
  }, [databaseChanged]);

  const videoData = initialDataLoadCall.videoData;
  const genreData = initialDataLoadCall.genreData;

  function getChild() {
    switch (initialDataLoadCall.state) {
      case 'pending':
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case 'success':
        return (
          <>
            <Navbar
              fixed="top"
              expand={'sm'}
              className="mb-3"
              bg="dark"
              variant="dark"
            >
              <Container fluid>
                <Navbar.Brand>Videotéka Unicorn</Navbar.Brand>
                <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <NavDropdown
                        align="end"
                        title={user.fullName ?? 'Nepřihlášen'}
                      >
                        {users.map((user) => {
                          return (
                            <NavDropdown.Item
                              onClick={() => changeUser(user.id)}
                            >
                              {user.fullName} ({user.role.name})
                            </NavDropdown.Item>
                          );
                        })}
                        <NavDropdown.Item onClick={() => changeUser(-1)}>
                          Odhlásit se
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
            <VideoList
              videoData={videoData}
              genreData={genreData}
              handleReload={handleReload}
            />
          </>
        );
      case 'error':
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data.</div>
            <br />
            <pre>{JSON.stringify(initialDataLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getChild()}</div>;
}

export default App;

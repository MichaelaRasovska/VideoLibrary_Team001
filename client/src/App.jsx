import styles from './App.css';
import VideoList from './bricks/VideoList';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

function App() {
  //server call
  const [videosLoadCall, setVideosLoadCall] = useState({
    state: 'pending',
  });

  useEffect(() => {
    fetch(`http://localhost:3000/videos`, {
      method: 'GET',
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setVideosLoadCall({ state: 'error', error: responseJson });
      } else {
        setVideosLoadCall({ state: 'success', data: responseJson });
      }
    });
  }, []);

  const videoData = videosLoadCall.data;


  //re render based on new data
  const [newData, setNewData] = useState([]);
  const [newEntry, setNewEntry] = useState(false);

  const handleNewData = (data) => {
    setNewData(data);
    setNewEntry(true);
  };

  function getChild() {
    switch (videosLoadCall.state) {
      case 'pending':
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case 'success':
        return (
          <>
            <Header />
            {newEntry ? (
              <VideoList videoList={newData} handleNewData={handleNewData} />
            ) : (
              <VideoList videoList={videoData} handleNewData={handleNewData} />
            )}
          </>
        );
      case 'error':
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
            <pre>{JSON.stringify(videosLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getChild()}</div>;
}

export default App;

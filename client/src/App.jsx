import styles from './App.css';
import VideoList from './bricks/VideoList';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

function App() {
  //reload data if database changed
  const [databaseChanged, setDatabaseChanged] = useState(false);

  const handleReload = () => {
    setDatabaseChanged(true);
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
            <Header />
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

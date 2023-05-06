import styles from './App.css';
import VideoList from './bricks/VideoList';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

function App() {
  //server call for videodata
  const [videosLoadCall, setVideosLoadCall] = useState({
    state: 'pending',
  });

  useEffect(() => {
    async function fetchData(){
      const videoResponse = await fetch(`http://localhost:3000/videos`, {
        method: 'GET',
      });
      if (videoResponse.status >= 400) {
        setVideosLoadCall({ state: 'error', error: videoResponse });

        return;
      }

      const genreResponse = await fetch(`http://localhost:3000/genres`, {
        method: 'GET',
      });
      if (genreResponse.status >= 400) {
        setVideosLoadCall({ state: 'error', error: genreResponse });

        return;
      }

      const videoData = await videoResponse.json();
      const genreData = await genreResponse.json();
      setVideosLoadCall({
        state: 'success',
        videoData: videoData,
        genreData: genreData
      });
    }

    // TODO try catch
    fetchData()
  }, []);

  const videoData = videosLoadCall.videoData;
  const genreData = videosLoadCall.genreData;
  console.log(videoData);
  console.log(genreData);

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
            <VideoList videoList={videoData} genreList = {genreData}/>
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

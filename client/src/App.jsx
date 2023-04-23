import './App.css';
import VideoList from './bricks/VideoList';
import videoData from './data/videoData';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [newData, setNewData] = useState([]);
  const [newEntry, setNewEntry] = useState(false);

  const handleNewData = (data) => {
    setNewData(data);
    setNewEntry(true);
  };

  return (
    <div className="App">
      <Header />
      {newEntry ? (
        <VideoList videoList={newData} handleNewData={handleNewData} />
      ) : (
        <VideoList videoList={videoData} handleNewData={handleNewData} />
      )}
    </div>
  );
}

export default App;

import './App.css';
import VideoList from './bricks/VideoList';
import videoData from './data/videoData';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { newEntry, newData } from './bricks/AddVideoForm';

function App() {
  return (
    <div className="App">
      <Header />
      {newEntry ? (
        <VideoList videoList={newData} />
      ) : (
        <VideoList videoList={videoData} />
      )}
    </div>
  );
}

export default App;

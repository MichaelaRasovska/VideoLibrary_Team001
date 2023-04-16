import './App.css';
import VideoList from './bricks/VideoList';
import videoData from './data/videoData';
import Header from './bricks/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <VideoList videoList={videoData} />
    </div>
  );
}

export default App;

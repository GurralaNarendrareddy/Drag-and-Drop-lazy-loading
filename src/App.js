import "./App.css";
import SortingLists from "./Components/SortingLists";
import ImageGallery from "./Components/ImagesGallery";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Task 1</h1>
      <SortingLists />
      <h1 style={{ textAlign: "center" }}>Task 2</h1>
      <ImageGallery />
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import SignIn from './pages/SignIn';
import {useState, useEffect} from 'react';

function Home(props){
  console.log(props);
  let usernameGreetingHtml = null;
  // if(props.username){
  //   usernameGreetingHtml = <p>I see you have chosen the username: {props.username}</p>
  // }
  return (<div>
      <h1> Homepage! </h1>
      <p>{props.greeting}</p>
      {props.username ? <p>I see you have chosen the username: {props.username}</p> : null}
    </div>);
}

function Images(){
  const [imageData, setImageData] = useState([]);

  useEffect(()=>{
    const helper = async ()=>{
      const response = await fetch("https://jsonplaceholder.typicode.com/photos")
      const imageJson = await response.json();
      console.log(imageJson);
      setImageData(imageJson);
    }
    helper();
  }, [])

  // const modifiedDataArray = imageData.slice(1,20);
  // const htmlArray = [];
  // for(let i = 0; i < modifiedDataArray.length; i++){
  //     htmlArray.push(<img key={i} src={modifiedDataArray[i].url} alt={modifiedDataArray[i].title}></img>)
  // }

  return (<div>
   <h1>Images</h1> 
   <output>
     {imageData.slice(1,20).map((e,i)=><img key={i} src={e.url} alt={e.title}></img>)}
   </output>
  </div>)
}

function App() {
  const [username, setUsername] = useState(""); 

  return (
      <div className="App"> 
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signin">SignIn</Link>
          <Link to="/images">Images</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home username={username} greeting="Hello World With Pizza!!"></Home>}></Route>
          <Route path="/signin" element={<SignIn username={username} setUsername={setUsername}></SignIn>}></Route>
          <Route path="/images" element={<Images></Images>}></Route>
        </Routes>
      </div>
  )
}

export default App;

import './App.css';
import Navigation from './Navigation';
import Rank from './Rank';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import 'tachyons';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import FaceRecognition from './FaceRecognition';
import Signin from './Signin';
import Register from './Register';

function App() {
  const [images, setImages] = useState({input: '', imageurl: ''});
  const [boxs, setBoxes] = useState({box: {}});
  const [value, setvalue] = useState({route: 'signin'});
  const [changes,setchange] = useState({isSignedIn: false});
  const [users, setusers] = useState({id:'', name:'',email:'',joined:''})
  const [entry, setentry] = useState({entries: 0});

  const loadUser = (data) =>{
    setusers({
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    });
    setentry({entries: data.entries});
    console.log('app',data);
  }

  const calculateFacelocation = (data) =>{
    console.log(data,data.outputs[0].data.regions[0].region_info.bounding_box)
    if (data.outputs) {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftcol: clarifaiFace.left_col * width,
        toprow: clarifaiFace.top_row * height,
        rightcol: width- (clarifaiFace.right_col * width),
        bottomrow: height - (clarifaiFace.bottom_row * height)
      }
    }
  }
  
  const onRouteChange = (route) =>{
    if(route === 'signout'){
      setchange({isSignedIn: false});
    }
    else if(route === 'home'){
      setchange({isSignedIn: true});
    }
    setvalue({route: route});
  }
  const displayfacebox = (box) => {
    console.log(box);
    setBoxes({box: box});
  }
  const onInputChange = (event)=>{  
    setImages({...images,input: event.target.value});
  }
  const onButtonSubmit = () =>{
    setImages({...images,imageurl: images.input})

    fetch('http://localhost:3001/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            // It seems like 'users' should be an object, make sure it's defined correctly
            input: images.input
        })
    })
    .then(response => response.json())
    .then(result => displayfacebox(calculateFacelocation(result)))
    fetch('http://localhost:3001/image',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            // It seems like 'users' should be an object, make sure it's defined correctly
            id: users.id
        })
    }).then(res =>res.json())
    .then(data =>{
      setentry({entries: data})
    })
    .catch((err) => console.log("NOOO"))
  }
//   const setupClarifai = (imageurl) =>{
//     // Your PAT (Personal Access Token) can be found in the portal under Authentification
//     const PAT = 'e328a61a557f4bf8affe81e996da2006';
//     // Specify the correct user_id/app_id pairings
//     // Since you're making inferences outside your app's scope
//     const USER_ID = 'pratham_parlecha';       
//     const APP_ID = 'face';
//     // Change these to whatever model and image URL you want to use
//     // const MODEL_ID = 'face-detection';  
//     const IMAGE_URL =  imageurl;

//     const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//   });
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };
//   return requestOptions;
// }

  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={changes.isSignedIn} />
      { value.route === 'home' 
        ? <div>
        <Logo />
        <Rank name={users.name}  entries={entry.entries} />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
        <FaceRecognition imageurl={images.imageurl} box={boxs.box}/>
        </div>
        : (
          value.route === 'signin' 
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
          : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;

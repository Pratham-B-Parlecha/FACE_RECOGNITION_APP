
// const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key bd7f0d7b1b0c4859884c9af51756aed2");
// const handleApicall = (req,res) => {
//     stub.PostModelOutputs(
//         {
//             // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
//             model_id: "a403429f2ddf4b49b307e318f00e528b",
//             inputs: [{data: {image: {url: req.body.input}}}]
//         },
//         metadata,
//         (err, response) => {
//             if (err) {
//                 console.log("Error: " + err);
//                 return;
//             }
    
//             if (response.status.code !== 10000) {
//                 console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
//                 return;
//             }
    
//             console.log("Predicted concepts, with confidence values:")
//             for (const c of response.outputs[0].data.concepts) {
//                 console.log(c.name + ": " + c.value);
//             }
//         }
//     );
// }

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
const handleApicall = (req,res)=> {
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'bd7f0d7b1b0c4859884c9af51756aed2';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'pratham_parlecha';
const APP_ID = 'face';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const IMAGE_URL = req.body.input;

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////


metadata.set("authorization", "Key " + PAT);

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
        res.json(response)
    }

);
}
const handleimage = (req,res,db)=>{
    const { id } = req.body;
    db('users').where({id:id})
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
}

module.exports = {
    handleimage,
    handleApicall
}
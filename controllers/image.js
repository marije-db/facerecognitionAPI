import fetch from "node-fetch";

const clarifaiRequestOptions = (imgUrl) => {
    const PAT = 'c57ff8c9ac8a4328a4a27ff183f18b43';
    const USER_ID = 'a0tlik13b3gs';       
    const APP_ID = 'face-detection-app_32730_React';
    const IMAGE_URL = imgUrl;
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
      })
      
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    }
  
    return requestOptions
  }

export const handleAPIcall = (req, res) => {
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      clarifaiRequestOptions(req.body.input)
    )
      .then((response) => response.text())
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(400).json("Unable to communicate with API"));
  };


export const getImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

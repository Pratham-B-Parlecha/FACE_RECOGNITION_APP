import React from "react";
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onButtonSubmit}) {
    return(
        <div>
            <p className="f3">
                {'This  Magic Brain will detect in your pictures. Give it try'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className='w-70 f4 pa2 center' onChange={onInputChange}/>
                    <button className='w-30 link grow f4 pv2 ph3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}   

export default ImageLinkForm;
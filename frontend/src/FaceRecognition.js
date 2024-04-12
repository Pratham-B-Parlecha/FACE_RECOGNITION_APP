import React from "react";
import './FaceRecognition.css';

function FaceRecognition({ imageurl, box }) {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imageurl} alt='' width='500px' height='auto'id="inputimage" />
                <div className="bounding-box" style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;
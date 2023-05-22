import React, { useRef } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);

    const handleStartCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    };

    return (
        <div>
            <button onClick={handleStartCamera}>Open Camera</button>
            <video ref={videoRef} autoPlay></video>
        </div>
    );
};

export default CameraComponent;

// ImageStorage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import Axios from 'axios';

function Images() {
    const location = useLocation();
    const { email } = location.state || {};
    const fileInputRef = useRef();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/sign-in');
    }

    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('uploader', email);
        Axios.post('http://localhost:3001/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                setSelectedImage(null);
                fileInputRef.current.value = "";
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
            <p style={{ marginTop: '60px', textAlign: 'right', marginRight: '20px' }}>Welcome, {email}!</p>
            <div style={{ width: '80%', margin: '30px auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <form onSubmit={handleUpload} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Upload a new image"
                            className="form-control"
                            readOnly
                            value={selectedImage ? selectedImage.name : ''}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="btn btn-primary"
                            style={{ width: '100px', height: '37px', fontSize: '10px' }}
                        >
                            Choose File
                        </button>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ width: '100px', height: '37px', fontSize: '10px' }}
                        >
                            Upload Image
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Images;

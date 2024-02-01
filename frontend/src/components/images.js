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
    const [responseMessage, setResponseMessage] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, [email]);

    const fetchImages = () => {
        Axios.get(`http://localhost:3001/user-images/${email}`)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!selectedImage) {
            alert('Please select an image first!');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('uploader', email);
        Axios.post('http://localhost:3001/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                setResponseMessage(response.data.message);
                setSelectedImage(null);
                fileInputRef.current.value = "";
                fetchImages();
            })
            .catch((error) => {
                setResponseMessage(error.response?.data?.message || "An error occurred. Please try again later.");
            });
    };

    const handleDelete = (imageId) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            Axios.delete(`http://localhost:3001/delete-image/${imageId}`)
                .then(response => {
                    fetchImages();
                })
                .catch(error => {
                    console.error('Error deleting image:', error);
                });
        }
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
                <div className="image-gallery" style={{ marginTop: "20px", display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {images.map(image => (
                        <div key={image.id} className="image-item" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' , background: 'white'}}>
                            <img src={`http://localhost:3001/${image.image_path}`} alt="Uploaded" style={{ width: '100%', height: '70%', objectFit: 'cover' }} />
                            <div>
                                <p>Uploaded at: {new Date(image.uploaded_at).toLocaleString()}</p>
                                <button onClick={() => handleDelete(image.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Images;

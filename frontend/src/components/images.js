// ImageStorage.js
import React from 'react';

function Images() {
return (
    <>
        <p style={{ marginTop: '60px', textAlign: 'right', marginRight: '20px' }}>Welcome!</p>
        <div style={{ width: '80%', margin: '30px auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <form style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Upload a new image"
                        className="form-control"
                        readOnly
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ width: '100px', height: '37px', fontSize: '10px' }}
                    >
                        Choose File
                    </button>
                    <input
                        type="file"
                        style={{ display: 'none' }}
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
);}

export default Images;

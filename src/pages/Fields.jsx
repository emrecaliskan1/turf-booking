import React, { useState } from 'react'
import { Card, Carousel } from 'antd';
import {fields} from '../data/Fields'
import Navbar from '../components/Navbar';
import '../css/Fields.css'
import { ToastContainer } from 'react-toastify';


const Fields = () =>  {

  const [selectedField, setSelectedField] = useState(null);


  return (
    <>
    <Navbar />
    <div className="fields-container">
      
      {/* Saha listesi */}
      <div className="fields-list">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`field-item ${selectedField?.id === field.id ? 'selected' : ''}`}
            onClick={() => setSelectedField(field)}
          >
            {field.name}
          </div>
        ))}
      </div>

      {/* Seçili saha kartı */}
      {selectedField && (
        <Card title={selectedField.name} className="field-card">
          <Carousel autoplay>
            {selectedField?.images?.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`image-${index}`}
                  style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
        </Card>
      )}
     
    </div>
    <ToastContainer autoClose={1500}></ToastContainer>
    </>
  )
}

export default Fields
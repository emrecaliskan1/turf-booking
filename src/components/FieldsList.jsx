import React, { useState } from 'react'
import { Card, Carousel } from 'antd';
import {fields} from '../data/Fields'
import '../css/Fields.css'

function FieldsList() {

    const [selectedField, setSelectedField] = useState(null);

  return (
     <div className="fields-container">
      
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
  )
}

export default FieldsList
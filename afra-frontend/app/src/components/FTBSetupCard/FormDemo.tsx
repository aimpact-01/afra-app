
import React, { useState } from 'react';
import './FormDemo.css'


interface FormData {
  fundName:string;
  fundCode:string
  firstName: string;
  lastName: string;
 
}

interface EditableFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FormData;
}



const EditableForm: React.FC<EditableFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialData);
 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="form-header">
          <h2>FTB setup Form</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="form-container">
          <div className="form-row"><label>Fund Details:</label></div>
          <div className="form-row">
          {/* <label>Fund Details</label> */}
            <div className="form-group">
              <label>Fund Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fundName"
                  value={formData.fundName}
                  onChange={handleChange}
                />
              ) : (
                <div className="read-only-field">{formData.fundName}</div>
              )}
            </div>

            <div className="form-group">
             
              <label>Fund Code</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fundCode"
                  value={formData.fundCode}
                  onChange={handleChange}
                />
              ) : (
                <div className="read-only-field">{formData.fundCode}</div>
              )}
            </div>
          </div>
          <div className="form-row"><label>Trader Details:</label></div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <div className="read-only-field">{formData.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <div className="read-only-field">{formData.lastName}</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          {isEditing ? (
            <>
              {/* <button className="save-button" onClick={handleSave}>
                Save Changes
              </button> */}
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button style={{
              background: 'linear-gradient(45deg,#2c3e50, #3498db )',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(77, 58, 173, 0.3)',
              color: 'white',
              height: 40,
              fontWeight:'b0lder',
              fontSize:'16px',
              width:'15%',
              padding: '0 30px',
              margin:'5px auto'

          }} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableForm;



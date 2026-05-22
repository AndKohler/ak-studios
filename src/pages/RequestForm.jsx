import { useState, useRef } from 'react';
import './styling/RequestForm.css';

export const RequestForm = () => {
  // Input fields state
  const [modelName, setModelName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Ref to clear the HTML input element directly
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({
    modelName: '',
    email: '',
    description: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault(); 
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleModelNameChange = (val) => {
    setModelName(val);
    if (val.trim().length >= 3) {
      setErrors((prev) => ({ ...prev, modelName: '' }));
    }
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (val.includes('@')) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleDescriptionChange = (val) => {
    setDescription(val);
    if (val.trim().length >= 3) {
      setErrors((prev) => ({ ...prev, description: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let currentErrors = { modelName: '', email: '', description: '' };
    let isValid = true;

    if (modelName.trim().length < 3) {
      currentErrors.modelName = 'Model name must be at least 3 characters.';
      isValid = false;
    }

    if (!email.trim()) {
      currentErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (description.trim().length < 3) {
      currentErrors.description = 'Please provide a description (at least 3 characters).';
      isValid = false;
    }

    setErrors(currentErrors);

    if (isValid) {
      console.log('Form submitted successfully:', { modelName, email, description, selectedFile });
    }
  };

  return (
    <div className="rf-page-layout animate-fade">
      <div className="rf-header">
        <h1 className="rf-title">COMMISSION A MINIATURE</h1>
        <p className="rf-subtitle">Submit your model specifications for a premium custom paint job.</p>
      </div>
      
      <div className="rf-form-container">
        <form className="rf-form" onSubmit={handleSubmit} noValidate>
          
          {/* Model Name Field */}
          <div className="rf-group">
            <label>MODEL NAME</label>
            <input 
              type="text" 
              placeholder="e.g., Warhammer 40k Abaddon" 
              value={modelName}
              onChange={(e) => handleModelNameChange(e.target.value)}
              className={errors.modelName ? 'rf-input-error' : ''}
            />
            {errors.modelName && <span className="rf-error-text">{errors.modelName}</span>}
          </div>

          {/* Email Address Field */}
          <div className="rf-group">
            <label>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="e.g., commander@example.com" 
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={errors.email ? 'rf-input-error' : ''}
            />
            {errors.email && <span className="rf-error-text">{errors.email}</span>}
          </div>

          {/* Description Field */}
          <div className="rf-group">
            <label>DESCRIBE SCHEME & DETAILS</label>
            <textarea 
              placeholder="Describe the weathering, base type (snow, lava, mud), or specific box-art requirements..." 
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className={errors.description ? 'rf-input-error' : ''}
            ></textarea>
            {errors.description && <span className="rf-error-text">{errors.description}</span>}
          </div>

          {/* Image Upload Field */}
          <div className="rf-group">
            <label>REFERENCE IMAGE (OPTIONAL)</label>
            
            {/* CHANGED: Container is now a div, not a label */}
            <div className="rf-file-dropzone">
              
              {/* CHANGED: Only this button acts as the label triggering the file explorer */}
              <label htmlFor="rf-file-upload" className="rf-file-btn">
                Choose File
              </label>
              
              <span className="rf-file-text">
                {selectedFile ? '1 file selected' : 'No file selected'}
              </span>
              
              {selectedFile && (
                <button className="rf-file-clear-btn" onClick={handleRemoveFile}>
                  Remove
                </button>
              )}

              <input 
                id="rf-file-upload"
                ref={fileInputRef}
                type="file" 
                accept=".jpg, .jpeg, .png" 
                className="rf-hidden-file-input"
                onChange={handleFileChange}
              />
            </div>
            <span className="rf-file-help">Upload a reference image (.jpg or .png).</span>
          </div>

          <button type="submit" className="rf-action-button">SUBMIT REQUEST</button>
        </form>
      </div>
    </div>
  );
};
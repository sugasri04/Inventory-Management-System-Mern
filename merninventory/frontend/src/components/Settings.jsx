
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    profileVisibility: 'public',
    password: '',
  });

  useEffect(() => {
    
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  useEffect(() => {
  const savedSettings = localStorage.getItem('userSettings');
  if (savedSettings) {
    setSettings(JSON.parse(savedSettings));
  }
}, []);


  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveSettings = () => {
  localStorage.setItem('userSettings', JSON.stringify(settings));
  console.log('Settings saved to localStorage:', settings);
};


 return (
  <Container className="mt-4" style={{ maxWidth: '400px' }}>
    <h3 style={{ color: '#33c2ffff', marginBottom:'30px'}}>Settings</h3>

    <Form>
      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={handleDarkModeToggle}
          style={{ color: '#006089ff',marginBottom:'50px' }}
        />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="profileVisibility">
        <Form.Label style={{ color: '#006089ff' }}>Profile Visibility</Form.Label>
        <Form.Control
          as="select"
          name="profileVisibility"
          value={settings.profileVisibility}
          onChange={handleChange}
          style={{ borderColor: '#3ec6ff' ,marginBottom:'50px'}}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="notifications"
          label="Enable Email Notifications"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
          style={{ color: '#006089ff',marginBottom:'50px' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label style={{ color: '#006089ff' }}>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          name="password"
          value={settings.password}
          onChange={handleChange}
          style={{ borderColor: '#3ec6ff',marginBottom:'50px' }}
        />
      </Form.Group>

      <Button
        onClick={handleSaveSettings}
        style={{ backgroundColor: '#3ec6ff', borderColor: '#3ec6ff', color: 'white' ,marginBottom:'50px'}}
      >
        Save Settings
      </Button>
    </Form>
  </Container>
);

};

export default Settings;

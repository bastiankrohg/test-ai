import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StartupForm from './components/StartupForm';

test('renders startup form', () => {
  render(<StartupForm onSubmit={() => {}} onVisualize={() => {}} />);
  expect(screen.getByPlaceholderText('Startup Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Industry')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Funding')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Website URL')).toBeInTheDocument();
});

test('submits form with startup data', () => {
  const mockSubmit = jest.fn();
  render(<StartupForm onSubmit={mockSubmit} onVisualize={() => {}} />);
  
  fireEvent.change(screen.getByPlaceholderText('Startup Name'), { target: { value: 'Test Startup' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'A test startup' } });
  fireEvent.change(screen.getByPlaceholderText('Industry'), { target: { value: 'Tech' } });
  fireEvent.change(screen.getByPlaceholderText('Funding'), { target: { value: '1M' } });
  fireEvent.change(screen.getByPlaceholderText('Website URL'), { target: { value: 'https://www.example.com' } });
  
  fireEvent.click(screen.getByText('Analyze Startup'));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'Test Startup',
    description: 'A test startup',
    industry: 'Tech',
    funding: '1M',
    website: 'https://www.example.com'
  });
});

// Add more tests as needed

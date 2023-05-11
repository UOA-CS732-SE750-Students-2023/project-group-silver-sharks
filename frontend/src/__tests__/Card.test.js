import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../pages/ui/Card';
import '@testing-library/jest-dom'

describe('Test Card component', () => {

  const TestComponent = (props) => <div>{props.priority}</div>;

  it('renders Card', () => {
    render(
      <Card>
        <TestComponent />
      </Card>
    );

    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();
  });

  it('passes priority prop correctly', () => {
    const testPriority = 'High';

    render(
      <Card priority={testPriority}>
        <TestComponent />
      </Card>
    );

    expect(screen.getByText(testPriority)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { Button } from '../index';

describe('Button', () => {
    test('renders correctly', () => {
        render(<Button>TEST</Button>);

        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('renders with clear theme', () => {
        render(<Button variant={'clear'}>TEST</Button>);

        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});

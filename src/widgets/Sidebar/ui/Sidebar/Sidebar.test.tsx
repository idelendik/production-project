import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from '../../index';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('renders correctly', () => {
        componentRender(<Sidebar />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('toggle works correctly', () => {
        componentRender(<Sidebar />);

        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(toggleBtn).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');

        fireEvent.click(toggleBtn);

        expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
    });
});

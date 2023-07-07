import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Navbar from './Navbar';
import store from '../../store';
import constants from '../../common/constants';

describe('Navbar', () => {
    it('test_navbar_displays_app_name', () => {
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        expect(screen.getByText(constants.APP_NAME)).toBeInTheDocument();
    });
});

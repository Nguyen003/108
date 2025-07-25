import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>
                <div style={{width: 'calc(100% - 250px)'}}>
                    {children}
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
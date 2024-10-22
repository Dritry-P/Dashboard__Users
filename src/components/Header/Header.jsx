import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined, SyncOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/userStore';
import { refreshToken, logOut } from "../../http/Reqest";
import './Header.css';

const Header = observer(() => {
    return (
        <header className="header">
            <div className="header__inner">
                <Button
                    type="primary"
                    icon={<UserOutlined />}
                    onClick={usersStore.fetchUsers}
                >
                    Fetch Users
                </Button>

                <Button
                    type="primary"
                    icon={<AppstoreOutlined />}
                    onClick={usersStore.fetchDepartments}
                >
                    Departments
                </Button>

                <Button
                    type="default"
                    icon={<LogoutOutlined />}
                    onClick={logOut}
                >
                    Logout
                </Button>

                <Button
                    type="dashed"
                    icon={<SyncOutlined />}
                    onClick={() => refreshToken()}
                >
                    Refresh Token
                </Button>
            </div>
        </header>
    );
});

export default Header;

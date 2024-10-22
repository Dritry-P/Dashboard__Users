import React, { useState } from 'react';
import { Table, Button, Input, Drawer, Form } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import usersStore from '../../store/userStore';
import { observer } from 'mobx-react-lite';

const Users = observer(() => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        lastName: '',
        position: '',
        email: '',
    });

    const showFilters = () => {
        setFilterVisible(true);
    };

    const closeFilters = () => {
        setFilterVisible(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleFilterSubmit = () => {
        usersStore.filterUsers(filters);
        closeFilters();
    };

    const columns = [
        {
            title: "Ім'я",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Посада',
            dataIndex: 'position',
            key: 'position',
            render: (position) => position || "Невідомо",
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <div>
            <h1>Співробітники</h1>
            <Button icon={<FilterOutlined />} onClick={showFilters}>
                Фільтри
            </Button>
            
            <Table 
                columns={columns}
                dataSource={usersStore.filteredUsers}
                rowKey={(user) => user.id}
                pagination={{ pageSize: 5 }}
            />

            <Drawer
                title="Фільтри"
                placement="left"
                onClose={closeFilters}
                visible={filterVisible}
            >
                <Form layout="vertical">
                    <Form.Item label="Ім'я">
                        <Input 
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Введіть ім'я"
                        />
                    </Form.Item>

                    <Form.Item label="Прізвище">
                        <Input 
                            name="lastName"
                            value={filters.lastName}
                            onChange={handleFilterChange}
                            placeholder="Введіть прізвище"
                        />
                    </Form.Item>

                    <Form.Item label="Посада">
                        <Input 
                            name="position"
                            value={filters.position}
                            onChange={handleFilterChange}
                            placeholder="Введіть посаду"
                        />
                    </Form.Item>

                    <Form.Item label="E-mail">
                        <Input 
                            name="email"
                            value={filters.email}
                            onChange={handleFilterChange}
                            placeholder="Введіть e-mail"
                        />
                    </Form.Item>

                    <Button type="primary" onClick={handleFilterSubmit}>
                        Фільтрувати
                    </Button>
                    <Button onClick={() => setFilters({ name: '', lastName: '', position: '', email: '' })}>
                        Очистити
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
});

export default Users;


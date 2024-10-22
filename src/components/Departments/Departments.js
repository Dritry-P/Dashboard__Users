import { useEffect } from 'react';
import usersStore from '../../store/userStore';
import { observer } from 'mobx-react-lite';
import { Collapse, Button, Avatar, Tooltip } from 'antd';
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const buildTree = (list) => {
    const map = {};
    const roots = [];

    list.forEach(item => {
        map[item.id] = { ...item, subDepartments: [] };
    });

    list.forEach(item => {
        if (item.parent?.id) {
            map[item.parent.id].subDepartments.push(map[item.id]);
        } else {
            roots.push(map[item.id]);
        }
    });

    return roots;
};

const Departments = observer(() => {
    useEffect(() => {
        usersStore.fetchDepartments();
    }, []);

    const departmentsTree = buildTree(usersStore.departments);

    const renderDepartment = (department, level = 0) => {
        return (
            <Panel
                key={department.id}
                style={{ paddingLeft: `${level * 20}px` }}
                header={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{department.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Tooltip title={`Керівник: ${department.createdBy.name} ${department.createdBy.lastName}`}>
                                <Avatar icon={<UserOutlined />} />
                            </Tooltip>
                            <Button icon={<EditOutlined />} />
                            <Button icon={<DeleteOutlined />} />
                        </div>
                    </div>
                }
            >
                {department.subDepartments && department.subDepartments.length > 0 ? (
                    <Collapse>
                        {department.subDepartments.map(subDep => renderDepartment(subDep, level + 1))}
                    </Collapse>
                ) : (
                    <p>Немає підрозділів</p>
                )}
            </Panel>
        );
    };

    return (
        <>
            <div className="departments__inner" style={{ padding: '20px' }}>
                {departmentsTree.length > 0 ? (
                    <Collapse defaultActiveKey={['1']} expandIconPosition="left">
                        {departmentsTree.map(department => renderDepartment(department))}
                    </Collapse>
                ) : (
                    <p className="dep_info-message">Loading departments...</p>
                )}
            </div>
        </>
    );
});

export default Departments;

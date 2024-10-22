import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getToken, refreshToken } from "../../http/Reqest";
import usersStore from "../../store/userStore";
import { Form, Input, Button, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await getToken({ login, password });
    if (result) {
      usersStore.setAuth(true);
      navigate('/dashboard');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div style={{ padding: '24px', backgroundColor: '#f0f2f5', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={handleLogin}
          >
            <Form.Item
              label="Логін"
              name="login"
              rules={[{ required: true, message: 'Будь ласка, введіть логін!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Логін"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Будь ласка, введіть пароль!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Увійти
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={() => refreshToken()} block>
                Оновити
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Login;

import {
  Badge,
  Button,
  Drawer,
  InputNumber,
  Menu,
  Table,
  Typography,
  Form,
  Input,
  Empty,
} from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../API";

function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };


  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Man",
            key: "man",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "women's Dress",
                key: "womens-dresses",
              },
              {
                label: "women's Shoses",
                key: "womens-shoes",
              },
              {
                label: "women's Bags",
                key: "womens-bags",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "Fragrances",
          },
        ]}
      />

      <Typography.Title>Aisha Store</Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [cartDrawerOpen, SetCartDrawerOpen] = useState(false);
  const [ckeckoutDrawerOpen, setckeckoutDrawerOpen] = useState(false);
  const [cartItems, SetCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      SetCartItems(res.products);
    });
  }, []);
  const onconfirmOrder = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Badge
        onClick={() => {
          SetCartDrawerOpen(true);
        }}
        count={7}
        className="shoppingCart"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          SetCartDrawerOpen(false);
        }}
        title="your cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      SetCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total:{total}</span>;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setckeckoutDrawerOpen(true);
          }}
        >
          check your cart
        </Button>
      </Drawer>
      <Drawer
        open={ckeckoutDrawerOpen}
        onClose={() => {
          setckeckoutDrawerOpen(false);
        }}
        title="confirm Order"
      >
        <Form onFinish={onconfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "please enter your full name",
              },
            ]}
            label="Full Name "
            name="full-name"
          >
            <Input placeholder="Enter your name"></Input>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "please enter your email",
              },
            ]}
            label="Email "
            name="your-email"
          >
            <Input placeholder="Enter valid email"></Input>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "please enter your address",
              },
            ]}
            label="Address "
            name="your-Address"
          >
            <Input placeholder="Enter your Address"></Input>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {""} Confirm Order{" "}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default AppHeader;

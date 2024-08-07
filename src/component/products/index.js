import { useEffect, useState } from "react";
import { addTocart, getAllProducts, getallProductsBycategory } from "../../API";
import {
  Badge,
  Card,
  List,
  Rate,
  Typography,
  Button,
  message,
  Spin,
} from "antd";
import Item from "antd/es/list/Item";
import { useParams } from "react-router-dom";

function Products() {
  const [loding, setLoding] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setLoding(true)
    getallProductsBycategory(param.categoryId).then((res) => {
      setItems(res.products);
      setLoding(false);
    });
  }, [param]);
  if (loding) {
    return <Spin spinning />;
  }

  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="productItem"
              text={product.discountPercentage}
              color="pink"
            >
              <Card
                className="productItem"
                title={product.title}
                key={index}
                cover={
                  <img className="itemCardImg" src={product.thumbnail} alt="" />
                }
                actions={[
                  <Rate allowHalf disabled value={product.ratin} />,
                  <AddTocartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

function AddTocartButton({ item }) {
  const [loding, setLoding] = useState(false);
  const addProductCart = () => {
    setLoding(true);
    addTocart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoding(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductCart();
      }}
      loading={loding}
    >
      Add to cart
    </Button>
  );
}

export default Products;

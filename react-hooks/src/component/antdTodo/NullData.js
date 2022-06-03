/* eslint-disable import/no-anonymous-default-export */
import { Empty, Button } from "antd";

const NullData = (props) => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  >
    <Button type="primary" onClick={props.handleOk}>
      Create Now
    </Button>
  </Empty>
);
export default NullData;

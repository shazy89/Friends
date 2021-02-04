import React from "react";
import {
  Collapsible,
  CollapsibleItem,
  Icon,
  Col,
  Card,
  Row,
  Textarea,
} from "react-materialize";
import UserInfo from "./UserInfo";

const Settings = ({ history }) => {
  return (
    <div className="center container">
      <Col m={10} l={10} s={12}>
        <Card
          className="fafafa grey lighten-5"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName="black-text"
          title="General Settings"
        >
          <Collapsible accordion={false}>
            <CollapsibleItem
              expanded={true}
              header="User Info"
              icon={<Icon>person</Icon>}
              node="div"
            >
              <UserInfo history={history} />
            </CollapsibleItem>
          </Collapsible>
        </Card>
      </Col>
    </div>
  );
};

export default Settings;

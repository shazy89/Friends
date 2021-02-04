import React from 'react';
import { Icon, Col, Card} from 'react-materialize'
import FriendsAvatarContent from './FriendsAvatarContent'

const SideCard = () => {

    return (
        <div >
            <Col  m={4} l={4} s={12}>
                <Card
                  closeIcon={<Icon>close</Icon>}
                  revealIcon={<Icon>more_vert</Icon>}
                >
                      <FriendsAvatarContent />
                </Card>
              </Col>
         </div>
        )
      }
            
      export default SideCard;
              
             
              
              
  

                



      

        
   
 

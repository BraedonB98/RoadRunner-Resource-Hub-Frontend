import React from 'react';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

const TermsOfServiceModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Terms Of Service"
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={true}
    >
      <p>By using Road Runner Resource Hub and/or any of its entities or services you agree to the following. <br/>
      -----------------------------------------------------------------------------------------------<br/>
      -Road Runner Resource Hub,its subsidiaries, employees, and management are not liable for any leaked information or 
        damage caused from or by it. Information stored in Road Runner Resource Hub is available to 
        all of its staff, and its server hosting partners. This includes passwords,
        personal settings, and resources. Please do not enter any information that you are not willing to have publicly available <br/>
      -Road Runner Resource Hub,its subsidiaries, employees and management maintain the right to cancel your service at anytime without notice, 
       this includes but is not limited to deletion, sharing, or releasing all information stored
       </p>
    </Modal>
  );
};

export default TermsOfServiceModal;
import { NewDataProps } from "../components/UI/newDataForm/NewDataForm";


const testNewDataProps: NewDataProps = {
  initialValues: {
    age: 0,
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
  },
  payloadType: 'testType',
  contactId: 'testId',
  setViewForm: jest.fn(),
};


export default testNewDataProps;

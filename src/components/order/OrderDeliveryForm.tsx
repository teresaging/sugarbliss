import React, { useState } from 'react';
import moment from 'moment';
import { Form } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { CityDeliveryZipCodePrices, SuburbDeliveryZipCodePrices, colors } from '../../utils';

import { Container, Title, SubTitle, FormContainer, Row, SingleRow, SubmitButton, DeliveryPrice, CannotDeliverText } from './Styled';

type Props = {
  handleNextStep: Function;
  addItemToCart: Function;
  setDayOfWeek: Function;
}

const OrderDeliveryForm = ({handleNextStep, addItemToCart, setDayOfWeek}: Props) => {

  const [ canDeliver, setCanDeliver ] = useState(false);
  const [ deliveryPrice, setDeliveryPrice ] = useState(0);

  const handleSubmit = async (values) => {
    await addItemToCart({
      id: 'delivery',
      name: 'Delivery',
      price: deliveryPrice || 0,
      url: '/order',
      quantity: 1,
      customFields: [
        {
          name: 'Date',
          type: 'readonly',
          value: moment(values.date).format('MMMM Do YYYY'),
        },
        {
          name: 'Time',
          type: 'readonly',
          value: values.time,
        },
        {
          name: 'Name',
          type: 'readonly',
          value: values.name,
        },
        {
          name: 'Address',
          type: 'readonly',
          value: values.address,
        },
        {
          name: 'Apartment',
          type: 'readonly',
          value: values.addressApt || '',
        },
        {
          name: 'City',
          type: 'readonly',
          value: values.city,
        },
        {
          name: 'Zip Code',
          type: 'readonly',
          value: values.zipCode,
        }
      ],
    });
    await setDayOfWeek(moment(values.date).format('dddd'));
    handleNextStep();
  }

  const getDeliveryPrice = (zipCode) => {
    return CityDeliveryZipCodePrices[zipCode] || SuburbDeliveryZipCodePrices[zipCode] || null
  }

  return (
    <Container>
      <Title marginBottom={0}>Local Delivery</Title>
      <SubTitle>(Monday - Sunday only)</SubTitle>
      <FormContainer bgColor={colors.solids.BABY_PINK}>
        <Form
          onSubmit={handleSubmit}
          validate={values => {
            // tslint:disable-next-line:no-any
            const errors: any = {}
            if (!values.date) {
              errors.date = 'Required';
            }
            if (!values.time) {
              errors.time = 'Required';
            }
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.address) {
              errors.address = 'Required';
            }
            if (!values.city) {
              errors.city = 'Required';
            }
            if (!values.zipCode) {
              errors.zipCode = 'Required';
            }

            if (values.zipCode?.length > 4) {
              const price = getDeliveryPrice(values.zipCode);
              if (price !== null) {
                setCanDeliver(true);
                setDeliveryPrice(price);
              } else {
                setCanDeliver(false);
                errors.address = ' ';
                errors.city = ' ';
                errors.zipCode = ' ';
              }
            }

            return errors;
          }}
          render={({ handleSubmit, submitting, values, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <DatePicker
                  label="Date"
                  name="date"
                  variant="inline"
                  format="yyyy-MM-dd"
                  dateFunsUtils={DateFnsUtils}
                  minDate={Date()}
                  required
                />
                <Select
                  name="time"
                  label="Time"
                  formControlProps={{ margin: 'none' }}
                >
                  <MenuItem value="9am-1pm">9am - 1pm</MenuItem>
                  <MenuItem value="10am-2pm">10am - 2pm</MenuItem>
                  <MenuItem value="11am-3pm">11am - 3pm</MenuItem>
                  <MenuItem value="12pm-4pm">12pm - 4pm</MenuItem>
                </Select>
              </Row>
              <SingleRow>
                <TextField label="Name" name="name"/>
              </SingleRow>
              <Row>
                <TextField label="Address" name="address"/>
                <TextField label="Apt/Suite #" name="addressApt"/>
              </Row>
              <Row>
                <TextField label="City" name="city"/>
                <TextField label="Zip/Postal Code" name="zipCode"/>
              </Row>
              {values.zipCode?.length > 4 && canDeliver && (
                <SingleRow>
                  <DeliveryPrice>Delivery Price: ${deliveryPrice}</DeliveryPrice>
                </SingleRow>
              )}
              {values.zipCode?.length > 4 && !canDeliver && (
                <SingleRow>
                  <CannotDeliverText>We're sorry, we cannot deliver to this address</CannotDeliverText>
                </SingleRow>
              )}
              <SubmitButton
                type="submit"
                disabled={submitting || hasValidationErrors}>
                Add Delivery To Order
              </SubmitButton>
            </form>
          )}
        />
      </FormContainer>
    </Container>
  );
}

export default OrderDeliveryForm;
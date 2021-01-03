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
}

const OrderDeliveryForm = ({handleNextStep}: Props) => {

  const [ canDeliver, setCanDeliver ] = useState(false);

  const handleSubmit = () => {
    handleNextStep();
  }

  const getDeliveryPrice = (zipCode) => {
    return CityDeliveryZipCodePrices[zipCode] || SuburbDeliveryZipCodePrices[zipCode] || 0
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

            if (values.zipCode?.length > 4 && !getDeliveryPrice(values.zipCode)) {
              setCanDeliver(false);
              errors.address = ' ';
              errors.city = ' ';
              errors.zipCode = ' ';
            }

            if (values.zipCode?.length > 4 && getDeliveryPrice(values.zipCode)) {
              setCanDeliver(true);
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
                  <DeliveryPrice>Delivery Price: ${getDeliveryPrice(values.zipCode)}</DeliveryPrice>
                </SingleRow>
              )}
              {values.zipCode?.length > 4 && !canDeliver && (
                <SingleRow>
                  <CannotDeliverText>We're sorry, we cannot deliver to this address</CannotDeliverText>
                </SingleRow>
              )}
              <SubmitButton
                className="snipcart-add-item"
                data-item-id="delivery"
                data-item-price={getDeliveryPrice(values.zipCode).toString()}
                data-item-url="/order"
                data-item-name="Local Delivery"
                data-item-custom1-name="Date"
                data-item-custom1-type="readonly"
                data-item-custom1-value={moment(values.date).format('MMMM Do YYYY')}
                data-item-custom2-name="Time"
                data-item-custom2-type="readonly"
                data-item-custom2-value={values.time}
                data-item-custom3-name="Name"
                data-item-custom3-type="readonly"
                data-item-custom3-value={values.name}
                data-item-custom4-name="Address"
                data-item-custom4-type="readonly"
                data-item-custom4-value={values.address}
                data-item-custom5-name="Apartment"
                data-item-custom5-type="readonly"
                data-item-custom5-value={values.addressApt}
                data-item-custom6-name="City"
                data-item-custom6-type="readonly"
                data-item-custom6-value={values.city}
                data-item-custom7-name="Zip Code"
                data-item-custom7-type="readonly"
                data-item-custom7-value={values.zipCode}
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
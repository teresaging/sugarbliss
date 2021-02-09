import React, { useState } from 'react';
import moment from 'moment';
import { Form } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { CityDeliveryZipCodePrices, SuburbDeliveryZipCodePrices, colors } from '../../utils';

import { Container, Title, SubTitle, FormContainer, Row, SingleRow, SubmitButton, DeliveryPrice, CannotDeliverText } from './Styled';

const LATE_AFTERNOON_TIME = '12pm-4pm';

const currentCentralHour = moment().format('H');

const disableSundays = (date) => {
  return date.getDay() === 0;
}

type Values = {
  date: Date | string;
  time: string;
  name: string;
  companyName?: string;
  address: string;
  addressApt?: string;
  city: string;
  zipCode: string;
}

type Errors = {
  date?: Date | string;
  time?: string;
  name?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

type Props = {
  handleNextStep: Function;
  addItemToCart: Function;
  setDayOfWeek: Function;
  setOrderDate: Function;
}

const OrderDeliveryForm = ({handleNextStep, addItemToCart, setDayOfWeek, setOrderDate}: Props) => {

  const [ canDeliver, setCanDeliver ] = useState(false);
  const [ deliveryPrice, setDeliveryPrice ] = useState(0);

  const handleSubmit = async (values: Values) => {
    await addItemToCart({
      id: `delivery-${deliveryPrice}`,
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
          name: 'Company Name',
          type: 'readonly',
          value: values.companyName || '',
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
    await setOrderDate(moment(values.date));
    handleNextStep();
  }

  const getDeliveryPrice = ({zipCode, time}) => {
    if (CityDeliveryZipCodePrices[zipCode]) {
      return CityDeliveryZipCodePrices[zipCode];
    }

    if (SuburbDeliveryZipCodePrices[zipCode] && time === LATE_AFTERNOON_TIME) {
      return SuburbDeliveryZipCodePrices[zipCode].lateAfternoon;
    }

    return SuburbDeliveryZipCodePrices[zipCode]?.day || null;
  }

  return (
    <Container>
      <Title marginBottom={0}>Local Delivery</Title>
      <SubTitle>(Monday - Sunday only)</SubTitle>
      <FormContainer bgColor={colors.solids.BABY_PINK}>
        <Form
          onSubmit={handleSubmit}
          validate={values => {
            const errors: Errors = {}
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

            if (values.zipCode?.length > 4 && values.time) {
              const price = getDeliveryPrice({zipCode: values.zipCode, time: values.time});
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
          render={({ handleSubmit, submitting, values, hasValidationErrors }) => {
            const isDatePickedToday = moment(values.date)?.format('L') === moment().format('L')
            const isAfterHours = Number.parseInt(currentCentralHour, 10) > 12;

            return (
            <form onSubmit={handleSubmit}>
              <Row>
                <DatePicker
                  label="Date"
                  name="date"
                  variant="inline"
                  format="yyyy-MM-dd"
                  dateFunsUtils={DateFnsUtils}
                  shouldDisableDate={disableSundays}
                  minDate={Date()}
                  disablePast
                  allowKeyboardControl
                  required
                />
                <Select
                  name="time"
                  label="Time"
                  formControlProps={{ margin: 'none' }}
                >
                  <MenuItem value="9am-1pm" disabled={isDatePickedToday}>9am - 1pm</MenuItem>
                  <MenuItem value="10am-2pm" disabled={isDatePickedToday}>10am - 2pm</MenuItem>
                  <MenuItem value="11am-3pm" disabled={isDatePickedToday}>11am - 3pm</MenuItem>
                  <MenuItem disabled={isDatePickedToday && isAfterHours} value={LATE_AFTERNOON_TIME}>12pm - 4pm</MenuItem>
                </Select>
              </Row>
              <Row>
                <TextField label="First and Last Name" name="name"/>
                <TextField label="Company Name (optional)" name="companyName"/>
              </Row>
              <Row>
                <TextField label="Address" name="address"/>
                <TextField label="Apt/Suite #" name="addressApt"/>
              </Row>
              <Row>
                <TextField label="City" name="city"/>
                <TextField label="Zip/Postal Code" name="zipCode"/>
              </Row>
              {values.zipCode?.length > 4 && values.time && canDeliver && (
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
          )}}
        />
      </FormContainer>
    </Container>
  );
}

export default OrderDeliveryForm;
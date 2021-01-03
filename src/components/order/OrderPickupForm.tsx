import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { colors } from '../../utils';

import { Container, Title, FormContainer, Row, SubmitButton } from './Styled';

type Props = {
  handleNextStep: Function;
  addItemToCart: Function;
  setDayOfWeek: Function;
}

const OrderPickupForm = ({handleNextStep, addItemToCart, setDayOfWeek}: Props) => {
  const handleSubmit = async (values) => {
    await addItemToCart({
      id: 'pickup',
      name: 'Pickup',
      price: 0,
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
        }
      ],
    })
    await setDayOfWeek(moment(values.date).format('dddd'));
    handleNextStep();
  }

  return (
    <Container>
      <Title marginBottom={50}>Pickup From Store</Title>
      <FormContainer bgColor={colors.solids.BABY_BLUE}>
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
                  label="Pickup Time"
                  formControlProps={{ margin: 'none' }}
                  required
                >
                  <MenuItem value="9am-10am">9am - 10am</MenuItem>
                  <MenuItem value="10am-11am">10am - 11am</MenuItem>
                  <MenuItem value="11am-12pm">11am - 12pm</MenuItem>
                  <MenuItem value="12pm-1pm">12pm - 1pm</MenuItem>
                  <MenuItem value="1pm-2pm">1pm - 2pm</MenuItem>
                  <MenuItem value="2pm-3pm">2pm - 3pm</MenuItem>
                  <MenuItem value="3pm-4pm">3pm - 4pm</MenuItem>
                  <MenuItem value="4pm-5pm">4pm - 5pm</MenuItem>
                </Select>
              </Row>
              <SubmitButton
                type="submit"
                disabled={submitting || hasValidationErrors}>
                Add Pickup To Order
              </SubmitButton>
            </form>
          )}
        />
      </FormContainer>
    </Container>
  )
}

export default OrderPickupForm;
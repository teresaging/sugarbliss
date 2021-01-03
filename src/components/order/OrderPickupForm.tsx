import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { fonts } from '../../design-system';
import { sizing, colors } from '../../utils';

import { Container, Title, FormContainer, Row, SubmitButton } from './Styled';

const OrderPickupForm = () => {
  const handleSubmit = () => {
    console.log('hey there');
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
          render={({ handleSubmit, submitting, pristine, values, hasValidationErrors }) => (
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
                className="snipcart-add-item"
                data-item-id="pickup"
                data-item-price="0.00"
                data-item-url="/order"
                data-item-name="Pickup"
                data-item-custom1-name="Date"
                data-item-custom1-type="readonly"
                data-item-custom1-value={moment(values.date).format('MMMM Do YYYY')}
                data-item-custom2-name="Time"
                data-item-custom2-type="readonly"
                data-item-custom2-value={values.time}
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
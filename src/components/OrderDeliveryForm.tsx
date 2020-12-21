import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Form, Field } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { sizing, colors } from '../utils';
import { fonts } from '../design-system';

const OrderDeliveryForm = () => {
  const handleSubmit = () => {
    console.log('hi');
  }

  return (
    <Container>
      <Title>Local Delivery</Title>
      <SubTitle>(Monday - Sunday only)</SubTitle>
      <FormContainer>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
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
              <TextField label="Name" name="name"/>
              <Row>
                <TextField label="Address" name="address"/>
                <TextField label="Apt/Suite #" name="address-apt"/>
              </Row>
              <Row>
                <TextField label="City" name="address-city"/>
                <TextField label="Zip/Postal Code" name="address-zip-code"/>
              </Row>
              <button
                type="submit"
                disabled={submitting}>
                Submit
              </button>
            </form>
          )}
        />
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  ${fonts.cursiveText['1200']};
  text-align: center;
`;

const SubTitle = styled.p`
  ${fonts.mediumText['600']};
  margin-bottom: ${sizing(50)};
  text-align: center;
`;

const FormContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  background-color: ${colors.solids.BABY_PINK};
  border-radius: ${sizing(20)};
  padding: ${sizing(40)};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${sizing(40)};
  margin-bottom: ${sizing(20)};
`;

export default OrderDeliveryForm;
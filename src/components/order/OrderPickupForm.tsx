import React from 'react';
import { Form } from 'react-final-form';
import { DatePicker, Select, TextField } from 'mui-rff';
import { MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { colors } from '../../utils';
import { disableSundays } from './OrderDeliveryForm';
import { Container, Title, FormContainer, Row, SubmitButton, SubTitle } from './Styled';

const CST_CURRENT_DATE_TIME = moment(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));

type Props = {
  handleNextStep: Function;
  addItemToCart: Function;
  setDayOfWeek: Function;
  setOrderDate: Function;
}

const OrderPickupForm = ({handleNextStep, addItemToCart, setDayOfWeek, setOrderDate}: Props) => {
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
        },
        {
          name: 'Phone',
          type: 'readonly',
          value: values.phone,
        }
      ],
    })
    await setDayOfWeek(moment(values.date).format('dddd'));
    await setOrderDate(moment(values.date));
    handleNextStep();
  }

  const handleMinDate = () => {
    if (Number(CST_CURRENT_DATE_TIME.hour()) > 12 && Number(CST_CURRENT_DATE_TIME.hour()) < 14) {
      const nextDay = moment(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })).add(1, 'day');
      return nextDay;
    }

    if (Number(CST_CURRENT_DATE_TIME.hour()) > 14) {
      const next2Days = moment(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })).add(2, 'day');

      return next2Days;
    }

    return CST_CURRENT_DATE_TIME;
  }

  const renderDates = (pickupDate) => {
    const selectedDate = moment(pickupDate);
    const isSameDay = selectedDate.format('M, D') === CST_CURRENT_DATE_TIME.format('M, D');
    const isCurrentDateNightBefore = (Number(CST_CURRENT_DATE_TIME.date()) + 1 === Number(selectedDate.date())) && Number(CST_CURRENT_DATE_TIME.hour()) > 16;
    const isSameDayBefore11 = isSameDay && Number(CST_CURRENT_DATE_TIME.hour()) < 11;
    const isSameDay11 = isSameDay && Number(CST_CURRENT_DATE_TIME.hour()) === 11;
    const isWeekend = selectedDate.format('dddd') === 'Saturday' || selectedDate.format('dddd') === 'Sunday';

    let datesArray = [];
    if (isSameDayBefore11) {
      datesArray = [
        {
          value: '12pm-1pm',
          text: '12pm - 1pm'
        },
        {
          value: '1pm-2pm',
          text: '1pm - 2pm',
        },
        {
          value: '2pm-3pm',
          text: '2pm - 3pm',
        },
        {
          value: '3pm-4pm',
          text: '3pm - 4pm',
        },
      ]
      if (!isWeekend) { datesArray = [...datesArray, {value: '4pm-5pm', text: '4pm - 5pm'}]; }
    } else if (isSameDay11) {
      datesArray = [
        {
          value: '2pm-3pm',
          text: '2pm - 3pm',
        },
        {
          value: '3pm-4pm',
          text: '3pm - 4pm',
        }
      ]
      if (!isWeekend) { datesArray = [...datesArray, {value: '4pm-5pm', text: '4pm - 5pm'}]; }
    } else if (isCurrentDateNightBefore) {
      datesArray = [
        {
          value: '10am-11am',
          text: '10am - 11am',
        },
        {
          value: '12pm-1pm',
          text: '12pm - 1pm'
        },
        {
          value: '1pm-2pm',
          text: '1pm - 2pm',
        },
        {
          value: '2pm-3pm',
          text: '2pm - 3pm',
        },
        {
          value: '3pm-4pm',
          text: '3pm - 4pm',
        },
      ]
      if (!isWeekend) { datesArray = [...datesArray, {value: '4pm-5pm', text: '4pm - 5pm'}]; }
    } else {
      datesArray = [
        {
          value: '9am-10am',
          text: '9am - 10am',
        },
        {
          value: '10am-11am',
          text: '10am - 11am',
        },
        {
          value: '12pm-1pm',
          text: '12pm - 1pm'
        },
        {
          value: '1pm-2pm',
          text: '1pm - 2pm',
        },
        {
          value: '2pm-3pm',
          text: '2pm - 3pm',
        },
        {
          value: '3pm-4pm',
          text: '3pm - 4pm',
        },
      ]
      if (!isWeekend) { datesArray = [...datesArray, {value: '4pm-5pm', text: '4pm - 5pm'}]; }
    }

    return datesArray.map((date, idx) => {
        return (<MenuItem key={idx} value={date.value}>{date.text}</MenuItem>)
      })
  }

  return (
    <Container>
      <Title marginBottom={50}>Pickup From Store</Title>
      <SubTitle>(Monday - Saturday only)</SubTitle>
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
          render={({ handleSubmit, submitting, values, hasValidationErrors }) => {
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
                    minDate={handleMinDate()}
                    required
                  />
                  <Select
                    name="time"
                    label="Pickup Time"
                    formControlProps={{ margin: 'none' }}
                    required
                  >
                    {renderDates(values.date)}
                  </Select>
                </Row>
                <Row>
                  <TextField label="Phone" name="phone" type="tel"/>
                </Row>
                <SubmitButton
                  type="submit"
                  disabled={submitting || hasValidationErrors}>
                  Add Pickup To Order
                </SubmitButton>
              </form>
          )}}
        />
      </FormContainer>
    </Container>
  )
}

export default OrderPickupForm;
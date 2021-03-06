import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Select, Table} from 'antd';

import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import Notification from '../Notification/Notification'

import BoarderContext from '../context/boarder/boarderContext'
import MealContext from '../context/meal/mealContext'

export const MealByBoarder = () => {
  const boarderContext = useContext(BoarderContext)
  const mealContext = useContext(MealContext)
  
  const {
    getSingleBoarderMeal,
    boarderMeal,
    error
  } = mealContext;

  const { getAllBoarder, boarders } = boarderContext;

  const [boarder, setBoarder] = useState('');

  useEffect(() => {
    getAllBoarder()
    
    // eslint-disable-next-line
  },[]);

  const options = boarders.map(boarder => {
    return {
      label: boarder.name,
      value: boarder._id
    }
  });


  const onSubmit = () => {
    getSingleBoarderMeal(boarder);
  }
  
  const columns = [
    {
      title: 'Date Added',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      responsive: ['md'],
    },
    {
      title: 'Meal',
      dataIndex: 'mealCount',
      key: 'meal',
      responsive: ['md'],
    },
  ];

  return (
    <DashboardLayout>
      <Notification message={error ? error : false} type='warning'/>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >

        <Form.Item
          name="boarder"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Boarder"
            onChange={value => setBoarder(value)}
            options={options}
            allowClear
          />
            
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Find
          </Button>
        </Form.Item>
      </Form>
      {boarderMeal.length > 0 ? (
      <Table
        dataSource={boarderMeal}
        tableLayout='auto'
        pagination={{ pageSize: 10 }}
        scroll={{ y: 650 }}
        columns={columns}
        // eslint-disable-next-line
        bordered={true}
        />) : null}
    </DashboardLayout>
  )
}
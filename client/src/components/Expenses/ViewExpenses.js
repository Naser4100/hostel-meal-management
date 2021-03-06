import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import Notification from '../Notification/Notification'

import { Table, Space } from 'antd';
import {
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';

import ExpenseContext from '../context/expense/expenseContext'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost'
  },
  {
    title: 'Marketer',
    dataIndex: 'user',
    key: 'marketer',
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Date',
    dataIndex: 'dateAdded',
    key: 'dateAdded'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: ''
  }
]




export const ViewExpenses = () => {
  const expenseContext = useContext(ExpenseContext);
  const { expenses, getExpenses, error, deleteExpense } = expenseContext;

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  },[]);

  const handleDelete = (id) => {
    deleteExpense(id);
  }

  const editExpense = (id) => {
    console.log(`Edit Expense, ${id}`)
  }

  const dataSource = expenses.map(expense => {
    return {
      key: expense._id,
      name: expense.name,
      cost: expense.cost,
      user: expense.marketer.name,
      type: expense.type,
      dateAdded: moment(expense.dateAdded).format('Do MMMM YYYY, h:mm:ss a'),
      action: 
        <Space size='middle'>
          <DeleteFilled onClick={() => handleDelete(expense._id)}/>
          <EditFilled onClick={() => editExpense(expense._id)}/>
        </Space>,
    }
  });

  return (
    <DashboardLayout>
      <Notification message={error ? error : false} type='warning'/>
      <Table dataSource={dataSource} columns={columns} />
    </DashboardLayout>
  )
}

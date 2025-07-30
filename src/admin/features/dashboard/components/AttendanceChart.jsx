import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../common/supabase/supabaseClient';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AttendanceChart = () => {
  const [data, setData] = useState([]);
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    if (!currentDepartmentInfo.id) return;

    const fetchAttendanceData = async () => {
      const { data: attendanceData, error } = await supabase
        .from('attendances')
        .select('*, departments(name), worships(name)')
        .eq('department_id', currentDepartmentInfo.id);

      if (error) {
        console.error('Error fetching attendance data:', error);
        return;
      }

      const attendanceByWorship = attendanceData.reduce((acc, record) => {
        const worshipName = record.worships.name; // Assuming you have a worships table with a name column
        if (!acc[worshipName]) {
          acc[worshipName] = { name: worshipName, present: 0, absent: 0 };
        }
        if (record.status === 'attended') {
          acc[worshipName].present += 1;
        } else {
          acc[worshipName].absent += 1;
        }
        return acc;
      }, {});

      setData(Object.values(attendanceByWorship));
    };

    fetchAttendanceData();
  }, [currentDepartmentInfo.id]);

  return (
    <div>
      <h2>{currentDepartmentInfo.name} 출석 현황</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="present" stroke="#8884d8" name="출석" />
        <Line type="monotone" dataKey="absent" stroke="#82ca9d" name="결석" />
      </LineChart>
    </div>
  );
};

export default AttendanceChart;

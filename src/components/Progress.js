import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { PieChart, Pie, Tooltip } from "recharts";
Chart.register(ArcElement);

function Progress(props) {
  const [days, setDays] = useState(0); // Initialize days with 0

  function getDaysBetweenDates(date1, date2) {
    // Convert both dates to milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2Ms - date1Ms);

    // Convert milliseconds to days
    const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    setDays(daysDifference);
  }
  useEffect(() => {
    // console.log(props.startdate.split("-"));
    const formattedDateSt = props.startdate.split("-").reverse().join("-");
    getDaysBetweenDates(new Date(formattedDateSt), new Date());
  }, [props.dateSt]);
  const data = [
    { name: "Competed", challenge: props.count, fill: "green" },
    { name: "Not completed", challenge: days - props.count, fill: "#FF6384" },
  ];

  return (
    <div>
      <h4>
        Your Progress is {props.count} out of {days} days
      </h4>
      <PieChart width={440} height={270}>
        <Tooltip />
        <Pie
          data={data}
          dataKey="challenge"
          outerRadius={100}
          innerRadius={40}
          label={({ name, challenge }) => `${name}: ${challenge}`}
        />
      </PieChart>
    </div>
  );
}

export default Progress;

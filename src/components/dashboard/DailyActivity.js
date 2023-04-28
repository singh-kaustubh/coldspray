import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import { useEffect, useState } from "react";
const DailyActivity = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await fetch("http://localhost:3000/api/getOrders", {
      method: `GET`,
    });
    const data = await response.json();
    setOrders(data.reverse());
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const getColor = (od) => {
    return od.status === "Paid"
      ? "success.main"
      : od.status === "Failed"
      ? "error.main"
      : "warning.main";
  };
  return (
    <BaseCard title="Recent Orders">
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {orders.map((od) => (
          <TimelineItem key={od.orderId}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {od.createdAt.slice(8, 10) +
                `-` +
                od.createdAt.slice(5, 7) +
                `-` +
                od.createdAt.slice(0, 4) +
                `@` +
                od.createdAt.slice(11, 16)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <Link href={`/postcheckout?orderId=${od.orderId}`}>
                <TimelineDot
                  className="cursor-pointer"
                  variant="outlined"
                  sx={{
                    borderColor: getColor(od),
                  }}
                />
              </Link>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {od.address.name}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </BaseCard>
  );
};

export default DailyActivity;

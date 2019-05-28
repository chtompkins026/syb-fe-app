import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services";
import styled from "styled-components";
import { DateTime } from "luxon";
import map from "lodash.map";
import { Portal } from "react-portal";
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import { connect } from 'react-redux';

import ListFilter from "../components/ListFilter/ListFilter";

const HeaderContent = styled.div`
  margin-top: 30px;
`;

const StyledListFilter = styled(ListFilter)`
  margin-top: 50px;
`;

const WorkoutsGrid = styled.div`
  margin-top: 50px; 
  display: grid;
  grid-template-columns: 100px auto;
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: 100px;
  grid-template-rows: repeat(14, auto);
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 100px 600px;
`;

const DayOfTheWeek = styled.div`
  display: flex;
  flex-flow: column;
`

const CalendarItem = styled.div`
  height: 80px;
  border-right: 1px solid rgba(0, 0, 0, 0.8); 
  text-transform: uppercase; 
  font-size: 14px; 
  color: var(--gray);
  :hover {
    ${(props) => props.hoverable && `background: var(--blue);`};
  }
  
  ${(props) => props.hoverable && `background: var(--dgray);`};
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
`;

const Workouts = ({ history, clientData }) => {
  const clientId = localStorage.getItem("clientID");

  const [workouts, setWorkouts] = useState([]);
  const [workoutFilter, setWorkoutFilter] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/schedules`)
      .then(res => {
        console.log("This is the response schedules data", res.data);
        setWorkouts(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const beginningOfWeek = DateTime.local().startOf("week");
  console.log("this is the beginning of the week", beginningOfWeek);


  // TODO: still need to fix:
  // - filtering
  // - navigating days of the week
  // - add time for workout block
  // 
  const mappedSchedules = workouts.map(workout => ({
    dayOfTheWeek: DateTime.fromISO(workout.start).toFormat('cccc'),
    weekNumber: DateTime.fromISO(workout.start).toFormat('W'),
    ...workout
  }));

  const groupedSchedules = groupBy(mappedSchedules, 'dayOfTheWeek')

  const weeklySchedule = Array.from({ length: 7 })
     .map((_, i) => beginningOfWeek.plus({ day: i }).toFormat('cccc'))
     .map(day => groupedSchedules[day] ? sortBy(groupedSchedules[day], [(o) =>  DateTime.fromISO(o.start).toMillis() ]) : [])
     
  console.log(weeklySchedule);

  // const allSchedules = workouts
  //   .filter(workout => {
  //     if (workoutFilter === "") return true;
  //     return workout.name === workoutFilter;
  //   })
  //   .map(workout => workout.schedules)
  //   .flat();

  const allWorkoutTitles = map(workouts, "name"); //map imported from loDash 
  const currentWorkout = workouts.filter(workout => {
    if (workoutFilter === "") return true;
    return workout.name === workoutFilter;
  });

  const confirmBooking = schedule => {
    const booking = {
      status: "confirmed",
      title: "booking",
      cost: currentWorkout.cost,
      start: schedule.start,
      cancellation_reason: null,
      refunded: null,
      instructor_id: schedule.instructor_id,
      schedule_id: schedule.id,
      client_id: clientData.id
    };

    axiosInstance
      .post("/api/bookings", booking)
      .then(res => {
        console.log("This is the response data", res.data);
        setConfirmModalOpen(false);
        history.push("/dashboard");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <HeaderContent>
        <h1> WEEKLY SCHEDULE </h1> 
        <p>PLEASE CANCEL AT LEAST 12 HOURS IN ADVANCE OF YOUR SCHEDULED CLASS TIME TO AVOID LOSING YOUR CLASS CREDIT. </p>
        <p> Late cancellations and no shows will result in a forfeiture of a class credit in your account. </p>
        <p> 8 day advance booking* opens every Sunday at 4 PM, and sessions will only be available to advance book for the subsequent 8 days, Monday - Monday.</p> 
      </HeaderContent> 
    
      <StyledListFilter
        options={allWorkoutTitles}
        setFilter={filter => setWorkoutFilter(filter)}
        defaultValue={"Select a workout..."}
      />
      <WorkoutsGrid>
        <HoursGrid>
          <CalendarItem> </CalendarItem>
          {/*scheduleHours.map(hour => (
            <CalendarItem>
              {hour.toLocaleString(DateTime.TIME_SIMPLE)}
            </CalendarItem>
          ))*/}
        </HoursGrid>
        <CalendarGrid>
          <CalendarItem> Monday </CalendarItem>
          <CalendarItem> Tuesday </CalendarItem>
          <CalendarItem> Wednesday </CalendarItem>
          <CalendarItem> Thursday </CalendarItem>
          <CalendarItem> Friday </CalendarItem>
          <CalendarItem> Saturday </CalendarItem>
          <CalendarItem> Sunday </CalendarItem>
          
          {weeklySchedule.map(dayOfTheWeek => (
            <DayOfTheWeek>
              {dayOfTheWeek.map(schedule => (
                <CalendarItem hoverable={true}>
              
                    <div>
                      {schedule.title}
                      <button
                        onClick={() => {
                          setConfirmModalOpen(true);
                        }}
                      >
                        BOOK
                      </button>
                      {confirmModalOpen && (
                        <Portal>
                          <ModalContainer>
                            <ModalContent>
                              <button
                                onClick={() => setConfirmModalOpen(false)}
                              >
                                X
                              </button>
                              <div> Do you want to create this booking? </div>
                              <button onClick={() => confirmBooking(schedule)}>
                                yes
                              </button>
                              <button
                                onClick={() => setConfirmModalOpen(false)}
                              >
                                no
                              </button>
                            </ModalContent>
                          </ModalContainer>
                        </Portal>
                      )}
                    </div>
                
              </CalendarItem>
              ))}
            </DayOfTheWeek>
          ))}
        </CalendarGrid>
      </WorkoutsGrid>
    </div>
  );
};

  const mapStateToProps = state => {
    return {
        user: state.user,
        accessToken: state.accessToken,
        clientData: state.client.clientData
    };
  };


export default connect(mapStateToProps)(Workouts);


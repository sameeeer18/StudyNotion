import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {getAllCoursesOfInstructor} from '../../../../Services/operations/courseDetailAPI'
import CoursesTable from './CourseTable';
import IconBtn from '../../Common/IconBtn';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const InstructorCourses = () => {

  //loading will be true before calling the function of service layer and false whrn that function return us the result and we set that result to course state variable of the corseSlice
  const [loading,setloading] = useState(false);
 //getting instance of dispatch so that i can dispatch a action of setting the course state variable equal to the fetched courses
//  const dispatch = useDispatch(); 
//here use dispatch is unnecessary as here we have just 2 pages which will be accessing the course data which we can handle by prop pasing so we will create a state variable and store courses in that and pass that to table component similarly when some course get deletes in table componenet the state will be changed as we will also pass the state change function to the component

const navigate = useNavigate();

 //getting token which will bee passed to function of service layer and inturn it will be passed to the backend api as "Authorisation header"
 const {token} = useSelector((state) => state.auth);

 //state variable where all courses of him will get stored after fetching
 const [courses, setCourses] = useState(null);

  const fetchAllCoursesForInstructor = async () => {
    setloading(true);
    try{

     const fetchedCourses = await getAllCoursesOfInstructor(token);
     setCourses(fetchedCourses);
     setloading(false);

    }catch(err){
      console.log('error occured while calling function from service layer :- ',err.message);
      setloading(false);
    }
  }

  useEffect(()=>{
     fetchAllCoursesForInstructor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>

       {
        loading ? <div className='flex justify-center items-center w-full h-full'><div className='loading'></div></div> : 
        (
          <div className='flex flex-col gap-6 items-start p-5'>
              <h1 className='text-richblack-50 text-4xl font-bold'>My Courses</h1>
              {
                loading ? (<div className='loader'></div>) : (<CoursesTable courses={courses} setCourses={setCourses} />)
              }
              <div className='self-end'>
              <IconBtn
              text={'New'}
              onclick={()=> navigate('/dashboard/add-course')}
              
              >
                <IoIosAddCircleOutline />
              </IconBtn>
              </div>
          </div>
        )
       }

    </div>
  )
}

export default InstructorCourses
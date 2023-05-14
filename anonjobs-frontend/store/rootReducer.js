import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice'; 
import filterReducer from './filters/filters.slice'; 
import tagReducer from './tags/tag.slice';
import yearlySalaryReducer from './yearlySalary/yearlySalary.slice';
import jobReducer from './jobs/job.slice';
import employerReducer from './employers/employer.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    filter: filterReducer,
    tag: tagReducer,
    yearlySalary: yearlySalaryReducer,
    job: jobReducer,
    employer: employerReducer
});

export default rootReducer;
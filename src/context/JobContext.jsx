import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllHandler } from "../utils/FetchHandlers";

const jobContext = React.createContext();

const JobContext = ({ children }) => {
    const [jobLoading, setJobLoading] = useState(true);
    const [jobError, setJobError] = useState({ status: false, message: "" });
    const [jobs, setJobs] = useState({ result: [], pageCount: 0 });

    const baseURL = import.meta.env.VITE_API_URL;

    const handleJobFetch = async (url) => {
        setJobLoading(true);
        try {

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized: No token found");
            }

            

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true

            });
            // console.log(response.data.data.result);

          
          

            setJobError({ status: false, message: "" });
            setJobs(response?.data.data);
            
            
        } catch (error) {
            setJobError({ status: true, message: error?.message });
           setJobs({ result: [], pageCount: 0 });
            setJobLoading(false);
        }
        setJobLoading(false);
    };


    // console.log( jobs);

    useEffect(() => {
        handleJobFetch(
            `${baseURL}/api/v1/jobs/all/?page=1`

        );
    }, []);
    const passing = {
        jobLoading,
        jobError,
        jobs,
        setJobs,
        handleJobFetch,
    };

    return (
        <jobContext.Provider value={passing}>{children}</jobContext.Provider>
    );
};

const useJobContext = () => useContext(jobContext);

export { useJobContext, JobContext };
